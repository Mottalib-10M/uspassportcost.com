import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays, addMonths } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';

const d = (iso: string) => displayDate(iso, 'en-US');
const ARR = '2027-06-02';
const DEP = addDays(ARR, 12);
const need = requiredDate('afterDeparture', 3, ARR, DEP);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
void addMonths;

export default definePage({
  id: 'country-fr', group: 'country', order: 514, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'FR' },
  data: { country: 'FR' },
  related: ["country-it", "country-sp", "country-gm", "passport-validity"],
  sources: ["caApi", "schengen", "lostStolen"],
  en: {
    path: 'passport-validity/france', nav: "France", card: "Three months after you leave the Schengen area; six months advised.",
    title: "Passport Validity France 2026: 3 Months After You Leave",
    description: "France follows the Schengen rule: your passport must be valid three months after you leave, and six months remaining is advised. Test yours with your dates.",
    h1: "Passport for France: the three-month Schengen count",
    intro: "France applies the Schengen rule, which counts from the day you leave the area, and the State Department advises more.",
    resume: `For France, the State Department says your passport should be valid for at least three months beyond the period of stay in the Schengen area, and it recommends at least six months of validity remaining. The three months run from the day you leave the last Schengen country, which may not be France: for a trip from ${d(ARR)} to ${d(DEP)} ending in Paris, the passport must still be valid on ${d(need)}, and the six-month advice moves that to ${d(addMonths(ARR, 6))}. The page also warns that France does not recognize the 12-page emergency passport issued by U.S. embassies and consulates for visa-free entry, so a passport lost abroad and replaced in an emergency may not get you in. Tourist and business stays up to 90 days need no visa. To be safe with the slowest published times of ${worst} days, a routine renewal for this trip should be mailed by ${d(mailBy)}.`,
    faqs: [
      { q: "How many months do I need on my passport to visit Paris?", a: `At least three months beyond the day you plan to leave the Schengen area, under the rule the State Department cites for France, and it recommends six months remaining. The checker shows both dates for your trip, so you can see whether only the advice or also the rule is missed.` },
      { q: "Can I enter France on an emergency passport?", a: `Not for visa-free entry. The State Department says the government of France does not recognize the 12-page emergency passport issued by U.S. embassies and consulates abroad, and that travelers using one may be refused boarding or entry. Direct transit through France to a country that accepts it may be permitted.` },
      { q: "Does a stay in Spain before Paris change the French deadline?", a: `Yes. The three months are counted from the day you leave the Schengen area as a whole, so the last Schengen country on your route sets the clock. A trip that ends in Spain or Italy after Paris pushes the required date later than your French departure.` },
    ],
    body: (h) => `
<h2>Counting from the exit, not the arrival</h2>
<p>The Schengen rule is easy to misread as “three months left when I arrive”. It is three months after you leave the area. For a twelve-day trip, that is roughly three and a half months of validity on arrival day; for a long summer through several countries, it can be close to six. The checker uses your real departure date, so a multi-country trip should be entered with the day you fly out of the last Schengen country.</p>
<h2>Why the State Department advises six months</h2>
<p>The advice covers the cases the rule does not: airlines that refuse boarding on a stricter reading, a delayed return, a connection through a country with its own six-month rule. Meeting the advice for France also meets the rule of every other Schengen country on this site, including ${h.a('country-gm', 'Germany')} and ${h.a('country-gr', 'Greece')}.</p>
<h2>Losing a passport in France</h2>
<p>Because France refuses the emergency passport for visa-free entry, a lost passport is especially costly on a multi-stop trip. Report it at once; at home, the ${h.a('lost-or-stolen-passport', 'replacement')} is a new application in person at ${h.usd(h.P.fees.book.adult + h.P.fees.execution)}.</p>`,
  },
});
