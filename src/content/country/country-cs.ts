import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';

const d = (iso: string, l: 'en' | 'es') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const ARR = '2027-01-08';
const LEAVE = addDays(ARR, 179);
const need = requiredDate('stay', 0, ARR, LEAVE);

export default definePage({
  id: 'country-cs', group: 'country', order: 505, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'CS' },
  data: { country: 'CS' },
  related: ['country-co', 'country-mx', 'country-dr', 'passport-validity'],
  sources: ['caApi', 'processing'],
  en: {
    path: 'passport-validity/costa-rica', nav: 'Costa Rica', card: 'Valid for the whole stay, undamaged, with an onward ticket; up to 180 days.',
    title: 'Passport Validity Costa Rica 2026: Whole Stay, No Damage',
    description: 'Costa Rica passport rules for 2026: valid for the whole stay, in good condition, with a return or onward ticket. Up to 180 days may be allowed, not guaranteed.',
    h1: 'Passport for Costa Rica: the length of your stay sets the date',
    intro: 'Costa Rica asks for a passport that lasts as long as you do, and immigration can turn away one that is damaged.',
    resume: `The State Department lists, as the first general entry requirement for Costa Rica, a valid passport for the duration of your stay. The rule moves with your departure date rather than a fixed number of months. Immigration may deny entry if the passport is damaged, and travelers need a return ticket or proof of onward travel, plus proof of yellow fever vaccination when arriving from certain countries in South America or Africa. Authorities may allow visitors to stay up to 180 days without a visa, though this is not guaranteed. A retiree arriving on ${d(ARR, 'en')} and planning to leave after 180 days, on ${d(LEAVE, 'en')}, needs a passport valid at least until ${d(need, 'en')}. Overstaying can bring fines, delays, deportation and refusal of future entry.`,
    faqs: [
      { q: 'Will Costa Rica accept a passport with a torn page or water damage?', a: 'It may not. The State Department page says immigration may deny your entry if the passport is damaged. The U.S. rules treat water damage, mold, significant tears or missing pages as damage, while folded pages and small bends count as normal wear. A damaged passport cannot be renewed by mail: it is replaced in person with Form DS-11.' },
      { q: 'How long does my passport need to be valid for Costa Rica?', a: 'For the duration of your stay, according to the State Department. There is no six-month figure on the country page. Plan the date from your real departure: if officials grant a long stay, close to the 180 days they may allow, the passport has to cover all of it.' },
      { q: 'Can I owe money and still leave Costa Rica?', a: 'Not always. The State Department warns that authorities may stop people with debts in Costa Rica from leaving, including unpaid bills from car accidents or medical costs, and that someone who owes child support there may have to pay up to 13 months of support before departing.' },
    ],
    body: (h) => `
<h2>A rule tied to your departure</h2>
<p>Costa Rica belongs to the group of destinations where the passport must outlast the visit itself. For a ten-day trip to Guanacaste that is rarely a problem. It matters more for long stays: visitors spending a winter on the Pacific coast often stay several months, and the State Department notes that up to 180 days may be granted without a visa. The checker above uses your departure date as the deadline, which is exactly how this rule works.</p>
<h2>Condition counts as much as dates</h2>
<p>The page adds a warning many travelers overlook: a damaged passport can be refused. A booklet that went through the washing machine, has a ripped data page or loose pages is a risk at Juan Santamaría airport. Replacing it is a new application in person, ${h.a('lost-or-stolen-passport', 'like a lost passport')}, not a renewal.</p>
<h2>Children born in Costa Rica</h2>
<p>All children born in Costa Rica get Costa Rican citizenship at birth, and Costa Rican minors need an exit permit from immigration to leave. Parents of such children should consult Costa Rican authorities before travel, whatever U.S. passport the child holds.</p>`,
  },
});
