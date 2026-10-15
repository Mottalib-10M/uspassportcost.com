import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays, addMonths } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';

const d = (iso: string, l: 'en' | 'es' = 'en') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const ARR = '2027-05-01';
const DEP = addDays(ARR, 10);
const need = requiredDate('afterEntry', 6, ARR, DEP);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
void addMonths;

export default definePage({
  id: 'country-tu', group: 'country', order: 521, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'TU' },
  data: { country: 'TU' },
  related: ["country-gr", "country-ae", "country-it", "passport-validity"],
  sources: ["caApi", "processing", "mail"],
  en: {
    path: 'passport-validity/turkey', nav: "Türkiye (Turkey)", card: "Six months beyond the entry date, and room for entry and exit stamps.",
    title: "Passport Validity Türkiye 2026: Six Months and Stamp Space",
    description: "Türkiye requires a passport valid six months beyond your entry date and enough space for entry and exit stamps. Check your trip and renewal dates here.",
    h1: "Passport for Türkiye: six months and free pages",
    intro: "Türkiye adds a page condition to the six-month rule: no space for the stamps, no entry.",
    resume: `The State Department’s page for Türkiye says passports must be valid for six months beyond your entry date, and that you will be denied entry if there is not enough space for entry and exit stamps in your passport. For a trip landing in Istanbul on ${d(ARR)}, the passport must therefore be valid until ${d(need)}, whatever the length of the stay. Ordinary passport holders are exempt from a visa for up to 90 days in any 180-day period, while official passport holders need a visa. Travelers must get an entry stamp to fly domestically and an exit stamp when leaving, or face difficulties and a fine on a later visit. If your passport is short of six months or nearly full, a renewal is the fix: mailed by ${d(mailBy)}, a routine renewal comes back before this arrival even with the slowest published times of ${worst} days.`,
    faqs: [
      { q: "How many months do I need on my passport for Istanbul?", a: `Six months beyond your entry date into Türkiye, according to the State Department. The count starts on the day you arrive, so a one-week trip and a three-week trip have the same deadline. The checker computes that date from your arrival and shows your margin.` },
      { q: "My passport is almost full. Can I still enter Türkiye?", a: `Only if there is enough space for the entry and exit stamps; the State Department says travelers without that space will be denied entry. Adults who travel often can ask for a larger passport book with more visa pages, at no extra cost, when they renew.` },
      { q: "Do I need a visa for Türkiye with a US passport?", a: `Not with an ordinary passport for stays of up to 90 days in any 180-day period, according to the State Department page. Official passport holders need a visa, and anyone planning to work, study or do research must obtain the right visa from a Turkish embassy or consulate before arriving.` },
    ],
    body: (h) => `
<h2>Stamps are part of the rule</h2>
<p>Few country pages make page space a condition of entry, and Türkiye is one of them. Entry and exit stamps matter beyond the border too: the page says you need the entry stamp to fly domestically, and that leaving without an exit stamp can cause trouble and a fine the next time you visit. Check the last pages of your book before you go.</p>
<h2>Six months from entry</h2>
<p>The six months run from arrival, like ${h.a('country-ae', 'the United Arab Emirates')} and unlike the Schengen countries, which count three months after you leave. A route that continues to ${h.a('country-gr', 'Greece')} must pass both tests; usually Türkiye is the stricter one.</p>
<h2>A larger book at renewal</h2>
<p>If the issue is space rather than time, a renewal is still the way to get a new book. When renewing by mail on Form DS-82, the State Department lets frequent travelers tick the large-book box for more visa pages at no extra cost; the fee stays ${h.usd(h.P.fees.book.adult)}. The ${h.a('passport-renewal', 'renewal checker')} tells you whether you can renew by mail or must apply in person.</p>`,
  },
});
