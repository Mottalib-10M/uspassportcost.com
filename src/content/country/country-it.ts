import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays, addMonths } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';

const d = (iso: string) => displayDate(iso, 'en-US');
const ARR = '2027-05-08';
const DEP = addDays(ARR, 14);
const need = requiredDate('afterDeparture', 3, ARR, DEP);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
void addMonths;

export default definePage({
  id: 'country-it', group: 'country', order: 515, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'IT' },
  data: { country: 'IT' },
  related: ["country-fr", "country-uk", "country-sp", "passport-validity"],
  sources: ["caApi", "schengen", "lostStolen"],
  en: {
    path: 'passport-validity/italy', nav: "Italy", card: "Three months beyond the stay; a passport once reported lost can be refused.",
    title: "Passport Validity Italy 2026: Three Months Beyond Your Stay",
    description: "Italy requires a passport valid at least three months beyond your stay, and may refuse one ever reported lost or stolen. Check yours with your own dates.",
    h1: "Passport for Italy: three months beyond the stay",
    intro: "Italy states the Schengen rule as a requirement and adds a warning about passports that were once reported lost or stolen.",
    resume: `The State Department’s page for Italy says your passport must be valid for at least three months beyond the period of stay, the Schengen requirement, and that U.S. citizens must arrive at Italian ports of entry with a valid passport, a regulation it calls strictly enforced. It adds a warning that matters at the border: if your passport has ever been reported as lost or stolen, or is expired, Italian authorities could deny you entry and return you immediately to the United States. For a trip from ${d(ARR)} to ${d(DEP)}, the passport must still be valid on ${d(need)}. Tourist and business stays up to 90 days need no visa. If the passport you hold was reported lost and later found, it is canceled and cannot be used. A routine renewal mailed by ${d(mailBy)} covers the slowest published times of ${worst} days before this arrival.`,
    faqs: [
      { q: "Can I travel to Italy with a passport I once reported lost and then found?", a: `No. A passport reported lost or stolen is canceled and no longer valid for travel even if you find it, and the State Department warns that Italian authorities could deny entry and return you immediately to the United States. Travel on the replacement, and leave the found passport at home.` },
      { q: "How long must my passport be valid for a two-week trip to Rome?", a: `At least three months beyond the last day of your stay in the Schengen area. For a two-week trip, that means a little over three and a half months of validity on the day you land in Rome. The checker above computes the exact date from your arrival and departure.` },
      { q: "Do I need a visa for Italy as a US tourist?", a: `Not for tourism or business stays of up to 90 days, according to the State Department page for Italy. Other purposes, such as work or study, require the appropriate Italian visa obtained before departure. The 90 days are counted across all Schengen countries visited.` },
    ],
    body: (h) => `
<h2>The detail that sends travelers home</h2>
<p>Italy’s page is short, but it contains one of the bluntest sentences in the State Department’s country pages: a passport ever reported lost or stolen can mean being returned to the United States. The system records the report, not your later discovery of the passport in a coat pocket. If you are unsure whether an old passport was reported, travel on the newest one: the older book stays canceled in the records even when it looks perfectly intact.</p>
<h2>Three months in practice</h2>
<p>The rule counts from the end of the stay, so the same passport may pass for a weekend in Venice and fail for a long summer in Tuscany. Enter both dates in the checker. The State Department advises six months for its neighbors ${h.a('country-fr', 'France')} and ${h.a('country-gr', 'Greece')}; aiming for that margin in Italy avoids surprises at the airline counter.</p>
<h2>If you must renew</h2>
<p>A ${h.a('passport-renewal', 'mail renewal')} at ${h.usd(h.P.fees.book.adult)} mailed by ${h.date(mailBy)} is safe for a ${h.date(ARR)} landing; with ${h.a('expedited-passport', 'expedited service')} and 1-3 day delivery, the worst case shrinks to about five and a half weeks.</p>`,
  },
});
