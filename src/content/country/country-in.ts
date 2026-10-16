import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';
import O from '../../data/official.json';

const d = (iso: string) => displayDate(iso, 'en-US');
const ARR = '2027-03-10';
const DEP = addDays(ARR, 14);
const need = requiredDate('afterVisa', 6, ARR, DEP);
const VISA = addDays(ARR, -30);
const needIfEarly = requiredDate('afterEntry', 6, VISA, VISA);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
const rec = (O as any).countries.IN;

export default definePage({
  id: 'country-in', group: 'country', order: 526, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'IN' },
  data: { country: 'IN' },
  related: ['country-ja', 'country-th', 'country-rp', 'passport-validity'],
  sources: ['countryIN', 'caApi', 'processing', 'mail'],
  en: {
    path: 'passport-validity/india', nav: 'India', card: 'Six months past the date you apply for the visa, and two blank pages.',
    title: 'Passport Validity India 2026: 6 Months From Visa Application',
    description: 'For India the State Department lists a passport valid six months past the date of the visa application and two blank pages, plus a visa or OCI card. Check it.',
    h1: 'Passport for India: six months from your visa application',
    intro: 'India counts its six months from the day you apply for the visa, which comes before the trip, and asks for two blank pages.',
    resume: `India is the one destination here whose passport rule is tied to the visa rather than to the trip. The State Department’s country page says the passport must be valid for 6 months past the date of visa application to obtain a visa, and that 2 blank passport pages are required. U.S. citizens also need a valid Indian visa or an Overseas Citizen of India (OCI) card to enter and exit. Because the application always comes before arrival, a passport valid six months after your arrival date satisfies the rule whatever day you apply: for an arrival on ${d(ARR)}, that is ${d(need)}, and the checker uses that safe date. If you apply on ${d(VISA)}, the strict minimum is ${d(needIfEarly)}. Short tourist stays use the eVisa, requested at least 4 days before arrival and not valid for land border crossings. The rule is quoted from the official country page as archived on ${d(rec.snapshot)}. A routine renewal mailed by ${d(mailBy)} returns before this arrival with the slowest published times of ${worst} days.`,
    faqs: [
      { q: 'How much validity does my passport need for an Indian visa?', a: `Six months past the date of your visa application, according to the State Department, plus two blank pages. The count starts when you apply, not when you land. Counting from your arrival date instead always meets the rule, which is why the checker uses it: ${d(need)} for an arrival on ${d(ARR)}.` },
      { q: 'Can I get an Indian eVisa on arrival?', a: 'No. The State Department says the eVisa for tourist stays under 60 days must be requested from the Indian Bureau of Immigration at least 4 days before arrival, and that eVisas are not valid for land border crossings. Longer stays and other purposes need a visa from an Indian embassy or consulate.' },
      { q: 'Where does the India passport rule come from?', a: `The validity rule appears on the India page of travel.state.gov, which refuses automated readers; the Consular Affairs data service that feeds the other country pages does not carry it. We read the latest copy of the official page kept by the Internet Archive, dated ${d(rec.snapshot)}, check it at each update, and link it as the source.` },
    ],
    body: (h) => `
<h2>A rule tied to the visa</h2>
<p>Other countries count from arrival, like ${h.a('country-th', 'Thailand')} and the ${h.a('country-ae', 'Emirates')}, or from departure, like the ${h.a('country-rp', 'Philippines')}. India counts from the visa application. Applying a month before the trip moves the strict deadline a month earlier than a count from arrival would; the checker keeps the arrival-based date, which works for any application day.</p>
<h2>Visa, OCI card and blank pages</h2>
<p>Entry and exit require a valid Indian visa or an OCI card, and the State Department warns that India may deny entry to travelers without valid documents or the correct type of visa. Two blank pages are required. Satellite phones and GPS devices are illegal in India, and stays beyond 180 days must be registered with a Foreigners Regional Registration Office within 14 days of arrival.</p>
<h2>If the passport is too short</h2>
<p>Renew before applying for the visa, since the visa is issued in the passport you present. A ${h.a('passport-renewal', 'renewal by mail')} costs ${h.usd(h.P.fees.book.adult)}; ${h.a('expedited-passport', 'expedited service')} adds ${h.usd(h.P.fees.expedite)}. With the slowest published routine times, a mailed renewal takes up to ${worst} days door to door, and the visa application can only start once the new passport is in hand, so an India trip needs more lead time than most destinations on this site.</p>`,
  },
});
