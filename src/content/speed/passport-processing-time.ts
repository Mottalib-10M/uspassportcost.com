import { definePage } from '../../lib/guide-types';
import { legs } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney, displayDate } from '../../lib/format';

const F = P.fees, T = P.times;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const d = (iso: string, l: 'en' | 'es') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const total = (x: ReturnType<typeof legs>) => x.mailIn[1] + x.processing[1] + x.mailOut[1];
const routine = legs({ situation: 'first', doc: 'book', service: 'routine', delivery: false });
const exp = legs({ situation: 'first', doc: 'book', service: 'expedited', delivery: true });
const online = legs({ situation: 'renew-online', doc: 'book', service: 'routine', delivery: false });

export default definePage({
  id: 'passport-processing-time', group: 'speed', order: 300,
  tool: { kind: 'passport', situation: 'renew-mail', focus: 'date' },
  data: { times: true },
  related: ['expedited-passport', 'passport-appointment', 'guide-apply-ahead', 'guide-best-time', 'passport-1-3-day-delivery'],
  sources: ['processing', 'getFast', 'status', 'refund'],
  en: {
    path: 'passport-processing-time', nav: 'Processing times', card: `${T.routineWeeks.join('-')} weeks routine, ${T.expeditedWeeks.join('-')} expedited, plus mail: your date, worked out.`,
    title: `Passport Processing Time 2026: ${T.routineWeeks.join('-')} Weeks, Your Exact Date`,
    description: `Passport processing takes ${T.routineWeeks.join(' to ')} weeks routine and ${T.expeditedWeeks.join(' to ')} weeks expedited, plus up to ${T.mailInMaxWeeks} weeks of mail each way. Enter your dates to see when yours arrives.`,
    h1: 'Passport processing time and arrival date',
    intro: 'The State Department publishes three numbers for each application. Added in the right order, they give the window in which your passport should reach you.',
    resume: `On its processing-time page updated ${d(T.pageUpdated, 'en')}, the State Department says routine processing takes ${T.routineWeeks[0]} to ${T.routineWeeks[1]} weeks and expedited processing ${T.expeditedWeeks[0]} to ${T.expeditedWeeks[1]} weeks, and that urgent travel within ${T.urgentDays} calendar days needs an appointment at a passport agency. Those times start when your application reaches an agency or center and do not include mail: it may take up to ${T.mailInMaxWeeks} weeks for the application to arrive and up to ${T.mailOutMaxWeeks} weeks for the passport to come back, unless you pay ${$(F.delivery, 'en')} for 1-3 day return delivery. Door to door, a routine paper application can therefore take up to ${total(routine)} days, an expedited one with fast delivery up to ${total(exp)} days, and an online renewal, which has no outbound mail, up to ${total(online)} days. The Department says its busiest period runs from late winter into summer and suggests applying from October to December.`,
    faqs: [
      { q: 'When does the passport processing clock start?', a: 'When your application arrives at a passport agency or center, not when you hand it to the post office or mail it. The State Department adds that it may take two weeks from mailing until the first status of “In Process”, which is why the calculator counts the outbound mail separately from processing.' },
      { q: 'Why did my friend get a passport faster than me?', a: 'The State Department says you may get your passport on a different date than a family member or friend who applied the same day. Processing ranges are not a queue number; agencies, mail routes and requests for more information all vary. A letter or email asking for documents adds time until you answer.' },
      { q: 'How do I check where my passport application is?', a: 'Status updates are emailed to the address on your application, and passportstatus.state.gov shows the stage and, once mailed, the tracking. If you have heard nothing two weeks after mailing, that can still be normal; more than two weeks after the passport was mailed without delivery, call 877-487-2778.' },
    ],
    body: (h) => `
<h2>Three legs, three published limits</h2>
<p>The calculator above splits the wait into the trip to the Department, the processing, and the return. Only the middle part is the number quoted everywhere. The table under this text shows the published value of each leg, read from the official page, and the result panel adds them up two ways: the earliest date with no mail delay, and the latest with every leg at its maximum. The real date usually falls between the two.</p>
<h2>What speeds up which leg</h2>
<p>Expedited service, ${h.usd(F.expedite)}, only shortens processing. The ${h.usd2(F.delivery)} delivery fee only shortens the return. The outbound leg can be shortened by paying the acceptance facility for USPS Priority Mail Express, or skipped altogether by ${h.a('renew-passport-online', 'renewing online')} if you qualify. Paying for all three does not make processing faster than the published range; for a trip within ${T.urgentDays} days the answer is an ${h.a('passport-appointment', 'agency appointment')}, not more options.</p>
<h2>Keeping the page current</h2>
<p>This page reads the official range on a schedule. When the State Department changes it, the calculator follows automatically and the date of the official page is shown above the table, so you can see which version you are looking at.</p>`,
  },
  es: {
    path: 'tiempo-de-tramite-pasaporte', nav: 'Tiempos de trámite', card: `${T.routineWeeks.join('-')} semanas ordinario, ${T.expeditedWeeks.join('-')} urgente, más el correo: su fecha calculada.`,
    title: `Tiempo de trámite del pasaporte 2026: ${T.routineWeeks.join(' a ')} semanas`,
    description: `El trámite del pasaporte tarda de ${T.routineWeeks.join(' a ')} semanas en ordinario y de ${T.expeditedWeeks.join(' a ')} en urgente, más hasta ${T.mailInMaxWeeks} semanas de correo por tramo. Ponga sus fechas y vea la llegada.`,
    h1: 'Tiempo de trámite del pasaporte y fecha de llegada',
    intro: 'El Departamento de Estado publica tres cifras para cada solicitud. Sumadas en orden, dan la ventana en la que su pasaporte debería llegar.',
    resume: `En su página de tiempos actualizada el ${d(T.pageUpdated, 'es')}, el Departamento de Estado dice que el trámite ordinario toma de ${T.routineWeeks[0]} a ${T.routineWeeks[1]} semanas y el urgente de ${T.expeditedWeeks[0]} a ${T.expeditedWeeks[1]}, y que un viaje urgente en ${T.urgentDays} días naturales o menos necesita cita en una agencia de pasaportes. Esos tiempos empiezan cuando la solicitud llega a una agencia o centro y no incluyen el correo: la solicitud puede tardar hasta ${T.mailInMaxWeeks} semanas en llegar y el pasaporte hasta ${T.mailOutMaxWeeks} semanas en volver, salvo que pague ${$(F.delivery, 'es')} por la entrega en 1 a 3 días. De puerta a puerta, una solicitud ordinaria en papel puede tardar hasta ${total(routine)} días, una urgente con entrega rápida hasta ${total(exp)} días, y una renovación en línea, que no tiene correo de ida, hasta ${total(online)} días. El Departamento dice que su temporada de más trabajo va de fines del invierno al verano y aconseja solicitar de octubre a diciembre.`,
    faqs: [
      { q: '¿Cuándo empieza a contar el tiempo de trámite del pasaporte?', a: 'Cuando su solicitud llega a una agencia o centro de pasaportes, no cuando la entrega en el correo o la envía. El Departamento de Estado añade que pueden pasar dos semanas desde el envío hasta el primer estado “In Process”, por eso la calculadora cuenta el correo de ida aparte del trámite.' },
      { q: '¿Por qué un amigo recibió su pasaporte antes que yo?', a: 'El Departamento de Estado dice que puede recibir su pasaporte en una fecha distinta a la de un familiar o amigo que solicitó el mismo día. Los rangos no son un número de fila: las agencias, las rutas de correo y las solicitudes de más información varían. Una carta que pide documentos suma tiempo hasta que usted responde.' },
      { q: '¿Cómo reviso en qué etapa está mi solicitud de pasaporte?', a: 'Las novedades llegan al correo electrónico de su solicitud, y passportstatus.state.gov muestra la etapa y, una vez enviado, el seguimiento. Si no sabe nada dos semanas después de enviar, puede ser normal; si pasaron más de dos semanas desde que el pasaporte salió sin llegar, llame al 877-487-2778.' },
    ],
    body: (h) => `
<h2>Tres tramos, tres límites publicados</h2>
<p>La calculadora de arriba divide la espera en el viaje hacia el Departamento, el trámite y el regreso. Solo el tramo del medio es la cifra que se cita en todas partes. La tabla debajo de este texto muestra el valor publicado de cada tramo, leído de la página oficial, y el panel de resultados los suma de dos maneras: la fecha más temprana sin demoras de correo y la más tardía con cada tramo al máximo. La fecha real suele caer entre las dos.</p>
<h2>Qué acelera cada tramo</h2>
<p>El servicio urgente, ${h.usd(F.expedite)}, solo acorta el trámite. La tarifa de entrega de ${h.usd2(F.delivery)} solo acorta el regreso. El tramo de ida se acorta pagando al centro de aceptación USPS Priority Mail Express, o se elimina ${h.a('renew-passport-online', 'renovando en línea')} si cumple los requisitos. Pagar las tres cosas no hace el trámite más corto que el rango publicado; para un viaje en ${T.urgentDays} días la respuesta es una ${h.a('passport-appointment', 'cita en agencia')}, no más opciones.</p>
<h2>Una página al día</h2>
<p>Esta página lee el rango oficial de forma programada. Cuando el Departamento de Estado lo cambia, la calculadora lo sigue sola y la fecha de la página oficial aparece sobre la tabla, para que sepa qué versión está viendo.</p>`,
  },
});
