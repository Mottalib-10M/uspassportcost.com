import { definePage } from '../../lib/guide-types';
import { cost } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const F = P.fees;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const c = (s: 'first' | 'renew-mail' | 'child', svc: 'routine' | 'expedited' = 'routine', dl = false) => cost({ situation: s, doc: 'book', service: svc, delivery: dl, fileSearch: false });
// Famille type : deux parents qui renouvellent par courrier, deux enfants de moins de 16 ans au guichet.
const parents = 2 * c('renew-mail').total;
const kids = 2 * c('child').total;
const fam = parents + kids;
const famFast = 2 * c('renew-mail', 'expedited', true).total + 2 * c('child', 'expedited', true).total;
// Même famille si les parents ne peuvent pas renouveler (passeports trop anciens).
const famAllNew = 2 * c('first').total + kids;
const tenYears = 2 * c('renew-mail').total + 4 * c('child').total;

export default definePage({
  id: 'guide-family-cost', group: 'guides', order: 707, mini: 'family',
  related: ['child-passport', 'guide-child-consent', 'guide-two-checks', 'passport-renewal', 'guide-best-time'],
  sources: ['feeChart', 'under16', 'mail', 'feesPage'],
  en: {
    path: 'family-passport-cost', nav: 'Family passport cost', card: `Two parents renewing and two children: ${$(fam, 'en')} in fees, and how to pay them.`,
    title: 'Family Passport Cost 2026: Parents, Children, One Total',
    description: `Passports for a family of four cost ${$(fam, 'en')} in 2026 when parents renew by mail and two children apply in person. Expedited: ${$(famFast, 'en')}. Add up your own family here.`,
    h1: 'Family passport cost: adding it up for everyone',
    intro: 'A family pays per person, with different prices and different forms for adults and children. The calculator adds them and splits the payments.',
    resume: `Passport fees are charged per applicant, with no family rate. In 2026, a parent who renews by mail on Form DS-82 pays ${$(F.book.adult, 'en')} for a book; a child under 16 applies in person on Form DS-11 and pays ${$(F.book.minor, 'en')} to the U.S. Department of State plus the ${$(F.execution, 'en')} execution fee to the facility, ${$(c('child').total, 'en')} in all. A typical family of two renewing parents and two children therefore pays ${$(fam, 'en')}. If the parents’ passports are too old to renew, or one of them has never had a passport, each adult pays ${$(c('first').total, 'en')} instead, and the same family pays ${$(famAllNew, 'en')}. Expediting every application with 1-3 day delivery raises the bill to ${$(famFast, 'en')}. Children’s passports last 5 years and adults’ 10, so over a decade the same family renews the adults once and the children twice, about ${$(tenYears, 'en')} at today’s fees.`,
    faqs: [
      { q: 'Is there a family discount on US passports?', a: 'No. The fee chart prices each application separately, and the execution fee is charged once per person filing Form DS-11. The only saving is per person: ordering a book and a card together costs less than ordering them separately and needs one execution fee instead of two.' },
      { q: 'Can I pay for my whole family’s passports with one check?', a: 'For the State Department part, yes. It prefers one check or money order per child, but accepts a single check when the memo lists every name, every date of birth and the number of applications. Mail renewals in one envelope can also share one check. The execution fees are paid to the facility according to its own rules.' },
      { q: 'Do all family members need to go to the passport appointment?', a: 'Every child under 16 must appear in person with both parents or with the consent documents. A parent who is eligible to renew by mail does not need to apply in person for their own passport, so a family can split: children at the facility, adults by mail or online.' },
      { q: 'How much does it cost to renew passports for a family every 10 years?', a: `At current fees, two adults renewing books by mail pay ${$(2 * F.book.adult, 'en')} once a decade, while each child needs two new passports in the same period because a child’s passport lasts 5 years. With two children, the decade costs about ${$(tenYears, 'en')} in government fees.` },
      { q: 'Should the whole family apply at the same time?', a: 'It helps with travel dates, since passports issued together expire together, and it can mean one visit for the children and one envelope for the adults. It does not change the price. Children’s passports, valid 5 years, will drift out of step with adults’ 10-year passports anyway.' },
      { q: 'Does a family trip within six weeks mean expediting every passport?', a: `Only the ones that would not arrive in time. Each application has its own date, and an adult renewing online cannot expedite at all. Expediting four applications costs ${$(4 * F.expedite, 'en')} in expedite fees, plus ${$(4 * F.delivery, 'en')} if each book gets 1-3 day delivery.` },
    ],
    body: (h) => `
<h2>Why each family member has a different price</h2>
<p>The fee schedule does not know about families. It knows ages and forms. Age decides the book price, ${h.usd(F.book.adult)} from 16 and ${h.usd(F.book.minor)} before, because the application part is ${h.usd(P.feeLaw.bookApplication16Plus)} for an adult and ${h.usd(P.feeLaw.bookApplicationUnder16)} for a child, with the same ${h.usd(P.feeLaw.securitySurcharge)} surcharge. The form decides whether the ${h.usd(F.execution)} execution fee applies: every child, every first-time adult and every adult who cannot renew files Form DS-11 in person and pays it; an adult renewing by mail or online does not. The mini-calculator at the top of this page adds those amounts for any mix of adults and children, and splits the result into the checks handed in at the facility, the facility fees, and the check mailed with the renewals.</p>
<h2>Three families, three totals</h2>
<p>Take a couple with two children aged 7 and 11. If both parents hold passports issued within 15 years, they renew by mail for ${h.usd(2 * F.book.adult)}, and the children apply at a post office for ${h.usd(kids)}: ${h.usd(fam)} in total. If the parents’ passports date from more than 15 years ago, they must apply in person too, and the total rises to ${h.usd(famAllNew)}. If the trip is close and every application is expedited with 1-3 day delivery, the family pays ${h.usd2(famFast)}.</p>
<p>The difference between the first and second family is entirely execution fees and nothing else. It is a reason to check the ${h.a('passport-renewal', 'renewal rules')} for each adult before booking a facility appointment for everyone.</p>
<h2>Paying without errors</h2>
<p>At the facility, the State Department part goes on checks or money orders payable to “U.S. Department of State”. One per child is preferred; one for the family is accepted when the memo lists each name, date of birth and the number of applications. The facility fees are separate and follow the facility’s rules. A check that does not match the total holds up every application it covers, so add the numbers twice, or use the calculator.</p>
<h2>The ten-year calendar of a family</h2>
<p>Adults’ passports last 10 years and children’s 5, so a family that applies together drifts apart. A child who gets a passport at 6 needs another at 11, and the one issued at 16 is an adult passport valid until 26. Over a decade, a family of two adults and two children pays roughly ${h.usd(tenYears)} at today’s fees: one renewal per adult, two passports per child. Writing the children’s expiration dates in a calendar avoids discovering at the airport that a child’s passport is under six months for ${h.a('country-pe', 'Peru')} or ${h.a('country-th', 'Thailand')}.</p>
${h.mini('consent')}
<h2>Saving where the rules allow</h2>
<p>There are only three legitimate savings. Adults who can renew by mail or online avoid the ${h.usd(F.execution)} execution fee. Anyone who wants both a book and a card saves by ordering them on the same application. And applying early, ideally in the quiet months from October to December named by the State Department, avoids paying ${h.usd(F.expedite)} per person to expedite. Paying a private service does not reduce government fees; it adds a fee of its own.</p>
<h2>Dates for the whole family</h2>
<p>Each application gets its own processing date. Children’s applications made at a facility travel by mail to the State Department; adults renewing online skip that leg but cannot expedite. Run each person through the full calculator with the same travel date to see which application is the tightest, and expedite only that one if the others arrive in time.</p>`,
  },
  es: {
    path: 'costo-pasaportes-para-la-familia', nav: 'Pasaportes para la familia', card: `Dos padres que renuevan y dos hijos: ${$(fam, 'es')} en tarifas, y cómo pagarlas.`,
    title: 'Costo de pasaportes para la familia 2026: padres e hijos',
    description: `Los pasaportes de una familia de cuatro cuestan ${$(fam, 'es')} en 2026 si los padres renuevan por correo y dos hijos solicitan en persona. Urgente: ${$(famFast, 'es')}. Sume la suya.`,
    h1: 'Costo de los pasaportes de toda la familia',
    intro: 'Una familia paga por persona, con precios y formularios distintos para adultos y menores. La calculadora los suma y reparte los pagos.',
    resume: `Las tarifas del pasaporte se cobran por solicitante, sin tarifa familiar. En 2026, un padre que renueva por correo con el DS-82 paga ${$(F.book.adult, 'es')} por la libreta; un menor de 16 años solicita en persona con el DS-11 y paga ${$(F.book.minor, 'es')} al Departamento de Estado más la tarifa de ejecución de ${$(F.execution, 'es')} al centro, ${$(c('child').total, 'es')} en total. Una familia típica de dos padres que renuevan y dos hijos paga así ${$(fam, 'es')}. Si los pasaportes de los padres son demasiado antiguos para renovar, o uno de ellos nunca tuvo pasaporte, cada adulto paga ${$(c('first').total, 'es')} y la misma familia paga ${$(famAllNew, 'es')}. Pedir todas las solicitudes urgentes con entrega en 1 a 3 días sube la cuenta a ${$(famFast, 'es')}. Los pasaportes de menores duran 5 años y los de adultos 10, así que en una década la misma familia renueva a los adultos una vez y a los hijos dos veces, unos ${$(tenYears, 'es')} con las tarifas de hoy.`,
    faqs: [
      { q: '¿Hay descuento familiar en los pasaportes de EE. UU.?', a: 'No. La tabla de tarifas cobra cada solicitud por separado, y la tarifa de ejecución se paga una vez por cada persona que presenta el DS-11. El único ahorro es individual: pedir libreta y tarjeta juntas cuesta menos que por separado y requiere una sola tarifa de ejecución en lugar de dos.' },
      { q: '¿Puedo pagar los pasaportes de toda la familia con un solo cheque?', a: 'La parte del Departamento de Estado, sí. Prefiere un cheque o giro por menor, pero acepta uno solo si el memo lista cada nombre, cada fecha de nacimiento y el número de solicitudes. Las renovaciones enviadas en un mismo sobre también pueden compartir un cheque. Las tarifas de ejecución se pagan al centro según sus reglas.' },
      { q: '¿Toda la familia tiene que ir a la cita del pasaporte?', a: 'Cada menor de 16 años debe presentarse en persona con los dos padres o con los documentos de consentimiento. Un padre que puede renovar por correo no necesita solicitar en persona su propio pasaporte, así que la familia puede dividirse: los hijos en el centro y los adultos por correo o en línea.' },
      { q: '¿Cuánto cuesta renovar los pasaportes de una familia cada 10 años?', a: `Con las tarifas actuales, dos adultos que renuevan su libreta por correo pagan ${$(2 * F.book.adult, 'es')} una vez por década, mientras que cada hijo necesita dos pasaportes nuevos en ese tiempo porque el de un menor dura 5 años. Con dos hijos, la década cuesta unos ${$(tenYears, 'es')} en tarifas del gobierno.` },
      { q: '¿Conviene que toda la familia solicite al mismo tiempo?', a: 'Ayuda con las fechas de viaje, porque los pasaportes emitidos juntos vencen juntos, y puede significar una visita para los hijos y un sobre para los adultos. No cambia el precio. De todos modos, los pasaportes de los menores, de 5 años, se desfasan de los de los adultos, de 10.' },
      { q: '¿Un viaje familiar en menos de seis semanas obliga a pedir todo urgente?', a: `Solo las solicitudes que no llegarían a tiempo. Cada una tiene su propia fecha, y un adulto que renueva en línea no puede pedir urgente. Acelerar cuatro solicitudes cuesta ${$(4 * F.expedite, 'es')} en tarifas urgentes, más ${$(4 * F.delivery, 'es')} si cada libreta lleva la entrega en 1 a 3 días.` },
    ],
    body: (h) => `
<h2>Por qué cada miembro de la familia tiene un precio distinto</h2>
<p>La lista de tarifas no conoce familias. Conoce edades y formularios. La edad fija el precio de la libreta, ${h.usd(F.book.adult)} desde los 16 años y ${h.usd(F.book.minor)} antes, porque la parte de solicitud es de ${h.usd(P.feeLaw.bookApplication16Plus)} para un adulto y de ${h.usd(P.feeLaw.bookApplicationUnder16)} para un menor, con el mismo recargo de ${h.usd(P.feeLaw.securitySurcharge)}. El formulario decide si se paga la tarifa de ejecución de ${h.usd(F.execution)}: todo menor, todo adulto que pide su primer pasaporte y todo adulto que no puede renovar presenta el DS-11 en persona y la paga; un adulto que renueva por correo o en línea, no. La minicalculadora de arriba suma esos montos para cualquier combinación de adultos y menores y reparte el resultado entre los cheques que se entregan en el centro, las tarifas del centro y el cheque que va con las renovaciones.</p>
<h2>Tres familias, tres totales</h2>
<p>Tome una pareja con dos hijos de 7 y 11 años. Si los dos padres tienen pasaportes emitidos hace menos de 15 años, renuevan por correo por ${h.usd(2 * F.book.adult)} y los hijos solicitan en una oficina de correos por ${h.usd(kids)}: ${h.usd(fam)} en total. Si los pasaportes de los padres tienen más de 15 años, también deben ir en persona y el total sube a ${h.usd(famAllNew)}. Si el viaje está cerca y todas las solicitudes van urgentes con entrega en 1 a 3 días, la familia paga ${h.usd2(famFast)}.</p>
<p>La diferencia entre la primera y la segunda familia son solo tarifas de ejecución. Es una razón para revisar las ${h.a('passport-renewal', 'reglas de renovación')} de cada adulto antes de pedir cita para todos en un centro.</p>
<h2>Pagar sin errores</h2>
<p>En el centro, la parte del Departamento de Estado va en cheques o giros a nombre de “U.S. Department of State”. Se prefiere uno por menor; se acepta uno por familia si el memo lista cada nombre, fecha de nacimiento y el número de solicitudes. Las tarifas del centro van aparte y siguen sus reglas. Un cheque que no coincide con el total detiene todas las solicitudes que cubre, así que sume dos veces, o use la calculadora.</p>
<h2>El calendario de diez años de una familia</h2>
<p>Los pasaportes de los adultos duran 10 años y los de los menores 5, así que una familia que solicita junta se desfasa. Un niño que recibe pasaporte a los 6 años necesita otro a los 11, y el de los 16 ya es de adulto y vale hasta los 26. En una década, una familia de dos adultos y dos hijos paga unos ${h.usd(tenYears)} con las tarifas de hoy: una renovación por adulto y dos pasaportes por hijo. Anotar los vencimientos de los hijos en un calendario evita descubrir en el aeropuerto que a un niño le quedan menos de seis meses para ${h.a('country-pe', 'Perú')}.</p>
${h.mini('consent')}
<h2>Ahorrar donde las reglas lo permiten</h2>
<p>Solo hay tres ahorros legítimos. Los adultos que pueden renovar por correo o en línea se libran de la tarifa de ejecución de ${h.usd(F.execution)}. Quien quiere libreta y tarjeta ahorra pidiéndolas en la misma solicitud. Y solicitar con tiempo, idealmente en los meses tranquilos de octubre a diciembre que señala el Departamento de Estado, evita pagar ${h.usd(F.expedite)} por persona para acelerar. Pagar a un servicio privado no reduce las tarifas del gobierno; agrega una propia.</p>
<h2>Las fechas de toda la familia</h2>
<p>Cada solicitud tiene su propia fecha de trámite. Las de los menores hechas en un centro viajan por correo al Departamento; los adultos que renuevan en línea se saltan ese tramo pero no pueden pedir urgente. Pase a cada persona por la calculadora completa con la misma fecha de viaje para ver cuál es la más justa, y pida urgente solo esa si las demás llegan a tiempo.</p>`,
  },
});
