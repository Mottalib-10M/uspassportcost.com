import { definePage } from '../../lib/guide-types';
import { cost } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const F = P.fees, T = P.times;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const first = cost({ situation: 'first', doc: 'book', service: 'agency', delivery: false, fileSearch: false });
const renew = cost({ situation: 'renew-mail', doc: 'book', service: 'agency', delivery: false, fileSearch: false });

export default definePage({
  id: 'passport-appointment', group: 'speed', order: 320,
  tool: { kind: 'passport', situation: 'first', service: 'agency', focus: 'cost' },
  related: ['expedited-passport', 'lost-or-stolen-passport', 'passport-processing-time', 'where-to-apply'],
  sources: ['appointment', 'lifeDeath', 'getFast', 'feesPage'],
  en: {
    path: 'passport-appointment-urgent-travel', nav: 'Urgent travel appointment', card: `Within ${T.urgentDays} days of travel: ${P.network.agencies} agencies, free appointments, ${$(first.total, 'en')} for a first book.`,
    title: `Passport Appointment for Urgent Travel 2026: ${T.urgentDays}-Day Rule`,
    description: `Traveling within ${T.urgentDays} days, or ${T.urgentVisaDays} with a foreign visa? Book a free passport agency appointment. A first adult book costs ${$(first.total, 'en')} there, a renewal ${$(renew.total, 'en')}, by card.`,
    h1: 'Passport agency appointment for urgent travel',
    intro: 'When the trip is too close for mail, the State Department’s own agencies issue passports by appointment. The rules are strict and the appointment is free.',
    resume: `The State Department runs ${P.network.agencies} passport agencies and centers across the country, from Boston to Honolulu and San Juan. They take appointments when you have international travel within ${T.urgentDays} calendar days, or need a foreign visa within ${T.urgentVisaDays} days, and require proof of travel such as a ticket or hotel reservation. For a life-or-death emergency, the death, hospice care or life-threatening illness of an immediate family member abroad, there is a separate emergency appointment within 14 days. Appointments are free: the State Department says any request to pay for one should be considered fraudulent, and it may not honor appointments booked through third parties. At the agency, the ${$(F.expedite, 'en')} expedite fee is always charged and fees are paid by card: ${$(first.total, 'en')} for a first adult book including the ${$(F.execution, 'en')} execution fee, ${$(renew.total, 'en')} for a renewal. Book through the Online Passport Appointment System, up to seven people per household.`,
    faqs: [
      { q: 'How soon before my trip can I get a passport agency appointment?', a: `Within ${T.urgentDays} calendar days of your international travel date, or within ${T.urgentVisaDays} days if you need a foreign visa first. Earlier than that, the State Department expects you to apply at an acceptance facility or renew by mail, with expedited service if the trip is less than six weeks away.` },
      { q: 'Do I have to pay to book a passport appointment?', a: 'No. The State Department does not charge to make appointments and says a request to pay for one should be considered fraudulent. It is not affiliated with third-party booking services and may not honor appointments made through them. Book online or, if you already applied, by phone at 877-487-2778.' },
      { q: 'Who counts as immediate family for a life-or-death passport appointment?', a: 'Parents or legal guardians, children, spouses, siblings and grandparents. Aunts, uncles, cousins and other relatives do not qualify, and neither does travel abroad for your own medical care. You need documentation such as a death certificate or a hospital letter, translated if not in English, and proof of travel within two weeks.' },
    ],
    body: (h) => `
<h2>What to bring to the agency</h2>
<p>The same documents as any application, plus proof of the trip. A first passport still means Form DS-11, citizenship evidence, a photo ID and a photo; a renewal means Form DS-82 and the old passport. Bring the confirmation details the system gives you: the agency checks them on the day, and an appointment cannot be transferred to someone else. The calculator above prices the visit with the expedite fee included, since agencies charge it in every case.</p>
<h2>If you already applied</h2>
<p>When an application is already in process and your plans become urgent, you do not book online; you call. The State Department checks whether the passport can be issued before your travel and, if not, makes the appointment itself. The first two digits of your nine-digit application locator number tell which agency or center holds your file.</p>
<h2>Avoiding the agency</h2>
<p>An appointment is the last resort, not a shortcut: slots may not be available right away. Using the ${h.a('guide-apply-ahead', 'apply-ahead calculator')} to file at least ${Math.ceil((7 * (T.mailInMaxWeeks + T.routineWeeks[1] + T.mailOutMaxWeeks)) / 7)} weeks before a trip keeps you out of this situation, and ${h.a('expedited-passport', 'expedited service')} covers most trips between three and six weeks away.</p>`,
  },
  es: {
    path: 'cita-pasaporte-viaje-urgente', nav: 'Cita para viaje urgente', card: `A ${T.urgentDays} días del viaje: ${P.network.agencies} agencias, citas gratuitas, ${$(first.total, 'es')} la primera libreta.`,
    title: `Cita de pasaporte para viaje urgente 2026: regla de ${T.urgentDays} días`,
    description: `¿Viaja en ${T.urgentDays} días, o ${T.urgentVisaDays} con visa extranjera? Pida una cita gratuita en una agencia. Allí la primera libreta cuesta ${$(first.total, 'es')} y renovar ${$(renew.total, 'es')}, todo con tarjeta.`,
    h1: 'Cita en una agencia de pasaportes por viaje urgente',
    intro: 'Cuando el viaje está demasiado cerca para el correo, las agencias del Departamento de Estado emiten pasaportes con cita. Las reglas son estrictas y la cita es gratis.',
    resume: `El Departamento de Estado tiene ${P.network.agencies} agencias y centros de pasaportes, de Boston a Honolulu y San Juan. Atienden con cita cuando tiene un viaje internacional en ${T.urgentDays} días naturales o menos, o necesita una visa extranjera en ${T.urgentVisaDays} días, y piden prueba del viaje, como un boleto o una reserva de hotel. Para una emergencia de vida o muerte, la muerte, los cuidados paliativos o una enfermedad grave de un familiar directo en el extranjero, hay una cita de emergencia aparte dentro de 14 días. Las citas son gratis: el Departamento dice que cualquier pedido de pago por una cita debe considerarse un fraude, y puede no respetar las citas hechas por terceros. En la agencia siempre se cobran los ${$(F.expedite, 'es')} del servicio urgente y se paga con tarjeta: ${$(first.total, 'es')} por una primera libreta de adulto con la tarifa de ejecución de ${$(F.execution, 'es')}, ${$(renew.total, 'es')} por una renovación. Se reserva en el sistema de citas en línea, hasta siete personas por hogar.`,
    faqs: [
      { q: '¿Con cuánta anticipación puedo pedir cita en una agencia de pasaportes?', a: `Dentro de los ${T.urgentDays} días naturales anteriores a su viaje internacional, o de ${T.urgentVisaDays} días si antes necesita una visa extranjera. Antes de eso, el Departamento de Estado espera que solicite en un centro de aceptación o renueve por correo, con servicio urgente si el viaje es en menos de seis semanas.` },
      { q: '¿Hay que pagar para reservar una cita de pasaporte?', a: 'No. El Departamento de Estado no cobra por las citas y dice que un pedido de pago debe considerarse fraude. No tiene relación con servicios de reserva de terceros y puede no respetar las citas hechas por ellos. Reserve en línea o, si ya presentó la solicitud, por teléfono al 877-487-2778.' },
      { q: '¿Quién cuenta como familiar directo para una cita de vida o muerte?', a: 'Padres o tutores legales, hijos, cónyuges, hermanos y abuelos. Tíos, primos y otros parientes no cuentan, y tampoco un viaje para recibir atención médica propia. Necesita documentos como un acta de defunción o una carta del hospital, traducidos si no están en inglés, y prueba de un viaje dentro de dos semanas.' },
    ],
    body: (h) => `
<h2>Qué llevar a la agencia</h2>
<p>Los mismos documentos que cualquier solicitud, más la prueba del viaje. Un primer pasaporte sigue siendo el DS-11, la prueba de ciudadanía, una identificación con foto y una foto; una renovación, el DS-82 y el pasaporte anterior. Lleve los datos de confirmación que le da el sistema: la agencia los revisa ese día, y una cita no se puede pasar a otra persona. La calculadora de arriba calcula la visita con la tarifa urgente incluida, porque las agencias la cobran siempre.</p>
<h2>Si ya presentó la solicitud</h2>
<p>Cuando su solicitud ya está en trámite y el viaje se vuelve urgente, no reserva en línea: llama. El Departamento revisa si puede emitir el pasaporte antes del viaje y, si no, hace la cita por usted. Los dos primeros dígitos de su número de localizador de nueve cifras indican qué agencia o centro tiene su expediente.</p>
<h2>Cómo evitar la agencia</h2>
<p>La cita es el último recurso, no un atajo: puede que no haya turnos disponibles enseguida. Usar la ${h.a('guide-apply-ahead', 'calculadora de anticipación')} para solicitar al menos ${Math.ceil((7 * (T.mailInMaxWeeks + T.routineWeeks[1] + T.mailOutMaxWeeks)) / 7)} semanas antes del viaje lo mantiene lejos de esta situación, y el ${h.a('expedited-passport', 'servicio urgente')} cubre la mayoría de los viajes que están a entre tres y seis semanas.</p>`,
  },
});
