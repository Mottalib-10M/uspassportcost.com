import { definePage } from '../../lib/guide-types';
import { cost, legs } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const F = P.fees, T = P.times;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const renew = cost({ situation: 'renew-mail', doc: 'book', service: 'expedited', delivery: true, fileSearch: false });
const first = cost({ situation: 'first', doc: 'book', service: 'expedited', delivery: true, fileSearch: false });
const l = legs({ situation: 'first', doc: 'book', service: 'expedited', delivery: true });
const worst = l.mailIn[1] + l.processing[1] + l.mailOut[1];

export default definePage({
  id: 'expedited-passport', group: 'speed', order: 310,
  tool: { kind: 'passport', situation: 'renew-mail', service: 'expedited', delivery: true, focus: 'date' },
  related: ['guide-expedite-worth-it', 'guide-expedite-refund', 'passport-appointment', 'guide-expediters', 'passport-1-3-day-delivery'],
  sources: ['getFast', 'processing', 'refund', 'feeChart'],
  en: {
    path: 'expedited-passport', nav: 'Expedited passport', card: `${$(F.expedite, 'en')} for ${T.expeditedWeeks.join('-')} weeks of processing; ${$(renew.total, 'en')} for a fully sped-up renewal.`,
    title: `Expedited Passport 2026: ${$(F.expedite, 'en')} Fee, ${T.expeditedWeeks.join('-')} Weeks, Total Cost`,
    description: `An expedited passport costs ${$(F.expedite, 'en')} more and takes ${T.expeditedWeeks.join(' to ')} weeks of processing. With 1-3 day delivery a renewal totals ${$(renew.total, 'en')}, a first book ${$(first.total, 'en')}. See your date.`,
    h1: 'Expedited passport: cost and how fast it is',
    intro: 'Expediting is a State Department service, sold only by the State Department, for one fixed fee. It shortens processing, not the mail.',
    resume: `Expedited service costs ${$(F.expedite, 'en')} per application, paid to the U.S. Department of State on the same check as the application fee, and cuts processing to ${T.expeditedWeeks[0]} to ${T.expeditedWeeks[1]} weeks instead of ${T.routineWeeks[0]} to ${T.routineWeeks[1]}. The State Department recommends it when you travel in less than 6 weeks. It does not include mail: add up to ${T.mailInMaxWeeks} weeks for the application to arrive and up to ${T.mailOutMaxWeeks} weeks for the return, or ${$(F.delivery, 'en')} for 1-3 day delivery. An expedited renewal by mail with fast delivery costs ${$(renew.total, 'en')} and can take up to ${worst} days door to door; a first adult book, ${$(first.total, 'en')} with the facility fee. You can expedite at an acceptance facility or on a mail renewal by writing “EXPEDITE” on the envelope, but not online. The Department commits to process expedited applications within ${T.expediteCommitmentBusinessDays} business days of receipt; if it does not, you may ask for the ${$(F.expedite, 'en')} back.`,
    faqs: [
      { q: 'How much does it cost to expedite a passport in 2026?', a: `${$(F.expedite, 'en')} per application, added to the State Department check. Most people also add ${$(F.delivery, 'en')} for 1-3 day return delivery, so an expedited mail renewal comes to ${$(renew.total, 'en')} and a first adult passport to ${$(first.total, 'en')} including the ${$(F.execution, 'en')} facility fee. No other fee makes processing faster.` },
      { q: 'Can I upgrade a routine application to expedited after mailing it?', a: 'Yes. The State Department’s refund page says expedited processing times begin the day it gets your application at a passport agency or the day you request an upgrade from routine to expedited service. Call 877-487-2778 to request it; the upgrade carries the same expedite fee.' },
      { q: 'Is a private expediting company faster than paying the $60?', a: `A courier can carry your file to an agency, but processing is still done by the State Department, and the government fees remain the same. Couriers charge their own fees on top, and the State Department refunds only its ${$(F.expedite, 'en')} expedite fee, never a courier’s. This site sells no such service.` },
    ],
    body: (h) => `
<h2>What the ${h.usd(F.expedite)} buys</h2>
<p>Expedited service moves your application into a faster processing stream at the agency: ${T.expeditedWeeks[0]} to ${T.expeditedWeeks[1]} weeks instead of ${T.routineWeeks[0]} to ${T.routineWeeks[1]}. It comes with a written commitment of ${T.expediteCommitmentBusinessDays} business days, counted from the day the agency receives the file, and a refund of the fee if that is missed. The ${h.a('guide-expedite-refund', 'refund guide')} counts the business days, holidays excluded.</p>
<h2>Pairing it with the mail options</h2>
<p>Because processing is only one leg, an expedited application mailed in a standard envelope can still take ${T.mailInMaxWeeks} weeks to arrive. The calculator shows the effect of each option on the latest date. With expedited service and 1-3 day delivery, the worst case is ${worst} days; with Priority Mail Express bought at the facility, the outbound leg also shrinks, at a price the facility sets.</p>
<h2>When expediting is not enough</h2>
<p>Within ${T.urgentDays} days of travel, or ${T.urgentVisaDays} days if you need a foreign visa, the State Department sends you to an ${h.a('passport-appointment', 'agency appointment')}. Expedite before that window; once inside it, the appointment is the faster path, and the ${h.usd(F.expedite)} is charged there anyway.</p>`,
  },
  es: {
    path: 'pasaporte-urgente', nav: 'Pasaporte urgente', card: `${$(F.expedite, 'es')} por ${T.expeditedWeeks.join(' a ')} semanas de trámite; ${$(renew.total, 'es')} una renovación acelerada.`,
    title: `Pasaporte urgente 2026: ${$(F.expedite, 'es')}, ${T.expeditedWeeks.join(' a ')} semanas y costo total`,
    description: `El pasaporte urgente cuesta ${$(F.expedite, 'es')} más y tarda ${T.expeditedWeeks.join(' a ')} semanas de trámite. Con entrega en 1-3 días, renovar cuesta ${$(renew.total, 'es')} y la primera libreta de adulto ${$(first.total, 'es')}.`,
    h1: 'Pasaporte urgente: costo y rapidez',
    intro: 'El servicio urgente es del Departamento de Estado, lo vende solo el Departamento y tiene una tarifa fija. Acorta el trámite, no el correo.',
    resume: `El servicio urgente cuesta ${$(F.expedite, 'es')} por solicitud, que se pagan al Departamento de Estado en el mismo cheque que la tarifa de solicitud, y reduce el trámite a ${T.expeditedWeeks[0]} a ${T.expeditedWeeks[1]} semanas en lugar de ${T.routineWeeks[0]} a ${T.routineWeeks[1]}. El Departamento lo recomienda cuando viaja en menos de 6 semanas. No incluye el correo: sume hasta ${T.mailInMaxWeeks} semanas para que llegue la solicitud y hasta ${T.mailOutMaxWeeks} para el regreso, o ${$(F.delivery, 'es')} por la entrega en 1 a 3 días. Una renovación urgente por correo con entrega rápida cuesta ${$(renew.total, 'es')} y puede tardar hasta ${worst} días de puerta a puerta; una primera libreta de adulto, ${$(first.total, 'es')} con la tarifa del centro. Puede pedir el urgente en un centro de aceptación o en una renovación por correo escribiendo “EXPEDITE” en el sobre, pero no en línea. El Departamento se compromete a procesar las solicitudes urgentes en ${T.expediteCommitmentBusinessDays} días hábiles desde que las recibe; si no lo cumple, puede pedir que le devuelvan los ${$(F.expedite, 'es')}.`,
    faqs: [
      { q: '¿Cuánto cuesta pedir el pasaporte urgente en 2026?', a: `${$(F.expedite, 'es')} por solicitud, sumados al cheque del Departamento de Estado. La mayoría agrega ${$(F.delivery, 'es')} por la entrega en 1 a 3 días, así que una renovación urgente por correo llega a ${$(renew.total, 'es')} y un primer pasaporte de adulto a ${$(first.total, 'es')} con la tarifa del centro de ${$(F.execution, 'es')}. Ninguna otra tarifa acelera el trámite.` },
      { q: '¿Puedo cambiar a urgente una solicitud ordinaria ya enviada?', a: 'Sí. La página de reembolsos del Departamento de Estado dice que el plazo urgente empieza el día en que recibe la solicitud en una agencia o el día en que usted pide pasar de servicio ordinario a urgente. Llame al 877-487-2778 para pedirlo; el cambio lleva la misma tarifa urgente.' },
      { q: '¿Una empresa gestora es más rápida que pagar los 60 dólares?', a: `Un mensajero puede llevar su expediente a una agencia, pero el trámite lo hace igual el Departamento de Estado y las tarifas del gobierno no cambian. Las empresas cobran sus propias tarifas encima, y el Departamento solo devuelve sus ${$(F.expedite, 'es')} del urgente, nunca lo que cobra una empresa. Este sitio no vende ese servicio.` },
    ],
    body: (h) => `
<h2>Lo que compran los ${h.usd(F.expedite)}</h2>
<p>El servicio urgente pasa su solicitud a una vía de trámite más rápida en la agencia: ${T.expeditedWeeks[0]} a ${T.expeditedWeeks[1]} semanas en lugar de ${T.routineWeeks[0]} a ${T.routineWeeks[1]}. Viene con un compromiso escrito de ${T.expediteCommitmentBusinessDays} días hábiles desde que la agencia recibe el expediente, y con el reembolso de la tarifa si no se cumple. La ${h.a('guide-expedite-refund', 'guía del reembolso')} cuenta los días hábiles sin feriados.</p>
<h2>Combinarlo con las opciones de correo</h2>
<p>Como el trámite es solo un tramo, una solicitud urgente enviada en un sobre normal puede tardar ${T.mailInMaxWeeks} semanas en llegar. La calculadora muestra el efecto de cada opción en la fecha más tardía. Con servicio urgente y entrega en 1 a 3 días, el peor caso es de ${worst} días; con Priority Mail Express comprado en el centro, el tramo de ida también se acorta, al precio que fije el centro.</p>
<h2>Cuando el urgente no basta</h2>
<p>A ${T.urgentDays} días o menos del viaje, o ${T.urgentVisaDays} si necesita una visa extranjera, el Departamento de Estado lo envía a una ${h.a('passport-appointment', 'cita en agencia')}. Pida el urgente antes de esa ventana; dentro de ella, la cita es el camino más rápido, y allí también se cobran los ${h.usd(F.expedite)}.</p>`,
  },
});
