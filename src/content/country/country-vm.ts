import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays, addMonths } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';

const d = (iso: string, l: 'en' | 'es' = 'en') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const ARR = '2027-02-05';
const DEP = addDays(ARR, 15);
const need = requiredDate('afterDeparture', 6, ARR, DEP);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
void addMonths;

export default definePage({
  id: 'country-vm', group: 'country', order: 524, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'VM' },
  data: { country: 'VM' },
  related: ["country-th", "country-ch", "country-ja", "passport-validity"],
  sources: ["caApi", "processing", "mail"],
  en: {
    path: 'passport-validity/vietnam', nav: "Vietnam", card: "Six months beyond the planned stay, one blank visa page, and a visa or e-visa.",
    title: "Passport Validity Vietnam 2026: 6 Months After Stay, Page",
    description: "Vietnam requires a passport valid six months beyond your planned stay, one blank visa page and a visa or e-visa, or you are denied entry. Check your own dates.",
    h1: "Passport for Vietnam: six months beyond the stay",
    intro: "Vietnam counts its six months from the end of the trip and adds a blank page, which makes it stricter than most of Asia.",
    resume: `The State Department’s page for Vietnam says you must have a valid passport and a visa, or pre-approval for a visa on arrival, to enter, that your passport must be valid for six months beyond your planned stay, and that you need at least one blank visa page, not counting the endorsement page. Travelers who do not meet these requirements are denied entry, and the U.S. Mission cannot assist those who arrive without the required documents. Because the count runs from the end of the stay, a trip from ${d(ARR)} to ${d(DEP)} requires a passport valid until ${d(need)}. You must enter and exit Vietnam on the same passport. E-visas are issued for the period requested on the application, so a delayed departure leads to overstay fines. A renewal for this trip, mailed by ${d(mailBy)}, comes back in time with the slowest published routine times of ${worst} days.`,
    faqs: [
      { q: "Is the six-month rule for Vietnam counted from arrival or departure?", a: `From the end of your planned stay. The State Department page says the passport must be valid for six months beyond the planned stay, so a longer trip pushes the deadline later. Enter both dates in the checker to see the exact day your passport must reach.` },
      { q: "Does the endorsement page count as a blank page for Vietnam?", a: `No. The State Department specifies at least one blank visa page, not including the endorsement page at the back of the book. If your visa pages are full, you need a new passport; a renewal by mail can request the larger book at no extra cost.` },
      { q: "What if my flight out of Vietnam is delayed past my e-visa dates?", a: `Expect overstay fines or delays. The State Department notes that immigration has been issuing visas valid only for the period requested on the e-visa application, so travelers who change plans or are delayed for any reason will likely incur fines. Request a period with some margin.` },
    ],
    body: (h) => `
<h2>The strictest count in this list</h2>
<p>Among the destinations here, Vietnam and the ${h.a('country-rp', 'Philippines')} ask for six months after the end of the stay. Thailand and China count six months from arrival; Schengen counts three months after departure. A three-week trip to Vietnam therefore needs close to seven months of validity on arrival day. The checker uses your planned departure as the base, exactly as the rule says.</p>
<h2>One passport, start to finish</h2>
<p>Vietnam requires entering and leaving on the same passport, so a renewal cannot happen mid-trip without complications. Dual nationals using a Vietnamese passport face their own rule: six months of validity from the return date to the United States. Check both rules if you hold two passports.</p>
<h2>Pages and visas</h2>
<p>The blank-page condition is easy to miss for frequent travelers. When renewing, the large book with extra visa pages costs nothing more than the standard ${h.usd(h.P.fees.book.adult)}. For trips that add ${h.a('country-th', 'Thailand')} or ${h.a('country-ch', 'China')}, test the itinerary’s last country too, since its rule may be the one that decides whether you can board at all.</p>
<p>If your passport fails the test, the renewal deadline shown above already includes both mail legs at their published maximum.</p>`,
  },
});
