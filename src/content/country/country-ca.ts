import { definePage } from '../../lib/guide-types';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const $ = (n: number, l: 'en' | 'es') => formatMoney(n, 0, l);
const cardRenew = P.fees.card.adult;

export default definePage({
  id: 'country-ca', group: 'country', order: 501, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'CA' },
  data: { country: 'CA' },
  related: ['country-mx', 'passport-card', 'country-uk', 'passport-validity'],
  sources: ['caApi', 'cardVsBook', 'online'],
  en: {
    path: 'passport-validity/canada', nav: 'Canada', card: 'Passport, card or NEXUS in, but only a book or approved ID to fly home.',
    title: 'Passport Validity Canada 2026: Passport, Card or NEXUS',
    description: 'Canada and your US passport in 2026: no minimum months, a passport, passport card or NEXUS card to enter, and only a book or approved ID when you fly back home.',
    h1: 'Passport for Canada: what gets you in and what gets you home',
    intro: 'Canada accepts three U.S. documents at the border, but the return flight is where travelers with only a card get stuck.',
    resume: `For Canada, the State Department lists no minimum passport validity: U.S. citizens can use a valid U.S. passport, passport card, or NEXUS card to enter. The difficulty is the way back. If you fly into the United States from Canada, you must show a U.S. passport book or another approved document from the list kept by U.S. Customs and Border Protection; the passport card covers land and sea crossings only. So a card, which costs ${$(cardRenew, 'en')} to renew against ${$(P.fees.book.adult, 'en')} for a book, works for a drive to Vancouver or Montreal and back, not for a one-way drive with a flight home. Travelers with children who are not their own, or without full custody, should also read Canada’s rules on traveling with minors before the trip.`,
    faqs: [
      { q: 'Can I drive to Canada with just a passport card?', a: 'Yes. The State Department page for Canada says U.S. citizens can enter with a valid passport, passport card or NEXUS card, and the card is accepted at land and sea crossings in both directions. What it does not cover is a flight: flying into the United States from Canada requires a passport book or another document approved by U.S. Customs and Border Protection.' },
      { q: 'Is NEXUS enough to visit Canada instead of a passport?', a: 'For entering Canada, the State Department lists the NEXUS card next to the passport book and passport card. Both governments urge frequent travelers to join the NEXUS trusted traveler program. To fly home into the United States, check that the document you carry is on the CBP approved list, as the passport book is.' },
      { q: 'My passport expires next month: can I still go to Canada?', a: 'Canada’s page sets no minimum months, so a passport valid on the day you cross is acceptable for entry. The risk is a delay that keeps you abroad past the expiration date, which would leave you without a valid document for the return. Renewing by mail or online before a long stay avoids it.' },
    ],
    body: (h) => `
<h2>Three documents at the Canadian border</h2>
<p>Canada is lenient on paper. A U.S. passport book, a passport card or a NEXUS membership card all appear on the State Department page as ways for U.S. citizens to enter. Nothing there mentions a number of months left. In practice the person who decides is the Canada Border Services officer at the crossing, who also asks about the purpose and length of the visit.</p>
<h2>The return flight is the real test</h2>
<p>People get caught on the way back. A road trip into British Columbia with a rental car dropped in Vancouver and a flight to Seattle needs a passport book, because air entry into the United States from Canada requires the book or another approved document. The card, at ${h.usd(cardRenew)} for an adult renewal, is designed for land and sea. If you might fly even once, ${h.a('passport-card', 'compare book and card')} before choosing.</p>
<h2>Children and custody</h2>
<p>The State Department flags one more step: if you travel with a minor without having full custody, Canada’s border agency explains what letters and documents it may ask for. That rule is Canadian and separate from the passport fee you pay here.</p>`,
  },
});
