import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays, addMonths } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';

const d = (iso: string, l: 'en' | 'es' = 'en') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const ARR = '2027-04-02';
const DEP = addDays(ARR, 12);
const need = requiredDate('stay', 0, ARR, DEP);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
void addMonths;

export default definePage({
  id: 'country-ja', group: 'country', order: 519, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'JA' },
  data: { country: 'JA' },
  related: ["country-th", "country-ch", "country-vm", "passport-validity"],
  sources: ["caApi", "processing", "lostStolen"],
  en: {
    path: 'passport-validity/japan', nav: "Japan", card: "Valid for the entire stay; airlines may refuse boarding under six months.",
    title: "Passport Validity Japan 2026: Entire Stay, Airline 6 Months",
    description: "Japan requires a passport valid for your entire stay, yet airlines may refuse boarding if fewer than six months remain. Test your dates before booking.",
    h1: "Passport for Japan: the stay rule and the airline rule",
    intro: "Japan’s own requirement is simple. The catch the State Department points out is the airline check before you board.",
    resume: `For visa-free stays of up to 90 days, the State Department’s page for Japan says you must have a valid passport, should have proof of a return or onward ticket, and that your passport must be valid for the entire time you are staying in Japan. That makes the legal deadline your departure day: for a trip from ${d(ARR)} to ${d(DEP)}, a passport valid on ${d(need)}. The page adds a practical warning that is stricter than the law: airlines in Japan may not let you board if you lack the right documents for your next destination or if your passport has less than six months of validity. A passport reported lost or stolen cannot be used even if found, and Japanese authorities will likely deny entry to anyone who tries. If you need a new passport for cherry-blossom season, a routine renewal mailed by ${d(mailBy)} is safe with the slowest published times.`,
    faqs: [
      { q: "Does Japan require six months of passport validity?", a: `Japan itself requires a passport valid for the entire stay. The six months come from airlines: the State Department notes that airlines in Japan may not let you board if your passport has less than six months of validity or you lack documents for the next destination. Planning for six months avoids both problems.` },
      { q: "Can I visit Japan without a visa as a US citizen?", a: `Yes for tourist or business stays of up to 90 days, with a valid passport and proof of a return or onward ticket, according to the State Department. You cannot work on the local economy or change to another visa while in Japan; you would need to leave and apply from abroad.` },
      { q: "What if I find a passport I reported lost before a trip to Japan?", a: `Do not use it. A passport reported lost or stolen is canceled even if found later, and the State Department page for Japan says Japanese authorities will likely deny entry if you try. If it was your only passport, you need a new one before traveling.` },
    ],
    body: (h) => `
<h2>Three checks between home and Tokyo</h2>
<p>The first is at check-in in the United States, where the airline applies its own reading of the rules. The second is the airline in Japan when you fly on, which the State Department singles out for the six-month warning. The third is Japanese immigration, which applies the stay rule. A passport with eight months left passes all three; one with four months left passes immigration and may fail the airline. The checker shows the legal date, and the margin it prints tells you how far you are from the six-month comfort zone.</p>
<h2>Asia itineraries</h2>
<p>A trip combining Japan with ${h.a('country-th', 'Thailand')}, ${h.a('country-ch', 'China')} or ${h.a('country-vm', 'Vietnam')} is governed by the strictest stop: all three want six months, counted from entry for the first two and from the end of the stay for Vietnam.</p>
<h2>Renewing on time</h2>
<p>For a spring trip, the busy season adds risk; a ${h.a('passport-renewal', 'renewal')} filed in the quiet months of October to December is the calmest option. Expedited service adds ${h.usd(h.P.fees.expedite)} if you are already inside six weeks, and the Department refunds it if the expedited timeframe is missed.</p>`,
  },
});
