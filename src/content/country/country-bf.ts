import { definePage } from '../../lib/guide-types';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const $ = (n: number) => formatMoney(n, 0, 'en');
const both = P.fees.both.adult + P.fees.execution;
const card = P.fees.card.adult + P.fees.execution;

export default definePage({
  id: 'country-bf', group: 'country', order: 504, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'BF' },
  data: { country: 'BF' },
  related: ['country-jm', 'country-dr', 'guide-book-vs-card', 'passport-validity'],
  sources: ['caApi', 'cardVsBook', 'processing'],
  en: {
    path: 'passport-validity/bahamas', nav: 'The Bahamas', card: 'Passport for flights, a passport card accepted on cruises, 90 days without a visa.',
    title: 'Passport Validity Bahamas 2026: Card OK on Cruises Only',
    description: 'The Bahamas in 2026: a valid passport and proof of departure to fly in, a passport card or other WHTI document on a cruise, and 90 tourist days with no visa.',
    h1: 'Passport for the Bahamas: Nassau by air, Nassau by sea',
    intro: 'The Bahamas name the passport card explicitly for cruise travelers, which makes it the cheapest legal way to step ashore in Nassau.',
    resume: `According to the State Department, U.S. citizens are generally required to present a valid U.S. passport when traveling to The Bahamas, as well as proof of anticipated departure. The page sets no number of months of remaining validity. It names an exception for sea travel: those traveling to The Bahamas on a cruise may use another Western Hemisphere Travel Initiative compliant document, such as a U.S. passport card. Even so, the State Department strongly recommends a passport in case an unforeseen emergency requires you to disembark and return by air. Tourists need no visa for stays of up to 90 days. For a first-time adult, the card costs ${$(card)} including the acceptance fee, and a book and card ordered together ${$(both)}, which keeps both options open for a later flight.`,
    faqs: [
      { q: 'Is a passport card accepted for a Bahamas cruise?', a: 'Yes. The State Department page for The Bahamas says cruise travelers may use another Western Hemisphere Travel Initiative compliant document, and gives the U.S. passport card as an example. It also strongly recommends taking a passport book, because a card cannot be used to fly home if an emergency takes you off the ship.' },
      { q: 'How long can I stay in the Bahamas without a visa?', a: 'U.S. travelers coming for tourism do not need a visa for stays of up to 90 days, according to the State Department. Any other purpose, such as work, requires a visa or permit from Bahamian immigration, whose website the State Department refers to for current rules.' },
      { q: 'Does my passport need six months left to fly to Nassau?', a: 'The State Department page does not state a six-month rule for The Bahamas. It asks for a valid passport and proof of anticipated departure. Your airline may apply its own document check, so a passport expiring during the trip is a risk worth avoiding by renewing beforehand.' },
    ],
    body: (h) => `
<h2>The one place the card is named</h2>
<p>Many Caribbean pages speak of WHTI documents in general. The Bahamas page goes further and names the U.S. passport card for cruise travel. That matters for families booking a short sailing from Florida to Nassau or a private island: a child’s card costs ${h.usd(P.fees.card.minor + P.fees.execution)} with the facility fee, against ${h.usd(P.fees.book.minor + P.fees.execution)} for a child’s book. The saving is real, and so is the limit: the card does not work on any international flight.</p>
<h2>Flying to Nassau or the Out Islands</h2>
<p>Air passengers need the book, valid on arrival, and evidence they will leave, such as the return ticket. No margin of months appears on the page. If the passport would expire during your stay, ${h.a('passport-renewal', 'renew it')} before you go, since being stranded with an expired document is far more expensive than the renewal.</p>
<h2>Picking the document</h2>
<p>If a cruise is the only foreign trip you plan, the card is enough. If a flight might follow, ${h.a('guide-book-vs-card', 'book or card')} explains the trade-off, and ordering both in one application saves the second execution fee. A renewal of both by mail costs ${h.usd(P.fees.both.adult)}, with no facility visit at all.</p>`,
  },
});
