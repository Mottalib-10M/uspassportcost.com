import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays, addMonths } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';

const d = (iso: string, l: 'en' | 'es' = 'en') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const ARR = '2027-09-18';
const DEP = addDays(ARR, 16);
const need = requiredDate('afterDeparture', 3, ARR, DEP);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
void addMonths;

export default definePage({
  id: 'country-gm', group: 'country', order: 517, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'GM' },
  data: { country: 'GM' },
  related: ["country-fr", "country-sp", "country-gr", "passport-validity"],
  sources: ["caApi", "schengen", "processing"],
  en: {
    path: 'passport-validity/germany', nav: "Germany", card: "Three months past your Schengen exit; six months remaining recommended.",
    title: "Passport Validity Germany 2026: Three Months After Exit",
    description: "Germany uses the Schengen rule: a passport valid three months after you leave the area, six months advised. Enter your trip dates to test your own passport.",
    h1: "Passport for Germany: counted from your Schengen exit",
    intro: "For Germany the State Department gives the Schengen rule and a recommendation of six months. The exit date that counts is the last Schengen country.",
    resume: `The State Department’s page for Germany says your passport should be valid for at least three months beyond your period of stay if you plan on transiting a Schengen country, and recommends at least six months of validity remaining. Germany is in the Schengen area, so the three months count from the day you leave the last Schengen country on your route, not necessarily from your last day in Germany. For an autumn trip from ${d(ARR)} to ${d(DEP)}, the rule requires validity until ${d(need)}; the advice, until ${d(addMonths(ARR, 6))}. Both are easy to miss with a passport issued about ten years ago, since a 10-year adult book shows its expiry only on the data page. If yours falls short, a routine renewal mailed by ${d(mailBy)} is safe for this arrival with the slowest published times of ${worst} days, and expedited service shortens processing to two or three weeks.`,
    faqs: [
      { q: "Does a layover in Frankfurt require three months of passport validity?", a: `A Schengen transit is exactly the case the rule mentions: the State Department says the three months apply if you plan on transiting a Schengen country. If you only change planes and continue outside the area, check also the rule of your final destination, which may be stricter.` },
      { q: "My trip ends in Austria after Munich. Which date counts for Germany?", a: `The date you leave the Schengen area, here Austria, since both countries are members. Enter that last day as your departure date in the checker above; the three-month requirement and the six-month recommendation are then computed from the right date.` },
      { q: "Is a German visa needed for a two-week trip?", a: `Not for tourism or business stays within the Schengen limit of 90 days for U.S. citizens. Work or study requires the appropriate visa or residence permit. The passport rule still applies to every short visit: three months beyond the stay, six months recommended.` },
    ],
    body: (h) => `
<h2>Where the clock starts</h2>
<p>Germany borders nine countries, most of them in Schengen, and a trip that starts in Berlin often ends in Prague, Vienna or Amsterdam. For passport validity that changes the starting point, not the rule: three months after the final Schengen exit. Entering the real last day in the checker is the only adjustment needed.</p>
<h2>Old 10-year passports and German trips</h2>
<p>Many adults who renewed in a busy year hold passports that expire within the same season a decade later. The ${h.a('guide-when-to-renew', 'renewal calendar')} shows from which date a passport becomes too short for Schengen trips and when online renewal opens, one year before expiry.</p>
<h2>Cost of fixing it</h2>
<p>A mail renewal costs ${h.usd(h.P.fees.book.adult)}; with ${h.a('expedited-passport', 'expedited service')} and 1-3 day delivery, ${h.usd2(h.P.fees.book.adult + h.P.fees.expedite + h.P.fees.delivery)}. Within ${h.P.times.urgentDays} days of departure, only a passport agency appointment remains, with the expedite fee charged in every case.</p>
<h2>What else Germany asks at the border</h2>
<p>Besides validity, the State Department page for Germany lists two things to carry: sufficient proof of funds and a return plane ticket. For current visa rules it sends travelers to the Embassy of Germany, and for medicines it advises checking the requirements on pharmaceuticals to avoid fines and confiscation. None of these replaces the passport test: for a trip of a couple of weeks, the three-month rule and the six-month advice are what decide whether your current book is enough.</p>`,
  },
});
