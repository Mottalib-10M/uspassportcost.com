import { definePage } from '../../lib/guide-types';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const $ = (n: number) => formatMoney(n, 0, 'en');
const firstBook = P.fees.book.adult + P.fees.execution;
const firstCard = P.fees.card.adult + P.fees.execution;

export default definePage({
  id: 'country-jm', group: 'country', order: 503, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'JM' },
  data: { country: 'JM' },
  related: ['country-bf', 'country-dr', 'passport-card', 'passport-validity'],
  sources: ['caApi', 'cardVsBook', 'processing'],
  en: {
    path: 'passport-validity/jamaica', nav: 'Jamaica', card: 'Valid passport and proof of departure; cruise passengers may use a WHTI document.',
    title: 'Passport Validity Jamaica 2026: Flights, Cruises and Cards',
    description: 'Jamaica passport rules for 2026: a valid passport and proof of departure when flying, a WHTI document on a cruise, and no visa for tourist stays up to 90 days.',
    h1: 'Passport for Jamaica: flying in, arriving by cruise ship',
    intro: 'Montego Bay by air and Falmouth by ship follow two different document rules, and neither sets a minimum number of months.',
    resume: `The State Department says U.S. citizens are generally required to present a valid U.S. passport when traveling to Jamaica, as well as proof of anticipated departure from Jamaica, which in practice means a return or onward ticket. No minimum validity in months is written on the country page. Cruise passengers are treated differently: someone arriving on a cruise may use another Western Hemisphere Travel Initiative compliant document, a category that includes the U.S. passport card. The State Department still strongly recommends a passport book, in case an emergency forces you to leave the ship and fly home. Tourist stays of up to 90 days need no visa. A first adult card costs ${$(firstCard)} with the facility fee and a first book ${$(firstBook)}, so the cheaper card covers a closed-loop cruise call, while a resort holiday by plane needs the book.`,
    faqs: [
      { q: 'Can I take a cruise to Jamaica with only a passport card?', a: 'The State Department page allows cruise passengers to use a Western Hemisphere Travel Initiative compliant document instead of a passport book, and the passport card is one. It strongly recommends carrying a passport anyway: if an emergency forces you to disembark and return by air, a card will not get you on the plane.' },
      { q: 'Do I need a visa or a minimum passport validity for Jamaica?', a: 'Tourists staying up to 90 days need no visa. The country page asks for a valid U.S. passport and proof that you will leave Jamaica, without fixing a number of months. Anyone traveling for work or longer stays needs a visa or work permit from Jamaican authorities.' },
      { q: 'Is the Jamaican departure tax something I pay at the airport?', a: 'The State Department notes that the departure tax is regularly included in the airfare, so most travelers pay nothing extra on leaving. It is part of the ticket price, not of the passport fees, which are paid to the U.S. Department of State before you travel.' },
    ],
    body: (h) => `
<h2>By plane: passport book and a way out</h2>
<p>Holidays in Negril or Ocho Rios usually start at Sangster or Norman Manley airport, and airline staff check two things before boarding: a valid passport book and evidence that you will leave Jamaica. The State Department does not mention a validity margin, so a passport expiring a week after your return is legally enough. It is also fragile: a cancelled flight home could leave you abroad on an expired document, so renewing before a trip that ends near the expiry date is the safer plan.</p>
<h2>By cruise ship: the WHTI exception</h2>
<p>Cruise lines sailing round trip from a U.S. port accept travel documents under the Western Hemisphere Travel Initiative. For a Jamaica port call that means a ${h.a('passport-card', 'passport card')} can replace the book. The weakness is the same one the State Department underlines: a card is not valid for international air travel, and an illness or missed sailing turns a day in Falmouth into a flight.</p>
<h2>Longer stays</h2>
<p>Beyond 90 days, or for any paid work, the Passport, Immigration and Citizenship Agency of Jamaica handles visas and permits. The departure tax is regularly included in the ticket.</p>`,
  },
});
