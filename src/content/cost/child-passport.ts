import { definePage } from '../../lib/guide-types';
import { cost } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const F = P.fees;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const book = cost({ situation: 'child', doc: 'book', service: 'routine', delivery: false, fileSearch: false });
const card = cost({ situation: 'child', doc: 'card', service: 'routine', delivery: false, fileSearch: false });
const both = cost({ situation: 'child', doc: 'both', service: 'routine', delivery: false, fileSearch: false });
const fast = cost({ situation: 'child', doc: 'book', service: 'expedited', delivery: true, fileSearch: false });
const tenYears = 2 * book.total;

export default definePage({
  id: 'child-passport', group: 'cost', order: 120,
  tool: { kind: 'passport', situation: 'child', focus: 'cost' },
  related: ['guide-child-consent', 'guide-family-cost', 'passport-16-17', 'passport-card', 'where-to-apply'],
  sources: ['under16', 'feeChart', 'feesPage'],
  en: {
    path: 'child-passport', nav: 'Child passport', card: `${$(book.total, 'en')} for a child’s book, valid 5 years, never renewable.`,
    title: `Child Passport Cost 2026: ${$(book.total, 'en')} Book, ${$(card.total, 'en')} Card, Under 16`,
    description: `A passport for a child under 16 costs ${$(book.total, 'en')} for a book or ${$(card.total, 'en')} for a card in 2026, in two payments. Both parents, Form DS-11, 5 years. Add speed and see the date.`,
    h1: 'Child passport cost, under age 16',
    intro: 'Children under 16 always apply in person on Form DS-11, with both parents or their consent, and pay a lower application fee.',
    resume: `A passport for a child under 16 costs ${$(F.book.minor, 'en')} for the book, ${$(F.card.minor, 'en')} for the card or ${$(F.both.minor, 'en')} for both, paid to the U.S. Department of State, plus the ${$(F.execution, 'en')} execution fee paid separately to the acceptance facility: ${$(book.total, 'en')} for a book, ${$(card.total, 'en')} for a card and ${$(both.total, 'en')} for both. The passport is valid for 5 years and cannot be renewed: the next one is a new application in person, at the same price, so a child who travels from birth to 10 pays about ${$(tenYears, 'en')} for two books. Both parents or guardians must come with the child, or the absent parent signs the notarized consent form DS-3053 within 90 days of the visit. Expedited service and 1-3 day delivery cost the same as for adults, which brings an expedited child book to ${$(fast.total, 'en')}.`,
    faqs: [
      { q: 'Why is a child passport cheaper than an adult one?', a: `The application part of the fee is lower. The federal fee schedule sets ${$(P.feeLaw.bookApplicationUnder16, 'en')} for a child’s book against ${$(P.feeLaw.bookApplication16Plus, 'en')} for an adult, and both pay the same ${$(P.feeLaw.securitySurcharge, 'en')} security surcharge, so ${$(F.book.minor, 'en')} instead of ${$(F.book.adult, 'en')}. The execution fee of ${$(F.execution, 'en')} is the same at every age.` },
      { q: 'Can I renew my child’s passport by mail?', a: 'No. Passports for children under 16 are valid for 5 years and cannot be renewed, by mail or online. Each new passport is a Form DS-11 submitted in person with the child, new citizenship evidence or the previous passport, and the parents’ IDs or consent, at the full child fee.' },
      { q: 'Do I need a separate check for each child?', a: 'The State Department prefers one check or money order per child, payable to “U.S. Department of State”, with the child’s name and date of birth in the memo. If a family applying together has only one check, it accepts it when the memo lists every name, date of birth and the number of applications.' },
      { q: 'What does a child’s passport card allow?', a: `For ${$(card.total, 'en')} in total, a child’s card is valid 5 years for land and sea travel to Canada, Mexico, Bermuda and the Caribbean, but never for international flights. Many families take book and card together for ${$(both.total, 'en')}, one visit and one execution fee.` },
    ],
    body: (h) => `
<h2>The appointment is the expensive part, not the fee</h2>
<p>A child’s application fails more often on the parents’ paperwork than on money. The acceptance agent must see the legal relationship between the child and each parent, usually through a U.S. birth certificate that lists both, and must see both parents in person with their IDs and a photocopy of the front and back of each. When one parent cannot come, the other brings Form DS-3053 signed in front of a notary, less than 90 days old, with a copy of the ID shown to the notary. Sole custody is shown with a court order, a birth certificate listing one parent, or a death certificate. The ${h.a('guide-child-consent', 'consent guide')} lists each case.</p>
<h2>Fees in the order the facility collects them</h2>
<p>The child’s fee goes on a check or money order to the State Department, ${h.usd(book.state)} for a book, and the facility collects its ${h.usd(F.execution)}. Do not attach the photo: the agent staples it. If you need the passport within 6 weeks, add ${h.usd(F.expedite)} for expedited service and ${h.usd2(F.delivery)} for 1-3 day delivery to the same check, for ${h.usd2(fast.state)} in all.</p>
<h2>Five years go faster than they sound</h2>
<p>Because a child’s passport lasts half as long as an adult’s, check its expiration before any trip to a country that counts months of validity: a passport issued at age 9 expires at 14, and a six-month rule can make it useless at 13 and a half. The ${h.a('passport-validity', 'validity checker')} shows the last day it works for each destination.</p>`,
  },
  es: {
    path: 'pasaporte-para-ninos', nav: 'Pasaporte de menor', card: `${$(book.total, 'es')} por la libreta de un menor, 5 años, no se renueva.`,
    title: `Pasaporte para niños 2026: ${$(book.total, 'es')}, menores de 16 años`,
    description: `El pasaporte de un menor de 16 años cuesta ${$(book.total, 'es')} la libreta o ${$(card.total, 'es')} la tarjeta en 2026, en dos pagos. Ambos padres, formulario DS-11, 5 años. Vea costo y fecha.`,
    h1: 'Pasaporte para niños menores de 16 años: costo',
    intro: 'Los menores de 16 años siempre solicitan en persona con el formulario DS-11, con los dos padres o su consentimiento, y pagan una tarifa menor.',
    resume: `El pasaporte de un menor de 16 años cuesta ${$(F.book.minor, 'es')} por la libreta, ${$(F.card.minor, 'es')} por la tarjeta o ${$(F.both.minor, 'es')} por ambas, que se pagan al Departamento de Estado de EE. UU., más la tarifa de ejecución de ${$(F.execution, 'es')} que se paga aparte al centro de aceptación: ${$(book.total, 'es')} por la libreta, ${$(card.total, 'es')} por la tarjeta y ${$(both.total, 'es')} por las dos. El pasaporte vale 5 años y no se renueva: el siguiente es una solicitud nueva en persona, al mismo precio, así que un niño que viaja desde que nace hasta los 10 años paga unos ${$(tenYears, 'es')} por dos libretas. Los dos padres o tutores deben ir con el menor, o el padre ausente firma ante notario el formulario de consentimiento DS-3053, con menos de 90 días de antigüedad. El servicio urgente y la entrega en 1 a 3 días cuestan lo mismo que para un adulto: una libreta de menor urgente llega a ${$(fast.total, 'es')}.`,
    faqs: [
      { q: '¿Por qué el pasaporte de un niño cuesta menos que el de un adulto?', a: `La parte de solicitud es menor. La lista federal de tarifas fija ${$(P.feeLaw.bookApplicationUnder16, 'es')} para la libreta de un menor frente a ${$(P.feeLaw.bookApplication16Plus, 'es')} para un adulto, y ambos pagan el mismo recargo de seguridad de ${$(P.feeLaw.securitySurcharge, 'es')}: ${$(F.book.minor, 'es')} en vez de ${$(F.book.adult, 'es')}. La tarifa de ejecución, ${$(F.execution, 'es')}, es igual a cualquier edad.` },
      { q: '¿Puedo renovar por correo el pasaporte de mi hijo?', a: 'No. Los pasaportes de menores de 16 años valen 5 años y no se renuevan, ni por correo ni en línea. Cada pasaporte nuevo es un formulario DS-11 presentado en persona con el menor, una prueba de ciudadanía nueva o el pasaporte anterior, y las identificaciones o el consentimiento de los padres, con la tarifa completa.' },
      { q: '¿Necesito un cheque distinto para cada hijo?', a: 'El Departamento de Estado prefiere un cheque o giro por menor, a nombre de “U.S. Department of State”, con el nombre y la fecha de nacimiento del niño en el memo. Si la familia solicita junta y solo tiene un cheque, lo acepta cuando el memo lista cada nombre, cada fecha de nacimiento y el número de solicitudes.' },
      { q: '¿Para qué sirve la tarjeta de pasaporte de un niño?', a: `Por ${$(card.total, 'es')} en total, la tarjeta de un menor vale 5 años para viajar por tierra y mar a Canadá, México, Bermudas y el Caribe, pero nunca en vuelos internacionales. Muchas familias piden libreta y tarjeta juntas por ${$(both.total, 'es')}: una sola visita y una sola tarifa de ejecución.` },
    ],
    body: (h) => `
<h2>Lo difícil es la cita, no la tarifa</h2>
<p>La solicitud de un menor falla más por los papeles de los padres que por el dinero. El agente debe ver la relación legal entre el niño y cada padre, casi siempre con un acta de nacimiento de EE. UU. que nombra a los dos, y debe ver a ambos en persona con su identificación y una copia del frente y el reverso. Si uno no puede ir, el otro lleva el formulario DS-3053 firmado ante notario, de menos de 90 días, con copia de la identificación que vio el notario. La custodia exclusiva se prueba con una orden judicial, un acta que nombra a un solo padre o un acta de defunción. La ${h.a('guide-child-consent', 'guía del consentimiento')} repasa cada caso.</p>
<h2>Las tarifas en el orden en que las cobra el centro</h2>
<p>La tarifa del menor va en un cheque o giro al Departamento de Estado, ${h.usd(book.state)} por la libreta, y el centro cobra sus ${h.usd(F.execution)}. No pegue la foto: la engrapa el agente. Si necesita el pasaporte en menos de 6 semanas, sume al mismo cheque ${h.usd(F.expedite)} del servicio urgente y ${h.usd2(F.delivery)} de la entrega en 1 a 3 días: ${h.usd2(fast.state)} en total.</p>
<h2>Cinco años pasan rápido</h2>
<p>Como el pasaporte de un menor dura la mitad que el de un adulto, revise el vencimiento antes de viajar a un país que cuenta meses de vigencia: un pasaporte emitido a los 9 años vence a los 14, y una regla de seis meses lo deja inútil a los 13 y medio. El ${h.a('passport-validity', 'verificador de vigencia')} muestra el último día en que sirve para cada destino.</p>`,
  },
});
