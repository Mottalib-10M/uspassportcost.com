import { definePage } from '../../lib/guide-types';
import { cost, timeline } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const F = P.fees, T = P.times;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const book = cost({ situation: 'first', doc: 'book', service: 'routine', delivery: false, fileSearch: false });
const both = cost({ situation: 'first', doc: 'both', service: 'routine', delivery: false, fileSearch: false });
const nocit = cost({ situation: 'first', doc: 'book', service: 'routine', delivery: false, fileSearch: true });
const worst = 7 * (T.mailInMaxWeeks + T.routineWeeks[1] + T.mailOutMaxWeeks);

export default definePage({
  id: 'first-time-passport', group: 'cost', order: 110,
  tool: { kind: 'passport', situation: 'first', focus: 'cost' },
  related: ['passport-execution-fee', 'guide-two-checks', 'where-to-apply', 'passport-16-17', 'guide-apply-ahead'],
  sources: ['adults', 'feeChart', 'citizenship', 'photos', 'whereToApply'],
  en: {
    path: 'first-time-passport', nav: 'First passport', card: `${$(book.total, 'en')} for a first adult book, in two payments, and what to bring.`,
    title: `First-Time Passport Cost 2026: ${$(book.total, 'en')}, Form DS-11, Checks`,
    description: `A first-time adult passport book costs ${$(book.total, 'en')} in 2026: ${$(F.book.adult, 'en')} to the State Department plus ${$(F.execution, 'en')} to the facility. Add expedite or a card and see your arrival date.`,
    h1: 'First-time passport cost and timeline',
    intro: 'A first passport is always Form DS-11 signed in person, so it carries two fees and a mail leg in each direction.',
    resume: `An adult applying for a first U.S. passport fills in Form DS-11, takes it unsigned to an acceptance facility with proof of citizenship, a photo ID, a photocopy of each and one photo, and pays twice. The application fee of ${$(F.book.adult, 'en')} for a book, ${$(F.card.adult, 'en')} for a card or ${$(F.both.adult, 'en')} for both goes on a check or money order to the U.S. Department of State; the ${$(F.execution, 'en')} execution fee is paid separately to the facility. A first adult book therefore costs ${$(book.total, 'en')}, and book plus card ${$(both.total, 'en')}. Without any proof of citizenship, the ${$(F.fileSearch, 'en')} file search brings the book to ${$(nocit.total, 'en')}. The facility mails the application, which can take up to ${T.mailInMaxWeeks} weeks, then routine processing takes ${T.routineWeeks[0]} to ${T.routineWeeks[1]} weeks and the passport can take ${T.mailOutMaxWeeks} more weeks to arrive: up to ${worst} days in all.`,
    faqs: [
      { q: 'What do I bring to apply for my first passport?', a: 'The unsigned DS-11, physical evidence of U.S. citizenship such as a certified birth certificate with its photocopy, a valid photo ID with a photocopy of the front and back, one passport photo, and the two payments. Digital or mobile birth certificates are not accepted, and an ID from another state may require a second ID.' },
      { q: 'Can I pay the $35 execution fee by card at the post office?', a: `It depends on the facility. The State Department fee must be a check or money order payable to “U.S. Department of State”, but the ${$(F.execution, 'en')} execution fee follows the facility’s own rules: some post offices and clerks take cards, others only checks or cash. Call or check the facility’s page before you go.` },
      { q: 'Is a first-time passport cheaper for someone who is 16 or 17?', a: `No. Applicants aged 16 and 17 pay the adult fee, ${$(F.book.adult, 'en')} for a book plus the ${$(F.execution, 'en')} execution fee, and receive a passport valid for 10 years. They still apply in person on Form DS-11 and must show that a parent or guardian knows about the application.` },
      { q: 'How early should I apply for a first passport before a trip?', a: `Count up to ${worst} days for routine service, the slowest published path with mail both ways. If your trip is less than 6 weeks away, the State Department says to expedite; within ${T.urgentDays} days, book a passport agency appointment instead of going to a facility.` },
    ],
    body: (h) => `
<h2>Two payments at the counter</h2>
<p>The acceptance agent checks your documents, gives you an oath and watches you sign. Only then do you hand over the payments. The check or money order for the State Department carries the application fee and any options you chose, with your name and date of birth in the memo line. The ${h.usd(F.execution)} goes to the facility itself. The calculator lists the two amounts on separate lines so that you can write the check at home: ${h.usd(book.state)} for a book, ${h.usd(both.state)} for book and card, more if you expedite.</p>
<h2>What the first application asks for that a renewal does not</h2>
<p>Evidence of citizenship is the document that holds most first applications back. A certified U.S. birth certificate is the usual one; a Consular Report of Birth Abroad, a certificate of naturalization or citizenship, or a previous full-validity passport also work. If none of them exists, the State Department can search its own records for ${h.usd(F.fileSearch)}, which you add with the second switch in the calculator. The photo ID must be physical and valid, and both the evidence and the ID need a single-sided black and white photocopy on letter paper.</p>
<h2>Where and when to go</h2>
<p>Any of the more than ${h.num(h.P.network.acceptanceFacilities)} acceptance facilities takes first applications, often by appointment. The ${h.a('where-to-apply', 'where to apply page')} counts them by state. If you leave in less than three weeks, a facility is the wrong door: you need an appointment at a passport agency within ${T.urgentDays} days of travel, and the ${h.usd(F.expedite)} expedite fee is charged there in every case. For most trips, though, applying ${Math.ceil(worst / 7)} weeks ahead with routine service is enough.</p>`,
  },
  es: {
    path: 'primer-pasaporte', nav: 'Primer pasaporte', card: `${$(book.total, 'es')} por la primera libreta de adulto, en dos pagos, y qué llevar.`,
    title: `Primer pasaporte 2026: ${$(book.total, 'es')} con el formulario DS-11`,
    description: `El primer pasaporte de adulto cuesta ${$(book.total, 'es')} en 2026: ${$(F.book.adult, 'es')} al Departamento de Estado y ${$(F.execution, 'es')} al centro. Sume urgente o tarjeta y vea la fecha de llegada exacta.`,
    h1: 'Primer pasaporte: costo y plazos',
    intro: 'El primer pasaporte siempre es un formulario DS-11 firmado en persona: lleva dos tarifas y un tramo de correo en cada sentido.',
    resume: `Un adulto que pide su primer pasaporte de EE. UU. llena el formulario DS-11, lo lleva sin firmar a un centro de aceptación con su prueba de ciudadanía, una identificación con foto, una copia de cada una y una foto, y paga dos veces. La tarifa de solicitud, ${$(F.book.adult, 'es')} por la libreta, ${$(F.card.adult, 'es')} por la tarjeta o ${$(F.both.adult, 'es')} por ambas, va en un cheque o giro al Departamento de Estado; la tarifa de ejecución de ${$(F.execution, 'es')} se paga aparte al centro. La primera libreta de un adulto cuesta así ${$(book.total, 'es')}, y libreta más tarjeta ${$(both.total, 'es')}. Sin ninguna prueba de ciudadanía, la búsqueda de expediente de ${$(F.fileSearch, 'es')} lleva la libreta a ${$(nocit.total, 'es')}. El centro envía la solicitud por correo, hasta ${T.mailInMaxWeeks} semanas, el trámite ordinario toma de ${T.routineWeeks[0]} a ${T.routineWeeks[1]} semanas y el pasaporte puede tardar ${T.mailOutMaxWeeks} semanas más en llegar: hasta ${worst} días en total.`,
    faqs: [
      { q: '¿Qué llevo para solicitar mi primer pasaporte?', a: 'El DS-11 sin firmar, una prueba física de ciudadanía como el acta de nacimiento certificada con su copia, una identificación con foto vigente con copia del frente y del reverso, una foto de pasaporte y los dos pagos. No se aceptan actas de nacimiento digitales, y una identificación de otro estado puede exigir una segunda identificación.' },
      { q: '¿Puedo pagar con tarjeta los 35 dólares de ejecución en el correo?', a: `Depende del centro. La tarifa del Departamento de Estado tiene que ser cheque o giro a nombre de “U.S. Department of State”, pero la de ejecución, ${$(F.execution, 'es')}, sigue las reglas del centro: algunas oficinas de correos y juzgados aceptan tarjeta y otras solo cheque o efectivo. Pregunte antes de ir.` },
      { q: '¿El primer pasaporte es más barato para un joven de 16 o 17 años?', a: `No. A los 16 y 17 años se paga la tarifa de adulto, ${$(F.book.adult, 'es')} por la libreta más ${$(F.execution, 'es')} de ejecución, y el pasaporte vale 10 años. Se solicita en persona con el DS-11 y hay que demostrar que un padre o tutor sabe de la solicitud.` },
      { q: '¿Con cuánto tiempo pido el primer pasaporte antes de viajar?', a: `Cuente hasta ${worst} días en servicio ordinario, el camino más lento publicado con correo de ida y vuelta. Si el viaje es en menos de 6 semanas, el Departamento de Estado dice que pida el urgente; a ${T.urgentDays} días o menos, pida cita en una agencia de pasaportes en vez de ir a un centro.` },
    ],
    body: (h) => `
<h2>Dos pagos en la ventanilla</h2>
<p>El agente de aceptación revisa sus documentos, le toma el juramento y lo ve firmar. Solo entonces entrega los pagos. El cheque o giro para el Departamento de Estado lleva la tarifa de solicitud y las opciones elegidas, con su nombre y fecha de nacimiento en el memo. Los ${h.usd(F.execution)} van al propio centro. La calculadora muestra los dos montos en líneas separadas para que escriba el cheque en casa: ${h.usd(book.state)} por la libreta, ${h.usd(both.state)} por libreta y tarjeta, más si pide urgente.</p>
<h2>Lo que pide la primera solicitud y no pide una renovación</h2>
<p>La prueba de ciudadanía es el documento que más retrasa las primeras solicitudes. Lo habitual es un acta de nacimiento certificada de EE. UU.; también sirven el informe consular de nacimiento en el extranjero, el certificado de naturalización o de ciudadanía, o un pasaporte anterior de vigencia completa. Si no existe ninguno, el Departamento puede buscar en sus propios archivos por ${h.usd(F.fileSearch)}, que se suma con el segundo interruptor de la calculadora. La identificación con foto debe ser física y vigente, y la prueba y la identificación necesitan una copia en blanco y negro, por un solo lado, en papel tamaño carta.</p>
<h2>Dónde y cuándo ir</h2>
<p>Cualquiera de los más de ${h.num(h.P.network.acceptanceFacilities)} centros de aceptación recibe primeras solicitudes, a menudo con cita. La página de ${h.a('where-to-apply', 'dónde solicitar')} los cuenta por estado. Si sale en menos de tres semanas, el centro no es la puerta correcta: necesita una cita en una agencia a ${T.urgentDays} días del viaje, y allí siempre se cobra la tarifa urgente de ${h.usd(F.expedite)}. Para la mayoría de los viajes, solicitar con ${Math.ceil(worst / 7)} semanas de anticipación en servicio ordinario es suficiente.</p>`,
  },
});
