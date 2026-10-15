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
  es: {
    path: 'vigencia-del-pasaporte/canada', nav: 'Canadá', card: 'Pasaporte, tarjeta o NEXUS para entrar, pero solo libreta para volver en avión.',
    title: 'Vigencia del pasaporte para Canadá 2026: tarjeta o NEXUS',
    description: 'Canadá y su pasaporte de EE. UU. 2026: sin meses mínimos, entrada con pasaporte, tarjeta o NEXUS, y solo libreta u otro documento aprobado si vuelve en avión.',
    h1: 'Pasaporte para Canadá: con qué entra y con qué vuelve',
    intro: 'Canadá acepta tres documentos estadounidenses en la frontera, pero el vuelo de regreso es donde se quedan atrapados quienes solo llevan la tarjeta.',
    resume: `Para Canadá, el Departamento de Estado no fija una vigencia mínima: los ciudadanos estadounidenses pueden entrar con un pasaporte vigente, la tarjeta de pasaporte o la tarjeta NEXUS. La dificultad está en la vuelta. Si regresa a Estados Unidos en avión desde Canadá, debe mostrar la libreta de pasaporte u otro documento aprobado de la lista de la Oficina de Aduanas y Protección Fronteriza; la tarjeta solo sirve en cruces por tierra y por mar. Por eso la tarjeta, que cuesta ${$(cardRenew, 'es')} al renovarla frente a ${$(P.fees.book.adult, 'es')} de la libreta, funciona para ir y volver en auto a Vancouver o Montreal, pero no para ir manejando y regresar en avión. Quien viaja con menores que no son suyos, o sin la custodia completa, debe revisar además las reglas canadienses para viajar con niños.`,
    faqs: [
      { q: '¿Puedo ir a Canadá en auto solo con la tarjeta de pasaporte?', a: 'Sí. La ficha del Departamento de Estado sobre Canadá dice que se puede entrar con pasaporte, tarjeta de pasaporte o tarjeta NEXUS vigentes, y la tarjeta se acepta en los cruces por tierra y mar en ambos sentidos. Lo que no cubre es el avión: volar a Estados Unidos desde Canadá exige la libreta u otro documento aprobado por la Oficina de Aduanas.' },
      { q: '¿Basta con NEXUS para visitar Canadá sin pasaporte?', a: 'Para entrar a Canadá, el Departamento de Estado pone la tarjeta NEXUS al lado de la libreta y de la tarjeta de pasaporte, y ambos gobiernos animan a los viajeros frecuentes a inscribirse. Para volver en avión a Estados Unidos, verifique que su documento esté en la lista aprobada de la Oficina de Aduanas, como lo está la libreta.' },
      { q: 'Mi pasaporte vence el mes próximo: ¿puedo ir a Canadá?', a: 'La ficha de Canadá no fija meses mínimos, así que un pasaporte vigente el día del cruce sirve para entrar. El riesgo es un retraso que lo deje fuera del país después del vencimiento, sin documento válido para regresar. Renovar por correo o en línea antes de una estancia larga evita ese problema.' },
    ],
    body: (h) => `
<h2>Tres documentos en la frontera canadiense</h2>
<p>Canadá es flexible en el papel. La libreta, la tarjeta de pasaporte o la tarjeta de miembro de NEXUS aparecen en la ficha del Departamento de Estado como formas de entrada para los ciudadanos estadounidenses. No se menciona un número de meses de vigencia. En la práctica decide el agente de la agencia fronteriza canadiense, que también pregunta el motivo y la duración de la visita.</p>
<h2>El vuelo de regreso es la verdadera prueba</h2>
<p>El problema suele aparecer al volver. Un viaje por carretera a Columbia Británica que termina devolviendo el auto en Vancouver y tomando un vuelo a Seattle exige la libreta, porque la entrada aérea a Estados Unidos desde Canadá pide la libreta u otro documento aprobado. La tarjeta, de ${h.usd(cardRenew)} al renovarla, está pensada para tierra y mar. Si cabe la posibilidad de volar aunque sea una vez, ${h.a('passport-card', 'compare libreta y tarjeta')} antes de elegir.</p>
<h2>Menores y custodia</h2>
<p>El Departamento señala un paso más: si viaja con un menor sin tener la custodia completa, la agencia fronteriza canadiense explica qué cartas y documentos puede pedir. Esa regla es canadiense y no tiene que ver con la tarifa del pasaporte.</p>`,
  },
});
