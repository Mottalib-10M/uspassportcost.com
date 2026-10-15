/**
 * Renouvellement : en ligne, par courrier (DS-82) ou en personne (DS-11) ? Les règles des pages « Renew Your
 * Passport Online » (30 septembre 2026) et « by Mail » (1er octobre 2026), chacune nommée quand elle bloque,
 * puis le coût de la voie retenue et la date d'expiration du passeport actuel.
 */
import { useEffect, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import Toggle from '../ui/Toggle';
import { Rows, Head, Steps, Actions, Disclaimer, DateField, box, frame, layout, fm, type Row } from './kit';
import { renewal, cost, daysBetween, addYears, addDays, isIso, type Doc } from '../../lib/engine/passport';
import { REASON_LABEL, DOC_LABEL, tx, yesNo, type L } from '../../lib/labels';
import { readParams, str, num, updateURL } from '../../lib/url-state';
import P from '../../data/params-2026.json';

declare const __BUILD_DAY__: string;

export default function RenewTool({ lang = 'en', focus = 'online', methodHref }: { lang?: L; focus?: 'online' | 'mail'; methodHref?: string }) {
  const f = fm(lang);
  const [age, setAge] = useState(38);
  const [issue, setIssue] = useState<string>(addYears(__BUILD_DAY__, -9));
  const [adultIssue, setAdultIssue] = useState('1');
  const [name, setName] = useState<'no' | 'with-document' | 'no-document'>('no');
  const [damaged, setDamaged] = useState('0');
  const [doc, setDoc] = useState<Doc>('book');
  const [trip, setTrip] = useState<string>('');
  const [today, setToday] = useState<string>(__BUILD_DAY__);
  useEffect(() => {
    const u = readParams(window.location.search);
    const d = new Date().toISOString().slice(0, 10);
    setToday(d);
    setAge(Math.max(0, Math.min(120, num(u, 'age', 38))));
    const i = str(u, 'issued', addYears(d, -9)); setIssue(isIso(i) ? i : addYears(d, -9));
    setAdultIssue(str(u, 'adult', '1') === '0' ? '0' : '1');
    const n = str(u, 'name', 'no'); if (n === 'no' || n === 'with-document' || n === 'no-document') setName(n);
    setDamaged(str(u, 'dmg', '0') === '1' ? '1' : '0');
    const dc = str(u, 'doc', 'book'); if (dc === 'book' || dc === 'card' || dc === 'both') setDoc(dc);
    const tp = str(u, 'trip', ''); setTrip(isIso(tp) ? tp : '');
  }, []);
  useEffect(() => { updateURL({ age, issued: issue, adult: adultIssue, name, dmg: damaged, doc, trip }); }, [age, issue, adultIssue, name, damaged, doc, trip]);

  const ok = isIso(issue);
  const r = renewal({ age, ageAtIssue: adultIssue === '1' ? Math.max(16, age - 10) : 15, issueDate: ok ? issue : today, today, nameChanged: name, damagedOrLost: damaged === '1', inUS: true, daysToTrip: isIso(trip) ? daysBetween(today, trip) : null });
  const sit = r.route === 'online' ? 'renew-online' : r.route === 'mail' ? 'renew-mail' : 'first';
  const c = cost({ situation: sit, doc, service: 'routine', delivery: false, fileSearch: false });
  const ROUTE = {
    online: tx(lang, 'You can renew online', 'Puede renovar en línea'),
    mail: tx(lang, 'Renew by mail with Form DS-82', 'Renueve por correo con el formulario DS-82'),
    'in-person': tx(lang, 'Apply in person with Form DS-11', 'Solicite en persona con el formulario DS-11'),
  }[r.route];
  const why = (list: string[]) => list.map((x) => REASON_LABEL[lang][x as keyof (typeof REASON_LABEL)['en']]).join('; ');
  const rows: Row[] = [
    { label: tx(lang, 'Current passport expires', 'Su pasaporte vence el'), value: f.date(r.expiry) },
    { label: tx(lang, 'Online renewal', 'Renovación en línea'), value: r.online.ok ? tx(lang, 'Eligible', 'Sí') : tx(lang, 'No', 'No') },
    { label: tx(lang, 'Renewal by mail (DS-82)', 'Por correo (DS-82)'), value: r.mail.ok ? tx(lang, 'Eligible', 'Sí') : tx(lang, 'No', 'No') },
    { label: tx(lang, 'Fee for this route', 'Costo por esta vía'), value: f.usd2(c.total), sep: true, strong: true },
  ];
  if (!r.online.ok) rows.push({ label: tx(lang, 'Why not online', 'Por qué no en línea'), value: why(r.online.reasons), muted: true });
  if (!r.mail.ok) rows.push({ label: tx(lang, 'Why not by mail', 'Por qué no por correo'), value: why(r.mail.reasons), muted: true });
  const window1 = addYears(r.expiry, -P.online.expiringWithinYears), window2 = addDays(addYears(r.expiry, P.online.expiredLessThanYears), -1);
  const steps = [
    tx(lang, `Online: 10-year passport, age ${P.online.minAge}+, expiring within ${P.online.expiringWithinYears} year or expired less than ${P.online.expiredLessThanYears} years ago (for you: ${f.date(window1)} to ${f.date(window2)}), same name, no travel for ${P.online.noTravelWeeks} weeks, routine only.`, `En línea: pasaporte de 10 años, ${P.online.minAge} años o más, que venza en menos de ${P.online.expiringWithinYears} año o vencido hace menos de ${P.online.expiredLessThanYears} (para usted: del ${f.date(window1)} al ${f.date(window2)}), mismo nombre, sin viajar en ${P.online.noTravelWeeks} semanas, solo ordinario.`),
    tx(lang, `By mail: issued within the last ${P.mail.issuedWithinYears} years, when you were ${P.mail.issuedAtAge} or older, undamaged, never reported lost, same name or a name-change document.`, `Por correo: emitido en los últimos ${P.mail.issuedWithinYears} años, cuando tenía ${P.mail.issuedAtAge} años o más, sin daños, nunca reportado perdido, mismo nombre o con el documento del cambio.`),
    tx(lang, 'Children under 16 can never renew: every child passport is a new DS-11 in person.', 'Los menores de 16 nunca renuevan: cada pasaporte de menor es un DS-11 nuevo en persona.'),
  ];
  return (
    <div className={frame} data-chrome>
      <div className="srg h-1.5" aria-hidden="true" />
      <div className={layout}>
        <form onSubmit={(e) => e.preventDefault()} className="grid content-start gap-y-5">
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <DateField id="rn-issue" label={tx(lang, 'Issue date of your passport', 'Fecha de emisión de su pasaporte')} value={issue} onChange={setIssue} min="1990-01-01" max="2026-12-31" />
            <NumberField id="rn-age" label={tx(lang, 'Your age today', 'Su edad hoy')} value={age} onChange={setAge} max={120} unit={tx(lang, 'years', 'años')} />
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <Toggle id="rn-adult" label={tx(lang, 'Issued at 16 or older?', '¿Emitido con 16 años o más?')} value={adultIssue} onChange={setAdultIssue} options={yesNo(lang)} />
            <Toggle id="rn-dmg" label={tx(lang, 'Damaged, lost or stolen?', '¿Dañado, perdido o robado?')} value={damaged} onChange={setDamaged} options={yesNo(lang)} />
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <SelectField id="rn-name" label={tx(lang, 'Name change since?', '¿Cambió de nombre?')} value={name} onChange={(v) => setName(v as any)} options={[{ value: 'no', label: 'No' }, { value: 'with-document', label: tx(lang, 'Yes, with a marriage or court document', 'Sí, con acta de matrimonio o de un juez') }, { value: 'no-document', label: tx(lang, 'Yes, without a legal document', 'Sí, sin documento legal') }]} />
            <SelectField id="rn-doc" label={tx(lang, 'Document', 'Documento')} value={doc} onChange={(v) => setDoc(v as Doc)} options={(['book', 'card', 'both'] as Doc[]).map((d) => ({ value: d, label: DOC_LABEL[lang][d] }))} />
          </div>
          <DateField id="rn-trip" label={tx(lang, 'Next trip abroad (optional)', 'Próximo viaje (opcional)')} value={trip} onChange={setTrip} min="2026-01-01" max="2029-12-31" help={focus === 'online' ? tx(lang, `Online renewal needs ${P.online.noTravelWeeks} weeks with no travel.`, `En línea hacen falta ${P.online.noTravelWeeks} semanas sin viajar.`) : undefined} />
        </form>
        <div aria-live="polite" data-resultat className={box}>
          <Head label={tx(lang, 'Your renewal route', 'Su vía de renovación')} value={ROUTE} sub={tx(lang, `${f.usd2(c.total)} in fees, routine service`, `${f.usd2(c.total)} en tarifas, servicio ordinario`)} />
          <Rows rows={rows} />
          <Steps lang={lang} steps={steps} />
          <Actions lang={lang} text={() => `${ROUTE}: ${f.usd2(c.total)}. ${tx(lang, 'Expires', 'Vence')} ${f.date(r.expiry)}.`} />
          <Disclaimer lang={lang} methodHref={methodHref} />
        </div>
      </div>
    </div>
  );
}
