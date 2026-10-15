import { definePage } from '../../lib/guide-types';
import { cost } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const F = P.fees, T = P.times;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const lost = cost({ situation: 'lost', doc: 'book', service: 'routine', delivery: false, fileSearch: false });
const lostFast = cost({ situation: 'lost', doc: 'book', service: 'expedited', delivery: true, fileSearch: false });
const lostAgency = cost({ situation: 'lost', doc: 'book', service: 'agency', delivery: false, fileSearch: false });

export default definePage({
  id: 'lost-or-stolen-passport', group: 'cost', order: 160,
  tool: { kind: 'passport', situation: 'lost', focus: 'cost' },
  related: ['passport-appointment', 'first-time-passport', 'passport-name-change', 'expedited-passport'],
  sources: ['lostStolen', 'feeChart', 'limited', 'appointment'],
  en: {
    path: 'lost-or-stolen-passport', nav: 'Lost or stolen passport', card: `Report it, then a new DS-11 in person: ${$(lost.total, 'en')} for an adult book.`,
    title: `Lost Passport Replacement Cost 2026: ${$(lost.total, 'en')}, DS-11 and DS-64`,
    description: `Replacing a lost or stolen passport costs ${$(lost.total, 'en')} for an adult book in 2026: report it, then apply in person on Form DS-11. Expedited with delivery: ${$(lostFast.total, 'en')}.`,
    h1: 'Lost or stolen passport: replacement cost',
    intro: 'A lost passport is not renewed: you report it, it is canceled for good, and you apply again in person at the first-time price.',
    resume: `Replacing a lost or stolen U.S. passport costs the same as a first passport, because the replacement is a new application on Form DS-11 made in person: ${$(F.book.adult, 'en')} for an adult book to the U.S. Department of State plus the ${$(F.execution, 'en')} execution fee to the acceptance facility, ${$(lost.total, 'en')} in all, or ${$(F.book.minor + F.execution, 'en')} for a child under 16. First report the passport. Online, the State Department cancels it within one business day and emails a confirmation; by mail on Form DS-64 it can take several weeks; you can also report it on the DS-11 itself. Once reported, the passport is canceled and cannot be used to travel even if you find it, so report only a valid passport that is really gone, never an expired one or a number you think was exposed. With expedited service and 1-3 day delivery the replacement costs ${$(lostFast.total, 'en')}; for a trip within ${T.urgentDays} days, an agency appointment costs ${$(lostAgency.total, 'en')}.`,
    faqs: [
      { q: 'Can I renew by mail if my passport was lost?', a: 'No. The DS-82 renewal requires sending your most recent passport, so a lost or stolen passport cannot be renewed by mail or online. You apply in person on Form DS-11 with citizenship evidence, a photo ID and a photo, and give the details of the loss on the form or on Form DS-64.' },
      { q: 'What if I find my passport after reporting it lost?', a: 'It stays canceled. The State Department says a passport reported lost or stolen is no longer valid for travel even if you find it later, and Japan’s country page warns that authorities will likely deny entry to anyone who tries to use one. Keep it as a document if you like, but travel on the new passport.' },
      { q: 'My new passport never arrived in the mail. Do I pay again?', a: `Not if you act in time. If more than two weeks have passed since the State Department mailed it, call 877-487-2778 and complete Form DS-86, which confirms you did not receive it. That form must be done within ${T.lostInMailDays} days of issue; after that, by law, you reapply and pay all fees.` },
    ],
    body: (h) => `
<h2>The order of the steps</h2>
<p>Report first, replace second. The fastest report is online, through the State Department’s form filler, which cancels the passport within one business day. Then fill in a new DS-11 and take it to an acceptance facility with proof of citizenship, which is often the hardest part when the lost passport was your main proof. A certified birth certificate or a naturalization certificate works; if you have nothing, add the ${h.usd(F.fileSearch)} file search in the calculator. If you filed a police report, bring a copy.</p>
<h2>Losing a passport just before a trip</h2>
<p>If the trip is within ${T.urgentDays} days, a facility cannot help in time: book an appointment at a passport agency, where the replacement costs ${h.usd(lostAgency.total)} with the mandatory ${h.usd(F.expedite)} expedite fee. When an emergency forces the Department to issue a passport with limited validity, replace it with a full one afterwards; the ${h.src('limited', 'limited-validity page')} explains which form applies and when no fee is due.</p>
<h2>Disasters and abroad</h2>
<p>A valid passport lost in a natural disaster may be replaced free of charge under the Department’s disaster rules. Lost abroad, the passport is replaced by the nearest U.S. embassy or consulate, often as an emergency passport valid for a year or less, which some countries, such as France for visa-free entry, do not accept.</p>`,
  },
  es: {
    path: 'pasaporte-perdido-o-robado', nav: 'Pasaporte perdido o robado', card: `Repórtelo y haga un DS-11 nuevo en persona: ${$(lost.total, 'es')} por una libreta de adulto.`,
    title: `Pasaporte perdido o robado 2026: reemplazo ${$(lost.total, 'es')}, DS-11`,
    description: `Reemplazar un pasaporte perdido o robado cuesta ${$(lost.total, 'es')} por libreta de adulto en 2026: se reporta y se pide en persona con el DS-11. Urgente con entrega: ${$(lostFast.total, 'es')}.`,
    h1: 'Pasaporte perdido o robado: costo del reemplazo',
    intro: 'Un pasaporte perdido no se renueva: se reporta, queda anulado para siempre y se solicita otro en persona al precio de un primer pasaporte.',
    resume: `Reemplazar un pasaporte de EE. UU. perdido o robado cuesta lo mismo que un primer pasaporte, porque el reemplazo es una solicitud nueva con el formulario DS-11 hecha en persona: ${$(F.book.adult, 'es')} por la libreta de un adulto al Departamento de Estado más la tarifa de ejecución de ${$(F.execution, 'es')} al centro de aceptación, ${$(lost.total, 'es')} en total, o ${$(F.book.minor + F.execution, 'es')} para un menor de 16 años. Primero hay que reportarlo. En línea, el Departamento lo anula en un día hábil y envía una confirmación por correo electrónico; por correo con el formulario DS-64 puede tardar varias semanas; también puede reportarlo en el propio DS-11. Una vez reportado, el pasaporte queda anulado y no sirve para viajar aunque lo encuentre, así que solo se reporta un pasaporte vigente que realmente desapareció, nunca uno vencido ni un número que cree expuesto. Con servicio urgente y entrega en 1 a 3 días el reemplazo cuesta ${$(lostFast.total, 'es')}; para un viaje en ${T.urgentDays} días, una cita en agencia cuesta ${$(lostAgency.total, 'es')}.`,
    faqs: [
      { q: '¿Puedo renovar por correo si perdí el pasaporte?', a: 'No. La renovación con el DS-82 exige enviar el pasaporte más reciente, así que uno perdido o robado no se renueva por correo ni en línea. Se solicita en persona con el DS-11, con prueba de ciudadanía, identificación con foto y una foto, y se explica la pérdida en el formulario o en el DS-64.' },
      { q: '¿Qué pasa si encuentro el pasaporte después de reportarlo?', a: 'Sigue anulado. El Departamento de Estado dice que un pasaporte reportado perdido o robado ya no sirve para viajar aunque lo encuentre después, y la ficha de Japón advierte que las autoridades probablemente negarán la entrada a quien intente usarlo. Puede guardarlo como recuerdo, pero viaje con el nuevo.' },
      { q: 'Mi pasaporte nuevo nunca llegó por correo. ¿Tengo que pagar otra vez?', a: `No si actúa a tiempo. Si pasaron más de dos semanas desde que el Departamento de Estado lo envió, llame al 877-487-2778 y llene el formulario DS-86, que confirma que no lo recibió. Hay que hacerlo dentro de los ${T.lostInMailDays} días desde la emisión; después, por ley, se vuelve a solicitar y se pagan todas las tarifas.` },
    ],
    body: (h) => `
<h2>El orden de los pasos</h2>
<p>Primero se reporta, después se reemplaza. El reporte más rápido es en línea, con el formulario del Departamento de Estado, que anula el pasaporte en un día hábil. Luego llene un DS-11 nuevo y llévelo a un centro de aceptación con su prueba de ciudadanía, que suele ser lo más difícil cuando el pasaporte perdido era su prueba principal. Sirve un acta de nacimiento certificada o un certificado de naturalización; si no tiene nada, sume en la calculadora la búsqueda de expediente de ${h.usd(F.fileSearch)}. Si hizo una denuncia policial, lleve una copia.</p>
<h2>Perder el pasaporte justo antes de viajar</h2>
<p>Si el viaje es en ${T.urgentDays} días o menos, un centro no llega a tiempo: pida cita en una agencia de pasaportes, donde el reemplazo cuesta ${h.usd(lostAgency.total)} con la tarifa urgente obligatoria de ${h.usd(F.expedite)}. Cuando una emergencia obliga al Departamento a emitir un pasaporte de vigencia limitada, reemplácelo después por uno completo; la ${h.src('limited', 'página de vigencia limitada')} explica qué formulario corresponde y cuándo no hay que pagar.</p>
<h2>Desastres y pérdidas en el extranjero</h2>
<p>Un pasaporte vigente perdido en un desastre natural puede reemplazarse gratis según las reglas del Departamento para desastres. Si se pierde en el extranjero, lo reemplaza la embajada o el consulado de EE. UU. más cercano, a menudo con un pasaporte de emergencia de un año o menos, que algunos países, como Francia para entrar sin visa, no aceptan.</p>`,
  },
});
