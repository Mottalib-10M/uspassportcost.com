import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays, addMonths } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';

const d = (iso: string, l: 'en' | 'es' = 'en') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const ARR = '2027-02-10';
const DEP = addDays(ARR, 7);
const need = requiredDate('afterEntry', 6, ARR, DEP);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
void addMonths;

export default definePage({
  id: 'country-ae', group: 'country', order: 522, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'AE' },
  data: { country: 'AE' },
  related: ["country-tu", "country-th", "country-gr", "passport-validity"],
  sources: ["caApi", "processing", "limited"],
  en: {
    path: 'passport-validity/united-arab-emirates', nav: "United Arab Emirates", card: "Six months beyond entry; emergency passports refused; free 30-day visa on arrival.",
    title: "Passport Validity Dubai and UAE 2026: Six Months Past Entry",
    description: "The United Arab Emirates require a passport valid six months beyond the date of entry and refuse 12-page emergency passports. Check your own Dubai dates.",
    h1: "Passport for the UAE: six months beyond the date of entry",
    intro: "The Emirates make the six months a requirement, not advice, and reject two kinds of U.S. passports outright.",
    resume: `The State Department’s page for the United Arab Emirates says a passport valid for at least six months beyond the date of entry is required to enter the UAE. For a stopover or holiday landing on ${d(ARR)}, that means a passport valid until ${d(need)}. The same page lists two passports the UAE government does not accept: the 12-page emergency passport, and passports with the “X” sex marker, whose holders will be denied boarding or entry, including in transit. For personal travel of 30 days or less, a U.S. citizen with a regular passport with an M or F marker may obtain a no-fee visitor visa on arrival; longer stays can be extended at the discretion of immigration officials, and work or study needs the appropriate visa. A renewal for this trip, mailed by ${d(mailBy)}, returns in time with the slowest published routine times of ${worst} days.`,
    faqs: [
      { q: "Does a Dubai layover need six months on my passport?", a: `The State Department says the UAE requires six months beyond the date of entry to enter the country, and that passports it does not accept are refused even for travel through the UAE. If your connection keeps you airside, the airline still checks documents; with less than six months, renew before relying on a stopover.` },
      { q: "Can I enter the UAE on an emergency passport?", a: `No. The State Department page says the UAE government does not accept 12-page emergency passports for entry, and travelers holding one will be denied boarding or entry. If you lose your passport abroad and receive an emergency one, plan a route home that avoids entering the Emirates.` },
      { q: "Do Americans pay for a UAE tourist visa?", a: `For personal travel of 30 days or less, a U.S. citizen with a regular passport bearing an M or F marker may obtain a no-fee visitor visa on arrival, according to the State Department. Extensions beyond 30 days are at the discretion of immigration officials, and work or study requires the appropriate visa.` },
    ],
    body: (h) => `
<h2>A firm six months</h2>
<p>Many pages use the words “we recommend”. The UAE page says “required”. The checker treats it as the rule and counts six months from your arrival date, which is why a passport expiring in early August is already too short for a February trip. A short stopover changes nothing in that arithmetic.</p>
<h2>Passports the UAE will not take</h2>
<p>An emergency passport issued abroad, the purple 12-page document, is refused for entry; so are passports with the “X” marker, for travel to, in or through the country. Both rules affect route planning rather than the calendar: a traveler with either document should book connections elsewhere. A limited-validity passport issued in an emergency is meant to be ${h.src('limited', 'replaced with a full one')} once you are home.</p>
<h2>Combining the Gulf with other trips</h2>
<p>Routes through Dubai often continue to Asia or Europe. ${h.a('country-th', 'Thailand')} also counts six months from arrival, ${h.a('country-tu', 'Türkiye')} adds a page-space condition, and a Schengen destination counts three months after you leave. When the passport needs replacing, ${h.a('expedited-passport', 'expedited service')} at ${h.usd(h.P.fees.expedite)} brings the worst case down to about five and a half weeks with 1-3 day delivery.</p>`,
  },
});
