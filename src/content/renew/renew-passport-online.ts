import { definePage } from '../../lib/guide-types';
import { cost, legs } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const F = P.fees, T = P.times, O = P.online;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const on = cost({ situation: 'renew-online', doc: 'book', service: 'routine', delivery: true, fileSearch: false });
const l = legs({ situation: 'renew-online', doc: 'book', service: 'routine', delivery: false });
const worst = l.mailIn[1] + l.processing[1] + l.mailOut[1];

export default definePage({
  id: 'renew-passport-online', group: 'renew', order: 210,
  tool: { kind: 'renew', focus: 'online' },
  related: ['passport-renewal', 'guide-when-to-renew', 'passport-processing-time', 'guide-expediters'],
  sources: ['online', 'mail', 'photos', 'feesPage'],
  en: {
    path: 'renew-passport-online', nav: 'Renew online', card: `${$(F.book.adult, 'en')} by card, routine only, age ${O.minAge}+, no travel for ${O.noTravelWeeks} weeks.`,
    title: `Renew Passport Online 2026: Eligibility, ${$(F.book.adult, 'en')} by Card`,
    description: `Online passport renewal costs ${$(F.book.adult, 'en')} for a book in 2026, paid by card. You must be ${O.minAge}+, renew within the 1-year window and wait ${O.noTravelWeeks} weeks to travel. Check yours.`,
    h1: 'Renew your passport online: who qualifies',
    intro: 'Online renewal saves the envelope and the first leg of mail, but its rules are narrower than renewal by mail. The checker tests all of them.',
    resume: `Online passport renewal, on the State Department’s own site opr.travel.state.gov, costs the same as by mail: ${$(F.book.adult, 'en')} for a book, ${$(F.card.adult, 'en')} for a card and ${$(F.both.adult, 'en')} for both, plus ${$(F.delivery, 'en')} if you want 1-3 day delivery, paid by credit or debit card. You qualify only if all of these hold: the passport you renew is or was valid for 10 years; it expires within ${O.expiringWithinYears} year or expired less than ${O.expiredLessThanYears} years ago; you are ${O.minAge} or older; you are not changing personal information such as your name or sex; you will not travel for at least ${O.noTravelWeeks} weeks after you submit; you are in a U.S. state or territory; and you have the passport with you, undamaged and never reported lost or stolen. Online renewals cannot be expedited. You upload a digital photo, keep the old passport, and it is canceled as soon as you submit. With no outbound mail, the routine wait is ${T.routineWeeks[0]} to ${T.routineWeeks[1]} weeks plus the return mail, up to ${worst} days.`,
    faqs: [
      { q: 'Why can’t I renew my passport online if it expires in two years?', a: `Because online renewal opens only ${O.expiringWithinYears} year before the expiration date. Until then you can renew by mail on Form DS-82, which has no such one-year window, at the same ${$(F.book.adult, 'en')}. The online window also closes ${O.expiredLessThanYears} years after expiration.` },
      { q: 'Is opr.travel.state.gov the only official online renewal site?', a: 'Yes. The State Department says the only authorized place to renew a U.S. passport online is opr.travel.state.gov, that nobody else can sign and submit your online application, and that sites with “Gov” in their name or ending in .com, .us or .org are not authorized. Such companies charge extra fees and put your data at risk.' },
      { q: 'Can I travel while my online renewal is processing?', a: 'No, not on the old passport. It is canceled when you submit the online application and can no longer be used for international travel. If your plans change and you must travel sooner, call 877-487-2778 to ask for expedited service or 1-3 day delivery of the new book.' },
      { q: 'Can I switch from a card to a book when renewing online?', a: 'Partly. Online you can renew a book into a book, a card into a card, either into both documents, but not a card into a book alone or a book into a card alone. Those two changes are made by mail with Form DS-82.' },
    ],
    body: (h) => `
<h2>The rule people miss: six weeks without travel</h2>
<p>The online form is routine service only, and the State Department asks you to have no trip planned for at least ${O.noTravelWeeks} weeks from the day you submit. The old passport is canceled at submission, so there is no fallback document. The checker flags a trip date inside that period; the full calculator then shows the mail renewal with expedited service as the alternative, at ${h.usd(F.book.adult + F.expedite)} or more.</p>
<h2>What it costs, and what it saves</h2>
<p>The fee is identical to the mail renewal. The saving is time and paper: no check, no envelope, no post office, and no outbound mail leg of up to ${T.mailInMaxWeeks} weeks. With 1-3 day delivery, an online book renewal comes to ${h.usd2(on.total)}, charged to your card. You still need a digital photo that meets the same rules as a printed one.</p>
<h2>Unofficial renewal sites</h2>
<p>Several companies sell “online passport renewal” services. The State Department warns that they are not authorized to accept or process online renewals, that it cannot get involved in disputes with them or refund an unauthorized application, and that only you may sign your application. This site does not sell any service: the ${h.a('guide-expediters', 'expediting guide')} compares government fees with what such companies add.</p>`,
  },
  es: {
    path: 'renovar-pasaporte-en-linea', nav: 'Renovar en línea', card: `${$(F.book.adult, 'es')} con tarjeta, solo ordinario, ${O.minAge} años o más, sin viajar en ${O.noTravelWeeks} semanas.`,
    title: `Renovar el pasaporte en línea 2026: requisitos y ${$(F.book.adult, 'es')}`,
    description: `Renovar el pasaporte en línea cuesta ${$(F.book.adult, 'es')} por la libreta en 2026, con tarjeta. Requisitos: ${O.minAge} años o más, ventana de 1 año y ${O.noTravelWeeks} semanas sin ningún viaje.`,
    h1: 'Renovar el pasaporte en línea: quién puede',
    intro: 'La renovación en línea ahorra el sobre y el primer tramo de correo, pero sus reglas son más estrictas que las del correo. El verificador las prueba todas.',
    resume: `La renovación del pasaporte en línea, en el propio sitio del Departamento de Estado, opr.travel.state.gov, cuesta lo mismo que por correo: ${$(F.book.adult, 'es')} por la libreta, ${$(F.card.adult, 'es')} por la tarjeta y ${$(F.both.adult, 'es')} por ambas, más ${$(F.delivery, 'es')} si quiere la entrega en 1 a 3 días, con tarjeta de crédito o débito. Solo puede usarla si se cumple todo: el pasaporte que renueva vale o valió 10 años; vence en menos de ${O.expiringWithinYears} año o venció hace menos de ${O.expiredLessThanYears}; tiene ${O.minAge} años o más; no cambia datos personales como el nombre o el sexo; no viajará durante al menos ${O.noTravelWeeks} semanas después de enviarla; está en un estado o territorio de EE. UU.; y tiene el pasaporte consigo, sin daños y nunca reportado perdido o robado. La renovación en línea no puede ser urgente. Usted sube una foto digital, conserva el pasaporte viejo, que queda anulado en cuanto envía la solicitud. Sin correo de ida, la espera ordinaria es de ${T.routineWeeks[0]} a ${T.routineWeeks[1]} semanas más el correo de regreso, hasta ${worst} días.`,
    faqs: [
      { q: '¿Por qué no puedo renovar en línea si mi pasaporte vence en dos años?', a: `Porque la renovación en línea solo abre ${O.expiringWithinYears} año antes del vencimiento. Mientras tanto puede renovar por correo con el DS-82, que no tiene esa ventana, por los mismos ${$(F.book.adult, 'es')}. La ventana en línea también cierra ${O.expiredLessThanYears} años después del vencimiento.` },
      { q: '¿opr.travel.state.gov es el único sitio oficial para renovar en línea?', a: 'Sí. El Departamento de Estado dice que el único lugar autorizado para renovar en línea un pasaporte de EE. UU. es opr.travel.state.gov, que nadie más puede firmar y enviar su solicitud, y que los sitios con “Gov” en el nombre o terminados en .com, .us u .org no están autorizados. Cobran tarifas extra y ponen en riesgo sus datos.' },
      { q: '¿Puedo viajar mientras se tramita mi renovación en línea?', a: 'No con el pasaporte viejo. Queda anulado al enviar la solicitud en línea y ya no sirve para viajes internacionales. Si sus planes cambian y debe viajar antes, llame al 877-487-2778 para pedir el servicio urgente o la entrega en 1 a 3 días de la libreta nueva.' },
      { q: '¿Puedo pasar de tarjeta a libreta al renovar en línea?', a: 'En parte. En línea puede renovar libreta por libreta, tarjeta por tarjeta o cualquiera de las dos por ambos documentos, pero no tarjeta por libreta sola ni libreta por tarjeta sola. Esos dos cambios se hacen por correo con el formulario DS-82.' },
    ],
    body: (h) => `
<h2>La regla que muchos pasan por alto: seis semanas sin viajar</h2>
<p>El formulario en línea solo ofrece servicio ordinario, y el Departamento de Estado pide no tener ningún viaje durante al menos ${O.noTravelWeeks} semanas desde el día en que lo envía. El pasaporte viejo queda anulado al enviar, así que no hay documento de respaldo. El verificador señala una fecha de viaje dentro de ese periodo; la calculadora completa muestra entonces la renovación por correo con servicio urgente como alternativa, desde ${h.usd(F.book.adult + F.expedite)}.</p>
<h2>Lo que cuesta y lo que ahorra</h2>
<p>La tarifa es idéntica a la del correo. Se ahorra tiempo y papel: sin cheque, sin sobre, sin oficina de correos y sin el tramo de ida de hasta ${T.mailInMaxWeeks} semanas. Con entrega en 1 a 3 días, una renovación de libreta en línea llega a ${h.usd2(on.total)}, cobrados a su tarjeta. Igual necesita una foto digital que cumpla las mismas reglas que una impresa.</p>
<h2>Sitios de renovación no oficiales</h2>
<p>Varias empresas venden servicios de “renovación del pasaporte en línea”. El Departamento de Estado advierte que no están autorizadas a recibir ni tramitar renovaciones en línea, que no puede intervenir en disputas con ellas ni reembolsar una solicitud no autorizada, y que solo usted puede firmar su solicitud. Este sitio no vende ningún servicio: la ${h.a('guide-expediters', 'guía de gestores')} compara las tarifas del gobierno con lo que agregan esas empresas.</p>`,
  },
});
