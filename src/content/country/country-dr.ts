import { definePage } from '../../lib/guide-types';
import { addMonths } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';

const d = (iso: string, l: 'en' | 'es') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const CRUISE = '2027-02-14';
const sixAfter = addMonths(CRUISE, 6);

export default definePage({
  id: 'country-dr', group: 'country', order: 502, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'DR' },
  data: { country: 'DR' },
  related: ['country-jm', 'country-bf', 'country-co', 'passport-validity'],
  sources: ['caApi', 'processing'],
  en: {
    path: 'passport-validity/dominican-republic', nav: 'Dominican Republic', card: 'Valid passport, eTicket each way, and a six-month rule for cruise passengers.',
    title: 'Passport Validity Dominican Republic 2026: eTicket, Cruises',
    description: 'Dominican Republic entry in 2026: valid passport, an eTicket each way, a $10 tourist card in the airfare, and a fee for cruise visitors under 6 months.',
    h1: 'Passport for the Dominican Republic: entry, eTicket and the cruise rule',
    intro: 'For flights the Dominican Republic asks for a valid passport; the six months appear only in the rule for cruise passengers who go ashore.',
    resume: `The State Department page for the Dominican Republic does not set a validity minimum for air travelers: visitors need a roundtrip ticket, enough funds and an address where they will stay, and every traveler completes an electronic eTicket for each entry and each exit. The $10 tourist card is included in airline charges and allows stays up to 30 days; longer visits need a visa or an extension from the Migration Department in Santo Domingo, with overstay fines charged at the airport. Six months matter for cruise passengers: those who disembark without a passport valid for 6 months must pay a daily migration escort service fee of approximately $125 USD. A ship calling at Puerto Plata on ${d(CRUISE, 'en')} would therefore want a passport valid until ${d(sixAfter, 'en')} to avoid that charge.`,
    faqs: [
      { q: 'Does the Dominican Republic require six months on my passport?', a: 'For air arrivals, the State Department page lists no minimum: a valid passport plus the eTicket, a return ticket, funds and an address. The six-month figure appears only for cruise passengers who go ashore without a passport valid for 6 months, who must pay a daily migration escort fee of about $125, an amount the page says is subject to change.' },
      { q: 'What is the eTicket for the Dominican Republic?', a: 'It is the required digital form to enter and leave the country, completed for each entry and each exit through the government’s Electronic Ticket portal, which the State Department links. It is free and separate from the $10 tourist card, which airlines include in the price of the ticket.' },
      { q: 'What happens if I stay in the Dominican Republic more than 30 days?', a: 'The tourist card allows up to 30 days. Without a visa or an extension requested from the Migration Department in Santo Domingo, a fine is charged on departure after 30 days, paid at the airport by credit card or through a Banco Reservas deposit. The State Department cites fines from about $56 for one month to more than $1,660.' },
    ],
    body: (h) => `
<h2>Flying in: paperwork, not months</h2>
<p>Most visitors to Punta Cana or Santo Domingo arrive by plane, and for them the Dominican rule is about documents rather than validity. Officers can ask for the return flight, proof that you can pay for the trip and the address of the hotel or house. The eTicket is filled in twice, once to arrive and once to leave. The $10 tourist card does not need any action from you: it is already inside the airfare.</p>
<h2>Cruise stops are where six months count</h2>
<p>Cruise passengers face a different line. A day ashore with a passport that has fewer than six months left triggers a daily escort service fee of roughly $125, according to the State Department. Passengers staying on land for over 24 hours also need a tourist card. If your ship calls there, run the dates in the checker above with the port day as arrival.</p>
<h2>The Haiti land border</h2>
<p>Crossing by land is allowed only at the four official points the page lists, and an entry or exit stamp from Dominican authorities is mandatory. Missing it can mean detention, fines or a ten-year ban. If your passport runs short before a long stay, ${h.a('passport-renewal', 'check your renewal route')} first.</p>`,
  },
  es: {
    path: 'vigencia-del-pasaporte/republica-dominicana', nav: 'República Dominicana', card: 'Pasaporte vigente, eTicket en cada viaje y una regla de seis meses para cruceros.',
    title: 'Vigencia del pasaporte en República Dominicana 2026: eTicket',
    description: 'Entrada a República Dominicana en 2026: pasaporte vigente, eTicket al entrar y salir, tarjeta de turista de 10 dólares en el boleto y tarifa para cruceros.',
    h1: 'Pasaporte para República Dominicana: entrada, eTicket y la regla de los cruceros',
    intro: 'Para quien llega en avión basta un pasaporte vigente; los seis meses aparecen solo en la regla de los pasajeros de crucero que bajan a tierra.',
    resume: `La ficha del Departamento de Estado sobre República Dominicana no fija una vigencia mínima para quien llega en avión: los visitantes necesitan boleto de ida y vuelta, fondos suficientes y una dirección donde quedarse, y todo viajero llena un eTicket electrónico en cada entrada y cada salida. La tarjeta de turista de 10 dólares va incluida en el boleto aéreo y permite quedarse hasta 30 días; las visitas más largas requieren visa o una prórroga de la Dirección de Migración en Santo Domingo, y las multas por exceso se pagan en el aeropuerto. Los seis meses importan en los cruceros: quien baja del barco sin un pasaporte con 6 meses de vigencia paga una tarifa diaria de escolta migratoria de unos 125 dólares. Un barco que atraca en Puerto Plata el ${d(CRUISE, 'es')} pediría entonces un pasaporte vigente hasta el ${d(sixAfter, 'es')} para evitar ese cargo.`,
    faqs: [
      { q: '¿República Dominicana exige seis meses de vigencia en el pasaporte?', a: 'Para quien llega en avión, la ficha del Departamento de Estado no indica mínimo: pasaporte vigente, eTicket, boleto de regreso, fondos y una dirección. Los seis meses solo aparecen para los cruceristas que bajan a tierra sin un pasaporte de 6 meses de vigencia, que pagan una escolta migratoria diaria de unos 125 dólares, monto que puede cambiar.' },
      { q: '¿Qué es el eTicket para viajar a República Dominicana?', a: 'Es el formulario digital obligatorio para entrar y salir del país, que se llena en cada entrada y cada salida en el portal del gobierno que enlaza el Departamento de Estado. Es gratuito y distinto de la tarjeta de turista de 10 dólares, que las aerolíneas ya incluyen en el precio del boleto.' },
      { q: '¿Qué pasa si me quedo en República Dominicana más de 30 días?', a: 'La tarjeta de turista permite hasta 30 días. Sin visa ni prórroga de la Dirección de Migración en Santo Domingo, al salir se cobra una multa a partir de los 30 días, en el aeropuerto con tarjeta o con depósito en Banco Reservas. El Departamento de Estado cita multas desde unos 56 dólares por un mes hasta más de 1660.' },
    ],
    body: (h) => `
<h2>En avión: papeles, no meses</h2>
<p>Casi todos los que visitan a la familia en Santiago o pasan unos días en Punta Cana llegan en avión, y para ellos la regla dominicana trata de documentos más que de vigencia. Migración puede pedir el vuelo de regreso, la prueba de que puede pagar el viaje y la dirección del hotel o de la casa. El eTicket se llena dos veces, una para llegar y otra para irse. La tarjeta de turista no le exige nada: ya está dentro del boleto.</p>
<h2>En crucero sí cuentan los seis meses</h2>
<p>Los cruceristas tienen otra regla. Bajar a tierra con un pasaporte al que le quedan menos de seis meses genera una tarifa diaria de escolta de unos 125 dólares, según el Departamento de Estado. Quien se queda en tierra más de 24 horas necesita además la tarjeta de turista. Si su barco hace escala allí, ponga en el verificador el día del puerto como fecha de llegada.</p>
<h2>La frontera con Haití</h2>
<p>Por tierra solo se cruza por los cuatro puntos oficiales que lista la ficha, y el sello de entrada o salida de las autoridades dominicanas es obligatorio. Sin él puede haber detención, multas o una prohibición de diez años. Si su pasaporte se queda corto antes de una estancia larga, ${h.a('passport-renewal', 'revise cómo renovarlo')} primero.</p>`,
  },
});
