/**
 * Cas de référence recalculés à la main sur la grille « United States Passport Fees, October 2026 » et la page
 * « Get Your Processing Time » du 5 octobre 2026 (4-6 semaines, 2-3 semaines, courrier jusqu'à 2 semaines dans
 * chaque sens, livraison 1-3 jours). Chaque attendu est écrit en clair, jamais recalculé par le moteur.
 */
import { describe, it, expect } from 'vitest';
import { cost, timeline, renewal, expiryOf, validity, countryByCode, addBusinessDays, refundCheck, addMonths, addYears, requiredDate } from '../src/lib/engine/passport';

const base = { doc: 'book' as const, service: 'routine' as const, delivery: false, fileSearch: false };

describe('frais (grille d’octobre 2026)', () => {
  it('premier passeport adulte, livret : 130 $ à l’État + 35 $ à la structure = 165 $', () => {
    const c = cost({ ...base, situation: 'first' });
    expect([c.state, c.facility, c.total, c.form, c.payState]).toEqual([130, 35, 165, 'DS-11', 'check']);
  });
  it('premier passeport adulte, livret + carte, accéléré, livraison 1-3 jours : 160 + 60 + 26,87 = 246,87 $ + 35 $', () => {
    const c = cost({ situation: 'first', doc: 'both', service: 'expedited', delivery: true, fileSearch: false });
    expect(c.state).toBe(246.87); expect(c.facility).toBe(35); expect(c.total).toBe(281.87);
  });
  it('carte seule adulte : 30 + 35 = 65 $ (chiffre de la page « card vs book »)', () => {
    expect(cost({ ...base, situation: 'first', doc: 'card' }).total).toBe(65);
  });
  it('enfant de moins de 16 ans : livret 100 + 35 = 135 $, carte 15 + 35 = 50 $, les deux 115 + 35 = 150 $', () => {
    expect(cost({ ...base, situation: 'child' }).total).toBe(135);
    expect(cost({ ...base, situation: 'child', doc: 'card' }).total).toBe(50);
    expect(cost({ ...base, situation: 'child', doc: 'both' }).total).toBe(150);
  });
  it('16-17 ans : tarif adulte, 165 $', () => {
    expect(cost({ ...base, situation: 'teen' }).total).toBe(165);
  });
  it('renouvellement par courrier DS-82 : 130 $ sans frais d’exécution ; accéléré + livraison : 216,87 $', () => {
    const a = cost({ ...base, situation: 'renew-mail' });
    expect([a.total, a.facility, a.form]).toEqual([130, 0, 'DS-82']);
    expect(cost({ ...base, situation: 'renew-mail', service: 'expedited', delivery: true }).total).toBe(216.87);
  });
  it('renouvellement en ligne : pas d’accéléré possible (ramené à l’ordinaire), payé par carte', () => {
    const c = cost({ ...base, situation: 'renew-online', service: 'expedited', delivery: true });
    expect(c.total).toBe(156.87); expect(c.payState).toBe('card'); expect(c.adjusted).toContain('online-routine-only');
  });
  it('livraison 1-3 jours refusée sur une carte seule', () => {
    const c = cost({ ...base, situation: 'renew-mail', doc: 'card', delivery: true });
    expect(c.total).toBe(30); expect(c.adjusted).toContain('no-delivery-card');
  });
  it('recherche de dossier : +150 $ sur un DS-11', () => {
    expect(cost({ ...base, situation: 'first', fileSearch: true }).total).toBe(315);
  });
  it('changement de nom dans l’année (DS-5504) : 0 $, 60 $ si accéléré', () => {
    expect(cost({ ...base, situation: 'name-change' }).total).toBe(0);
    expect(cost({ ...base, situation: 'name-change', service: 'expedited' }).total).toBe(60);
  });
  it('agence (voyage sous 14 jours), premier passeport : 130 + 60 + 35, tout à l’agence par carte', () => {
    const c = cost({ ...base, situation: 'first', service: 'agency' });
    expect([c.state, c.facility, c.total, c.payState]).toEqual([225, 0, 225, 'card']);
  });
});

describe('délais (page du 5 octobre 2026)', () => {
  it('ordinaire par courrier, déposé le 2026-10-15 : au plus tôt +28 j (12 nov.), au plus tard +14+42+14 = 70 j (24 déc.)', () => {
    const t = timeline({ ...base, situation: 'renew-mail', applyDate: '2026-10-15' });
    expect(t.earliest).toBe('2026-11-12'); expect(t.latest).toBe('2026-12-24');
  });
  it('accéléré avec livraison 1-3 jours : +14+1 = 15 j au plus tôt, +14+21+3 = 38 j au plus tard', () => {
    const t = timeline({ ...base, situation: 'first', service: 'expedited', delivery: true, applyDate: '2026-10-15' });
    expect(t.earliest).toBe('2026-10-30'); expect(t.latest).toBe('2026-11-22');
  });
  it('en ligne : pas de courrier aller, 28 à 56 jours', () => {
    const t = timeline({ ...base, situation: 'renew-online', applyDate: '2026-10-15' });
    expect(t.earliest).toBe('2026-11-12'); expect(t.latest).toBe('2026-12-10');
  });
  it('voyage dans 50 jours en ordinaire : serré (pire cas 70 j) ; conseil accéléré (< 6 semaines ? non : 50 j ≥ 42 j, ordinaire)', () => {
    const t = timeline({ ...base, situation: 'renew-mail', applyDate: '2026-10-15', travelDate: '2026-12-04' });
    expect(t.verdict).toBe('tight'); expect(t.advice).toBe('routine'); expect(t.lastRoutine).toBe('2026-09-25');
  });
  it('voyage dans 30 jours : conseil accéléré ; dans 20 jours : agence ; dans 10 jours : agence', () => {
    const at = (d: string) => timeline({ ...base, situation: 'first', applyDate: '2026-10-15', travelDate: d }).advice;
    expect(at('2026-11-14')).toBe('expedited'); expect(at('2026-11-04')).toBe('agency'); expect(at('2026-10-25')).toBe('agency');
  });
  it('en ligne avec un voyage sous 6 semaines : hors règle', () => {
    expect(timeline({ ...base, situation: 'renew-online', applyDate: '2026-10-15', travelDate: '2026-11-20' }).advice).toBe('too-late-online');
  });
  it('voyage au 2027-02-01 en ordinaire déposé le 2026-10-15 : sûr', () => {
    expect(timeline({ ...base, situation: 'first', applyDate: '2026-10-15', travelDate: '2027-02-01' }).verdict).toBe('safe');
  });
});

describe('renouvellement : en ligne, courrier ou en personne', () => {
  const r = { age: 40, ageAtIssue: 31, issueDate: '2017-03-01', today: '2026-10-15', nameChanged: 'no' as const, damagedOrLost: false, inUS: true, daysToTrip: null };
  it('livret de 2017 (expire le 2027-03-01) : dans la fenêtre d’un an, en ligne', () => {
    const x = renewal(r);
    expect(x.expiry).toBe('2027-03-01'); expect(x.route).toBe('online');
  });
  it('livret valable jusqu’en 2030 : trop tôt pour l’en ligne (fenêtre d’un an), courrier possible', () => {
    const x = renewal({ ...r, issueDate: '2020-01-01' });
    expect(x.online.reasons).toContain('not-in-window'); expect(x.route).toBe('mail');
  });
  it('délivré il y a plus de 15 ans : en personne (DS-11)', () => {
    expect(renewal({ ...r, issueDate: '2011-01-10' }).route).toBe('in-person');
  });
  it('24 ans : pas en ligne (25 ans minimum), courrier possible', () => {
    const x = renewal({ ...r, age: 24, ageAtIssue: 16, issueDate: '2018-06-01' });
    expect(x.online.reasons).toContain('age'); expect(x.route).toBe('mail');
  });
  it('passeport d’enfant (délivré à 12 ans) : ni en ligne ni par courrier', () => {
    expect(renewal({ ...r, age: 18, ageAtIssue: 12, issueDate: '2020-05-01' }).route).toBe('in-person');
  });
  it('changement de nom avec acte : courrier, pas en ligne', () => {
    expect(renewal({ ...r, nameChanged: 'with-document' }).route).toBe('mail');
  });
  it('voyage dans 30 jours : pas en ligne', () => {
    expect(renewal({ ...r, daysToTrip: 30 }).online.reasons).toContain('travel-soon');
  });
  it('validité : 10 ans à 16 ans et plus, 5 ans avant (29 février → 28 février)', () => {
    expect(expiryOf('2024-02-29', 30)).toBe('2034-02-28');
    expect(expiryOf('2022-07-15', 15)).toBe('2027-07-15');
  });
});

describe('validité par pays (fiches Consular Affairs relues le 2026-10-15)', () => {
  it('Pérou : 6 mois après l’entrée ; arrivée 2027-01-10 → valide jusqu’au 2027-07-10 au moins', () => {
    const v = validity(countryByCode('PE')!, '2027-06-30', '2027-01-10', '2027-01-20', '2026-10-15');
    expect(v.mustBeValidUntil).toBe('2027-07-10'); expect(v.ok).toBe(false); expect(v.margin).toBe(-10);
  });
  it('France : 3 mois après le départ, 6 mois conseillés à l’arrivée', () => {
    const v = validity(countryByCode('FR')!, '2027-05-01', '2027-01-10', '2027-01-24', '2026-10-15');
    expect(v.mustBeValidUntil).toBe('2027-04-24'); expect(v.ok).toBe(true);
    expect(v.recommendedUntil).toBe('2027-07-10'); expect(v.okRecommended).toBe(false);
  });
  it('Japon : toute la durée du séjour ; Mexique : à l’entrée', () => {
    expect(requiredDate('stay', 0, '2027-03-01', '2027-03-12')).toBe('2027-03-12');
    expect(requiredDate('entry', 0, '2027-03-01', '2027-03-12')).toBe('2027-03-01');
  });
  it('Vietnam : 6 mois après la fin du séjour', () => {
    expect(validity(countryByCode('VM')!, '2027-09-01', '2027-02-01', '2027-02-20', '2026-10-15').mustBeValidUntil).toBe('2027-08-20');
  });
  it('Philippines : 6 mois après la fin du séjour prévu (page pays, copie archivée)', () => {
    const v = validity(countryByCode('RP')!, '2027-08-31', '2027-02-12', '2027-03-05', '2026-10-16');
    expect(v.mustBeValidUntil).toBe('2027-09-05'); expect(v.ok).toBe(false); expect(v.margin).toBe(-5);
  });
  it('Inde : 6 mois après la demande de visa, comptés au plus tard depuis l’arrivée', () => {
    expect(requiredDate('afterVisa', 6, '2027-03-10', '2027-03-24')).toBe('2027-09-10');
    expect(validity(countryByCode('IN')!, '2027-09-10', '2027-03-10', '2027-03-24', '2026-10-16').ok).toBe(true);
  });
  it('mois de fin plus court : 31 août + 6 mois = 28 février', () => {
    expect(addMonths('2026-08-31', 6)).toBe('2027-02-28'); expect(addYears('2028-02-29', 1)).toBe('2029-02-28');
  });
});

describe('remboursement des 60 $ (15 jours ouvrés, fériés OPM)', () => {
  it('reçu le jeudi 2026-11-19 : 15 jours ouvrés, Thanksgiving (26 nov.) exclu → 2026-12-11', () => {
    expect(addBusinessDays('2026-11-19', 15)).toBe('2026-12-11');
  });
  it('terminé le 2026-12-15 : 2 jours ouvrés de retard, remboursable', () => {
    const r = refundCheck('2026-11-19', '2026-12-15');
    expect(r.eligible).toBe(true); expect(r.late).toBe(2);
  });
  it('terminé le jour dû : pas de remboursement', () => {
    expect(refundCheck('2026-11-19', '2026-12-11').eligible).toBe(false);
  });
});
