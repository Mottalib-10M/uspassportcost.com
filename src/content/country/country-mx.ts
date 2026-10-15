import { definePage } from '../../lib/guide-types';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const $ = (n: number, l: 'en' | 'es') => formatMoney(n, 0, l);
const card = P.fees.card.adult + P.fees.execution;
const book = P.fees.book.adult + P.fees.execution;

export default definePage({
  id: 'country-mx', group: 'country', order: 500, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'MX' },
  data: { country: 'MX' },
  related: ['passport-card', 'country-ca', 'country-gt', 'passport-validity'],
  sources: ['caApi', 'cardVsBook', 'processing'],
  en: {
    path: 'passport-validity/mexico', nav: 'Mexico', card: 'Book to fly, book or card to drive in, plus the FMM permit.',
    title: 'Passport Validity Mexico 2026: Book to Fly, Card to Drive',
    description: 'Mexico passport rules for 2026: no minimum validity written, a passport book for flights, book or card at land crossings, and the FMM permit for every traveler.',
    h1: 'Passport for Mexico: validity, book or card, and the FMM',
    intro: 'Mexico sets no minimum months: the question is which document you carry, and that depends on whether you fly or drive.',
    resume: `The State Department’s page for Mexico does not set a minimum number of months of passport validity: a valid document on the day you enter is what it asks. What it does set is the type of document. To fly into Mexico you need a passport book, and a U.S. passport card cannot be used to board a plane at the airport. Driving or walking across the border, a book or a card both work. On top of the passport, every traveler needs an FMM entry permit, obtained online or at an INM office, including people who stay within 12 miles of the border. A first adult card costs ${$(card, 'en')} with the facility fee and a first book ${$(book, 'en')}, so someone who only crosses by land saves ${$(book - card, 'en')} with the card, and loses the option of flying home.`,
    faqs: [
      { q: 'Can I fly to Cancún or Mexico City with a passport card?', a: 'No. The State Department page for Mexico says you need a passport book to enter by air and that a U.S. passport card cannot be used to board a plane at the airport. The card is accepted at land border crossings, so it suits drivers and people who walk across, not air travelers heading to Cancún, Los Cabos or Mexico City.' },
      { q: 'How many months must my passport have left to visit Mexico?', a: 'The country information page for Mexico states no minimum number of months. The passport must be valid when you enter, and the immigration officer decides how long you may stay, stamping the date in it. If yours expires during the trip, renew it first: the State Department cannot extend a U.S. passport at the border.' },
      { q: 'Do I need the FMM if I only go a few miles past the border?', a: 'Yes. The State Department page says all travelers to Mexico must apply for an FMM entry permit, online or from an INM office, including those staying within 12 miles, about 20 kilometers, of the border. At the 66 international airports the permit is digital and issued on arrival.' },
    ],
    body: (h) => `
<h2>Air or land: two different documents</h2>
<p>Mexico is the one destination where the cheaper U.S. passport document really changes the plan. By road, at San Ysidro, Laredo or Nogales, Mexican officers accept either the passport book or the passport card. At an airport the card stops working: the airline will not let you board with it. People who spend weekends in Baja or visit family across the Texas border often get only a card at ${h.usd(card)}, and later discover it cannot carry them on a flight to Guadalajara. If there is any chance you will fly, ${h.a('passport-card', 'book and card together')} cost ${h.usd(P.fees.both.adult + P.fees.execution)} the first time.</p>
<h2>The entry permit everyone fills in</h2>
<p>Separate from the passport, Mexico’s National Migration Institute requires the Forma Migratoria Múltiple. Air passengers receive a digital FMMD at the airport, sometimes through an electronic gate that prints a receipt with a QR code. Land travelers apply online or at an INM office, even for a short trip close to the border. Keep the record: officers check it when you leave.</p>
<h2>Coming back home</h2>
<p>Returning by car, the card or book gets you into the United States at the same crossing. Returning by plane requires the book. The State Department recommends checking the Mexican government’s own entry rules, which it links in Spanish.</p>`,
  },
  es: {
    path: 'vigencia-del-pasaporte/mexico', nav: 'México', card: 'Libreta para volar, libreta o tarjeta para cruzar por tierra, y la FMM.',
    title: 'Vigencia del pasaporte para México 2026: libreta o tarjeta',
    description: 'Pasaporte para México en 2026: sin mínimo de vigencia escrito, libreta para viajar en avión, libreta o tarjeta en la frontera terrestre y la FMM para todos.',
    h1: 'Pasaporte para México: vigencia, libreta o tarjeta, y la FMM',
    intro: 'México no fija meses mínimos: la pregunta es qué documento lleva, y eso depende de si llega en avión o por carretera.',
    resume: `La ficha del Departamento de Estado sobre México no fija un número mínimo de meses de vigencia: pide un documento vigente el día en que entra. Lo que sí fija es el tipo de documento. Para llegar a México en avión necesita la libreta de pasaporte, y la tarjeta de pasaporte de EE. UU. no sirve para abordar un avión en el aeropuerto. Por tierra, en auto o a pie, sirven la libreta o la tarjeta. Además del pasaporte, todo viajero necesita el permiso de entrada FMM, en línea o en una oficina del INM, incluso quien se queda a menos de 20 kilómetros de la frontera. La primera tarjeta de adulto cuesta ${$(card, 'es')} con la tarifa del centro y la primera libreta ${$(book, 'es')}: quien solo cruza por tierra ahorra ${$(book - card, 'es')} con la tarjeta, pero pierde la opción de volver en avión.`,
    faqs: [
      { q: '¿Puedo volar a Cancún o a Ciudad de México con la tarjeta de pasaporte?', a: 'No. La ficha del Departamento de Estado sobre México dice que para entrar por aire necesita la libreta y que la tarjeta de pasaporte no sirve para abordar un avión en el aeropuerto. La tarjeta se acepta en los cruces terrestres: sirve para quien maneja o cruza a pie, no para quien viaja en avión a Cancún, Los Cabos o la capital.' },
      { q: '¿Cuántos meses de vigencia necesita el pasaporte para visitar México?', a: 'La ficha de México no indica un mínimo de meses. El pasaporte debe estar vigente al entrar, y el agente de migración decide cuánto tiempo puede quedarse y pone la fecha en el pasaporte. Si el suyo vence durante el viaje, renuévelo antes: el Departamento de Estado no puede prolongar un pasaporte en la frontera.' },
      { q: '¿Necesito la FMM si solo voy a unos kilómetros de la frontera?', a: 'Sí. La ficha del Departamento de Estado dice que todos los viajeros a México deben pedir el permiso de entrada FMM, en línea o en una oficina del INM, incluso quienes se quedan a menos de 20 kilómetros de la frontera. En los 66 aeropuertos internacionales el permiso es digital y se emite al llegar.' },
    ],
    body: (h) => `
<h2>Avión o carretera: dos documentos distintos</h2>
<p>México es el destino donde el documento más barato de verdad cambia el plan. Por carretera, en Tijuana, Nuevo Laredo o Nogales, los agentes mexicanos aceptan la libreta o la tarjeta de pasaporte. En el aeropuerto la tarjeta deja de servir: la aerolínea no lo deja abordar. Muchas familias que visitan a parientes del otro lado de la frontera sacan solo la tarjeta, por ${h.usd(card)}, y después descubren que no les sirve para un vuelo a Guadalajara o a Oaxaca. Si existe la posibilidad de volar, ${h.a('passport-card', 'libreta y tarjeta juntas')} cuestan ${h.usd(P.fees.both.adult + P.fees.execution)} la primera vez.</p>
<h2>El permiso que llena todo el mundo</h2>
<p>Aparte del pasaporte, el Instituto Nacional de Migración exige la Forma Migratoria Múltiple. Quien llega en avión recibe una FMMD digital en el aeropuerto, a veces por una puerta electrónica que imprime un comprobante con código QR. Quien llega por tierra la pide en línea o en una oficina del INM, aunque el viaje sea corto y cerca de la frontera. Guarde el registro: lo revisan al salir.</p>
<h2>La vuelta a casa</h2>
<p>De regreso en auto, la tarjeta o la libreta le permiten entrar a Estados Unidos por el mismo cruce. De regreso en avión hace falta la libreta. El Departamento de Estado recomienda revisar también las reglas del gobierno mexicano, que enlaza en español.</p>`,
  },
});
