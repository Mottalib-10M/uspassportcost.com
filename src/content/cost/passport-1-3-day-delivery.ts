import { definePage } from '../../lib/guide-types';
import { legs } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const F = P.fees, T = P.times;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const old = P.deliveryHistory[0];
const rise = Math.round((F.delivery - old.amount) * 100) / 100;
const slow = legs({ situation: 'renew-mail', doc: 'book', service: 'routine', delivery: false });
const fast = legs({ situation: 'renew-mail', doc: 'book', service: 'routine', delivery: true });
const saved = slow.mailOut[1] - fast.mailOut[1];

export default definePage({
  id: 'passport-1-3-day-delivery', group: 'cost', order: 150,
  tool: { kind: 'passport', situation: 'renew-mail', delivery: true, focus: 'date' },
  data: { delivery: true },
  related: ['expedited-passport', 'passport-processing-time', 'guide-expedite-worth-it', 'passport-fees'],
  sources: ['feeChart', 'feeChartFeb2026', 'feesPage', 'processing'],
  en: {
    path: 'passport-1-3-day-delivery', nav: '1-3 day delivery fee', card: `${$(F.delivery, 'en')} per book to get it 1 to 3 days after mailing, up from ${$(old.amount, 'en')}.`,
    title: `Passport 1-3 Day Delivery Fee 2026: ${$(F.delivery, 'en')}, Book Only`,
    description: `The passport 1-3 day delivery fee is ${$(F.delivery, 'en')} in 2026, up from ${$(old.amount, 'en')} in February. It cuts return mail, not processing, and never applies to cards. See your date.`,
    h1: 'Passport 1-3 day delivery fee',
    intro: 'The delivery fee buys speed on the last leg only, from the passport agency to your door, and only for a passport book.',
    resume: `The 1-3 day return delivery option costs ${$(F.delivery, 'en')} per application on the State Department fee chart of ${P.feeChartEdition}, against ${$(old.amount, 'en')} on the ${old.edition} chart, an increase of ${$(rise, 'en')}. It is added to the check or money order payable to the U.S. Department of State, never paid to the acceptance facility. It ships the finished passport book within 1 to 3 days after the Department mails it, instead of a return leg that can take up to ${T.mailOutMaxWeeks} weeks, so it can save up to ${saved} days. It does not shorten processing, which stays ${T.routineWeeks[0]} to ${T.routineWeeks[1]} weeks routine or ${T.expeditedWeeks[0]} to ${T.expeditedWeeks[1]} weeks expedited, and it does not speed up the trip of your application to the Department. It only applies to mailing addresses in the United States and is not available for a passport card alone, which always travels by First Class Mail. The Department asks you not to send a prepaid return envelope.`,
    faqs: [
      { q: 'Is 1-3 day delivery the same as expedited service?', a: `No. Expedited service, ${$(F.expedite, 'en')}, shortens processing at the passport agency to ${T.expeditedWeeks[0]} to ${T.expeditedWeeks[1]} weeks. The ${$(F.delivery, 'en')} delivery fee only shortens the trip of the finished book back to you. They are independent: you can pay one, the other or both, and both go on the State Department check.` },
      { q: 'Why did the passport delivery fee change in 2026?', a: `The State Department charges this fee per application for the faster shipping of the book and publishes it on its fee chart. It was ${$(old.amount, 'en')} on the February 2026 chart and is ${$(F.delivery, 'en')} on the October 2026 chart. The application fees set by 22 CFR 22.1 did not change; only this delivery line did.` },
      { q: 'Can I add 1-3 day delivery after I applied?', a: 'For an online renewal, the State Department says to call 877-487-2778 if your travel plans change and you want expedited service or 1 to 3 day delivery of the completed book. For paper applications, the fee is normally included with the application payment.' },
    ],
    body: (h) => `
<h2>What the fee actually buys</h2>
<p>A passport application makes three trips, and this fee touches only the last one. Your envelope still travels at the speed of the mail service you chose to reach the Department, up to ${T.mailInMaxWeeks} weeks with standard mail. Processing still takes the published range. What changes is the return: with the fee, the book leaves by a 1 to 3 day service instead of a trip that can last ${T.mailOutMaxWeeks} weeks. The calculator above already includes it, and moves the latest date ${saved} days earlier when you switch it on.</p>
<h2>When it is worth paying</h2>
<p>It pays off when your trip falls inside the last two weeks of the worst case. If routine service ends safely before departure, the fee buys nothing. If the latest date lands a few days after departure, ${h.usd2(F.delivery)} can be enough to fix it without the ${h.usd(F.expedite)} expedite fee; the ${h.a('guide-expedite-worth-it', 'expedite guide')} compares the two on your dates. To shorten the first leg as well, the acceptance facility can sell you USPS Priority Mail Express, at a price it sets.</p>
<h2>The two editions of the fee in 2026</h2>
<p>The table below comes from the State Department’s own fee charts. If you read a figure lower than ${h.usd2(F.delivery)} elsewhere, it comes from an older edition, and a check written for the old total is short.</p>`,
  },
  es: {
    path: 'entrega-1-3-dias', nav: 'Entrega en 1 a 3 días', card: `${$(F.delivery, 'es')} por libreta para recibirla de 1 a 3 días después del envío.`,
    title: `Entrega del pasaporte en 1 a 3 días 2026: ${$(F.delivery, 'es')} la libreta`,
    description: `La entrega del pasaporte en 1 a 3 días cuesta ${$(F.delivery, 'es')} en 2026, antes ${$(old.amount, 'es')}. Acorta el correo de regreso, no el trámite, y no vale para tarjetas. Vea su fecha.`,
    h1: 'Tarifa de entrega del pasaporte en 1 a 3 días',
    intro: 'La tarifa de entrega acelera solo el último tramo, de la agencia a su puerta, y solo para la libreta.',
    resume: `La entrega de regreso en 1 a 3 días cuesta ${$(F.delivery, 'es')} por solicitud en la tabla de tarifas del Departamento de Estado de octubre de 2026, frente a ${$(old.amount, 'es')} en la de febrero de 2026, un aumento de ${$(rise, 'es')}. Se suma al cheque o giro a nombre del Departamento de Estado, nunca se paga al centro de aceptación. El Departamento envía la libreta terminada en 1 a 3 días después de despacharla, en lugar de un tramo de regreso que puede tardar hasta ${T.mailOutMaxWeeks} semanas, así que puede ahorrar hasta ${saved} días. No acorta el trámite, que sigue siendo de ${T.routineWeeks[0]} a ${T.routineWeeks[1]} semanas en ordinario o de ${T.expeditedWeeks[0]} a ${T.expeditedWeeks[1]} en urgente, ni acelera el viaje de su solicitud hacia el Departamento. Solo vale para direcciones postales en EE. UU. y no existe para una tarjeta sola, que siempre viaja por correo de primera clase. El Departamento pide no enviar un sobre de regreso prepagado.`,
    faqs: [
      { q: '¿La entrega en 1 a 3 días es lo mismo que el servicio urgente?', a: `No. El servicio urgente, ${$(F.expedite, 'es')}, acorta el trámite en la agencia a ${T.expeditedWeeks[0]} a ${T.expeditedWeeks[1]} semanas. La tarifa de entrega, ${$(F.delivery, 'es')}, solo acorta el regreso de la libreta terminada. Son independientes: puede pagar una, la otra o ambas, y las dos van en el cheque al Departamento de Estado.` },
      { q: '¿Por qué cambió la tarifa de entrega del pasaporte en 2026?', a: `El Departamento de Estado cobra esta tarifa por solicitud por el envío rápido de la libreta y la publica en su tabla. Era de ${$(old.amount, 'es')} en la tabla de febrero de 2026 y es de ${$(F.delivery, 'es')} en la de octubre de 2026. Las tarifas de solicitud del 22 CFR 22.1 no cambiaron; solo cambió esta línea de entrega.` },
      { q: '¿Puedo agregar la entrega en 1 a 3 días después de solicitar?', a: 'Para una renovación en línea, el Departamento de Estado indica llamar al 877-487-2778 si cambian sus planes de viaje y quiere servicio urgente o entrega en 1 a 3 días de la libreta terminada. En las solicitudes en papel, la tarifa normalmente se incluye con el pago de la solicitud.' },
    ],
    body: (h) => `
<h2>Lo que compra realmente la tarifa</h2>
<p>Una solicitud de pasaporte hace tres viajes, y esta tarifa solo toca el último. Su sobre sigue viajando a la velocidad del correo que eligió para llegar al Departamento, hasta ${T.mailInMaxWeeks} semanas con correo normal. El trámite sigue tomando el rango publicado. Lo que cambia es el regreso: con la tarifa, la libreta sale por un servicio de 1 a 3 días en vez de un viaje que puede durar ${T.mailOutMaxWeeks} semanas. La calculadora de arriba ya la incluye y adelanta ${saved} días la fecha más tardía cuando la activa.</p>
<h2>Cuándo vale la pena pagarla</h2>
<p>Conviene cuando su viaje cae dentro de las dos últimas semanas del peor caso. Si el servicio ordinario termina con margen antes de la salida, la tarifa no compra nada. Si la fecha más tardía cae unos días después de salir, ${h.usd2(F.delivery)} pueden bastar sin pagar los ${h.usd(F.expedite)} del urgente; la ${h.a('guide-expedite-worth-it', 'guía del urgente')} compara las dos opciones con sus fechas. Para acortar también el primer tramo, el centro de aceptación puede venderle USPS Priority Mail Express, al precio que fije.</p>
<h2>Las dos ediciones de la tarifa en 2026</h2>
<p>La tabla de abajo sale de las propias tablas de tarifas del Departamento de Estado. Si ve en otro sitio una cifra menor que ${h.usd2(F.delivery)}, viene de una edición anterior, y un cheque escrito con el total viejo queda corto.</p>`,
  },
});
