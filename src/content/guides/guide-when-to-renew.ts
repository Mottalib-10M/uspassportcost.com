import { definePage } from '../../lib/guide-types';
import { addYears, addMonths, addDays } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney, displayDate } from '../../lib/format';

const F = P.fees, T = P.times, O = P.online;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const d = (iso: string, l: 'en' | 'es') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
// Exemple : un livret qui expire le 15 mars 2028.
const EXP = '2028-03-15';
const opens = addYears(EXP, -O.expiringWithinYears);
const six = addMonths(EXP, -6);
const three = addMonths(EXP, -3);
const worst = 7 * (T.mailInMaxWeeks + T.routineWeeks[1] + T.mailOutMaxWeeks);
const mailBy = addDays(six, -worst);
const closes = addDays(addYears(EXP, O.expiredLessThanYears), -1);

export default definePage({
  id: 'guide-when-to-renew', group: 'guides', order: 710, mini: 'renewWindow',
  related: ['passport-renewal', 'renew-passport-online', 'passport-validity', 'guide-how-long-valid', 'guide-best-time'],
  sources: ['online', 'mail', 'processing', 'caApi', 'tsaId'],
  en: {
    path: 'when-to-renew-your-passport', nav: 'When to renew', card: 'The dates that matter before expiry: six months, the online window and the last safe mailing day.',
    title: 'Passport Renewal Timing 2026: Six Months Before, Not After',
    description: 'Renew a US passport about nine months before it expires: six-month countries refuse it earlier than you think. See the online window and the last mailing day.',
    h1: 'When to renew your passport',
    intro: 'A passport stops being useful for many trips months before the date printed on it. The renewal calendar works back from that date.',
    resume: `A U.S. passport is legally valid until its expiration date, but many destinations stop accepting it earlier: Peru, Türkiye, the United Arab Emirates, Honduras, Thailand and China want six months left after arrival, Vietnam six months after the stay, and the Schengen countries three months after you leave. In practice, the last useful day for international travel is often six months before expiry. Take a book that expires on ${d(EXP, 'en')}: from ${d(six, 'en')} it is too short for six-month countries, and from ${d(three, 'en')} for a Schengen trip. Online renewal opens one year before expiry, on ${d(opens, 'en')}, and stays open until ${d(closes, 'en')}. To be safe for a six-month country with routine service and mail both ways, a renewal should be mailed by ${d(mailBy, 'en')}. The fee is the same whenever you renew: ${$(F.book.adult, 'en')} for a book by mail or online.`,
    faqs: [
      { q: 'How early can I renew my US passport?', a: `By mail on Form DS-82, there is no earliest date: an eligible passport can be renewed any time, even years before it expires. Online renewal opens only ${O.expiringWithinYears} year before the expiration date. Either way the fee is ${$(F.book.adult, 'en')} for a book, and the remaining validity of the old passport is not added to the new one.` },
      { q: 'Do I lose the time left on my passport if I renew early?', a: 'Yes. A renewed passport is a new 10-year passport counted from its own issue date, and the old one is canceled. Renewing a year early means losing that year. For frequent travelers to six-month countries, the lost months are usually worth it, since the last six months were unusable anyway.' },
      { q: 'Can I travel on my old passport while the renewal is processing?', a: 'Not if you renewed by mail, because you send the old passport with the DS-82. Online, you keep it, but it is canceled as soon as you submit the application and can no longer be used for international travel. Plan the renewal in a period with no international trips.' },
      { q: 'What is the latest date I should renew before a trip?', a: `Work back from the date your destination requires. With routine service, mail both ways and six weeks of processing, the slowest published path is ${worst} days; with expedited service and 1-3 day delivery, about five and a half weeks. Inside ${T.urgentDays} days of travel, only a passport agency appointment can help.` },
      { q: 'Is my passport still valid for domestic flights after it expires?', a: 'For a while: the TSA currently accepts expired ID, a passport book or card included, at airport security up to two years after expiration. An expired passport no longer works for international travel, so renew on time. Expired passports remain usable as proof of citizenship, according to the State Department.' },
      { q: 'What happens if I wait more than five years after expiry?', a: `Online renewal closes ${O.expiredLessThanYears} years after expiry. By mail, the limit is ${P.mail.issuedWithinYears} years after issue, which for a 10-year passport is the same moment. After that, the passport cannot be renewed and you apply in person on Form DS-11, paying the ${$(F.execution, 'en')} execution fee as well.` },
    ],
    body: (h) => `
<h2>The date printed in the passport is not the date that matters</h2>
<p>Your passport has three practical end dates. The first is six months before expiry, when it stops working for the countries that count six months from arrival. The second is three months before expiry, roughly when it fails the Schengen rule for a short trip. The third is the expiration date itself, after which it is useless for travel. The mini-calendar above computes all of them for your passport, along with the opening and closing dates of online renewal.</p>
<h2>The windows of each renewal route</h2>
<p>By mail on Form DS-82, an eligible adult can renew at any time, early or late, as long as the passport was issued within the last ${h.P.mail.issuedWithinYears} years, at 16 or older. Online renewal is narrower in time: it opens ${O.expiringWithinYears} year before expiry and closes ${O.expiredLessThanYears} years after. For a book expiring on ${h.date(EXP)}, the online window runs from ${h.date(opens)} to ${h.date(closes)}. Outside it, the mail route is the only renewal, and after the 15-year mark, a new application in person is required.</p>
<h2>A worked calendar</h2>
<p>Take that same book, expiring on ${h.date(EXP)}. It becomes too short for ${h.a('country-th', 'Thailand')} or ${h.a('country-pe', 'Peru')} on ${h.date(six)}, and for a two-week trip to ${h.a('country-fr', 'France')} around ${h.date(three)}. If the next trip is to a six-month country, a routine renewal mailed by ${h.date(mailBy)} returns before the passport crosses that line, even with ${worst} days of mail and processing. Mailing it in the quiet season of October to December, when the State Department says demand is lower, adds margin.</p>
${h.mini('expiry')}
<h2>Early renewal costs validity, not money</h2>
<p>The fee does not depend on timing: ${h.usd(F.book.adult)} for a book, ${h.usd(F.card.adult)} for a card. What early renewal costs is the time left on the old passport, because the new one counts 10 years from its own issue date. For someone who only travels to Mexico or Canada, using the passport to the last day can make sense. For someone who flies to Asia or the Gulf, the final six months were never usable, so renewing about nine months before expiry loses little.</p>
<h2>Plan around trips, not around the expiry</h2>
<p>A renewal by mail takes the passport out of your hands for up to ${worst} days; an online renewal cancels it on submission. Either way, you need a window without international travel. Put the renewal in a gap between trips, ideally six weeks or more, which also satisfies the online rule of no travel for ${O.noTravelWeeks} weeks.</p>
<h2>Signals that it is time</h2>
<p>Three situations call for renewing now rather than later. A trip already booked to a six-month country whose arrival date is less than six months before expiry. Visa pages close to full, since some destinations, such as Vietnam and Türkiye, need blank pages or space for stamps. And a name change you want reflected in the passport, which online renewal cannot handle.</p>
<h2>Children are a separate calendar</h2>
<p>Passports for children under 16 last five years and cannot be renewed: each one is a new application in person with both parents’ consent. Their six-month cliff arrives at four and a half years. Families often find the child’s passport is the one that blocks a trip, so check those dates first with the ${h.a('passport-validity', 'validity checker')}.</p>`,
  },
  es: {
    path: 'cuando-renovar-el-pasaporte', nav: 'Cuándo renovar', card: 'Las fechas que importan antes del vencimiento: seis meses, la ventana en línea y el último día seguro.',
    title: 'Renovación del pasaporte 2026: cuándo hacerla, seis meses',
    description: 'Renueve el pasaporte de EE. UU. unos nueve meses antes de su vencimiento: los países de seis meses lo rechazan antes. Vea la ventana en línea y el último día.',
    h1: 'Cuándo renovar el pasaporte',
    intro: 'Un pasaporte deja de servir para muchos viajes meses antes de la fecha impresa en él. El calendario de renovación cuenta hacia atrás desde esa fecha.',
    resume: `Un pasaporte de EE. UU. es legalmente válido hasta su fecha de vencimiento, pero muchos destinos dejan de aceptarlo antes: Perú, Turquía, los Emiratos Árabes Unidos, Honduras, Tailandia y China piden seis meses de vigencia después de llegar, Vietnam seis meses después de la estancia y los países Schengen tres meses después de salir. En la práctica, el último día útil para viajar al extranjero suele estar seis meses antes del vencimiento. Tome una libreta que vence el ${d(EXP, 'es')}: desde el ${d(six, 'es')} ya no sirve para los países de seis meses, y desde el ${d(three, 'es')} para un viaje Schengen. La renovación en línea abre un año antes del vencimiento, el ${d(opens, 'es')}, y sigue abierta hasta el ${d(closes, 'es')}. Para ir seguro a un país de seis meses con servicio ordinario y correo de ida y vuelta, la renovación debe enviarse antes del ${d(mailBy, 'es')}. La tarifa es la misma cuando sea que renueve: ${$(F.book.adult, 'es')} por la libreta, por correo o en línea.`,
    faqs: [
      { q: '¿Con cuánta anticipación puedo renovar mi pasaporte?', a: `Por correo con el DS-82 no hay fecha mínima: un pasaporte elegible se renueva en cualquier momento, incluso años antes del vencimiento. La renovación en línea solo abre ${O.expiringWithinYears} año antes de la fecha de vencimiento. En los dos casos la tarifa es de ${$(F.book.adult, 'es')} por la libreta, y la vigencia que le quedaba al viejo no se suma al nuevo.` },
      { q: '¿Pierdo el tiempo que le queda al pasaporte si renuevo antes?', a: 'Sí. Un pasaporte renovado es un pasaporte nuevo de 10 años contado desde su propia fecha de emisión, y el viejo se anula. Renovar un año antes significa perder ese año. Para quien viaja seguido a países de seis meses suele valer la pena, porque los últimos seis meses no servían de todos modos.' },
      { q: '¿Puedo viajar con el pasaporte viejo mientras se tramita la renovación?', a: 'No si renovó por correo, porque envía el pasaporte viejo con el DS-82. En línea lo conserva, pero queda anulado en cuanto envía la solicitud y ya no sirve para viajes internacionales. Planee la renovación en un periodo sin viajes al extranjero.' },
      { q: '¿Cuál es la última fecha para renovar antes de un viaje?', a: `Cuente hacia atrás desde la fecha que exige su destino. Con servicio ordinario, correo de ida y vuelta y seis semanas de trámite, el camino más lento publicado es de ${worst} días; con urgente y entrega en 1 a 3 días, unas cinco semanas y media. A ${T.urgentDays} días o menos del viaje, solo ayuda una cita en una agencia.` },
      { q: '¿Mi pasaporte sigue sirviendo para vuelos nacionales después de vencer?', a: 'Por un tiempo: la TSA acepta actualmente documentos vencidos, libreta o tarjeta de pasaporte incluidas, en el control de seguridad hasta dos años después del vencimiento. Un pasaporte vencido ya no sirve para viajar al extranjero, así que conviene renovar a tiempo. Según el Departamento de Estado, los pasaportes vencidos siguen sirviendo como prueba de ciudadanía.' },
      { q: '¿Qué pasa si espero más de cinco años después del vencimiento?', a: `La renovación en línea cierra ${O.expiredLessThanYears} años después del vencimiento. Por correo, el límite es de ${P.mail.issuedWithinYears} años desde la emisión, que para un pasaporte de 10 años es el mismo momento. Después ya no se renueva: se solicita en persona con el DS-11 y se paga además la tarifa de ejecución de ${$(F.execution, 'es')}.` },
    ],
    body: (h) => `
<h2>La fecha impresa no es la que importa</h2>
<p>Su pasaporte tiene tres fechas de fin en la práctica. La primera, seis meses antes del vencimiento, cuando deja de servir para los países que cuentan seis meses desde la llegada. La segunda, tres meses antes, cuando más o menos no cumple la regla Schengen para un viaje corto. La tercera es el propio vencimiento, después del cual no sirve para viajar. El minicalendario de arriba calcula todas para su pasaporte, junto con las fechas en que abre y cierra la renovación en línea.</p>
<h2>Las ventanas de cada vía de renovación</h2>
<p>Por correo con el DS-82, un adulto elegible puede renovar en cualquier momento, antes o después, siempre que el pasaporte se haya emitido en los últimos ${h.P.mail.issuedWithinYears} años, con 16 años o más. La renovación en línea es más estrecha: abre ${O.expiringWithinYears} año antes del vencimiento y cierra ${O.expiredLessThanYears} años después. Para una libreta que vence el ${h.date(EXP)}, la ventana en línea va del ${h.date(opens)} al ${h.date(closes)}. Fuera de ella, el correo es la única renovación, y pasados los 15 años hace falta una solicitud nueva en persona.</p>
<h2>Un calendario de ejemplo</h2>
<p>Tome esa misma libreta, que vence el ${h.date(EXP)}. Deja de servir para ${h.a('country-pe', 'Perú')} u ${h.a('country-ho', 'Honduras')} el ${h.date(six)}, y para un viaje de dos semanas a ${h.a('country-sp', 'España')} hacia el ${h.date(three)}. Si el próximo viaje es a un país de seis meses, una renovación ordinaria enviada antes del ${h.date(mailBy)} regresa antes de que el pasaporte cruce esa línea, incluso con ${worst} días de correo y trámite. Enviarla en la temporada baja de octubre a diciembre, cuando el Departamento de Estado dice que hay menos demanda, agrega margen.</p>
${h.mini('expiry')}
<h2>Renovar antes cuesta vigencia, no dinero</h2>
<p>La tarifa no depende del momento: ${h.usd(F.book.adult)} por la libreta, ${h.usd(F.card.adult)} por la tarjeta. Lo que cuesta renovar antes es el tiempo que le quedaba al pasaporte viejo, porque el nuevo cuenta 10 años desde su propia emisión. Para quien solo viaja a México o Canadá, usar el pasaporte hasta el último día puede tener sentido. Para quien vuela a Asia o al Golfo, los últimos seis meses nunca sirvieron, así que renovar unos nueve meses antes del vencimiento pierde poco.</p>
<h2>Planee según los viajes, no según el vencimiento</h2>
<p>Una renovación por correo le quita el pasaporte hasta ${worst} días; una en línea lo anula al enviarla. En los dos casos necesita un periodo sin viajes internacionales. Ponga la renovación en un hueco entre viajes, idealmente de seis semanas o más, lo que además cumple la regla en línea de no viajar en ${O.noTravelWeeks} semanas.</p>
<h2>Señales de que es el momento</h2>
<p>Tres situaciones piden renovar ya y no después. Un viaje reservado a un país de seis meses cuya llegada cae a menos de seis meses del vencimiento. Páginas de visa casi llenas, porque algunos destinos, como Vietnam y Turquía, exigen páginas libres o espacio para sellos. Y un cambio de nombre que quiere ver en el pasaporte, algo que la renovación en línea no puede hacer.</p>
<h2>Los menores tienen otro calendario</h2>
<p>Los pasaportes de menores de 16 años duran cinco años y no se renuevan: cada uno es una solicitud nueva en persona con el consentimiento de ambos padres. Su límite de seis meses llega a los cuatro años y medio. Muchas familias descubren que el pasaporte del niño es el que impide el viaje, así que revise primero esas fechas con el ${h.a('passport-validity', 'verificador de vigencia')}.</p>`,
  },
});
