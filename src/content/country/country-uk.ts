import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays, addMonths } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';

const d = (iso: string) => displayDate(iso, 'en-US');
const ARR = '2027-04-10';
const DEP = addDays(ARR, 10);
const need = requiredDate('stay', 0, ARR, DEP);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
void addMonths;

export default definePage({
  id: 'country-uk', group: 'country', order: 512, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'UK' },
  data: { country: 'UK' },
  related: ["country-ei", "country-fr", "passport-validity", "guide-when-to-renew"],
  sources: ["caApi", "processing", "mail"],
  en: {
    path: 'passport-validity/united-kingdom', nav: "United Kingdom", card: "Valid for the whole stay, plus an ETA before you fly.",
    title: "Passport Validity UK 2026: Whole Stay and an ETA First",
    description: "For the United Kingdom your passport must be valid for the entire stay, and short visits need an ETA before you fly. Check whether yours covers the trip.",
    h1: "Passport for the United Kingdom: valid until you leave",
    intro: "The UK sets no six-month rule. What it asks is simpler and easy to miss: a passport that lasts until your departure, and an ETA.",
    resume: `The State Department’s page for the United Kingdom says your passport must be valid for the entire length of your stay. There is no extra margin of three or six months, so the deadline is your departure date: for a stay from ${d(ARR)} to ${d(DEP)}, the passport has to be valid on ${d(need)}. The same page adds that U.S. citizens traveling to the UK for tourism, family visits, business meetings, conferences or short study of six months or less must hold an Electronic Travel Authorization before travel, and that many other countries require six months of validity during travel, which matters if London is only one stop. A renewal needed before an ${d(ARR)} arrival should be mailed by ${d(mailBy)} to be safe with the slowest published times of ${worst} days, or done online if you qualify and will not travel for six weeks.`,
    faqs: [
      { q: "Does the UK require six months left on a US passport?", a: `No. The United Kingdom requires your passport to be valid for the entire length of your stay, without an extra six-month margin. Keep in mind that a connection or a second destination may impose its own rule: the State Department notes that many countries want six months of validity during travel.` },
      { q: "Do I need an ETA to visit London with a US passport?", a: `Yes for short visits. The State Department page says U.S. citizens visiting for tourism, family, business meetings, conferences or short study of six months or less must have an Electronic Travel Authorization before travel. Apply in advance: it is a condition of travel, separate from passport validity.` },
      { q: "Can I use the ePassport gates in the UK?", a: `Yes. Since June 2019 U.S. passport holders can use the ePassport Gates when arriving in the United Kingdom, and travelers who were registered in the old Registered Traveler Service should now use those gates. The passport still has to be valid for your whole stay.` },
    ],
    body: (h) => `
<h2>The departure date is the deadline</h2>
<p>For most of Europe the question is how many months remain after you leave. For the United Kingdom it is only whether the passport reaches the day you fly home. That makes the UK forgiving for a passport near its end, as long as nothing delays the return. The checker above treats the departure date as the rule; if you are flying on to the continent, test the Schengen country too, since ${h.a('country-fr', 'France')} or ${h.a('country-sp', 'Spain')} count three months after you leave the area.</p>
<h2>Two documents to check, not one</h2>
<p>The passport rule and the ETA are separate conditions. The ETA is for visits of six months or less; longer stays, work or study beyond that need a UK visa. For residents, the State Department notes that UK Visas and Immigration has been replacing physical documents with an online immigration status called an eVisa since fall 2024. If you renew online, the old passport is canceled the moment you submit, which is one more reason to keep ${h.P.online.noTravelWeeks} clear weeks before the trip.</p>
<h2>Timing a renewal for a UK trip</h2>
<p>With routine service and mail both ways, ${worst} days is the published worst case. A ${h.a('passport-renewal', 'renewal by mail')} sent on ${h.date(mailBy)} covers a landing on ${h.date(ARR)}; later than that, ${h.a('expedited-passport', 'expedited service')} costs ${h.usd(h.P.fees.expedite)} more.</p>`,
  },
});
