import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays, addMonths } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';

const d = (iso: string, l: 'en' | 'es' = 'en') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const ARR = '2027-01-15';
const DEP = addDays(ARR, 14);
const need = requiredDate('afterEntry', 6, ARR, DEP);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
void addMonths;

export default definePage({
  id: 'country-th', group: 'country', order: 520, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'TH' },
  data: { country: 'TH' },
  related: ["country-rp", "country-ja", "country-in", "passport-validity"],
  sources: ["caApi", "processing", "mail"],
  en: {
    path: 'passport-validity/thailand', nav: "Thailand", card: "Six months beyond arrival strongly recommended; register online before you fly.",
    title: "Passport Validity Thailand 2026: Six Months From Arrival",
    description: "For Thailand the State Department strongly recommends a passport valid six months beyond your arrival date to avoid denied entry, plus online registration.",
    h1: "Passport for Thailand: six months from the day you land",
    intro: "Thailand’s six months are worded as a strong recommendation, but the reason given is denied entry, so treat them as a requirement.",
    resume: `The State Department’s page for Thailand says it strongly recommends that your passport be valid for at least six months beyond the date of your arrival in Thailand to avoid possible denied entry. The count starts on arrival day, whatever the length of the trip: landing in Bangkok on ${d(ARR)} means a passport valid until ${d(need)}. U.S. citizen tourists staying fewer than 60 days do not need a visa, but pre-arrival online registration is required, and immigration officers or airline staff may ask for an onward or return ticket or proof that you can support yourself. Overstays bring fines and, depending on their length, arrest, deportation at your own expense and a ban on returning. If your passport is short of the six months, a routine renewal mailed by ${d(mailBy)} returns in time for this arrival with the slowest published times of ${worst} days.`,
    faqs: [
      { q: "Will Thailand let me in with five months left on my passport?", a: `The State Department does not promise it. It strongly recommends six months beyond arrival precisely to avoid possible denied entry, and airlines check documents before boarding. With five months, the safe choice is to renew before the trip; the checker shows how many days you are short.` },
      { q: "Do I need a visa for a two-week trip to Thailand?", a: `No visa is required for U.S. citizen tourists staying fewer than 60 days, according to the State Department, but pre-arrival online registration is required. Business travelers, teachers, retirees and anyone staying longer than 60 days should check visa rules with the Royal Thai Embassy.` },
      { q: "What should I carry besides my passport in Thailand?", a: `The State Department strongly recommends carrying a digital or physical copy of your passport identification page and your current Thai visa, to help avoid detention by the immigration police. Officials may also ask for an onward or return ticket or proof of funds when you arrive.` },
    ],
    body: (h) => `
<h2>Arrival day is the anchor</h2>
<p>Unlike Schengen countries, Thailand does not care when you leave for this rule: six months from the day you land. A passport that expires in early July is already too short for a mid-January arrival, even for a one-week holiday. The checker counts from your arrival date and shows the margin in days.</p>
<h2>Registration and stay limits</h2>
<p>The online registration before arrival is a separate step from the passport; do it with the passport you will travel on. The 60-day limit for visa-free tourists is short compared with Japan or the Schengen area, and the State Department lists the penalties for overstaying, from fines to a ban on re-entry. Plans to teach, retire or stay longer go through the Royal Thai Embassy.</p>
<h2>Southeast Asia routes</h2>
<p>Trips that add ${h.a('country-vm', 'Vietnam')} need six months beyond the end of the Vietnamese stay and a blank visa page; ${h.a('country-ch', 'China')} wants six months remaining plus a visa. Testing the last country of the route usually covers the rest. If you need a new passport, ${h.a('passport-renewal', 'renewal by mail')} costs ${h.usd(h.P.fees.book.adult)} and ${h.a('expedited-passport', 'expedited service')} adds ${h.usd(h.P.fees.expedite)}.</p>`,
  },
});
