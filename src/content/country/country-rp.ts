import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';
import O from '../../data/official.json';

const d = (iso: string) => displayDate(iso, 'en-US');
const ARR = '2027-02-12';
const DEP = addDays(ARR, 21);
const need = requiredDate('afterDeparture', 6, ARR, DEP);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
const rec = (O as any).countries.RP;

export default definePage({
  id: 'country-rp', group: 'country', order: 525, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'RP' },
  data: { country: 'RP' },
  related: ['country-vm', 'country-th', 'country-ja', 'passport-validity'],
  sources: ['countryPH', 'caApi', 'processing', 'mail'],
  en: {
    path: 'passport-validity/philippines', nav: 'Philippines', card: 'Six months beyond the end of your planned stay, and room for the entry stamp.',
    title: 'Passport Validity Philippines 2026: 6 Months After Your Stay',
    description: 'For the Philippines the State Department lists a passport valid six months beyond the end of your planned stay, with space for the entry stamp. Check yours.',
    h1: 'Passport for the Philippines: six months beyond the end of your stay',
    intro: 'The Philippines counts its six months from the day your planned stay ends, not from arrival, so a longer trip needs a longer passport.',
    resume: `The State Department’s country page for the Philippines states the passport rule in its Quick Facts box: validity of 6 months beyond the end of your planned stay, and sufficient space for an entry visa stamp. The count starts on your planned departure date, so a three-week trip from ${d(ARR)} to ${d(DEP)} needs a passport valid until ${d(need)}. The same box says a tourist visa is not required for tourist travel under 30 days. The Consular Affairs data service, whose Philippines entry was updated on ${d(rec.last_update)}, does not carry the validity rule, so this page quotes the official country page as archived on ${d(rec.snapshot)}, the latest readable copy. Overstaying the “admit until” date stamped by immigration can bring fines or detention. If your passport falls short, a routine renewal mailed by ${d(mailBy)} returns before this arrival with the slowest published times of ${worst} days.`,
    faqs: [
      { q: 'How many months of passport validity do I need for the Philippines?', a: `Six months beyond the end of your planned stay, according to the State Department’s country page. The count runs from the day you plan to leave, not the day you land: for a stay ending ${d(DEP)}, the passport must be valid until ${d(need)}. The page also asks for enough space for an entry visa stamp.` },
      { q: 'Do I need a visa for a short trip to the Philippines?', a: 'The State Department’s Quick Facts for the Philippines say a tourist visa is not required for tourist travel under 30 days. Longer stays, work, retirement visas and exit clearances are handled by the Philippine Bureau of Immigration and other agencies, which the State Department refers you to.' },
      { q: 'Where does the Philippines passport rule come from?', a: `The Philippines rule appears in the Quick Facts box of travel.state.gov, which refuses automated readers, and the Consular Affairs data service that feeds the other country pages does not carry it. We read the latest copy of the official page kept by the Internet Archive, dated ${d(rec.snapshot)}, check it at each update, and link it as the source.` },
    ],
    body: (h) => `
<h2>Departure day is the anchor</h2>
<p>Like ${h.a('country-vm', 'Vietnam')}, and unlike ${h.a('country-th', 'Thailand')}, the Philippines counts six months from the end of the planned stay. Every extra week of travel moves the deadline by a week. Enter both dates in the checker: it applies the rule to your planned departure and shows the margin in days.</p>
<h2>Entry stamp and stay limit</h2>
<p>The page asks for sufficient space for an entry visa stamp rather than a fixed number of blank pages. The stay you are admitted for is the date immigration stamps in the passport; staying past it exposes you to fines or detention by the Bureau of Immigration, according to the State Department. Work, retirement and long stays go through Philippine agencies.</p>
<h2>If the passport is too short</h2>
<p>A ${h.a('passport-renewal', 'renewal by mail')} costs ${h.usd(h.P.fees.book.adult)}; ${h.a('expedited-passport', 'expedited service')} adds ${h.usd(h.P.fees.expedite)}. Testing the last country of a Southeast Asia route usually covers the others, as long as each rule counts from the right date. With the slowest published routine times, a mailed renewal takes up to ${worst} days door to door, so a passport that misses the Philippines deadline by a few weeks still leaves time to renew if you start now; within ${h.P.times.urgentDays} days of travel, an appointment at a passport agency is the remaining route.</p>`,
  },
});
