import { definePage } from '../../lib/guide-types';
import { cost } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const F = P.fees;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const free = cost({ situation: 'name-change', doc: 'book', service: 'routine', delivery: false, fileSearch: false });
const freeFast = cost({ situation: 'name-change', doc: 'book', service: 'expedited', delivery: false, fileSearch: false });
const later = cost({ situation: 'renew-mail', doc: 'book', service: 'routine', delivery: false, fileSearch: false });

export default definePage({
  id: 'passport-name-change', group: 'cost', order: 170,
  tool: { kind: 'passport', situation: 'name-change', focus: 'cost' },
  related: ['passport-renewal', 'renew-passport-online', 'lost-or-stolen-passport', 'passport-fees'],
  sources: ['changeCorrect', 'mail', 'feeChart'],
  en: {
    path: 'passport-name-change', nav: 'Name change on a passport', card: 'Free within a year of issue on Form DS-5504, then a paid renewal.',
    title: 'Passport Name Change Cost 2026: Free in Year One, DS-5504',
    description: `A passport name change is free on Form DS-5504 within a year of issue, ${$(freeFast.total, 'en')} if expedited. After a year it is a ${$(later.total, 'en')} renewal by mail, never online. Check yours.`,
    h1: 'Passport name change: what it costs',
    intro: 'The price of a new name on your passport depends on one date: how long ago the passport was issued, and when your name legally changed.',
    resume: `If both your passport was issued and your name legally changed less than one year ago, the State Department replaces the passport for free: you mail Form DS-5504 with the passport, an original or certified marriage certificate, divorce decree or court order, and one photo, and pay nothing unless you want expedited service, ${$(F.expedite, 'en')}. If more than a year has passed since either date, the new name goes through a normal application. An eligible adult renews by mail on Form DS-82 with a certified copy of the name-change document, ${$(later.total, 'en')} for a book; online renewal is not possible because it excludes any change of personal information. If you are not eligible to renew, you apply in person on Form DS-11 at the first-time price. Without any legal document for the change, the DS-11 route applies with Form DS-60, an affidavit signed by two people who have known you under both names, and three public records showing you have used the new name for five years or more.`,
    faqs: [
      { q: 'Can I change my name on my passport online?', a: 'No. Online renewal requires that you are not changing personal information such as your name. With a marriage certificate, divorce decree or court order you can renew by mail on Form DS-82, or use the free Form DS-5504 if your passport was issued less than a year ago.' },
      { q: 'Is a passport name change after marriage free?', a: `Only within one year. If you married and received your passport less than a year before applying, Form DS-5504 is free and the new passport keeps a full validity. After a year, the name change is a regular renewal: ${$(F.book.adult, 'en')} for a book, plus ${$(F.expedite, 'en')} if you expedite.` },
      { q: 'What do I mail with Form DS-5504 for a name change?', a: 'Four things: the completed DS-5504, your most recent U.S. passport, an original or certified document showing the name change within one year of issue (marriage certificate, divorce decree or court order) and one passport photo. The mailing address is on the form. No fee is due unless you add expedited service.' },
    ],
    body: (h) => `
<h2>The one-year test</h2>
<p>Form DS-5504 is free because the State Department treats an early name change like a correction of its own work. Both clocks must be under a year: the issue date printed in the passport and the date of the marriage or court order. When the passport is younger than a year but the marriage is older, or the reverse, DS-5504 does not apply and the change is a paid application. The calculator’s “Name change within 1 year” choice covers the free case, ${h.usd(free.total)}, and shows ${h.usd(freeFast.total)} when you add expedited processing; for the paid cases, choose renewal by mail.</p>
<h2>A data error is a different case</h2>
<p>A misspelled name, a wrong date or place of birth, or a printing defect is corrected free on the same DS-5504 at any time while the passport is valid. Reported within a year of issue, the corrected passport gets a full 10 or 5 years; later, it keeps the expiration date of the faulty one. A new photo, by contrast, is never free: if the photo printed correctly and you simply want a new one, you renew normally.</p>
<h2>Proving the new name</h2>
<p>Send an original or certified copy of the document, never a photocopy. The Department mails it back separately. If your current ID already shows the new name and you apply in person, the marriage section on page 2 of the DS-11 records the change.</p>`,
  },
  es: {
    path: 'cambio-de-nombre-pasaporte', nav: 'Cambio de nombre', card: 'Gratis en el primer año con el formulario DS-5504; después, una renovación pagada.',
    title: 'Cambio de nombre en el pasaporte 2026: gratis el 1.er año',
    description: `Cambiar el nombre del pasaporte es gratis con el DS-5504 en el primer año, ${$(freeFast.total, 'es')} si es urgente. Después es una renovación por correo de ${$(later.total, 'es')}, nunca en línea.`,
    h1: 'Cambio de nombre en el pasaporte: lo que cuesta',
    intro: 'El precio de un nombre nuevo en su pasaporte depende de una sola fecha: cuánto hace que se emitió el pasaporte y que cambió legalmente su nombre.',
    resume: `Si su pasaporte se emitió y su nombre cambió legalmente hace menos de un año, el Departamento de Estado lo reemplaza gratis: usted envía por correo el formulario DS-5504 con el pasaporte, el acta de matrimonio, la sentencia de divorcio o la orden judicial original o certificada y una foto, y no paga nada salvo que quiera el servicio urgente, ${$(F.expedite, 'es')}. Si pasó más de un año desde cualquiera de las dos fechas, el nombre nuevo pasa por una solicitud normal. Un adulto elegible renueva por correo con el DS-82 y una copia certificada del documento del cambio, ${$(later.total, 'es')} por la libreta; la renovación en línea no es posible porque excluye cualquier cambio de datos personales. Si no puede renovar, solicita en persona con el DS-11 al precio de un primer pasaporte. Sin ningún documento legal del cambio, se aplica la vía del DS-11 con el formulario DS-60, una declaración firmada por dos personas que lo conocen con los dos nombres, y tres registros públicos que muestran que usa el nombre nuevo desde hace cinco años o más.`,
    faqs: [
      { q: '¿Puedo cambiar el nombre del pasaporte en línea?', a: 'No. La renovación en línea exige que no cambie datos personales como el nombre. Con acta de matrimonio, sentencia de divorcio u orden judicial puede renovar por correo con el DS-82, o usar el DS-5504 gratuito si su pasaporte se emitió hace menos de un año.' },
      { q: '¿Es gratis cambiar el nombre del pasaporte después de casarse?', a: `Solo dentro del primer año. Si se casó y recibió el pasaporte menos de un año antes de solicitar, el DS-5504 es gratis y el pasaporte nuevo mantiene la vigencia completa. Después de un año, el cambio es una renovación normal: ${$(F.book.adult, 'es')} por la libreta, más ${$(F.expedite, 'es')} si la pide urgente.` },
      { q: '¿Qué envío con el formulario DS-5504 para cambiar el nombre?', a: 'Cuatro cosas: el DS-5504 lleno, su pasaporte más reciente, un documento original o certificado que muestre el cambio de nombre dentro del primer año (acta de matrimonio, sentencia de divorcio u orden judicial) y una foto de pasaporte. La dirección de envío está en el formulario. No se paga nada salvo que pida el servicio urgente.' },
    ],
    body: (h) => `
<h2>La prueba del año</h2>
<p>El DS-5504 es gratis porque el Departamento de Estado trata un cambio de nombre temprano como una corrección de su propio trabajo. Los dos relojes deben marcar menos de un año: la fecha de emisión impresa en el pasaporte y la fecha del matrimonio o de la orden judicial. Si el pasaporte tiene menos de un año pero el matrimonio es anterior, o al revés, el DS-5504 no se aplica y el cambio es una solicitud pagada. La opción “Cambio de nombre en el primer año” de la calculadora cubre el caso gratuito, ${h.usd(free.total)}, y muestra ${h.usd(freeFast.total)} si agrega el trámite urgente; para los casos pagados, elija la renovación por correo.</p>
<h2>Un error de datos es otro caso</h2>
<p>Un nombre mal escrito, una fecha o un lugar de nacimiento equivocados o un defecto de impresión se corrigen gratis con el mismo DS-5504 mientras el pasaporte esté vigente. Si se reporta dentro del primer año, el pasaporte corregido recibe 10 o 5 años completos; después, conserva el vencimiento del pasaporte con el error. Una foto nueva, en cambio, nunca es gratis: si la foto se imprimió bien y solo quiere cambiarla, renueva de forma normal.</p>
<h2>Cómo probar el nombre nuevo</h2>
<p>Envíe el documento original o una copia certificada, nunca una fotocopia simple. El Departamento lo devuelve en un envío aparte. Si su identificación actual ya muestra el nombre nuevo y solicita en persona, la sección de matrimonio de la página 2 del DS-11 registra el cambio.</p>`,
  },
});
