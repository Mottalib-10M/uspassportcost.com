import { definePage } from '../../lib/guide-types';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const $ = (n: number, l: 'en' | 'es') => formatMoney(n, 0, l);
const lost = P.fees.book.adult + P.fees.execution;

export default definePage({
  id: 'country-gt', group: 'country', order: 509, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'GT' },
  data: { country: 'GT' },
  related: ['country-es', 'country-ho', 'country-mx', 'passport-validity'],
  sources: ['caApi', 'lostStolen', 'processing'],
  en: {
    path: 'passport-validity/guatemala', nav: 'Guatemala', card: 'No minimum validity, but one blank page for the stamps and an electronic form.',
    title: 'Passport Validity Guatemala 2026: No Minimum, One Blank Page',
    description: 'Guatemala in 2026: no minimum validity for a U.S. passport, valid on arrival, one blank page for the entry and exit stamps, no visa, and an online form.',
    h1: 'Passport for Guatemala: valid on arrival, with room for a stamp',
    intro: 'Guatemala is one of the few countries that writes it plainly: there is no minimum validity period for a U.S. passport.',
    resume: `The State Department page for Guatemala is unusually direct. To enter, you need a U.S. passport that is valid when you arrive, with at least one blank page for an entry and exit stamp, and there is no required minimum validity period; U.S. citizens do not need a visa, and no vaccinations are required for entry. Guatemala uses an electronic immigration form to enter and to exit, and some airlines ask for proof that it was completed before check-in. Stays are usually 90 days and may be extended on request, with a fine of 15 quetzales, about $2, for each day over the limit, paid to the Guatemalan Institute of Migration before leaving. A lost passport is the expensive scenario: a new U.S. passport, a police report, and possibly a $100 fine for the missing entry stamp, on top of the ${$(lost, 'en')} a replacement costs with the facility fee once you are home.`,
    faqs: [
      { q: 'Can I travel to Guatemala on a passport that expires next month?', a: 'Legally, yes. The State Department writes that there is no required minimum validity period for a U.S. passport in Guatemala; it must be valid when you arrive and have a blank page. The practical limit is your return: if the trip runs past the expiration date, you would be abroad without a valid document.' },
      { q: 'What does it cost to overstay in Guatemala?', a: 'The State Department gives a fine of 15 Guatemalan quetzales, about $2, for each day beyond the stay you were allowed, usually 90 days. It is paid to the Instituto Guatemalteco de Migración before you can leave the country, and amounts can change. An extension can sometimes be granted if you ask in time.' },
      { q: 'What do I need to leave Guatemala after losing my passport?', a: 'A new passport from the U.S. Embassy, shown to Guatemalan immigration with a police report about the loss or theft. You may also have to pay a $100 fine because the new passport has no entry stamp or proof of entry. The State Department advises going to the Embassy as soon as possible.' },
    ],
    body: (h) => `
<h2>The page count that matters</h2>
<p>For Guatemala the date on your passport is less of an issue than its pages. One blank page is required for the stamps, and a passport filled with visas from frequent trips can be the reason a traveler is turned away. If yours is nearly full, renewing gives you a fresh book; frequent travelers can tick the large book box on the form at no extra cost.</p>
<h2>Before the flight to Guatemala City</h2>
<p>The electronic immigration form is completed both ways, and some airlines check it at the counter in the United States. Nothing else is needed for a tourist: no visa, no vaccination. The CA-4 agreement links your days with ${h.a('country-es', 'El Salvador')}, Honduras and Nicaragua.</p>
<h2>If the passport disappears</h2>
<p>Losing a passport in Guatemala means three steps: the U.S. Embassy for a replacement, a police report, and Guatemalan immigration for the exit, with the possible $100 fine. Back in the United States, a ${h.a('lost-or-stolen-passport', 'full replacement')} is a new application in person.</p>
<p>Because no minimum applies, the date that matters for Guatemala is your return home: look at the expiration date with your next trip in mind, not this one.</p>`,
  },
  es: {
    path: 'vigencia-del-pasaporte/guatemala', nav: 'Guatemala', card: 'Sin vigencia mínima, pero con una página libre para los sellos y un formulario electrónico.',
    title: 'Pasaporte para Guatemala 2026: sin mínimo, una página libre',
    description: 'Guatemala en 2026: sin vigencia mínima para el pasaporte de EE. UU., vigente al llegar, una página libre para los sellos, sin visa y con un formulario.',
    h1: 'Pasaporte para Guatemala: vigente al llegar y con espacio para el sello',
    intro: 'Guatemala es de los pocos países que lo dice con todas las letras: no hay vigencia mínima para el pasaporte estadounidense.',
    resume: `La ficha del Departamento de Estado sobre Guatemala es muy directa. Para entrar necesita un pasaporte de EE. UU. vigente al llegar, con al menos una página en blanco para el sello de entrada y salida, y no existe un periodo mínimo de vigencia; los ciudadanos estadounidenses no necesitan visa ni vacunas para entrar. Guatemala usa un formulario electrónico de migración para entrar y salir, y algunas aerolíneas piden la prueba de haberlo llenado antes de documentar. La estancia suele ser de 90 días y se puede prorrogar si lo pide, con una multa de 15 quetzales, unos 2 dólares, por cada día de más, que se paga al Instituto Guatemalteco de Migración antes de salir. Perder el pasaporte es el caso caro: pasaporte nuevo, denuncia policial y quizá una multa de 100 dólares por no tener sello de entrada, además de los ${$(lost, 'es')} que cuesta el reemplazo con la tarifa del centro al volver.`,
    faqs: [
      { q: '¿Puedo viajar a Guatemala con un pasaporte que vence el mes que viene?', a: 'Legalmente sí. El Departamento de Estado escribe que en Guatemala no hay vigencia mínima para el pasaporte estadounidense; debe estar vigente al llegar y tener una página libre. El límite práctico es el regreso: si el viaje se alarga más allá del vencimiento, quedaría fuera del país sin documento válido.' },
      { q: '¿Cuánto cuesta quedarse de más en Guatemala?', a: 'El Departamento de Estado indica una multa de 15 quetzales, unos 2 dólares, por cada día más allá de la estancia permitida, normalmente 90 días. Se paga al Instituto Guatemalteco de Migración antes de poder salir, y los montos pueden cambiar. A veces se concede una prórroga si la pide a tiempo.' },
      { q: '¿Qué necesito para salir de Guatemala si perdí el pasaporte?', a: 'Un pasaporte nuevo de la Embajada de EE. UU., presentado a Migración de Guatemala con la denuncia policial de la pérdida o el robo. También puede tener que pagar una multa de 100 dólares porque el pasaporte nuevo no tiene sello de entrada. El Departamento de Estado aconseja ir a la Embajada cuanto antes.' },
    ],
    body: (h) => `
<h2>Lo que cuenta son las páginas</h2>
<p>Para Guatemala, la fecha del pasaporte pesa menos que sus páginas. Hace falta una hoja libre para los sellos, y un pasaporte lleno de visas por viajes frecuentes puede ser el motivo de un rechazo. Si el suyo está casi lleno, renovarlo le da una libreta nueva; quien viaja mucho puede marcar en el formulario la casilla de libreta grande, sin costo extra.</p>
<h2>Antes del vuelo a la Ciudad de Guatemala</h2>
<p>El formulario electrónico de migración se llena en los dos sentidos, y algunas aerolíneas lo revisan en el mostrador en Estados Unidos. Para un turista no hace falta nada más: ni visa ni vacuna. El acuerdo CA-4 suma sus días con los de ${h.a('country-es', 'El Salvador')}, Honduras y Nicaragua.</p>
<h2>Si el pasaporte desaparece</h2>
<p>Perder el pasaporte en Guatemala supone tres pasos: la Embajada de EE. UU. para el reemplazo, la denuncia policial y Migración de Guatemala para la salida, con la posible multa de 100 dólares. Ya en Estados Unidos, el ${h.a('lost-or-stolen-passport', 'reemplazo completo')} es una solicitud nueva en persona.</p>
<p>Como no hay mínimo, la fecha que importa para Guatemala es la del regreso: revise el vencimiento pensando en el próximo viaje, no en este.</p>`,
  },
});
