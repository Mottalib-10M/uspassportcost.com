import { definePage } from '../../lib/guide-types';
import { expiryOf, addYears } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney, displayDate } from '../../lib/format';

const F = P.fees, V = P.validity;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const d = (iso: string, l: 'en' | 'es') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
// Exemples : un passeport délivré à 15 ans et un à 16 ans, le même jour.
const ISS = '2026-05-04';
const at15 = expiryOf(ISS, 15);
const at16 = expiryOf(ISS, 16);
const perYearAdult = (F.book.adult + F.execution) / V.adultYears;
const perYearChild = (F.book.minor + F.execution) / V.minorYears;

export default definePage({
  id: 'guide-how-long-valid', group: 'guides', order: 711, mini: 'expiry',
  related: ['guide-when-to-renew', 'passport-renewal', 'child-passport', 'passport-16-17', 'passport-validity'],
  sources: ['under16', 'teen', 'mail', 'cardVsBook'],
  en: {
    path: 'how-long-is-a-passport-valid', nav: 'How long a passport is valid', card: '10 years from age 16, 5 years before; the same for the card. Find your expiry date.',
    title: 'Passport Validity Length 2026: 10 Years Adult, 5 Years Child',
    description: 'A US passport is valid 10 years if issued at 16 or older and 5 years if issued to a child under 16. Book and card alike. Find your own expiry date here.',
    h1: 'How long is a US passport valid?',
    intro: 'The length depends on one fact: your age on the day the passport was issued. The calculator turns your issue date into an expiration date.',
    resume: `A U.S. passport issued to someone aged 16 or older is valid for ${V.adultYears} years; one issued to a child under 16 is valid for ${V.minorYears} years. The passport card follows exactly the same rule as the book. The line is the age on the issue date, not at application, which can matter for a teenager who applies just before a birthday: two passports issued on ${d(ISS, 'en')}, one to a 15-year-old and one to a 16-year-old, expire on ${d(at15, 'en')} and ${d(at16, 'en')}. Children’s passports cannot be renewed; adult passports issued at 16 or older can be renewed by mail for ${P.mail.issuedWithinYears} years after issue, and online within a year before and five years after expiry. In cost per year of validity, an adult’s first book costs ${$(perYearAdult, 'en')} a year and a child’s ${$(perYearChild, 'en')}. Passports with limited validity, issued in emergencies, expire sooner and should be replaced with full-validity ones.`,
    faqs: [
      { q: 'Is a passport valid for 10 years from the issue date or the application date?', a: 'From the issue date printed on the data page. Processing time does not shorten it: a passport applied for in March and issued in April is valid 10 years from April for an adult. The expiration date is printed next to the issue date, and the calculator above computes it for any issue date.' },
      { q: 'Why does my child’s passport expire after only 5 years?', a: `Passports for children under 16 are issued for ${V.minorYears} years, because children’s appearance changes quickly. They cannot be renewed: each new one is a Form DS-11 in person with both parents’ consent, at ${$(F.book.minor + F.execution, 'en')} for a book including the facility fee.` },
      { q: 'Does a passport card have the same validity as the book?', a: 'Yes. The State Department’s comparison page gives the same validity for both: 10 years for adults and 5 years for children under 16. A card ordered later than the book has its own issue date and expires on its own schedule.' },
      { q: 'Can a passport issued at 15 be renewed by mail at 20?', a: 'No. Renewal by mail requires a passport issued when you were 16 or older and valid for 10 years. A passport issued at 15 is a child passport; at any age after it, the next passport is a new application on Form DS-11 in person, even if the old one is still valid.' },
      { q: 'What is a limited-validity passport?', a: 'A passport the State Department issues for a shorter period when an emergency or urgent travel prevents issuing a full one, for example after multiple lost passports or without complete documents. Emergency passports issued abroad are valid one year or less. Replace them with a full-validity passport when you can; some cases are free on Form DS-5504.' },
      { q: 'Does an expired passport still prove US citizenship?', a: 'Yes. The State Department notes that previous passports can always be used as proof of citizenship, even when they are expired. An expired passport is not valid for travel, but it can support a new application, and it is returned to you after a renewal by mail.' },
    ],
    body: (h) => `
<h2>One rule, two lengths</h2>
<p>The age that counts is the age on the issue date. From 16, the State Department issues a 10-year passport; under 16, a 5-year passport. The mini-calculator at the top takes your issue date and that age, and returns the expiration date and the renewal route you will have when it comes, by mail, online or in person. For a passport issued on ${h.date(ISS)}, the difference between 15 and 16 is five years of validity: ${h.date(at15)} against ${h.date(at16)}.</p>
<h2>What each length means for renewal</h2>
<p>An adult passport, issued at 16 or older, can be renewed by mail for ${h.P.mail.issuedWithinYears} years after issue, which gives five years of grace after a 10-year passport expires. Online renewal opens a year before expiry and closes five years after, for holders aged 25 or more. A child passport never renews: every new passport is a fresh application in person, with both parents or the consent form. A teenager whose last passport was a child one must apply in person at 16 or 17, and only the passport after that can be renewed.</p>
<h2>Validity is not the same as usability</h2>
<p>A passport valid until a given date is not usable everywhere until that date. Many countries require six months left after arrival, and the Schengen area three months after departure. A 10-year passport therefore offers about nine and a half usable years for travelers to those destinations, and a child’s 5-year passport about four and a half. The ${h.a('passport-validity', 'validity checker')} applies each rule to your dates.</p>
${h.mini('renewWindow')}
<h2>Cost per year of validity</h2>
<p>Because adult and child passports differ in both price and length, the yearly cost differs. A first adult book at ${h.usd(F.book.adult + F.execution)} spreads to ${h.usd2(perYearAdult)} per year; a child’s book at ${h.usd(F.book.minor + F.execution)} to ${h.usd2(perYearChild)} per year. Renewals by mail are cheaper per year again, at ${h.usd(F.book.adult)} for ten years. Families who time a teenager’s application just after the 16th birthday double its validity for ${h.usd(F.book.adult - F.book.minor)} more.</p>
<h2>Passports that last less</h2>
<p>Some passports are issued with limited validity on purpose: after multiple losses or damage, when documents were incomplete before urgent travel, or as emergency passports abroad, which are purple and valid one year or less. The State Department explains on its limited-validity page how to obtain a full-validity passport and when no fee is due if you act within a year. Reporting a passport lost or stolen ends its validity immediately, whatever date it shows.</p>
<h2>Renewing does not extend the old passport</h2>
<p>A renewal is a new passport with a new issue date and a new 10-year period. Time left on the old one is not carried over, and the old book is canceled, returned to you by mail after a DS-82 renewal, or kept but invalid after an online renewal. Renewing early therefore shortens the total time covered by the two passports, which is worth knowing when deciding between renewing now and waiting until the online window opens.</p>
<h2>Where to read the dates</h2>
<p>Both dates are on the data page, the page with your photo: date of issue and date of expiration, written day, month and year. The card shows them on the front. When in doubt about which passport is current, the most recently issued one is, since a renewal cancels the previous book.</p>`,
  },
  es: {
    path: 'cuanto-dura-el-pasaporte', nav: 'Cuánto dura el pasaporte', card: '10 años desde los 16, 5 antes; igual para la tarjeta. Encuentre su fecha de vencimiento.',
    title: 'Vigencia del pasaporte 2026: 10 años adultos, 5 menores',
    description: 'El pasaporte de EE. UU. vale 10 años si se emite desde los 16 años y 5 años si se emite a un menor. Igual en libreta y tarjeta. Calcule aquí su vencimiento.',
    h1: '¿Cuánto dura el pasaporte de EE. UU.?',
    intro: 'La duración depende de un solo dato: su edad el día en que se emitió el pasaporte. La calculadora convierte la fecha de emisión en fecha de vencimiento.',
    resume: `Un pasaporte de EE. UU. emitido a una persona de 16 años o más vale ${V.adultYears} años; uno emitido a un menor de 16 vale ${V.minorYears} años. La tarjeta de pasaporte sigue exactamente la misma regla que la libreta. La línea es la edad en la fecha de emisión, no al solicitar, lo que puede importar a un joven que solicita justo antes de su cumpleaños: dos pasaportes emitidos el ${d(ISS, 'es')}, uno a un chico de 15 años y otro a uno de 16, vencen el ${d(at15, 'es')} y el ${d(at16, 'es')}. Los pasaportes de menores no se renuevan; los de adultos emitidos con 16 años o más se renuevan por correo hasta ${P.mail.issuedWithinYears} años después de la emisión, y en línea desde un año antes hasta cinco años después del vencimiento. En costo por año de vigencia, la primera libreta de un adulto cuesta ${$(perYearAdult, 'es')} al año y la de un menor ${$(perYearChild, 'es')}. Los pasaportes de vigencia limitada, emitidos en emergencias, vencen antes y conviene reemplazarlos por uno completo.`,
    faqs: [
      { q: '¿El pasaporte vale 10 años desde la emisión o desde la solicitud?', a: 'Desde la fecha de emisión impresa en la página de datos. El tiempo de trámite no la acorta: un pasaporte solicitado en marzo y emitido en abril vale 10 años desde abril para un adulto. La fecha de vencimiento aparece junto a la de emisión, y la calculadora de arriba la calcula para cualquier fecha.' },
      { q: '¿Por qué el pasaporte de mi hijo vence a los 5 años?', a: `Los pasaportes de menores de 16 años se emiten por ${V.minorYears} años, porque la apariencia de los niños cambia rápido. No se renuevan: cada uno nuevo es un DS-11 en persona con el consentimiento de ambos padres, ${$(F.book.minor + F.execution, 'es')} por la libreta con la tarifa del centro.` },
      { q: '¿La tarjeta de pasaporte tiene la misma vigencia que la libreta?', a: 'Sí. La página comparativa del Departamento de Estado da la misma vigencia a las dos: 10 años para adultos y 5 para menores de 16. Una tarjeta pedida después de la libreta tiene su propia fecha de emisión y vence en su propio momento.' },
      { q: '¿Un pasaporte emitido a los 15 años se renueva por correo a los 20?', a: 'No. La renovación por correo exige un pasaporte emitido con 16 años o más y válido por 10 años. Un pasaporte emitido a los 15 es de menor; a cualquier edad posterior, el siguiente es una solicitud nueva con el DS-11 en persona, aunque el anterior siga vigente.' },
      { q: '¿Qué es un pasaporte de vigencia limitada?', a: 'Un pasaporte que el Departamento de Estado emite por menos tiempo cuando una emergencia o un viaje urgente impiden emitir uno completo, por ejemplo tras varias pérdidas o sin todos los documentos. Los pasaportes de emergencia emitidos en el extranjero valen un año o menos. Reemplácelos por uno de vigencia completa; algunos casos son gratis con el DS-5504.' },
      { q: '¿Un pasaporte vencido sigue probando la ciudadanía?', a: 'Sí. El Departamento de Estado indica que los pasaportes anteriores siempre sirven como prueba de ciudadanía, aunque estén vencidos. Un pasaporte vencido no sirve para viajar, pero puede respaldar una solicitud nueva, y se le devuelve después de una renovación por correo.' },
    ],
    body: (h) => `
<h2>Una regla, dos duraciones</h2>
<p>La edad que cuenta es la del día de emisión. Desde los 16 años, el Departamento de Estado emite un pasaporte de 10 años; antes, uno de 5. La minicalculadora de arriba toma su fecha de emisión y esa edad, y devuelve la fecha de vencimiento y la vía de renovación que tendrá entonces: por correo, en línea o en persona. Para un pasaporte emitido el ${h.date(ISS)}, la diferencia entre 15 y 16 años son cinco años de vigencia: el ${h.date(at15)} frente al ${h.date(at16)}.</p>
<h2>Lo que significa cada duración para renovar</h2>
<p>Un pasaporte de adulto, emitido con 16 años o más, se renueva por correo hasta ${h.P.mail.issuedWithinYears} años después de la emisión, lo que da cinco años de gracia después de que vence uno de 10 años. La renovación en línea abre un año antes del vencimiento y cierra cinco años después, para titulares de 25 años o más. Un pasaporte de menor nunca se renueva: cada uno nuevo es una solicitud desde cero en persona, con los dos padres o el formulario de consentimiento. Un joven cuyo último pasaporte fue de menor debe solicitar en persona a los 16 o 17, y solo el pasaporte siguiente se podrá renovar.</p>
<h2>Vigente no significa utilizable</h2>
<p>Un pasaporte vigente hasta cierta fecha no sirve en todas partes hasta esa fecha. Muchos países piden seis meses de vigencia después de llegar, y la zona Schengen tres meses después de salir. Un pasaporte de 10 años ofrece así unos nueve años y medio útiles para esos destinos, y uno de menor, de 5 años, unos cuatro y medio. El ${h.a('passport-validity', 'verificador de vigencia')} aplica cada regla a sus fechas.</p>
${h.mini('renewWindow')}
<h2>Costo por año de vigencia</h2>
<p>Como los pasaportes de adultos y de menores difieren en precio y en duración, el costo anual también. Una primera libreta de adulto de ${h.usd(F.book.adult + F.execution)} sale a ${h.usd2(perYearAdult)} por año; la de un menor, de ${h.usd(F.book.minor + F.execution)}, a ${h.usd2(perYearChild)} por año. Las renovaciones por correo salen aún más baratas por año, ${h.usd(F.book.adult)} por diez años. Las familias que piden el pasaporte de un adolescente justo después de los 16 años duplican su vigencia por ${h.usd(F.book.adult - F.book.minor)} más.</p>
<h2>Pasaportes que duran menos</h2>
<p>Algunos pasaportes se emiten a propósito con vigencia limitada: tras varias pérdidas o daños, cuando faltaban documentos antes de un viaje urgente, o como pasaportes de emergencia en el extranjero, que son morados y valen un año o menos. La página de vigencia limitada del Departamento de Estado explica cómo obtener un pasaporte completo y cuándo no hay que pagar si actúa dentro del primer año. Reportar un pasaporte perdido o robado termina su vigencia de inmediato, diga la fecha que diga.</p>
<h2>Renovar no alarga el pasaporte viejo</h2>
<p>Una renovación es un pasaporte nuevo con una nueva fecha de emisión y un nuevo periodo de 10 años. El tiempo que le quedaba al viejo no se traslada, y la libreta anterior se anula: se le devuelve por correo después de un DS-82, o la conserva pero sin validez después de una renovación en línea. Por eso renovar muy pronto acorta el tiempo total que cubren los dos pasaportes.</p>
<h2>Dónde leer las fechas</h2>
<p>Las dos fechas están en la página de datos, la de su foto: fecha de emisión y fecha de vencimiento, con día, mes y año. La tarjeta las muestra al frente. Si duda de cuál pasaporte es el vigente, es el emitido más recientemente, porque una renovación anula la libreta anterior.</p>`,
  },
});
