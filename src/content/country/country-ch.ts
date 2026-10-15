import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays, addMonths } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';

const d = (iso: string, l: 'en' | 'es' = 'en') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const ARR = '2027-03-20';
const DEP = addDays(ARR, 10);
const need = requiredDate('afterEntry', 6, ARR, DEP);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
void addMonths;

export default definePage({
  id: 'country-ch', group: 'country', order: 523, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'CH' },
  data: { country: 'CH' },
  related: ["country-vm", "country-ja", "country-th", "passport-validity"],
  sources: ["caApi", "processing", "mail"],
  en: {
    path: 'passport-validity/china', nav: "China", card: "Visa required, six months remaining, and matching details if the visa is in an old passport.",
    title: "Passport Validity China 2026: Six Months and a Visa First",
    description: "China requires a visa before arrival and at least six months left on your passport. If the visa is in an old passport, its details must match. Check your dates.",
    h1: "Passport for China: six months remaining and a visa",
    intro: "China asks for two things at the border, a visa obtained in advance and six months of passport validity, and is strict about both.",
    resume: `The State Department’s page for the People’s Republic of China says you must obtain a visa before arriving and that your passport must have at least six months of validity remaining. Arriving on ${d(ARR)}, that means a passport valid until at least ${d(need)}. If your visa sits in an old passport, the biographical data on the valid passport and on the visa must match exactly; failure to provide any of these items may lead to denial of entry and further penalties. U.S. citizens can apply for a ten-year multiple-entry visa. You also need a valid visa to exit, must leave before the listed duration of stay ends, and cannot work on a student or tourist visa. Visa-free transit, where offered, also requires six months of remaining validity. Because the visa itself takes time, a renewal for this trip should be mailed well before ${d(mailBy)}, the last safe date for the passport alone.`,
    faqs: [
      { q: "Can I keep my Chinese visa in my old passport after renewing?", a: `Yes, if the details match. The State Department says that if your visa is not in your valid passport, the biographical data on the valid passport and the visa must match exactly. Travel with both books: the new passport for its validity, the old one for the visa.` },
      { q: "Does visa-free transit through China need six months of validity?", a: `Yes. The State Department page says transiting without a visa requires a valid passport with at least six months of remaining validity, a visa for your onward destination if required, and an onward ticket from the same city. Eligible cities and airports change, so check with the Chinese Embassy.` },
      { q: "What happens if my Chinese visa expires while I am there?", a: `Lack of a visa, an expired visa or an overstay results in detention or fines, according to the State Department. If your visa has expired or is about to, apply for an extension at the local Entry-Exit Bureau before attempting to leave, and do not expect the request to be expedited.` },
    ],
    body: (h) => `
<h2>Two deadlines, in the right order</h2>
<p>For China the passport comes first and the visa second: the visa application asks for a passport that already meets the rule. Count backwards from the arrival date. The checker gives the passport deadline, six months remaining on arrival, and the last day to mail a routine renewal; leave the weeks the visa needs after that. If your passport is close to the limit, renewing before applying for the visa avoids juggling two books.</p>
<h2>Old passport, valid visa</h2>
<p>A ten-year multiple-entry visa often outlives the passport it was stamped in. The State Department accepts that situation for entry as long as names, dates of birth and other data match exactly. A ${h.a('passport-name-change', 'name change')} breaks that match, so travelers who changed names after the visa should check before departure.</p>
<h2>Regional trips</h2>
<p>Pairing China with ${h.a('country-vm', 'Vietnam')} adds a blank-page requirement and a count from the end of the stay; ${h.a('country-ja', 'Japan')} only needs validity for the stay, though airlines there warn about six months. A ${h.a('passport-renewal', 'renewal')} costs ${h.usd(h.P.fees.book.adult)} by mail or online, and the expedited option adds ${h.usd(h.P.fees.expedite)} when the visa appointment is close.</p>`,
  },
});
