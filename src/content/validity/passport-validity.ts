import { definePage } from '../../lib/guide-types';
import { requiredDate } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import C from '../../data/countries.json';
import P from '../../data/params-2026.json';

const d = (iso: string, l: 'en' | 'es') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const A = '2027-04-05', D = '2027-04-19';
const six = requiredDate('afterEntry', 6, A, D);
const schengen = requiredDate('afterDeparture', 3, A, D);
const sixCount = C.list.filter((c) => c.months === 6).length;
const entryCount = C.list.filter((c) => c.kind === 'entry').length;
const N = C.list.length;
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);

export default definePage({
  id: 'passport-validity', group: 'validity', order: 400,
  tool: { kind: 'validity', country: 'PE' },
  data: { countries: true },
  related: ['country-pe', 'country-th', 'country-fr', 'country-mx', 'guide-when-to-renew', 'passport-renewal'],
  sources: ['caApi', 'countryPH', 'countryIN', 'schengen', 'processing', 'online'],
  en: {
    path: 'passport-validity', nav: 'Passport validity by country', card: `Six months, three months or the whole stay: the rule of ${N} destinations.`,
    title: `Passport Validity 2026: 6-Month Rule for ${N} Destinations`,
    description: `Passport validity rules by destination: ${sixCount} of ${N} countries ask for six months, Schengen for three after you leave. Enter your expiry date and trip dates.`,
    h1: 'Passport validity by destination: the six-month rule and the others',
    intro: 'Enter your expiration date and trip dates: the checker applies the rule the State Department lists for your destination and says when to renew.',
    resume: `There is no single six-month rule for U.S. passports. Each country sets its own requirement, and the State Department’s country pages describe five kinds. Some want six months of validity counted from the day you arrive: among the ${N} destinations covered here, that is the case of Peru, Türkiye, the United Arab Emirates, Honduras, Thailand and China. Vietnam and the Philippines count six months from the end of your stay, and India six months from the date you apply for its visa. The Schengen countries count three months after you leave the area, and the State Department advises six months for France, Spain, Germany and Greece. Japan, the United Kingdom and Costa Rica only require validity for the whole stay, while ${entryCount} destinations, Mexico and Canada among them, ask for a passport valid on entry. For a trip from ${d(A, 'en')} to ${d(D, 'en')}, a six-months-from-arrival country needs a passport valid until ${d(six, 'en')}, and a Schengen country until ${d(schengen, 'en')}.`,
    faqs: [
      { q: 'Does every country require six months of passport validity?', a: `No. Of the ${N} destinations on this site, ${sixCount} ask for six months, counted from entry or from the end of the stay. The Schengen area asks for three months after departure, Japan and the United Kingdom for the length of the stay, and Mexico, Canada or Guatemala only for a passport valid when you arrive. Airlines may still refuse boarding on a stricter reading.` },
      { q: 'Is the six months counted from arrival or from departure?', a: `It depends on the country, which is why the checker asks for both dates. Peru, Thailand, the UAE and Türkiye count from the date of entry. Vietnam and the Philippines count from the end of the planned stay, India from the visa application. The Schengen three months run from the day you leave the last Schengen country, so a two-week trip moves the deadline by two weeks.` },
      { q: 'How early should I renew if my passport is too short for a trip?', a: `With the slowest published routine times, ${P.times.mailInMaxWeeks} weeks of mail each way plus ${P.times.routineWeeks[1]} weeks of processing, a mailed renewal can take ${worst} days door to door. The checker gives the last mailing date that still returns the new passport before your arrival; inside that window, expedited service or an agency appointment is the only way left.` },
    ],
    body: (h) => `
<h2>Five ways countries count validity</h2>
<p>The State Department’s country information pages, which this site reads through the Consular Affairs data service (and, for the Philippines and India, on the country page itself), use five different measures. The strictest counts forward from the day you land: six months after entry in Peru, where travelers with less are refused, and in Türkiye, the Emirates, Honduras, Thailand and China. Vietnam and the Philippines are stricter still in practice, since their six months start when your planned stay ends. India counts from the day you apply for its visa, before the trip. Europe’s Schengen area uses three months after the date you intend to leave the area, a rule that applies once across all its members. Finally, some countries simply want the passport valid while you are there, or on the day you cross the border.</p>
<p>The table below this text lists the rule for each of the ${N} destinations, with the State Department’s advice where it goes further than the legal minimum. Each country has its own page with the official wording quoted word for word and the date that wording was last updated.</p>
<h2>Why the airline matters as much as the border</h2>
<p>Check-in agents apply the destination’s rule before you board, and they often read it strictly. Japan’s page notes that airlines there may refuse travelers whose passport has less than six months left, even though Japan itself only requires validity for the stay. A connection adds the rule of the transit country. When you are near any threshold, ${h.a('passport-renewal', 'renewing first')} is cheaper than a missed flight.</p>
<h2>Turning the rule into a renewal date</h2>
<p>The checker subtracts the slowest published routine path, mail both ways plus processing, from your arrival date. If that day has passed, ${h.a('expedited-passport', 'expedited service')} or an appointment at a passport agency within ${P.times.urgentDays} days of travel are the remaining options. Online renewal needs ${P.online.noTravelWeeks} weeks without travel, so it rarely fits a short deadline.</p>`,
  },
  es: {
    path: 'vigencia-del-pasaporte', nav: 'Vigencia del pasaporte por país', card: `Seis meses, tres meses o toda la estancia: la regla de ${N} destinos.`,
    title: 'Vigencia del pasaporte 2026: regla de 6 meses por destino',
    description: `Vigencia del pasaporte por destino: ${sixCount} de ${N} países piden seis meses y Schengen tres después de salir. Ponga su fecha de vencimiento y las de su viaje.`,
    h1: 'Vigencia del pasaporte por destino: la regla de los seis meses y las demás',
    intro: 'Escriba la fecha de vencimiento y las de su viaje: el verificador aplica la regla que indica el Departamento de Estado para su destino y le dice cuándo renovar.',
    resume: `No existe una sola regla de seis meses para el pasaporte estadounidense. Cada país fija su exigencia, y las fichas del Departamento de Estado describen cinco tipos. Algunos piden seis meses de vigencia contados desde el día de llegada: entre los ${N} destinos de este sitio, es el caso de Perú, Turquía, los Emiratos Árabes Unidos, Honduras, Tailandia y China. Vietnam y Filipinas cuentan seis meses desde el final de la estancia, y la India seis meses desde la fecha en que pide su visa. Los países Schengen cuentan tres meses después de salir de la zona, y el Departamento recomienda seis para Francia, España, Alemania y Grecia. Japón, el Reino Unido y Costa Rica solo exigen vigencia durante toda la estancia, y ${entryCount} destinos, entre ellos México y Canadá, piden un pasaporte vigente al entrar. Para un viaje del ${d(A, 'es')} al ${d(D, 'es')}, un país de seis meses desde la llegada exige un pasaporte vigente hasta el ${d(six, 'es')}, y un país Schengen hasta el ${d(schengen, 'es')}.`,
    faqs: [
      { q: '¿Todos los países exigen seis meses de vigencia en el pasaporte?', a: `No. De los ${N} destinos de este sitio, ${sixCount} piden seis meses, contados desde la entrada o desde el fin de la estancia. El espacio Schengen pide tres meses después de la salida, Japón y el Reino Unido la duración de la estancia, y México, Canadá o Guatemala solo un pasaporte vigente al llegar. La aerolínea puede aplicar una lectura más estricta al embarcar.` },
      { q: '¿Los seis meses se cuentan desde la llegada o desde la salida?', a: `Depende del país, por eso el verificador pide las dos fechas. Perú, Tailandia, los Emiratos y Turquía cuentan desde la fecha de entrada. Vietnam y Filipinas cuentan desde el final de la estancia prevista, la India desde la solicitud de visa. Los tres meses de Schengen corren desde el día en que sale del último país Schengen, así que un viaje de dos semanas mueve el plazo dos semanas.` },
      { q: '¿Con cuánta anticipación renuevo si mi pasaporte no alcanza para el viaje?', a: `Con los tiempos ordinarios publicados más lentos, ${P.times.mailInMaxWeeks} semanas de correo en cada sentido y ${P.times.routineWeeks[1]} de trámite, una renovación por correo puede tardar ${worst} días de puerta a puerta. El verificador da el último día de envío que todavía trae el pasaporte nuevo antes de la llegada; después de esa fecha solo quedan el servicio urgente o una cita en agencia.` },
    ],
    body: (h) => `
<h2>Cinco maneras de contar la vigencia</h2>
<p>Las fichas de país del Departamento de Estado, que este sitio lee en el servicio de datos de Asuntos Consulares (y, para Filipinas y la India, en la propia ficha del país), usan cinco medidas distintas. La más estricta cuenta hacia adelante desde el día en que aterriza: seis meses después de la entrada en Perú, donde rechazan a quien tenga menos, y en Turquía, los Emiratos, Honduras, Tailandia y China. Vietnam y Filipinas son todavía más exigentes en la práctica, porque sus seis meses empiezan cuando termina la estancia prevista. La India cuenta desde el día en que pide su visa, antes del viaje. El espacio Schengen usa tres meses después de la fecha en que piensa salir de la zona, una regla que vale una sola vez para todos sus miembros. Por último, algunos países solo quieren que el pasaporte esté vigente mientras usted esté allí, o el día en que cruza la frontera.</p>
<p>La tabla bajo este texto da la regla de cada uno de los ${N} destinos, con la recomendación del Departamento cuando va más allá del mínimo legal. Cada país tiene su página con el texto oficial citado palabra por palabra y la fecha de su última actualización.</p>
<h2>La aerolínea cuenta tanto como la frontera</h2>
<p>En el mostrador aplican la regla del destino antes de que suba al avión, y a menudo la leen al pie de la letra. La ficha de Japón advierte que las aerolíneas pueden negar el embarque si al pasaporte le quedan menos de seis meses, aunque Japón solo exija vigencia durante la estancia. Una escala suma la regla del país de tránsito. Si está cerca de cualquier límite, ${h.a('passport-renewal', 'renovar antes')} cuesta menos que perder un vuelo.</p>
<h2>De la regla a una fecha de renovación</h2>
<p>El verificador resta a la fecha de llegada el camino ordinario publicado más lento, correo de ida y vuelta más trámite. Si ese día ya pasó, quedan el ${h.a('expedited-passport', 'servicio urgente')} o una cita en una agencia a ${P.times.urgentDays} días del viaje. La renovación en línea exige ${P.online.noTravelWeeks} semanas sin viajar, así que rara vez sirve con un plazo corto.</p>`,
  },
});
