import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays, addMonths } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';

const d = (iso: string, l: 'en' | 'es' = 'en') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const ARR = '2027-06-20';
const DEP = addDays(ARR, 10);
const need = requiredDate('afterDeparture', 3, ARR, DEP);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
void addMonths;

export default definePage({
  id: 'country-gr', group: 'country', order: 518, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'GR' },
  data: { country: 'GR' },
  related: ["country-it", "country-tu", "country-fr", "passport-validity"],
  sources: ["caApi", "schengen", "processing"],
  en: {
    path: 'passport-validity/greece', nav: "Greece", card: "Greek law: three months after departure; six months recommended for transits.",
    title: "Passport Validity Greece 2026: 3 Months by Law, 6 Advised",
    description: "Greek law wants three months of passport validity after your departure, but the State Department advises six months for entry and transits. Check your dates.",
    h1: "Passport for Greece: the law and the advice",
    intro: "Greece is the clearest case of two numbers: what the law requires and what the State Department tells travelers to carry.",
    resume: `The State Department’s page for Greece says that, for entry into Greece, your passport should have at least six months of remaining validity, while noting that Greek law itself requires three months of validity beyond the intended date of your departure. The gap matters when a trip includes a transit: if you pass through a country that requires six months, you may not be permitted to continue, which is why the Department recommends six months to avoid disruptions. For an island trip from ${d(ARR)} to ${d(DEP)}, the legal minimum is a passport valid until ${d(need)}, and the recommended margin reaches ${d(addMonths(ARR, 6))}. Greece is in the Schengen area, so the three months count from your exit from the area. A routine renewal mailed by ${d(mailBy)} covers the slowest published times of ${worst} days before this arrival.`,
    faqs: [
      { q: "Is it three or six months of passport validity for Greece?", a: `Both numbers appear. Greek law requires three months beyond your intended departure, and the State Department recommends six months of remaining validity for entry. Meeting the law is enough to be admitted; meeting the advice protects you on connections through countries with a six-month rule.` },
      { q: "Can a connection through Istanbul affect my trip to Greece?", a: `It can. Türkiye’s own page asks for passports valid six months beyond the entry date, and the Greece page warns that a transit country requiring six months may stop you continuing. Check every country on the itinerary, not only Greece, before you rely on three months.` },
      { q: "Do Greek islands follow different passport rules from Athens?", a: `No. The rule is national and the islands are part of Greece and of the Schengen area. What changes on an island trip is usually the length of the stay and the number of ferry legs, so enter the real last day before you leave the Schengen area.` },
    ],
    body: (h) => `
<h2>Two dates on the same passport</h2>
<p>The checker above prints both: the legal date, three months after your exit, and the recommended date, six months after your arrival. For a short summer stay the two are only a few weeks apart; for a long one they can be months apart in the other direction, since the legal count moves with your departure while the advice is anchored to arrival.</p>
<h2>Itineraries that start or end elsewhere</h2>
<p>Many visitors reach Greece by way of Istanbul, Rome or a Gulf hub. Each country on the route applies its own rule, and the strictest one wins for the whole trip. ${h.a('country-tu', 'Türkiye')} and ${h.a('country-ae', 'the United Arab Emirates')} both want six months beyond entry if you actually enter, which is the scenario the Greece page warns about. ${h.a('country-it', 'Italy')} applies the Schengen three months.</p>
<h2>When to renew for a Greek summer</h2>
<p>June and July departures fall inside the State Department’s busy season. A passport that will be under six months at arrival is worth renewing in the autumn or winter before, when the Department says demand is lower. The renewal costs ${h.usd(h.P.fees.book.adult)} by mail or online; the ${h.a('guide-best-time', 'best-time guide')} shows how the months compare.</p>`,
  },
});
