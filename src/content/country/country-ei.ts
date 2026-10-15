import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays, addMonths } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';

const d = (iso: string) => displayDate(iso, 'en-US');
const ARR = '2027-03-14';
const DEP = addDays(ARR, 8);
const need = requiredDate('entry', 0, ARR, DEP);
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);
void addMonths;

export default definePage({
  id: 'country-ei', group: 'country', order: 513, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'EI' },
  data: { country: 'EI' },
  related: ["country-uk", "country-fr", "passport-validity", "guide-how-long-valid"],
  sources: ["caApi", "schengen", "processing"],
  en: {
    path: 'passport-validity/ireland', nav: "Ireland", card: "No minimum validity, but valid for the stay is advised; Ireland is outside Schengen.",
    title: "Passport Validity Ireland 2026: No Minimum, Stay Advised",
    description: "Ireland sets no minimum passport validity for U.S. citizens, but the State Department advises a passport valid for your whole stay. Check your dates here.",
    h1: "Passport for Ireland: no minimum, one recommendation",
    intro: "Ireland is one of the few European destinations with no written minimum. The State Department still recommends a passport that lasts the whole stay.",
    resume: `The State Department’s page for Ireland says you must have a valid passport to enter and that there is no minimum passport validity requirement for U.S. citizens entering Ireland. It recommends a passport valid for the duration of your stay, evidence of sufficient funds and a return ticket, and notes that an increased number of U.S. citizens have been refused entry or given a limited stay because they did not show their travel intent clearly. For a trip from ${d(ARR)} to ${d(DEP)}, the rule is met by a passport valid on ${d(need)}, the arrival day, and the advice by one valid until ${d(DEP)}. Ireland is not a full member of the Schengen area: continuing to a Schengen country brings back the three-month rule. A renewal for this trip should be mailed by ${d(mailBy)} to be safe with the slowest published times.`,
    faqs: [
      { q: "Can I enter Ireland with a passport that expires during my trip?", a: `The written rule allows it, since Ireland sets no minimum validity for U.S. citizens, but the State Department recommends a passport valid for the duration of your stay. An expiring passport also leaves you without a valid document for the flight home, so renew before the trip if the dates overlap.` },
      { q: "Is Ireland part of the Schengen area for passport rules?", a: `No. The State Department notes that Ireland is not a full member of the Schengen area, so you show your passport when arriving from a Schengen country. If you continue to one, plan for its rule: a passport valid at least three months beyond the period of stay in the area.` },
      { q: "Why are some Americans refused entry to Ireland?", a: `The State Department reports that an increased number of U.S. citizens have been refused entry or granted a limited stay because they failed to demonstrate their travel intent. Carry evidence of sufficient funds, a return ticket and, for anything other than tourism, the right documents obtained before travel.` },
    ],
    body: (h) => `
<h2>A rule and an advice that point to different dates</h2>
<p>Ireland is the clearest case of the gap between a legal minimum and good practice. The rule is satisfied on the day you land; the recommendation stretches to the day you leave. The checker above shows both, because a passport that is valid on arrival but expires mid-trip complies with Irish law and still leaves you stranded for the return flight.</p>
<h2>Dublin as a gateway</h2>
<p>Many travelers combine Ireland with the continent. The Schengen countries ask for three months after the last day in the area, which can be the stricter test of the whole itinerary: check ${h.a('country-fr', 'France')}, ${h.a('country-it', 'Italy')} or ${h.a('country-sp', 'Spain')} with the same passport before booking.</p>
<h2>If a renewal is needed</h2>
<p>A routine renewal mailed by ${h.date(mailBy)} arrives before a ${h.date(ARR)} departure even in the slowest published case of ${worst} days. Adults who renew within a year of expiry and do not travel for six weeks can ${h.a('renew-passport-online', 'renew online')} for the same ${h.usd(h.P.fees.book.adult)}, and skip the outbound mail entirely.</p>
<p>Keep the return ticket and proof of funds at hand at the Dublin or Shannon desk: those are the points the State Department says officers check.</p>`,
  },
});
