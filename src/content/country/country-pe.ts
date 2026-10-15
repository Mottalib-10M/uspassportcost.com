import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';
import P from '../../data/params-2026.json';

const d = (iso: string, l: 'en' | 'es') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const ARR = '2027-05-20';
const need = requiredDate('afterEntry', 6, ARR, addDays(ARR, 12));
const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
const mailBy = addDays(ARR, -worst);

export default definePage({
  id: 'country-pe', group: 'country', order: 507, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'PE' },
  data: { country: 'PE' },
  related: ['country-co', 'country-ho', 'guide-when-to-renew', 'passport-validity'],
  sources: ['caApi', 'processing', 'mail'],
  en: {
    path: 'passport-validity/peru', nav: 'Peru', card: 'Six months from the date of entry, or you are refused; keep your entry record.',
    title: 'Passport Validity Peru 2026: Six Months From Entry Date',
    description: 'Peru refuses travelers whose passport has under six months left on the day they enter. Check your dates and the last day to mail a renewal that returns in time.',
    h1: 'Passport for Peru: six months counted from the day you land',
    intro: 'Peru is one of the strictest countries on validity: under six months on arrival day, you are turned back.',
    resume: `Peru requires everyone entering the country to have passports valid for at least six months from the date of entry, and the State Department adds that travelers with less than six months validity will be refused entry. The count starts on the day you arrive in Lima or Cusco, not on the day you leave. For an arrival on ${d(ARR, 'en')}, the passport must still be valid on ${d(need, 'en')}. If it is not, a routine renewal by mail has to leave your hands by ${d(mailBy, 'en')} to be sure of coming back in time, using the slowest published times of ${worst} days door to door. Airlines must return refused travelers to their point of origin, and the U.S. Embassy is unable to assist. Once in Peru, make sure immigration records your entry: without that record you cannot leave until it is confirmed.`,
    faqs: [
      { q: 'What happens if I arrive in Peru with five months left on my passport?', a: 'You will be refused entry. The State Department page says travelers with less than six months validity in their passports will be refused entry into Peru, that airlines must return them to their point of origin, and that the U.S. Embassy cannot help if Peru denies entry. Renew before you fly.' },
      { q: 'Is the six-month rule for Peru counted from arrival or departure?', a: 'From arrival. Peru asks for at least six months of validity from the date of entry into the country. A trip of three weeks does not change the deadline: it is the landing date in Peru, plus six months, that your passport must reach.' },
      { q: 'Why does Peru care about my entry stamp when I leave?', a: 'Because an entry record is required to exit. The State Department says that without a stamp or other record, even at remote land crossings, you will not be allowed to leave until immigration confirms when and where you entered, which can take weeks, with an exit fine and a possible 15-year ban.' },
    ],
    body: (h) => `
<h2>A hard line at the border</h2>
<p>Many countries phrase the six months as advice. Peru does not: its rule is a condition of entry, and a refused traveler goes straight back on the airline that brought them. Someone landing for Machu Picchu with a passport that expires five and a half months later loses the trip at the immigration desk in Lima. The checker above counts from your arrival date and tells you how many days you are short or ahead.</p>
<h2>Working back to a renewal date</h2>
<p>If the result says renew, the clock is the published processing time. A ${h.a('passport-renewal', 'renewal by mail')} has three legs that can each take weeks; mailing by ${h.date(mailBy)} covers the slowest case for a ${h.date(ARR)} landing. Closer to departure, ${h.a('expedited-passport', 'expedited service')} at ${h.usd(P.fees.expedite)} shortens processing, and within ${P.times.urgentDays} days of travel only a passport agency appointment remains.</p>
<h2>Inside Peru</h2>
<p>Border officials decide the length of stay on arrival, and overstays bring fines paid before departure. Report a lost or stolen passport to local police immediately and keep the report: you will need a new passport from the Embassy, and immigration may ask for the police report when you leave.</p>`,
  },
  es: {
    path: 'vigencia-del-pasaporte/peru', nav: 'Perú', card: 'Seis meses desde la fecha de entrada, o le niegan la entrada; guarde el registro.',
    title: 'Vigencia del pasaporte para Perú 2026: seis meses al entrar',
    description: 'Perú rechaza al viajero con menos de seis meses de vigencia el día en que entra. Revise sus fechas y el último día para enviar una renovación a tiempo.',
    h1: 'Pasaporte para Perú: seis meses contados desde el día en que llega',
    intro: 'Perú es de los países más estrictos con la vigencia: con menos de seis meses el día de llegada, lo regresan.',
    resume: `Perú exige a todos los que entran al país un pasaporte vigente al menos seis meses desde la fecha de entrada, y el Departamento de Estado agrega que a quien tenga menos de seis meses se le negará la entrada. La cuenta empieza el día en que llega a Lima o a Cusco, no el día en que se va. Para una llegada el ${d(ARR, 'es')}, el pasaporte debe seguir vigente el ${d(need, 'es')}. Si no lo está, una renovación ordinaria por correo tiene que salir de sus manos a más tardar el ${d(mailBy, 'es')} para regresar con seguridad, con los tiempos publicados más lentos de ${worst} días de puerta a puerta. Las aerolíneas deben devolver a los viajeros rechazados a su punto de origen, y la Embajada de EE. UU. no puede ayudar. Ya en Perú, asegúrese de que Migraciones registre su entrada: sin ese registro no podrá salir hasta que se confirme.`,
    faqs: [
      { q: '¿Qué pasa si llego a Perú con cinco meses de vigencia en el pasaporte?', a: 'Le negarán la entrada. La ficha del Departamento de Estado dice que a quien tenga menos de seis meses de vigencia se le rechaza en Perú, que las aerolíneas deben devolverlo a su punto de origen y que la Embajada de EE. UU. no puede intervenir si Perú le niega la entrada. Renueve antes de volar.' },
      { q: '¿Los seis meses de Perú se cuentan desde la llegada o desde la salida?', a: 'Desde la llegada. Perú pide al menos seis meses de vigencia desde la fecha de entrada al país. Un viaje de tres semanas no cambia el plazo: lo que su pasaporte debe alcanzar es la fecha de aterrizaje en Perú más seis meses.' },
      { q: '¿Por qué Perú revisa el sello de entrada cuando salgo?', a: 'Porque sin registro de entrada no se puede salir. El Departamento de Estado dice que sin sello u otro registro, incluso en pasos fronterizos remotos, no lo dejarán salir hasta que Migraciones confirme cuándo y por dónde entró, lo que puede tardar semanas, con multa de salida y una posible prohibición de 15 años.' },
    ],
    body: (h) => `
<h2>Una línea firme en la frontera</h2>
<p>Muchos países presentan los seis meses como consejo. Perú no: su regla es una condición de entrada, y al viajero rechazado lo devuelve la misma aerolínea que lo trajo. Quien llega para ir a Machu Picchu con un pasaporte que vence cinco meses y medio después pierde el viaje en el control migratorio de Lima. El verificador de arriba cuenta desde su fecha de llegada y le dice cuántos días le faltan o le sobran.</p>
<h2>De la regla a la fecha de renovación</h2>
<p>Si el resultado dice que renueve, el reloj son los tiempos publicados. Una ${h.a('passport-renewal', 'renovación por correo')} tiene tres tramos que pueden durar semanas cada uno; enviarla a más tardar el ${h.date(mailBy)} cubre el caso más lento para llegar el ${h.date(ARR)}. Más cerca de la salida, el ${h.a('expedited-passport', 'servicio urgente')} de ${h.usd(P.fees.expedite)} acorta el trámite, y a ${P.times.urgentDays} días del viaje solo queda una cita en una agencia de pasaportes.</p>
<h2>Ya dentro de Perú</h2>
<p>Los agentes fronterizos deciden al llegar cuánto tiempo puede quedarse, y el exceso se paga con multa antes de salir. Si le roban o pierde el pasaporte, denúncielo de inmediato a la policía y guarde la denuncia: necesitará un pasaporte nuevo de la Embajada, y Migraciones puede pedir esa denuncia al salir.</p>`,
  },
});
