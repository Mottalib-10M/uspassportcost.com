import { definePage } from '../../lib/guide-types';
import { cost } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const F = P.fees;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const family = 4 * F.execution;
const agency = cost({ situation: 'first', doc: 'book', service: 'agency', delivery: false, fileSearch: false });

export default definePage({
  id: 'passport-execution-fee', group: 'cost', order: 140,
  tool: { kind: 'passport', situation: 'first', focus: 'cost' },
  data: { law: true },
  related: ['guide-two-checks', 'first-time-passport', 'where-to-apply', 'passport-renewal'],
  sources: ['cfr', 'feesPage', 'mail', 'whereToApply'],
  en: {
    path: 'passport-execution-fee', nav: 'Execution fee ($35)', card: `The ${$(F.execution, 'en')} acceptance fee: who charges it, when it is owed, how to pay.`,
    title: `Passport Execution Fee 2026: ${$(F.execution, 'en')} Acceptance Fee, Who Pays`,
    description: `The passport execution fee is ${$(F.execution, 'en')} in 2026, set by 22 CFR 22.1 and paid to the acceptance facility for every DS-11. Mail renewals skip it. See both payments.`,
    h1: 'Passport execution fee (acceptance fee)',
    intro: `The ${$(F.execution, 'en')} execution fee pays for the agent who checks your identity and takes your oath. It applies to Form DS-11 only.`,
    resume: `The execution fee, also called the acceptance fee, is ${$(F.execution, 'en')} per application in 2026. It is item 1 of the federal fee schedule in 22 CFR 22.1, “required for first-time applicants and others who must apply in person”, and it is paid to the acceptance facility, a post office, clerk of court, library or county office, as a payment separate from the check to the U.S. Department of State. Everyone who files Form DS-11 owes it: adults applying for the first time, every child under 16, teens of 16 and 17, and anyone replacing a lost, stolen or damaged passport. It does not apply to an eligible renewal by mail on Form DS-82, and the State Department warns that postal employees should not charge it when you simply mail a renewal. Online renewals have no execution fee either. A family of four applying in person pays it four times, ${$(family, 'en')}, on top of the application fees.`,
    faqs: [
      { q: 'Is the $35 passport fee charged on renewals?', a: `Not on a renewal by mail with Form DS-82 or an online renewal. The State Department says postal employees should not charge the ${$(F.execution, 'en')} facility fee or review your form when you mail a renewal. You pay it only if you are not eligible to renew and must apply in person on Form DS-11.` },
      { q: 'Who keeps the passport execution fee?', a: `The facility that accepts the application keeps it: the U.S. Postal Service, a county clerk, a court or a library. That is why it is paid separately from the State Department check and why each facility sets how it accepts payment. At a passport agency, the Department itself collects all fees by card.` },
      { q: 'Is the passport acceptance fee refundable?', a: 'No. The State Department’s fee page says the application fee and the execution fee are kept by law even if no passport is issued. If your application is denied or you change your mind after the oath, the facility does not return the fee.' },
    ],
    body: (h) => `
<h2>One fee per application, not per document</h2>
<p>The fee pays for a service, the execution of the application, so it is owed once per person, whatever you order. A book and card requested together on one DS-11 carry one ${h.usd(F.execution)}; requested on two separate visits, they carry two. That is one of the reasons the State Department notes that ordering both documents at once saves ${h.usd(F.execution)}.</p>
<h2>How to pay it</h2>
<p>The State Department fixes the amount but not the payment method. Its fee page sends you to the facility to find out what it accepts, and practices differ: one post office takes a card, the county clerk next door wants a check made out to the county. Prepare it as a payment of its own, never added to the check payable to “U.S. Department of State”, which must contain only the application fee and the options. At one of the ${h.P.network.agencies} passport agencies or centers, which handle urgent travel by appointment, both are paid to the Department by card, and the calculator shows the agency total of ${h.usd(agency.total)} for a first adult book, expedite fee included.</p>
<h2>When it cannot be avoided</h2>
<p>Any first passport, any child, any lost or stolen passport and any passport issued more than 15 years ago goes through an acceptance agent. If you are eligible for ${h.a('passport-renewal', 'renewal by mail')} or ${h.a('renew-passport-online', 'online')}, though, the fee disappears, and so does the trip to the facility.</p>`,
  },
  es: {
    path: 'tarifa-de-ejecucion', nav: 'Tarifa de ejecución', card: `La tarifa de aceptación de ${$(F.execution, 'es')}: quién la cobra, cuándo se debe y cómo pagarla.`,
    title: `Tarifa de ejecución del pasaporte 2026: ${$(F.execution, 'es')} al centro`,
    description: `La tarifa de ejecución del pasaporte es de ${$(F.execution, 'es')} en 2026, fijada por el 22 CFR 22.1, y se paga al centro en cada DS-11. La renovación por correo no la lleva.`,
    h1: 'Tarifa de ejecución (aceptación) del pasaporte',
    intro: `Los ${$(F.execution, 'es')} de ejecución pagan al agente que verifica su identidad y le toma el juramento. Solo se aplica al formulario DS-11.`,
    resume: `La tarifa de ejecución, también llamada de aceptación, es de ${$(F.execution, 'es')} por solicitud en 2026. Es la partida 1 de la lista federal de tarifas del 22 CFR 22.1, “obligatoria para quienes solicitan por primera vez y otros que deben presentarse en persona”, y se paga al centro de aceptación, una oficina de correos, un juzgado, una biblioteca o una oficina del condado, en un pago separado del cheque al Departamento de Estado. La debe toda persona que presenta el formulario DS-11: adultos por primera vez, todos los menores de 16 años, los jóvenes de 16 y 17 y quien reemplaza un pasaporte perdido, robado o dañado. No se aplica a una renovación elegible por correo con el DS-82, y el Departamento advierte que los empleados de correos no deben cobrarla cuando usted solo envía una renovación. La renovación en línea tampoco la lleva. Una familia de cuatro que solicita en persona la paga cuatro veces, ${$(family, 'es')}, además de las tarifas de solicitud.`,
    faqs: [
      { q: '¿Se cobran los 35 dólares al renovar el pasaporte?', a: `No en una renovación por correo con el DS-82 ni en una renovación en línea. El Departamento de Estado dice que los empleados de correos no deben cobrar los ${$(F.execution, 'es')} ni revisar su formulario cuando usted envía una renovación. Solo la paga si no puede renovar y tiene que solicitar en persona con el DS-11.` },
      { q: '¿Quién se queda con la tarifa de ejecución del pasaporte?', a: 'El centro que recibe la solicitud: el Servicio Postal, un secretario del condado, un juzgado o una biblioteca. Por eso se paga aparte del cheque al Departamento de Estado y cada centro decide cómo la cobra. En una agencia de pasaportes, el propio Departamento cobra todas las tarifas con tarjeta.' },
      { q: '¿Devuelven la tarifa de aceptación del pasaporte?', a: 'No. La página de costos del Departamento de Estado dice que la tarifa de solicitud y la de ejecución se conservan por ley aunque no se emita el pasaporte. Si le niegan la solicitud o cambia de opinión después del juramento, el centro no devuelve la tarifa.' },
    ],
    body: (h) => `
<h2>Una tarifa por solicitud, no por documento</h2>
<p>La tarifa paga un servicio, la ejecución de la solicitud, así que se debe una vez por persona, pida lo que pida. Libreta y tarjeta pedidas juntas en un mismo DS-11 llevan un solo pago de ${h.usd(F.execution)}; pedidas en dos visitas, llevan dos. Es una de las razones por las que el Departamento de Estado señala que pedir los dos documentos a la vez ahorra ${h.usd(F.execution)}.</p>
<h2>Cómo pagarla</h2>
<p>El Departamento fija el monto pero no el medio de pago. Su página de costos lo remite al centro para saber qué acepta, y las prácticas varían: una oficina de correos acepta tarjeta, el secretario del condado de al lado pide un cheque a nombre del condado. Prepárela como un pago propio, nunca sumado al cheque a nombre de “U.S. Department of State”, que solo lleva la tarifa de solicitud y las opciones. En una de las ${h.P.network.agencies} agencias y centros de pasaportes, que atienden viajes urgentes con cita, todo se paga al Departamento con tarjeta, y la calculadora muestra el total en agencia, ${h.usd(agency.total)} por una primera libreta de adulto con la tarifa urgente incluida.</p>
<h2>Cuándo no se puede evitar</h2>
<p>Todo primer pasaporte, todo menor, todo pasaporte perdido o robado y todo pasaporte emitido hace más de 15 años pasa por un agente de aceptación. Si puede ${h.a('passport-renewal', 'renovar por correo')} o ${h.a('renew-passport-online', 'en línea')}, la tarifa desaparece, y también el viaje al centro.</p>`,
  },
});
