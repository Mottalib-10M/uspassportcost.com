import { definePage } from '../../lib/guide-types';
import { cost } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const F = P.fees;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const first = cost({ situation: 'first', doc: 'card', service: 'routine', delivery: false, fileSearch: false });
const kid = cost({ situation: 'child', doc: 'card', service: 'routine', delivery: false, fileSearch: false });
const addOn = cost({ situation: 'renew-mail', doc: 'card', service: 'routine', delivery: false, fileSearch: false });

export default definePage({
  id: 'passport-card', group: 'cost', order: 130,
  tool: { kind: 'passport', situation: 'first', doc: 'card', focus: 'cost' },
  related: ['guide-book-vs-card', 'country-mx', 'country-ca', 'country-bf', 'passport-fees'],
  sources: ['cardVsBook', 'feeChart', 'mail'],
  en: {
    path: 'passport-card', nav: 'Passport card', card: `${$(first.total, 'en')} for a first adult card: land and sea to Canada, Mexico, the Caribbean.`,
    title: `Passport Card Cost 2026: ${$(first.total, 'en')} First Card, ${$(F.card.adult, 'en')} Renewal, Uses`,
    description: `A passport card costs ${$(first.total, 'en')} for a first adult card, ${$(kid.total, 'en')} for a child and ${$(F.card.adult, 'en')} to renew in 2026. Land and sea only, never flights abroad. Price yours right here.`,
    h1: 'Passport card cost and where it works',
    intro: 'The wallet-size card costs a fraction of the book, carries the same validity and works only on land and sea crossings close to home.',
    resume: `The U.S. passport card costs ${$(F.card.adult, 'en')} for an adult and ${$(F.card.minor, 'en')} for a child under 16, paid to the U.S. Department of State, plus the ${$(F.execution, 'en')} execution fee when it is a first application on Form DS-11: ${$(first.total, 'en')} for an adult and ${$(kid.total, 'en')} for a child. Adults who already hold a passport book can add a first card by mail on Form DS-82 as if it were a renewal, for ${$(addOn.total, 'en')} with no facility fee. The card is valid 10 years for adults and 5 for children, like the book. It proves citizenship and identity, it is accepted as an alternative to REAL ID on domestic flights, and it lets you enter the United States by land or sea from Canada, Mexico, Bermuda and some Caribbean countries, including the faster Ready Lanes at land borders. It is never valid for international air travel, and the 1-3 day delivery option does not exist for it: cards travel by First Class Mail.`,
    faqs: [
      { q: 'Can I take a flight home from Cancún with only a passport card?', a: 'No. The card is not valid for international travel by air, including flights to Mexico and Canada and flights home from them. Mexico’s country page says you need a passport book to fly in and cannot use a card to board a plane. By car, on foot or by sea the card works.' },
      { q: 'Can I get a passport card if I already have a passport book?', a: `Yes. An adult who holds a book can apply for a first card by mail with Form DS-82, sending the book, as a renewal: ${$(F.card.adult, 'en')}, no execution fee. The book comes back separately. Book and card can be held at the same time and expire on their own dates.` },
      { q: 'Does the passport card work as REAL ID at the airport?', a: 'Yes for domestic flights. The State Department lists both the book and the card as valid alternatives to a REAL ID driver’s license for flights inside the United States. That use alone makes the card worth its price for some people who never cross a border.' },
    ],
    body: (h) => `
<h2>What the card costs in each situation</h2>
<p>The card has its own line on the fee chart, with no security surcharge, which is why it is so much cheaper than the book. A first adult card filed in person costs ${h.usd(F.card.adult)} plus ${h.usd(F.execution)}; a child’s ${h.usd(F.card.minor)} plus the same ${h.usd(F.execution)}. Ordering card and book together costs ${h.usd(F.both.adult)} for an adult instead of ${h.usd(F.book.adult + F.card.adult)} and avoids a second execution fee. You can expedite a card for ${h.usd(F.expedite)}, but you cannot buy the 1-3 day delivery: the result above removes that option when you pick a card alone.</p>
<h2>The trips it covers</h2>
<p>Think of the card as a border-crossing document for driving to Canada or Mexico and for closed-loop cruises in the Caribbean. The Bahamas and Jamaica pages of the State Department accept it for cruise passengers, while still recommending a book in case an emergency forces you to fly home. The ${h.a('guide-book-vs-card', 'book versus card guide')} compares the two for each kind of trip.</p>
<h2>Renewing a card</h2>
<p>An adult card renews by mail or online exactly like a book, at ${h.usd(F.card.adult)}, if it was issued at 16 or older in the last 15 years. Online, you can renew a card into a card, or a card into both documents.</p>`,
  },
  es: {
    path: 'tarjeta-de-pasaporte', nav: 'Tarjeta de pasaporte', card: `${$(first.total, 'es')} por la primera tarjeta de adulto: tierra y mar a Canadá, México y el Caribe.`,
    title: `Tarjeta de pasaporte 2026: ${$(first.total, 'es')} la primera, ${$(F.card.adult, 'es')} renovar`,
    description: `La tarjeta de pasaporte cuesta ${$(first.total, 'es')} la primera de un adulto, ${$(kid.total, 'es')} la de un menor y ${$(F.card.adult, 'es')} al renovar en 2026. Solo tierra y mar, nunca vuelos al extranjero.`,
    h1: 'Tarjeta de pasaporte: costo y dónde sirve',
    intro: 'La tarjeta del tamaño de una billetera cuesta mucho menos que la libreta, tiene la misma vigencia y solo sirve en cruces por tierra y mar cercanos.',
    resume: `La tarjeta de pasaporte de EE. UU. cuesta ${$(F.card.adult, 'es')} para un adulto y ${$(F.card.minor, 'es')} para un menor de 16 años, que se pagan al Departamento de Estado, más la tarifa de ejecución de ${$(F.execution, 'es')} cuando es una primera solicitud con el DS-11: ${$(first.total, 'es')} para un adulto y ${$(kid.total, 'es')} para un menor. Un adulto que ya tiene libreta puede pedir su primera tarjeta por correo con el DS-82, como si fuera una renovación, por ${$(addOn.total, 'es')} sin tarifa del centro. La tarjeta vale 10 años para adultos y 5 para menores, igual que la libreta. Prueba la ciudadanía y la identidad, sirve como alternativa a la REAL ID en vuelos nacionales y permite entrar a EE. UU. por tierra o por mar desde Canadá, México, Bermudas y algunos países del Caribe, incluidos los carriles rápidos Ready Lanes de la frontera. Nunca sirve para viajes internacionales en avión, y no existe la entrega en 1 a 3 días para ella: las tarjetas viajan por correo de primera clase.`,
    faqs: [
      { q: '¿Puedo volver en avión desde Cancún solo con la tarjeta de pasaporte?', a: 'No. La tarjeta no sirve para viajes internacionales en avión, ni a México ni a Canadá, ni para volver de allí. La ficha de México dice que hace falta la libreta para entrar en avión y que la tarjeta no permite abordar. En auto, a pie o por mar la tarjeta sí funciona.' },
      { q: '¿Puedo sacar la tarjeta si ya tengo la libreta de pasaporte?', a: `Sí. Un adulto con libreta puede pedir su primera tarjeta por correo con el DS-82, enviando la libreta, como una renovación: ${$(F.card.adult, 'es')}, sin tarifa de ejecución. La libreta se devuelve aparte. Libreta y tarjeta pueden tenerse a la vez y vencen cada una en su fecha.` },
      { q: '¿La tarjeta de pasaporte sirve como REAL ID en el aeropuerto?', a: 'Sí, en vuelos nacionales. El Departamento de Estado indica que tanto la libreta como la tarjeta son alternativas válidas a una licencia REAL ID para volar dentro de EE. UU. Para algunas personas que nunca cruzan una frontera, ese uso ya justifica su precio.' },
    ],
    body: (h) => `
<h2>Lo que cuesta la tarjeta en cada caso</h2>
<p>La tarjeta tiene su propia línea en la tabla de tarifas, sin recargo de seguridad, y por eso cuesta mucho menos que la libreta. Una primera tarjeta de adulto en persona cuesta ${h.usd(F.card.adult)} más ${h.usd(F.execution)}; la de un menor, ${h.usd(F.card.minor)} más los mismos ${h.usd(F.execution)}. Pedir tarjeta y libreta juntas cuesta ${h.usd(F.both.adult)} para un adulto en lugar de ${h.usd(F.book.adult + F.card.adult)}, y evita una segunda tarifa de ejecución. Puede pedir la tarjeta urgente por ${h.usd(F.expedite)}, pero no la entrega en 1 a 3 días: el resultado de arriba quita esa opción cuando elige solo tarjeta.</p>
<h2>Los viajes que cubre</h2>
<p>La tarjeta es un documento para cruzar en auto a Canadá o a México y para cruceros de ida y vuelta por el Caribe. Las fichas de Bahamas y Jamaica del Departamento de Estado la aceptan para pasajeros de crucero, aunque recomiendan llevar libreta por si una emergencia obliga a volver en avión. La ${h.a('guide-book-vs-card', 'guía de libreta o tarjeta')} compara las dos para cada tipo de viaje.</p>
<h2>Renovar la tarjeta</h2>
<p>La tarjeta de un adulto se renueva por correo o en línea igual que la libreta, por ${h.usd(F.card.adult)}, si se emitió con 16 años o más en los últimos 15 años. En línea puede renovar tarjeta por tarjeta, o tarjeta por los dos documentos.</p>`,
  },
});
