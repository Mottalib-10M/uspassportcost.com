import { definePage } from '../../lib/guide-types';
import { cost, timeline } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const F = P.fees, T = P.times;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const mail = cost({ situation: 'renew-mail', doc: 'book', service: 'routine', delivery: false, fileSearch: false });
const mailFast = cost({ situation: 'renew-mail', doc: 'book', service: 'expedited', delivery: true, fileSearch: false });
const worst = 7 * (T.mailInMaxWeeks + T.routineWeeks[1] + T.mailOutMaxWeeks);

export default definePage({
  id: 'passport-renewal', group: 'renew', order: 200,
  tool: { kind: 'renew', focus: 'mail' },
  related: ['renew-passport-online', 'guide-when-to-renew', 'passport-name-change', 'expedited-passport', 'guide-how-long-valid'],
  sources: ['mail', 'online', 'feeChart', 'feesPage'],
  en: {
    path: 'passport-renewal', nav: 'Passport renewal', card: `${$(F.book.adult, 'en')} by mail or online if you qualify; the checker names the rule that stops you.`,
    title: `Passport Renewal 2026: ${$(F.book.adult, 'en')} by Mail or Online, Who Qualifies`,
    description: `Passport renewal costs ${$(F.book.adult, 'en')} for a book in 2026, by mail on DS-82 or online, with no facility fee. Enter your issue date: we check each rule and show your route.`,
    h1: 'Passport renewal: route, cost and rules',
    intro: 'Most adults can renew without going to a facility. The checker tests your passport against the mail and online rules and prices the route that is left.',
    resume: `An adult renewal costs ${$(F.book.adult, 'en')} for a passport book, ${$(F.card.adult, 'en')} for a card and ${$(F.both.adult, 'en')} for both, paid to the U.S. Department of State, with no ${$(F.execution, 'en')} execution fee because nobody has to witness the application. By mail on Form DS-82, the passport must have been issued in the last ${P.mail.issuedWithinYears} years, when you were ${P.mail.issuedAtAge} or older and for 10 years, never reported lost or stolen, undamaged beyond normal wear, and in your current name or with a marriage certificate, divorce decree or court order for the new one. Online renewal adds stricter conditions: age ${P.online.minAge} or more, a passport that expires within ${P.online.expiringWithinYears} year or expired less than ${P.online.expiredLessThanYears} years ago, no change of personal information, being in the United States, and no travel for ${P.online.noTravelWeeks} weeks, since it cannot be expedited. Fail the mail rules and you apply in person on Form DS-11 at ${$(F.book.adult + F.execution, 'en')}. A routine mail renewal can take ${worst} days door to door.`,
    faqs: [
      { q: 'How much is a passport renewal by mail in 2026?', a: `${$(F.book.adult, 'en')} for a book, ${$(F.card.adult, 'en')} for a card or ${$(F.both.adult, 'en')} for both, on one personal check or money order payable to the U.S. Department of State with your name and date of birth on the front. Add ${$(F.expedite, 'en')} to expedite and ${$(F.delivery, 'en')} for 1-3 day return delivery: ${$(mailFast.total, 'en')} for a fully sped-up book renewal.` },
      { q: 'Can I renew a passport that expired years ago?', a: `By mail, yes, as long as it was issued within the last ${P.mail.issuedWithinYears} years, at 16 or older. Online, only if it expired less than ${P.online.expiredLessThanYears} years ago. A passport issued more than ${P.mail.issuedWithinYears} years ago cannot be renewed at all: you apply in person on Form DS-11 and pay the ${$(F.execution, 'en')} execution fee.` },
      { q: 'Where do I mail my passport renewal?', a: 'Routine renewals from California, Florida, Illinois, Minnesota, New York or Texas go to the National Passport Processing Center, PO Box 640155, Irving, TX 75064-0155; other states to PO Box 90155, Philadelphia, PA 19190-0155. Expedited renewals, with “EXPEDITE” written on the envelope, go to PO Box 90955, Philadelphia, PA 19190-0955.' },
      { q: 'Do I get my old passport back when I renew by mail?', a: `Yes, canceled, in a separate mailing that can arrive up to ${T.oldPassportReturnWeeks} weeks after the new one. Online renewals are different: you keep the old passport, which is canceled as soon as you submit and can no longer be used for international travel.` },
    ],
    body: (h) => `
<h2>What the checker asks, and why</h2>
<p>Each field of the checker maps to one sentence of the State Department’s two renewal pages. The issue date decides the 15-year limit for mail and, through the expiration date it implies, the online window. The age at issue tells a 10-year adult passport from a 5-year child passport, which can never be renewed. Your age today matters only online, where the minimum is ${P.online.minAge}. A name change with a legal document keeps you eligible by mail but rules out online renewal; without a document, only an in-person application works. Damage beyond wear, or a passport reported lost, sends you to Form DS-11.</p>
<h2>Mail or online when you qualify for both</h2>
<p>The fee is the same, so the choice is about time and risk. Online, you skip the outbound mail, pay by card and keep your old passport until you submit, but you cannot expedite and the old passport is canceled on submission. By mail, the envelope can take up to ${T.mailInMaxWeeks} weeks to arrive, but you can expedite it for ${h.usd(F.expedite)} and write “EXPEDITE” on the envelope. If a trip falls within ${P.online.noTravelWeeks} weeks, mail with expedited service is the only renewal left. The calculator on ${h.a('passport-processing-time', 'processing times')} dates both.</p>
${h.mini('renewWindow')}
<h2>One check for the household</h2>
<p>Spouses or relatives renewing at the same time may send several DS-82 forms in one envelope and pay with one check or money order covering all of them. Add up the fees per application; a check that falls short holds up every form in the envelope.</p>`,
  },
  es: {
    path: 'renovar-pasaporte', nav: 'Renovar el pasaporte', card: `${$(F.book.adult, 'es')} por correo o en línea si cumple; el verificador dice qué regla lo impide.`,
    title: `Renovar el pasaporte 2026: ${$(F.book.adult, 'es')}, correo o en línea`,
    description: `Renovar el pasaporte cuesta ${$(F.book.adult, 'es')} por la libreta en 2026, por correo con el DS-82 o en línea, sin tarifa del centro. Ponga su fecha de emisión y vea su vía.`,
    h1: 'Renovar el pasaporte: vía, costo y reglas',
    intro: 'La mayoría de los adultos puede renovar sin ir a un centro. El verificador prueba su pasaporte con las reglas del correo y de la renovación en línea y calcula el costo de la vía que queda.',
    resume: `La renovación de un adulto cuesta ${$(F.book.adult, 'es')} por la libreta, ${$(F.card.adult, 'es')} por la tarjeta y ${$(F.both.adult, 'es')} por ambas, que se pagan al Departamento de Estado, sin la tarifa de ejecución de ${$(F.execution, 'es')} porque nadie tiene que presenciar la solicitud. Por correo con el DS-82, el pasaporte debe haberse emitido en los últimos ${P.mail.issuedWithinYears} años, cuando usted tenía ${P.mail.issuedAtAge} años o más y por 10 años, sin reporte de pérdida o robo, sin daños más allá del uso normal, y con su nombre actual o con el acta de matrimonio, la sentencia de divorcio o la orden judicial del nombre nuevo. En línea las condiciones son más estrictas: ${P.online.minAge} años o más, un pasaporte que vence en menos de ${P.online.expiringWithinYears} año o que venció hace menos de ${P.online.expiredLessThanYears}, ningún cambio de datos personales, estar en EE. UU. y no viajar en ${P.online.noTravelWeeks} semanas, porque no puede ser urgente. Si no cumple las reglas del correo, solicita en persona con el DS-11 por ${$(F.book.adult + F.execution, 'es')}. Una renovación ordinaria por correo puede tardar ${worst} días de puerta a puerta.`,
    faqs: [
      { q: '¿Cuánto cuesta renovar el pasaporte por correo en 2026?', a: `${$(F.book.adult, 'es')} por la libreta, ${$(F.card.adult, 'es')} por la tarjeta o ${$(F.both.adult, 'es')} por ambas, en un solo cheque personal o giro a nombre del Departamento de Estado, con su nombre y fecha de nacimiento al frente. Sume ${$(F.expedite, 'es')} por el urgente y ${$(F.delivery, 'es')} por la entrega en 1 a 3 días: ${$(mailFast.total, 'es')} por una renovación de libreta con todo acelerado.` },
      { q: '¿Puedo renovar un pasaporte que venció hace años?', a: `Por correo sí, mientras se haya emitido en los últimos ${P.mail.issuedWithinYears} años y con 16 años o más. En línea, solo si venció hace menos de ${P.online.expiredLessThanYears} años. Un pasaporte emitido hace más de ${P.mail.issuedWithinYears} años ya no se renueva: se solicita en persona con el DS-11 y se paga la tarifa de ejecución de ${$(F.execution, 'es')}.` },
      { q: '¿Adónde envío la renovación del pasaporte?', a: 'Las renovaciones ordinarias de California, Florida, Illinois, Minnesota, Nueva York o Texas van al National Passport Processing Center, PO Box 640155, Irving, TX 75064-0155; las de otros estados, al PO Box 90155, Philadelphia, PA 19190-0155. Las urgentes, con “EXPEDITE” escrito en el sobre, al PO Box 90955, Philadelphia, PA 19190-0955.' },
      { q: '¿Me devuelven el pasaporte viejo al renovar por correo?', a: `Sí, anulado, en un envío aparte que puede llegar hasta ${T.oldPassportReturnWeeks} semanas después del pasaporte nuevo. En línea es distinto: usted conserva el pasaporte viejo, que queda anulado en cuanto envía la solicitud y ya no sirve para viajes internacionales.` },
    ],
    body: (h) => `
<h2>Lo que pregunta el verificador y por qué</h2>
<p>Cada campo del verificador corresponde a una frase de las dos páginas de renovación del Departamento de Estado. La fecha de emisión decide el límite de 15 años del correo y, por el vencimiento que implica, la ventana en línea. La edad al emitirse distingue un pasaporte de adulto de 10 años de uno de menor de 5 años, que nunca se renueva. Su edad actual solo cuenta en línea, donde el mínimo es de ${P.online.minAge} años. Un cambio de nombre con documento legal mantiene la renovación por correo pero descarta la de en línea; sin documento, solo queda la solicitud en persona. Un daño más allá del uso, o un pasaporte reportado perdido, lo lleva al DS-11.</p>
<h2>Correo o en línea cuando cumple ambas</h2>
<p>La tarifa es la misma, así que la elección depende del tiempo y del riesgo. En línea se salta el correo de ida, paga con tarjeta y conserva su pasaporte hasta enviar la solicitud, pero no puede pedir urgente y el pasaporte viejo se anula al enviar. Por correo, el sobre puede tardar hasta ${T.mailInMaxWeeks} semanas en llegar, pero puede pedir urgente por ${h.usd(F.expedite)} escribiendo “EXPEDITE” en el sobre. Si viaja en menos de ${P.online.noTravelWeeks} semanas, la única renovación posible es por correo con servicio urgente. La calculadora de ${h.a('passport-processing-time', 'tiempos de trámite')} fecha las dos.</p>
${h.mini('renewWindow')}
<h2>Un solo cheque para la familia</h2>
<p>Los cónyuges o familiares que renuevan al mismo tiempo pueden enviar varios DS-82 en un mismo sobre y pagar con un solo cheque o giro que los cubra todos. Sume las tarifas de cada solicitud; un cheque que se queda corto detiene todos los formularios del sobre.</p>`,
  },
});
