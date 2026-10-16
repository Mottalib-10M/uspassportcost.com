/**
 * Les paramètres relus à la main (params-2026.json) doivent concorder avec le dernier relevé machine des pages
 * officielles (official.json, scripts/fetch-official.py). Un écart = la source a changé : le test échoue, la GitHub
 * Action « watch » ouvre une issue, et le site garde ses valeurs tant qu'une personne ne les a pas relues.
 */
import { describe, it, expect } from 'vitest';
import P from '../src/data/params-2026.json';
import O from '../src/data/official.json';
import C from '../src/data/countries.json';

const o = O as any;

describe('frais : grille PDF, page Passport Fees et 22 CFR 22.1', () => {
  it('grille PDF lue et édition attendue', () => {
    expect(o.fee_chart.error).toBeUndefined();
    expect(o.fee_chart.edition).toBe(P.feeChartEdition);
  });
  it('livret, carte, les deux : adultes, renouvellement, mineurs', () => {
    const ch = o.fee_chart;
    expect([ch.adult_first.Book.app, ch.adult_first['Card*'].app, ch.adult_first['Book & Card'].app]).toEqual([P.fees.book.adult, P.fees.card.adult, P.fees.both.adult]);
    expect([ch.adult_renew.Book.app, ch.adult_renew['Card*'].app, ch.adult_renew['Book & Card'].app]).toEqual([P.fees.book.adult, P.fees.card.adult, P.fees.both.adult]);
    expect([ch.minor.Book.app, ch.minor['Card*'].app, ch.minor['Book & Card'].app]).toEqual([P.fees.book.minor, P.fees.card.minor, P.fees.both.minor]);
    expect(ch.adult_first.Book.exec).toBe(P.fees.execution);
    expect(ch.adult_renew.Book.form).toBe('DS-82');
  });
  it('options : accéléré, livraison 1-3 jours, recherche de dossier (PDF et page)', () => {
    for (const src of [o.fee_chart, o.fee_page]) {
      expect(src.expedite).toBe(P.fees.expedite);
      expect(src.delivery).toBe(P.fees.delivery);
      expect(src.file_search).toBe(P.fees.fileSearch);
    }
    expect(o.fee_page.execution).toBe(P.fees.execution);
    expect(o.fee_page.check_payee).toBe('U.S. Department of State');
  });
  it('22 CFR 22.1 : 50 + 80 = 130 et 20 + 80 = 100', () => {
    const c = o.cfr;
    expect([c.book_16_plus, c.book_under_16, c.security_surcharge, c.execution, c.expedite, c.file_search, c.card_16_plus, c.card_under_16])
      .toEqual([P.feeLaw.bookApplication16Plus, P.feeLaw.bookApplicationUnder16, P.feeLaw.securitySurcharge, P.feeLaw.execution, P.feeLaw.expedite, P.feeLaw.fileSearch, P.feeLaw.card16Plus, P.feeLaw.cardUnder16]);
    expect(P.feeLaw.bookApplication16Plus + P.feeLaw.securitySurcharge).toBe(P.fees.book.adult);
    expect(P.feeLaw.bookApplicationUnder16 + P.feeLaw.securitySurcharge).toBe(P.fees.book.minor);
  });
});

describe('délais et règles publiés', () => {
  it('délais de traitement et de courrier', () => {
    const t = o.times;
    expect(t.routine_weeks).toEqual(P.times.routineWeeks);
    expect(t.expedited_weeks).toEqual(P.times.expeditedWeeks);
    expect([t.mail_in_max_weeks, t.mail_out_max_weeks, t.urgent_days]).toEqual([P.times.mailInMaxWeeks, P.times.mailOutMaxWeeks, P.times.urgentDays]);
  });
  it('visa étranger 28 jours, accéléré sous 6 semaines, engagement 15 jours ouvrés', () => {
    expect(o.get_fast.visa_days).toBe(P.times.urgentVisaDays);
    expect(o.get_fast.expedite_if_travel_within_weeks).toBe(P.times.expediteIfTravelWithinWeeks);
    expect(o.refund.expedite_commitment_business_days).toBe(P.times.expediteCommitmentBusinessDays);
  });
  it('renouvellement en ligne et par courrier', () => {
    expect([o.online.min_age, o.online.expiring_within_years, o.online.expired_less_than_years, o.online.no_travel_weeks, o.online.can_expedite])
      .toEqual([P.online.minAge, P.online.expiringWithinYears, P.online.expiredLessThanYears, P.online.noTravelWeeks, P.online.canExpedite]);
    expect([o.mail.issued_within_years, o.mail.issued_at_age, o.mail.appointment_if_travel_within_weeks]).toEqual([P.mail.issuedWithinYears, P.mail.issuedAtAge, P.times.appointmentIfTravelWithinWeeks]);
  });
});

describe('pays : chaque citation est dans la fiche officielle', () => {
  for (const c of C.list) {
    it(`${c.code} ${c.name.en}`, () => {
      const rec = o.countries[c.code];
      expect(rec, c.code).toBeTruthy();
      expect(rec.sha256).toMatch(/^[0-9a-f]{64}$/);
      const norm = (x: string) => x.replace(/[’']/g, "'").replace(/\s+/g, ' ').replace(/\s+([.,])/g, '$1').trim();
      for (const q of c.quote) expect(norm(rec.text), q).toContain(norm(q));
    });
  }
});

describe('pays lus sur la copie archivée de la page officielle (Philippines, Inde)', () => {
  for (const c of C.list.filter((x: any) => x.source === 'archive')) {
    it(`${c.code} : copie web.archive.org datée de la page travel.state.gov`, () => {
      const rec = o.countries[c.code];
      expect(rec.source).toBe('archive');
      expect(rec.archive_url).toMatch(/^https:\/\/web\.archive\.org\/web\/\d{14}\/https:\/\/travel\.state\.gov\//);
      expect(rec.snapshot).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(rec.api_sha256).toMatch(/^[0-9a-f]{64}$/);
    });
  }
});

