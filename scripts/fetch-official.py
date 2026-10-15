#!/usr/bin/env python3
"""
Relevé des données officielles du site (RECETTE §4, §22). Rejouable, daté, sourcé.

    python3 scripts/fetch-official.py            # télécharge, écrit src/data/official.json, affiche les écarts
    python3 scripts/fetch-official.py --report   # idem, et écrit scripts/.cache-raw/changes.md (corps de l'issue GitHub)

Sources, toutes du Département d'État :
  1. Grille des frais (PDF « United States Passport Fees », édition d'octobre 2026) et page « Passport Fees ».
     travel.state.gov refuse les programmes (Cloudflare) : on ne contourne pas cette protection. Les mêmes pages
     et le même PDF sont servis par adoptions.state.gov, domaine du même Bureau des affaires consulaires, ouvert
     aux robots. L'URL citée sur le site reste celle de travel.state.gov.
  2. Pages « Get Your Processing Time », « Renew Your Passport Online », « Renew Your Passport by Mail ».
  3. Barème légal : 22 CFR 22.1 (Schedule of Fees for Consular Services), par l'API de l'eCFR.
  4. API Consular Affairs (cadataapi.state.gov) : fiches pays (exigences d'entrée), délivrances et demandes par
     exercice, lieux de dépôt par État.

Ce que fait le résultat : `official.json` est un relevé machine. Le site calcule avec `params-2026.json`, relu à la
main. `tests/official.test.ts` compare les deux : un frais ou un délai qui change fait échouer les tests, et la
GitHub Action (`.github/workflows/watch.yml`) ouvre alors une issue avec le détail (rien n'est changé en silence).
Les délais de traitement publiés sont recopiés d'office dans params par `--sync-times` (règle de l'éditeur : mise
à jour automatique des délais), les frais et les règles des pays jamais.
"""
import hashlib, html, json, os, re, sys, urllib.request, datetime, io

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, 'scripts', '.cache-raw')
OUT = os.path.join(ROOT, 'src', 'data', 'official.json')
PARAMS = os.path.join(ROOT, 'src', 'data', 'params-2026.json')
UA = 'Mozilla/5.0 (compatible; uspassportcost-data/1.0; +https://uspassportcost.com/en/method/)'
MIRROR = 'https://adoptions.state.gov'
os.makedirs(RAW, exist_ok=True)

# Pays des pages « validité » (codes de l'API Consular Affairs, pas ISO).
COUNTRIES = ['MX', 'CA', 'DR', 'JM', 'BF', 'CS', 'CO', 'PE', 'ES', 'GT', 'HO', 'UK', 'EI', 'FR', 'IT', 'SP', 'GM', 'GR',
             'JA', 'TH', 'TU', 'AE', 'CH', 'VM']


def get(url: str, binary=False, accept=None, timeout=60, tries=5):
    """Le miroir répond 404 une fois sur deux pour un fichier qui existe (nœuds non synchronisés) : on réessaie."""
    import time, urllib.error
    for k in range(tries):
        try:
            return _get(url, binary, accept, timeout)
        except urllib.error.HTTPError as e:
            if k == tries - 1 or e.code not in (404, 429, 500, 502, 503, 504): raise
            time.sleep(1.5 * (k + 1))


def _get(url: str, binary=False, accept=None, timeout=60):
    h = {'User-Agent': UA, 'Accept-Encoding': 'identity'}
    if accept: h['Accept'] = accept
    req = urllib.request.Request(url, headers=h)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        b = r.read()
        if r.headers.get('Content-Encoding') == 'gzip':
            import gzip; b = gzip.decompress(b)
    return b if binary else b.decode('utf-8', 'ignore')


def text_of(page: str) -> str:
    s = re.sub(r'(?s)<script.*?</script>|<style.*?</style>|<nav.*?</nav>|<footer.*?</footer>|<header.*?</header>', ' ', page)
    t = html.unescape(re.sub(r'<[^>]+>', ' ', s))
    t = re.sub(r'\s+', ' ', t)
    i = t.find('Open Side Navigation Menu')
    return t[i + 25:] if i > 0 else t


def last_updated(t: str):
    m = re.search(r'Last Updated:\s*([A-Z][a-z]+ \d{1,2}, \d{4})', t)
    return datetime.datetime.strptime(m.group(1), '%B %d, %Y').date().isoformat() if m else None


def money(s: str) -> float:
    return float(s.replace(',', ''))


def page(path: str):
    raw = get(MIRROR + path)
    t = text_of(raw)
    open(os.path.join(RAW, path.strip('/').replace('/', '__') + '.txt'), 'w').write(t)
    return t


# ---------------------------------------------------------------- 1. frais
MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']


def fee_chart():
    """Grille PDF : l'édition connue, puis les éditions possibles du mois courant et des deux suivants."""
    today = datetime.date.today()
    names = ['Passport_Fees_OCT_2026.pdf']
    for k in range(0, 3):
        y, m = today.year + (today.month - 1 + k) // 12, (today.month - 1 + k) % 12
        names.insert(0, f'Passport_Fees_{MONTHS[m]}_{y}.pdf')
    seen, found = set(), None
    for n in names:
        if n in seen: continue
        seen.add(n)
        url = f'{MIRROR}/content/dam/tsg_aem/passports/documents/forms-fees/{n}'
        try:
            b = get(url, binary=True)
        except Exception:
            continue
        if b[:4] == b'%PDF':
            found = (n, b); break
    if not found:
        return {'error': 'aucune grille PDF trouvée'}
    n, b = found
    open(os.path.join(RAW, n), 'wb').write(b)
    from pypdf import PdfReader
    t = ' '.join(p.extract_text() for p in PdfReader(io.BytesIO(b)).pages)
    t = re.sub(r'\s+', ' ', t)
    def row(label, section=None):
        hay = t
        if section:  # chercher dans la section (« ADULT RENEWALS »), jusqu'à la section suivante en capitales
            i = t.find(section); hay = t[i:] if i >= 0 else ''
            j = re.search(r' [A-Z]{3,} [A-Z]{3,}', hay[len(section):]); hay = hay[:len(section) + j.start()] if j else hay
        m = re.search(r'(?<![\w-])' + re.escape(label) + r' (DS-\d+) \$(\d[\d,.]*)(?: \$(\d[\d,.]*))?', hay)
        return {'form': m.group(1), 'app': money(m.group(2)), 'exec': money(m.group(3)) if m.group(3) else None} if m else None
    out = {
        'file': n,
        'url_official': f'https://travel.state.gov/content/dam/tsg_aem/passports/documents/forms-fees/{n}',
        'sha256': hashlib.sha256(b).hexdigest(),
        'edition': (re.search(r'Updated ([A-Z][a-z]+ \d{4})', t) or [None, None])[1],
        'adult_first': {k: row(f'First-time Adult Passport {k}') for k in ('Book', 'Card*', 'Book & Card')},
        'adult_renew': {k: row(f'Adult Passport {k}', 'ADULT RENEWALS') for k in ('Book', 'Card*', 'Book & Card')},
        'minor': {k: row(f'Minor Passport {k}', 'ALL MINOR APPLICANTS') for k in ('Book', 'Card*', 'Book & Card')},
    }
    for key, pat in (('expedite', r'Expedite Fee .*?\$(\d[\d,.]*)'), ('delivery', r'1-3 Day Delivery .*?\$(\d[\d,.]*)'), ('file_search', r'File Search Fee .*?\$(\d[\d,.]*)')):
        m = re.search(pat, t)
        out[key] = money(m.group(1)) if m else None
    return out


def fee_page():
    t = page('/en/passports/apply/help/fees.html')
    def f(pat):
        m = re.search(pat, t)
        return money(m.group(1)) if m else None
    return {
        'url_official': 'https://travel.state.gov/en/passports/apply/help/fees.html',
        'last_updated': last_updated(t),
        'execution': f(r'pay the \$(\d+) facility acceptance fee'),
        'expedite': f(r'Expedited Service \$(\d+)'),
        'delivery': f(r'1-3 Day Return Delivery \$(\d[\d.]*)'),
        'file_search': f(r'pay \$(\d+) for a file search'),
        'check_payee': 'U.S. Department of State' if 'payable to "U.S. Department of State"' in t else None,
    }


def cfr():
    """22 CFR 22.1 à la dernière date publiée par l'eCFR."""
    meta = json.loads(get('https://www.ecfr.gov/api/versioner/v1/titles.json', accept='application/json'))
    date = next(x['latest_issue_date'] for x in meta['titles'] if x['number'] == 22)
    req = urllib.request.Request(f'https://www.ecfr.gov/api/versioner/v1/full/{date}/title-22.xml?part=22&section=22.1',
                                 headers={'User-Agent': UA, 'Accept-Encoding': 'gzip'})
    with urllib.request.urlopen(req, timeout=60) as r:
        b = r.read()
        if r.headers.get('Content-Encoding') == 'gzip':
            import gzip; b = gzip.decompress(b)
    t = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' | ', b.decode('utf-8', 'ignore'))))
    t = re.sub(r'(\s*\|\s*)+', ' | ', t)
    def item(pat):
        m = re.search(pat, t)
        return money(m.group(1)) if m else None
    return {
        'issue_date': date,
        'url': 'https://www.ecfr.gov/current/title-22/chapter-I/subchapter-F/part-22/section-22.1',
        'execution': item(r'1\. Passport Book or Card Execution[^$]*\$(\d+)'),
        'book_16_plus': item(r'\(a\) Applicants age 16 or over \(including renewals\) \| \$(\d+)'),
        'book_under_16': item(r'\(b\) Applicants under age 16 \| \$(\d+)'),
        'security_surcharge': item(r'security surcharge[^$]*\$(\d+)'),
        'expedite': item(r'3\. Expedited service[^$]*\$(\d+)'),
        'file_search': item(r'6\. File search[^$]*\$(\d+)'),
        'card_16_plus': item(r'\[Adult Passport Card\] \| \$(\d+)'),
        'card_under_16': item(r'\[Minor Passport Card\] \| \$(\d+)'),
    }


# ---------------------------------------------------------------- 2. délais et règles
def weeks(pat, t):
    m = re.search(pat, t)
    return [int(m.group(1)), int(m.group(2))] if m else None


def times():
    t = page('/en/passports/apply/help/processing-time.html')
    m_in = re.search(r'Mailing your application Up to (\d+) weeks', t)
    m_out = re.search(r'Receiving your passport Up to (\d+) weeks', t)
    urgent = re.search(r'proof of international travel within (\d+) calendar days', t)
    return {
        'url_official': 'https://travel.state.gov/en/passports/apply/help/processing-time.html',
        'last_updated': last_updated(t),
        'routine_weeks': weeks(r'Routine processing takes (\d+)-(\d+) weeks', t),
        'expedited_weeks': weeks(r'Expedited processing takes (\d+)-(\d+) weeks', t),
        'mail_in_max_weeks': int(m_in.group(1)) if m_in else None,
        'mail_out_max_weeks': int(m_out.group(1)) if m_out else None,
        'urgent_days': int(urgent.group(1)) if urgent else None,
    }


def get_fast():
    t = page('/en/passports/apply/get-fast.html')
    visa = re.search(r'or (\d+) days if you need a foreign visa', t)
    exp = re.search(r'Expedited: travel in less than (\d+) weeks', t)
    return {'last_updated': last_updated(t), 'visa_days': int(visa.group(1)) if visa else None,
            'expedite_if_travel_within_weeks': int(exp.group(1)) if exp else None}


def refund():
    t = page('/en/passports/after-you-apply/expedited-service-fee-refund.html')
    m = re.search(r'we process your application within (\d+) business days', t)
    return {'last_updated': last_updated(t), 'expedite_commitment_business_days': int(m.group(1)) if m else None}


def online_rules():
    t = page('/en/passports/renew-replace/online.html')
    return {
        'url_official': 'https://travel.state.gov/en/passports/renew-replace/online.html',
        'last_updated': last_updated(t),
        'min_age': int(re.search(r'You are age (\d+) or older', t).group(1)) if re.search(r'You are age (\d+) or older', t) else None,
        'expiring_within_years': int(re.search(r'expiring within (\d+) year', t).group(1)) if re.search(r'expiring within (\d+) year', t) else None,
        'expired_less_than_years': int(re.search(r'expired less than (\d+) years', t).group(1)) if re.search(r'expired less than (\d+) years', t) else None,
        'no_travel_weeks': int(re.search(r'not traveling for at least (\d+) weeks', t).group(1)) if re.search(r'not traveling for at least (\d+) weeks', t) else None,
        'can_expedite': not ('cannot be expedited' in t),
    }


def mail_rules():
    t = page('/en/passports/renew-replace/mail.html')
    y = re.search(r'issued within the last (\d+) years', t)
    a = re.search(r'issued when you were age (\d+) or older', t)
    return {'url_official': 'https://travel.state.gov/en/passports/renew-replace/mail.html', 'last_updated': last_updated(t),
            'issued_within_years': int(y.group(1)) if y else None, 'issued_at_age': int(a.group(1)) if a else None,
            'appointment_if_travel_within_weeks': int(re.search(r'traveling in less than (\d+) weeks', t).group(1)) if re.search(r'traveling in less than (\d+) weeks', t) else None}


# ---------------------------------------------------------------- 3. API Consular Affairs
CA = 'https://cadataapi.state.gov'
SENT = re.compile(r'[^.]*?(valid(ity)?\b[^.]*?(month|duration|period|length of stay|entire|date of (entry|arrival|departure)|beyond|when you arrive|at the time)|blank (visa )?page|passport card|WHTI)[^.]*\.', re.I)


def clean(s):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', s or ''))).strip()


def countries():
    data = json.loads(get(f'{CA}/api/CountryTravelInformation'))
    by = {x['tag']: x for x in data}
    out = {}
    for c in COUNTRIES:
        x = by[c]
        e = clean(x['entry_exit_requirements'])
        lu = re.sub(r'^Last Updated:\s*', '', x.get('last_update_date', '')).strip()
        try:
            lu = datetime.datetime.strptime(lu, '%B %d, %Y').date().isoformat()
        except ValueError:
            pass
        out[c] = {'name': x['geopoliticalarea'], 'last_update': lu, 'sha256': hashlib.sha256(e.encode()).hexdigest(),
                  'sentences': [m.group(0).strip() for m in SENT.finditer(e)][:8], 'text': e}
    return out


def stats():
    iss = json.loads(get(f'{CA}/api/Passport/US/Issuances/FiscalYear'))
    app = json.loads(get(f'{CA}/api/Passport/US/Applications/FiscalYear'))
    val = json.loads(get(f'{CA}/api/Passport/US/ValidPassports/FiscalYear'))
    st = json.loads(get(f'{CA}/api/Passport/State/Issuances/FiscalYear'))
    locs = json.loads(get(f'{CA}/api/Passport/Applications/Locations'))
    by_state = {}
    for l in locs:
        s = (l.get('StateCode') or '').strip()
        if not re.fullmatch(r'[A-Z]{2}', s): continue
        d = by_state.setdefault(s, {'total': 0, 'Postal': 0, 'Court': 0, 'County / State': 0, 'Municipal': 0, 'Library': 0, 'other': 0})
        d['total'] += 1
        t = l.get('FacilityType')
        d[t if t in d and t != 'total' else 'other'] += 1
    last_fy = max(x['Year'] for x in st)
    return {
        'issuances_fy': sorted([[x['Year'], x['Count']] for x in iss]),
        'applications_fy': sorted([[x['Year'], x['Count']] for x in app]),
        'valid_fy': sorted([[x['Year'], x['Count']] for x in val]),
        'state_issuances_fy': {'year': last_fy, 'rows': sorted([[x['State'], x['Count']] for x in st if x['Year'] == last_fy])},
        'locations_by_state': dict(sorted(by_state.items())),
        'locations_total': len(locs),
    }


def main():
    today = datetime.date.today().isoformat()
    res = {'retrieved_at': today}
    for name, fn in (('fee_chart', fee_chart), ('fee_page', fee_page), ('cfr', cfr), ('times', times), ('get_fast', get_fast),
                     ('refund', refund), ('online', online_rules), ('mail', mail_rules), ('countries', countries), ('stats', stats)):
        try:
            res[name] = fn()
            print('ok', name)
        except Exception as e:  # une source muette se signale, elle ne casse pas les autres
            res[name] = {'error': f'{type(e).__name__}: {e}'}
            print('ERREUR', name, e)
    old = json.load(open(OUT)) if os.path.exists(OUT) else {}
    json.dump(res, open(OUT, 'w'), ensure_ascii=False, indent=1)
    # Écarts avec le relevé précédent (hors date et statistiques qui bougent seules).
    changes = []
    for k in ('fee_chart', 'fee_page', 'cfr', 'times', 'get_fast', 'refund', 'online', 'mail'):
        a, b = {x: y for x, y in (old.get(k) or {}).items() if x not in ('sha256',)}, {x: y for x, y in res[k].items() if x not in ('sha256',)}
        if a != b:
            changes.append(f'### {k}\n\nAvant : `{json.dumps(a, ensure_ascii=False)}`\n\nAprès : `{json.dumps(b, ensure_ascii=False)}`\n')
    for c, v in (res.get('countries') or {}).items():
        if isinstance(v, dict) and (old.get('countries') or {}).get(c, {}).get('sha256') not in (None, v.get('sha256')):
            changes.append(f'### Pays {c} ({v["name"]})\n\nLe texte « Entry, Exit and Visa Requirements » a changé (mis à jour le {v["last_update"]}). Phrases relevées :\n\n' + '\n'.join(f'- {s}' for s in v['sentences']) + '\n')
    if '--sync-times' in sys.argv and isinstance(res['times'], dict) and res['times'].get('routine_weeks'):
        P = json.load(open(PARAMS))
        t = res['times']
        new = {'routineWeeks': t['routine_weeks'], 'expeditedWeeks': t['expedited_weeks'], 'mailInMaxWeeks': t['mail_in_max_weeks'],
               'mailOutMaxWeeks': t['mail_out_max_weeks'], 'pageUpdated': t['last_updated']}
        cur = {k: P['times'][k] for k in new}
        if cur != new and all(v is not None for v in new.values()):
            P['times'].update(new)
            P['times']['syncedAt'] = today
            json.dump(P, open(PARAMS, 'w'), ensure_ascii=False, indent=2)
            open(PARAMS, 'a').write('\n')
            changes.insert(0, f'### Délais recopiés dans params-2026.json\n\n{json.dumps(cur)} → {json.dumps(new)}\n')
            print('délais mis à jour dans params-2026.json')
    if '--report' in sys.argv:
        open(os.path.join(RAW, 'changes.md'), 'w').write('\n'.join(changes))
    print(f'{len(changes)} écart(s)')
    for c in changes: print(c)


if __name__ == '__main__':
    main()
