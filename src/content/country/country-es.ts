import { definePage } from '../../lib/guide-types';
import { addDays } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';

const d = (iso: string, l: 'en' | 'es') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const IN = '2027-01-03';
const ca4End = addDays(IN, 89);

export default definePage({
  id: 'country-es', group: 'country', order: 508, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'ES' },
  data: { country: 'ES' },
  related: ['country-gt', 'country-ho', 'child-passport', 'passport-validity'],
  sources: ['caApi', 'processing', 'under16'],
  en: {
    path: 'passport-validity/el-salvador', nav: 'El Salvador', card: 'Passport plus a $12 tourist card; 90 days shared with Guatemala, Honduras and Nicaragua.',
    title: 'Passport Validity El Salvador 2026: $12 Card and CA-4 Days',
    description: 'El Salvador in 2026: a U.S. passport plus a visa or a $12 tourist card bought on arrival, valid 90 or 180 days, and 90 days in total across the CA-4 area.',
    h1: 'Passport for El Salvador: the tourist card and the CA-4 clock',
    intro: 'El Salvador names no minimum validity; what you need on top of the passport is a tourist card, and your days count across four countries.',
    resume: `To enter El Salvador, the State Department says you need a U.S. passport and either a Salvadoran visa or a one-entry tourist card. The tourist card is sold on arrival at the airport or seaport by immigration officials for a $12 fee, and is valid for 90 days or 180 days depending on passport validity and the purpose of travel, so a passport close to expiry can shorten the stay you are given. Under the Central America-4 Border Control Agreement signed in June 2006, U.S. citizens who legally enter El Salvador, Guatemala, Honduras or Nicaragua may travel among the four for up to 90 days in total. Someone arriving in San Salvador on ${d(IN, 'en')} and touring the region reaches the 90th day on ${d(ca4End, 'en')}, unless a one-time extension is granted by local immigration where they are.`,
    faqs: [
      { q: 'How much is the El Salvador tourist card and where do I buy it?', a: 'It costs $12 and immigration officials sell it when you arrive at the airport or a seaport. It is a one-entry card. The State Department adds that it is valid for 90 days or 180 days depending on passport validity and the purpose of travel; extension questions go to Salvadoran immigration by email.' },
      { q: 'Do days in Guatemala count toward my 90 days in El Salvador?', a: 'Yes. Under the CA-4 agreement, U.S. citizens who legally enter El Salvador, Guatemala, Honduras or Nicaragua can move freely among them for up to 90 days total. Staying longer in the region requires a one-time extension from the immigration authority of the country you are in, and an expulsion from one country applies to all four.' },
      { q: 'My child lived in El Salvador over a year: can they fly back with one parent?', a: 'Only with consent. A U.S. citizen minor present in El Salvador for more than one year is considered a resident, and needs written consent from any parent on the birth certificate who is not traveling. It must be notarized by a Salvadoran notary; El Salvador does not accept consent notarized at the U.S. Embassy.' },
    ],
    body: (h) => `
<h2>Validity shapes the card, not the entry</h2>
<p>The page for El Salvador states no minimum months on the U.S. passport. It does say the tourist card lasts 90 or 180 days depending on passport validity, which is the practical reason to travel with plenty of time left: an officer cannot grant a stay longer than your document. Run the checker with your real departure date to see the margin.</p>
<h2>One clock for four countries</h2>
<p>Visitors who combine Santa Ana, Antigua Guatemala and the Bay Islands of Honduras often assume each border restarts the count. It does not. The CA-4 agreement treats El Salvador, Guatemala, Honduras and Nicaragua as one area for the 90 days, and the extension is requested once, from the country you are in when you ask. The ${h.a('country-gt', 'Guatemala')} and ${h.a('country-ho', 'Honduras')} pages explain their own entry rules, which differ: Honduras wants six months of validity.</p>
<h2>Children who live there</h2>
<p>Families who spend long periods in El Salvador should plan the children’s departure early. After a year in the country, a U.S. citizen minor is treated as a resident, and the Salvadoran consent process can be lengthy. A ${h.a('child-passport', 'child’s U.S. passport')} lasts only five years, so check its date at the same time.</p>`,
  },
  es: {
    path: 'vigencia-del-pasaporte/el-salvador', nav: 'El Salvador', card: 'Pasaporte más tarjeta de turista de 12 dólares; 90 días compartidos con Guatemala, Honduras y Nicaragua.',
    title: 'Pasaporte para El Salvador 2026: tarjeta de 12 dólares, CA-4',
    description: 'El Salvador en 2026: pasaporte de EE. UU. más visa o tarjeta de turista de 12 dólares al llegar, válida 90 o 180 días, y 90 días en total en la zona CA-4.',
    h1: 'Pasaporte para El Salvador: la tarjeta de turista y el reloj del CA-4',
    intro: 'El Salvador no fija una vigencia mínima; lo que necesita además del pasaporte es la tarjeta de turista, y sus días cuentan en cuatro países.',
    resume: `Para entrar a El Salvador, el Departamento de Estado dice que necesita un pasaporte de EE. UU. y una visa salvadoreña o una tarjeta de turista de una sola entrada. La tarjeta la venden los agentes de migración al llegar al aeropuerto o al puerto, por 12 dólares, y vale 90 o 180 días según la vigencia del pasaporte y el motivo del viaje: un pasaporte a punto de vencer puede acortar la estancia que le dan. Por el acuerdo de control fronterizo Centroamérica-4, firmado en junio de 2006, los ciudadanos estadounidenses que entran legalmente a El Salvador, Guatemala, Honduras o Nicaragua pueden moverse entre los cuatro hasta 90 días en total. Quien llega a San Salvador el ${d(IN, 'es')} y recorre la región cumple el día 90 el ${d(ca4End, 'es')}, salvo que la migración del país donde esté le conceda una única prórroga.`,
    faqs: [
      { q: '¿Cuánto cuesta la tarjeta de turista de El Salvador y dónde se compra?', a: 'Cuesta 12 dólares y la venden los agentes de migración al llegar al aeropuerto o a un puerto. Es de una sola entrada. El Departamento de Estado agrega que vale 90 o 180 días según la vigencia del pasaporte y el motivo del viaje; las preguntas sobre prórrogas se envían por correo electrónico a la migración salvadoreña.' },
      { q: '¿Los días en Guatemala cuentan para mis 90 días en El Salvador?', a: 'Sí. Por el acuerdo CA-4, los ciudadanos estadounidenses que entran legalmente a El Salvador, Guatemala, Honduras o Nicaragua pueden moverse entre ellos hasta 90 días en total. Para quedarse más en la región hace falta una única prórroga de la migración del país donde esté, y una expulsión de un país vale para los cuatro.' },
      { q: 'Mi hijo vivió más de un año en El Salvador: ¿puede volver con un solo padre?', a: 'Solo con consentimiento. Un menor estadounidense que pasa más de un año en El Salvador se considera residente y necesita el consentimiento escrito del padre o la madre que aparece en el acta de nacimiento y no viaja. Debe notarizarlo un notario salvadoreño; El Salvador no acepta consentimientos notariados en la Embajada de EE. UU.' },
    ],
    body: (h) => `
<h2>La vigencia define la tarjeta, no la entrada</h2>
<p>La ficha de El Salvador no pide meses mínimos en el pasaporte estadounidense. Sí dice que la tarjeta de turista dura 90 o 180 días según la vigencia del pasaporte, y esa es la razón práctica para viajar con tiempo de sobra: el agente no puede darle una estancia más larga que su documento. Ponga en el verificador su fecha real de regreso para ver el margen.</p>
<h2>Un solo reloj para cuatro países</h2>
<p>Quienes combinan Santa Ana, Antigua Guatemala y las islas de la Bahía en Honduras suelen pensar que cada frontera reinicia la cuenta. No es así. El acuerdo CA-4 trata a El Salvador, Guatemala, Honduras y Nicaragua como una sola zona para los 90 días, y la prórroga se pide una vez, en el país donde esté al pedirla. Las páginas de ${h.a('country-gt', 'Guatemala')} y ${h.a('country-ho', 'Honduras')} explican sus propias reglas de entrada, que no son iguales: Honduras pide seis meses de vigencia.</p>
<h2>Los niños que viven allí</h2>
<p>Las familias que pasan temporadas largas en El Salvador deben preparar con tiempo la salida de los hijos. Tras un año en el país, el menor estadounidense es tratado como residente, y el trámite salvadoreño del consentimiento puede tardar. El ${h.a('child-passport', 'pasaporte de un menor')} solo dura cinco años: revise su fecha al mismo tiempo.</p>`,
  },
});
