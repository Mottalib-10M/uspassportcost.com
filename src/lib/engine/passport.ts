/**
 * Moteur du site : ce que coûte un passeport américain, à qui on paie chaque montant, et quand il arrive.
 * Fonctions pures, sans réseau. Tous les montants et délais viennent de params-2026.json (grille du Département
 * d'État d'octobre 2026, 22 CFR 22.1, page des délais du 5 octobre 2026). Les tests rejouent chaque cas à la main.
 */
import P from '../../data/params-2026.json';

export type Situation = 'first' | 'teen' | 'child' | 'renew-mail' | 'renew-online' | 'lost' | 'name-change';
export type Doc = 'book' | 'card' | 'both';
export type Service = 'routine' | 'expedited' | 'agency';

export interface CostInput {
  situation: Situation;
  doc: Doc;
  service: Service;
  delivery: boolean;
  fileSearch: boolean;
}

export interface Line { key: string; amount: number; payee: 'state' | 'facility' }
export interface Cost {
  lines: Line[];
  state: number;
  facility: number;
  total: number;
  form: 'DS-11' | 'DS-82' | 'DS-5504' | 'online';
  /** Mode de paiement de la part État : chèque ou mandat, carte (en ligne, agence). */
  payState: 'check' | 'card';
  /** Ce que le moteur a dû changer à la saisie (livraison impossible sur une carte seule, etc.). */
  adjusted: string[];
}

const F = P.fees;

/** Le formulaire imposé par la situation. */
export function formFor(s: Situation): Cost['form'] {
  if (s === 'renew-mail') return 'DS-82';
  if (s === 'renew-online') return 'online';
  if (s === 'name-change') return 'DS-5504';
  return 'DS-11';
}

export const isMinor = (s: Situation) => s === 'child';
/** Un DS-11 se dépose en personne : frais d'exécution de 35 $ à la structure d'accueil. */
export const needsExecution = (s: Situation) => formFor(s) === 'DS-11';

/** Prix de la demande (part du Département d'État) selon l'âge et le document. */
export function applicationFee(s: Situation, doc: Doc): number {
  if (s === 'name-change') return F.dataCorrection;
  const who = isMinor(s) ? 'minor' : 'adult';
  return F[doc][who];
}

export function cost(x: CostInput): Cost {
  const adjusted: string[] = [];
  const form = formFor(x.situation);
  let service = x.service;
  // Renouvellement en ligne : service ordinaire seulement (page « Renew Your Passport Online »).
  if (x.situation === 'renew-online' && service !== 'routine') { service = 'routine'; adjusted.push('online-routine-only'); }
  let delivery = x.delivery;
  // Livraison 1-3 jours : livret seulement ; une carte seule part en First Class Mail.
  if (delivery && x.doc === 'card') { delivery = false; adjusted.push('no-delivery-card'); }
  // L'agence (rendez-vous) facture toujours le traitement accéléré.
  if (service === 'agency') delivery = false;
  const lines: Line[] = [];
  lines.push({ key: 'application', amount: applicationFee(x.situation, x.doc), payee: 'state' });
  if (service === 'expedited' || service === 'agency') lines.push({ key: 'expedite', amount: F.expedite, payee: 'state' });
  if (delivery) lines.push({ key: 'delivery', amount: F.delivery, payee: 'state' });
  if (x.fileSearch && form === 'DS-11') lines.push({ key: 'fileSearch', amount: F.fileSearch, payee: 'state' });
  else if (x.fileSearch) adjusted.push('file-search-ds11');
  // Exécution (22 CFR 22.1, item 1) : due pour tout DS-11 déposé en personne. En structure d'accueil elle se paie à
  // la structure ; à une agence du Département d'État, elle se paie à l'agence, donc au Département, par carte.
  if (needsExecution(x.situation)) lines.push({ key: 'execution', amount: F.execution, payee: service === 'agency' ? 'state' : 'facility' });
  const state = round2(lines.filter((l) => l.payee === 'state').reduce((a, l) => a + l.amount, 0));
  const facility = round2(lines.filter((l) => l.payee === 'facility').reduce((a, l) => a + l.amount, 0));
  const payState = form === 'online' || service === 'agency' ? 'card' : 'check';
  return { lines, state, facility, total: round2(state + facility), form, payState, adjusted };
}

const round2 = (n: number) => Math.round(n * 100) / 100;

// ---------------------------------------------------------------- dates

const DAY = 86_400_000;
export const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
export const toIso = (d: Date) => d.toISOString().slice(0, 10);
export const addDays = (iso: string, n: number) => toIso(new Date(toDate(iso).getTime() + n * DAY));
export const daysBetween = (a: string, b: string) => Math.round((toDate(b).getTime() - toDate(a).getTime()) / DAY);
export const isIso = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(toDate(s).getTime());
export function addYears(iso: string, n: number): string {
  const d = toDate(iso);
  const y = d.getUTCFullYear() + n, m = d.getUTCMonth(), day = d.getUTCDate();
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return toIso(new Date(Date.UTC(y, m, Math.min(day, last))));
}
export const addMonths = (iso: string, n: number) => {
  const d = toDate(iso);
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, 1));
  const last = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
  return toIso(new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), Math.min(d.getUTCDate(), last))));
};

const HOLIDAYS = new Set(P.holidays.dates);
export const isBusinessDay = (iso: string) => { const w = toDate(iso).getUTCDay(); return w !== 0 && w !== 6 && !HOLIDAYS.has(iso); };
/** n-ième jour ouvré après `iso` (jours fériés fédéraux de l'OPM exclus). */
export function addBusinessDays(iso: string, n: number): string {
  let d = iso, k = 0;
  while (k < n) { d = addDays(d, 1); if (isBusinessDay(d)) k++; }
  return d;
}

export interface Timeline {
  /** Étapes en jours : [min, max]. */
  mailIn: [number, number];
  processing: [number, number];
  mailOut: [number, number];
  earliest: string;
  latest: string;
  verdict: 'safe' | 'tight' | 'late' | 'agency' | 'no-trip';
  /** Jours entre le dépôt et le voyage. */
  daysToTrip: number | null;
  /** Dernier jour pour déposer en service ordinaire / accéléré et recevoir à temps dans le pire cas. */
  lastRoutine: string;
  lastExpedited: string;
  /** Service conseillé d'après les règles officielles (6 semaines, 3 semaines, 14 jours). */
  advice: 'routine' | 'expedited' | 'agency' | 'too-late-online';
  service: Service;
}

export interface TimeInput { situation: Situation; doc: Doc; service: Service; delivery: boolean; applyDate: string; travelDate?: string }

const T = P.times;
const W = (n: number) => n * 7;

/** Fourchettes de chaque étape, en jours. Le courrier n'a pas de minimum publié : 0 pour la date la plus tôt. */
export function legs(x: { situation: Situation; doc: Doc; service: Service; delivery: boolean }) {
  const online = x.situation === 'renew-online';
  const service: Service = online ? 'routine' : x.service;
  const mailIn: [number, number] = online || service === 'agency' ? [0, 0] : [0, W(T.mailInMaxWeeks)];
  const processing: [number, number] = service === 'agency' ? [0, 0] : service === 'expedited' ? [W(T.expeditedWeeks[0]), W(T.expeditedWeeks[1])] : [W(T.routineWeeks[0]), W(T.routineWeeks[1])];
  const fast = x.delivery && x.doc !== 'card' && service !== 'agency';
  const mailOut: [number, number] = service === 'agency' ? [0, 0] : fast ? [T.deliveryDays[0], T.deliveryDays[1]] : [0, W(T.mailOutMaxWeeks)];
  return { mailIn, processing, mailOut, service };
}

export function timeline(x: TimeInput): Timeline {
  const { mailIn, processing, mailOut, service } = legs(x);
  const earliest = addDays(x.applyDate, mailIn[0] + processing[0] + mailOut[0]);
  const latest = addDays(x.applyDate, mailIn[1] + processing[1] + mailOut[1]);
  const trip = x.travelDate && isIso(x.travelDate) ? x.travelDate : null;
  const daysToTrip = trip ? daysBetween(x.applyDate, trip) : null;
  // Derniers jours de dépôt pour recevoir avant le voyage dans le pire cas publié.
  const worst = (s: Service) => { const l = legs({ ...x, service: s }); return l.mailIn[1] + l.processing[1] + l.mailOut[1]; };
  const lastRoutine = trip ? addDays(trip, -worst('routine')) : '';
  const lastExpedited = trip ? addDays(trip, -worst('expedited')) : '';
  let advice: Timeline['advice'] = 'routine';
  if (daysToTrip !== null) {
    if (daysToTrip <= T.urgentDays) advice = 'agency';
    else if (daysToTrip < W(T.appointmentIfTravelWithinWeeks)) advice = 'agency';
    else if (daysToTrip < W(T.expediteIfTravelWithinWeeks)) advice = 'expedited';
    if (x.situation === 'renew-online' && daysToTrip < W(P.online.noTravelWeeks)) advice = 'too-late-online';
  }
  let verdict: Timeline['verdict'] = 'no-trip';
  if (trip) {
    if (service === 'agency') verdict = 'agency';
    else if (latest <= trip) verdict = 'safe';
    else if (earliest <= trip) verdict = 'tight';
    else verdict = 'late';
  }
  return { mailIn, processing, mailOut, earliest, latest, verdict, daysToTrip, lastRoutine, lastExpedited, advice, service };
}

// ---------------------------------------------------------------- renouvellement

export interface RenewInput {
  age: number;
  /** Âge au moment de la délivrance du passeport à renouveler. */
  ageAtIssue: number;
  issueDate: string;
  today: string;
  nameChanged: 'no' | 'with-document' | 'no-document';
  damagedOrLost: boolean;
  inUS: boolean;
  /** Jours avant le voyage (null = pas de voyage prévu). */
  daysToTrip: number | null;
}
export type Reason = 'age' | 'issued-young' | 'too-old' | 'not-in-window' | 'name' | 'damaged' | 'abroad' | 'travel-soon' | 'not-10-year';
export interface RenewResult { online: { ok: boolean; reasons: Reason[] }; mail: { ok: boolean; reasons: Reason[] }; expiry: string; route: 'online' | 'mail' | 'in-person' }

/** Date d'expiration : 10 ans si délivré à 16 ans ou plus, 5 ans avant. */
export function expiryOf(issueDate: string, ageAtIssue: number): string {
  return addYears(issueDate, ageAtIssue >= P.validity.adultFromAge ? P.validity.adultYears : P.validity.minorYears);
}

export function renewal(x: RenewInput): RenewResult {
  const expiry = expiryOf(x.issueDate, x.ageAtIssue);
  const ten = x.ageAtIssue >= P.mail.issuedAtAge;
  const mail: Reason[] = [];
  if (!ten) mail.push('issued-young');
  if (x.today > addYears(x.issueDate, P.mail.issuedWithinYears)) mail.push('too-old');
  if (x.nameChanged === 'no-document') mail.push('name');
  if (x.damagedOrLost) mail.push('damaged');
  if (!x.inUS) mail.push('abroad');
  const online: Reason[] = [];
  if (x.age < P.online.minAge) online.push('age');
  if (!ten) online.push('not-10-year');
  const opens = addYears(expiry, -P.online.expiringWithinYears);
  const closes = addYears(expiry, P.online.expiredLessThanYears);
  if (x.today < opens || x.today >= closes) online.push('not-in-window');
  if (x.nameChanged !== 'no') online.push('name');
  if (x.damagedOrLost) online.push('damaged');
  if (!x.inUS) online.push('abroad');
  if (x.daysToTrip !== null && x.daysToTrip < W(P.online.noTravelWeeks)) online.push('travel-soon');
  const route = !online.length ? 'online' : !mail.length ? 'mail' : 'in-person';
  return { online: { ok: !online.length, reasons: online }, mail: { ok: !mail.length, reasons: mail }, expiry, route };
}

// ---------------------------------------------------------------- validité par pays

import C from '../../data/countries.json';
export type Country = (typeof C.list)[number];
export const COUNTRIES: Country[] = C.list as Country[];
export const countryByCode = (code: string) => COUNTRIES.find((c) => c.code === code);

export interface ValidityResult {
  /** Date jusqu'à laquelle le passeport doit être valide (règle), et selon la recommandation si elle est plus stricte. */
  mustBeValidUntil: string;
  recommendedUntil: string | null;
  ok: boolean;
  okRecommended: boolean;
  /** Jours de marge (négatif = manque). */
  margin: number;
  /** Date limite pour déposer un renouvellement par courrier en service ordinaire et le recevoir avant le départ. */
  renewBy: string;
}

export function requiredDate(kind: string, months: number, arrival: string, departure: string): string {
  if (kind === 'afterEntry') return addMonths(arrival, months);
  if (kind === 'afterDeparture') return addMonths(departure, months);
  if (kind === 'stay') return departure;
  return arrival;
}

export function validity(country: Country, expiry: string, arrival: string, departure: string, applyDate: string): ValidityResult {
  const dep = departure < arrival ? arrival : departure;
  const must = requiredDate(country.kind, country.months, arrival, dep);
  const rec = (country as any).recommend;
  const recommendedUntil = rec === undefined ? null : rec === 'stay' ? dep : addMonths(arrival, Number(rec));
  const ok = expiry >= must;
  const okRecommended = recommendedUntil ? expiry >= recommendedUntil : ok;
  const worst = W(T.mailInMaxWeeks) + W(T.routineWeeks[1]) + W(T.mailOutMaxWeeks);
  return { mustBeValidUntil: must, recommendedUntil, ok, okRecommended, margin: daysBetween(must, expiry), renewBy: addDays(arrival, -worst) };
}

/** Remboursement des 60 $ : traitement accéléré non tenu en 15 jours ouvrés après réception en agence. */
export function refundCheck(receivedIso: string, completedIso: string) {
  const due = addBusinessDays(receivedIso, T.expediteCommitmentBusinessDays);
  return { due, eligible: completedIso > due, late: completedIso > due ? countBusinessDays(due, completedIso) : 0 };
}
export function countBusinessDays(fromIso: string, toIso_: string) {
  let n = 0, d = fromIso;
  while (d < toIso_) { d = addDays(d, 1); if (isBusinessDay(d)) n++; }
  return n;
}
