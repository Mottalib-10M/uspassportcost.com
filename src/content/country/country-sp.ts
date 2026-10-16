import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays, addMonths } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';

const d = (iso: string, l: 'en' | 'es' = 'en') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const ARR = '2027-07-01';
const DEP = addDays(ARR, 20);
const need = requiredDate('afterDeparture', 3, ARR, DEP);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
void addMonths;

export default definePage({
  id: 'country-sp', group: 'country', order: 516, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'SP' },
  data: { country: 'SP' },
  related: ["country-fr", "country-it", "country-uk", "passport-validity"],
  sources: ["caApi", "schengen", "processing"],
  en: {
    path: 'passport-validity/spain', nav: "Spain", card: "Three months beyond the stay if you transit Schengen; six months remaining advised.",
    title: "Passport Validity Spain 2026: 3 Months Plus a 6-Month Tip",
    description: "Spain applies the Schengen rule: three months of passport validity beyond your stay, and the State Department advises six months. Test your own passport.",
    h1: "Passport for Spain: three months, six recommended",
    intro: "Spain counts the Schengen months from the end of your stay. The 90-day limit on visits is counted across the whole area too.",
    resume: `The State Department’s page for Spain says your passport should be valid for at least three months beyond your period of stay if you plan on transiting a Schengen country, and recommends at least six months of validity remaining. For a three-week summer trip from ${d(ARR)} to ${d(DEP)}, the rule asks for a passport valid until ${d(need)} and the advice until ${d(addMonths(ARR, 6))}. The Schengen limit of 90 days for visits without a visa is counted across every Schengen country together: days spent in Portugal or France before Madrid use the same allowance. A passport that fails the rule should be renewed well ahead: mailed by ${d(mailBy)}, a routine renewal comes back before this arrival even in the slowest published case of ${worst} days. An eligible adult who will not travel for six weeks can renew online for the same fee.`,
    faqs: [
      { q: "Is the six-month passport rule for Spain a requirement?", a: `No, it is a recommendation. The requirement the State Department cites is three months beyond your period of stay in the Schengen area; the six months remaining are advised to avoid problems. The checker shows the rule and the advice separately, so you can see which one your passport misses.` },
      { q: "Do days in Portugal count toward my 90 days in Spain?", a: `Yes. The 90-day limit for visits without a visa applies to the Schengen area as a whole, and Spain and Portugal are both in it. A trip of 50 days in Portugal followed by 50 days in Spain exceeds the allowance even though neither country alone reached 90.` },
      { q: "When should I renew my passport for a summer trip to Spain?", a: `Work back from the arrival date: the slowest published routine path, mail both ways plus six weeks of processing, takes about ten weeks. For an early July arrival that means mailing a routine renewal in April at the latest, or paying for expedited service closer to the date.` },
    ],
    body: (h) => `
<h2>The calendar behind a summer in Spain</h2>
<p>Summer trips to Spain are often long, and the Schengen count follows the departure date. A passport that expires in early October is fine for a week in Seville in June and too short for a month that ends in late July. The checker works with your own two dates and gives the margin in days, positive or negative.</p>
<h2>Several countries, one clock</h2>
<p>Two clocks run on a Schengen trip: the 90 days of presence, shared by all members, and the passport validity measured from the last exit. A route Madrid, Lisbon, Paris ends in France, so the three months start there; check ${h.a('country-fr', 'France')} with the same dates. Outside Schengen, ${h.a('country-uk', 'the United Kingdom')} and ${h.a('country-ei', 'Ireland')} have their own, looser rules.</p>
<h2>Renewing before the peak</h2>
<p>The State Department says its busiest season runs from late winter into summer, which is exactly when Spain trips are booked. A ${h.a('passport-renewal', 'renewal')} at ${h.usd(h.P.fees.book.adult)} filed in the autumn quiet months avoids the rush, and leaves time to expedite later if the application is held up by a photo or a missing document. If you also need a Spanish visa for study or work, the visa has to be placed in a passport with enough validity, so renew before you book the consulate appointment rather than after.</p>`,
  },
});
