import { definePage } from '../../lib/guide-types';
import { cost } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import { formatMoney } from '../../lib/format';

const F = P.fees;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const teen = cost({ situation: 'teen', doc: 'book', service: 'routine', delivery: false, fileSearch: false });
const kid = cost({ situation: 'child', doc: 'book', service: 'routine', delivery: false, fileSearch: false });

export default definePage({
  id: 'passport-16-17', group: 'cost', order: 125,
  tool: { kind: 'passport', situation: 'teen', focus: 'cost' },
  related: ['child-passport', 'first-time-passport', 'guide-how-long-valid', 'passport-card'],
  sources: ['teen', 'feeChart', 'under16'],
  en: {
    path: 'passport-for-16-and-17-year-olds', nav: 'Passport at 16 or 17', card: `Adult fee, ${$(teen.total, 'en')}, a 10-year passport, and one parent informed.`,
    title: 'Passport at 16 or 17 in 2026: Adult Fee, 10-Year Book',
    description: `At 16 or 17 a first passport costs the adult ${$(teen.total, 'en')}, in person on Form DS-11, valid 10 years. Show one parent knows, with an ID or a note. Fee and date here.`,
    h1: 'Passport for 16 and 17 year olds',
    intro: 'From the 16th birthday the State Department charges the adult price and issues a 10-year passport, but a teen still applies in person.',
    resume: `A teenager aged 16 or 17 applying for a first adult passport pays exactly what an adult pays: ${$(F.book.adult, 'en')} for a book, ${$(F.card.adult, 'en')} for a card or ${$(F.both.adult, 'en')} for both, to the U.S. Department of State, plus the ${$(F.execution, 'en')} execution fee to the acceptance facility, so ${$(teen.total, 'en')} for a book. That is ${$(teen.total - kid.total, 'en')} more than the ${$(kid.total, 'en')} a 15-year-old pays, but the passport lasts 10 years instead of 5, which makes it the cheapest passport per year of validity at any age. The application is Form DS-11, in person, and the teen must show that one parent or guardian is aware of it: the parent comes along and signs, writes a signed note, appears as the emergency contact on the form, or pays the fee with a check in the parent’s name. Without an acceptable photo ID of their own, a parent with ID signs the application with them.`,
    faqs: [
      { q: 'Does a 16-year-old need both parents to get a passport?', a: 'No. The two-parent rule ends at 16. A 16 or 17 year old applies on Form DS-11 and only has to show that one parent or guardian knows: a parent present who signs, a signed note with a copy of the parent’s ID, a parent listed as emergency contact, or a check from the parent.' },
      { q: 'What ID can a 16 or 17 year old use to apply?', a: 'A fully valid driver’s license, state ID or learner’s permit with photo usually works, sometimes with a second ID for a permit. If the teen has no acceptable photo ID, a parent or guardian who presents one signs the application with them, and the acceptance agent keeps a copy of that parent’s ID.' },
      { q: 'Is it worth waiting until 16 for a passport?', a: `In cost per year, yes: ${$(teen.total, 'en')} buys 10 years at 16, while ${$(kid.total, 'en')} buys 5 years at 15. A passport issued just before the 16th birthday is a child passport of 5 years. If no trip is planned, waiting a few weeks past the birthday doubles the validity for ${$(teen.total - kid.total, 'en')} more.` },
    ],
    body: (h) => `
<h2>Same price as an adult, different paperwork</h2>
<p>The fee schedule draws its line at 16: the book fee jumps from ${h.usd(F.book.minor)} to ${h.usd(F.book.adult)} and validity doubles. The rest of the file looks like a child’s. The teen brings citizenship evidence such as a certified birth certificate, a photocopy of it on single-sided letter paper, a photo ID and its copy, and one photo that the agent staples. The first adult passport can never be a renewal, even if the teen held child passports before: the DS-82 is closed to passports issued before 16.</p>
<h2>Four ways to prove a parent knows</h2>
<p>The State Department accepts any one of four signs. A parent applies with the teen, shows ID and signs the DS-11. Or the teen brings a note signed by the parent with a photocopy of that parent’s ID. Or a parent is listed in the emergency contact section of the form. Or the fee check bears the parent’s name. If none of these makes it clear, the Department may ask for the notarized Form DS-3053.</p>
<h2>A passport that lasts into adulthood</h2>
<p>Issued at 16, the passport expires at 26. That timing matters: from 25 the holder becomes eligible for ${h.a('renew-passport-online', 'online renewal')}, and at 26 the passport can still be renewed by mail because it was issued at 16. Count the months a destination wants, though; the ${h.a('passport-validity', 'validity checker')} does it for 24 countries.</p>`,
  },
  es: {
    path: 'pasaporte-16-y-17-anos', nav: 'Pasaporte a los 16 o 17', card: `Tarifa de adulto, ${$(teen.total, 'es')}, pasaporte de 10 años y un padre informado.`,
    title: 'Pasaporte a los 16 o 17 años 2026: tarifa de adulto',
    description: `A los 16 o 17 años el primer pasaporte cuesta lo mismo que un adulto, ${$(teen.total, 'es')}, con el DS-11 y vale 10 años. Basta con que un padre lo sepa. Costo y fecha.`,
    h1: 'Pasaporte para jóvenes de 16 y 17 años',
    intro: 'Desde los 16 años el Departamento de Estado cobra el precio de adulto y emite un pasaporte de 10 años, pero la solicitud sigue siendo en persona.',
    resume: `Un joven de 16 o 17 años que pide su primer pasaporte de adulto paga lo mismo que un adulto: ${$(F.book.adult, 'es')} por la libreta, ${$(F.card.adult, 'es')} por la tarjeta o ${$(F.both.adult, 'es')} por ambas al Departamento de Estado, más la tarifa de ejecución de ${$(F.execution, 'es')} al centro de aceptación, es decir ${$(teen.total, 'es')} por la libreta. Son ${$(teen.total - kid.total, 'es')} más que los ${$(kid.total, 'es')} que paga un chico de 15 años, pero el pasaporte dura 10 años en lugar de 5: es el pasaporte más barato por año de vigencia a cualquier edad. Se usa el formulario DS-11, en persona, y el joven debe mostrar que un padre o tutor sabe de la solicitud: el padre lo acompaña y firma, escribe una nota firmada, aparece como contacto de emergencia en el formulario o paga con un cheque a su nombre. Si el joven no tiene identificación con foto aceptable, un padre con identificación firma la solicitud con él.`,
    faqs: [
      { q: '¿Un joven de 16 años necesita a los dos padres para sacar el pasaporte?', a: 'No. La regla de los dos padres termina a los 16 años. Un joven de 16 o 17 solicita con el DS-11 y solo debe mostrar que un padre o tutor lo sabe: un padre presente que firma, una nota firmada con copia de su identificación, un padre como contacto de emergencia o un cheque del padre.' },
      { q: '¿Qué identificación puede usar un joven de 16 o 17 años?', a: 'Suele servir una licencia de conducir, una identificación estatal o un permiso de aprendizaje con foto, a veces con una segunda identificación si es un permiso. Si el joven no tiene una identificación con foto aceptable, un padre o tutor que sí la tenga firma la solicitud con él, y el agente guarda copia de esa identificación.' },
      { q: '¿Conviene esperar a cumplir 16 para sacar el pasaporte?', a: `Por costo por año, sí: con ${$(teen.total, 'es')} se compran 10 años a los 16, mientras que ${$(kid.total, 'es')} compran 5 años a los 15. Un pasaporte emitido justo antes de los 16 es de menor y vale 5 años. Si no hay viaje a la vista, esperar unas semanas después del cumpleaños duplica la vigencia por ${$(teen.total - kid.total, 'es')} más.` },
    ],
    body: (h) => `
<h2>Precio de adulto, papeles de menor</h2>
<p>La lista de tarifas marca la línea en los 16 años: la libreta pasa de ${h.usd(F.book.minor)} a ${h.usd(F.book.adult)} y la vigencia se duplica. El resto del expediente se parece al de un niño. El joven lleva su prueba de ciudadanía, como un acta de nacimiento certificada, una copia por un solo lado en papel carta, una identificación con foto y su copia, y una foto que engrapa el agente. El primer pasaporte de adulto nunca es una renovación, aunque haya tenido pasaportes de menor: el DS-82 no sirve para pasaportes emitidos antes de los 16 años.</p>
<h2>Cuatro formas de probar que un padre lo sabe</h2>
<p>El Departamento de Estado acepta cualquiera de cuatro señales. Un padre solicita con el joven, muestra su identificación y firma el DS-11. O el joven lleva una nota firmada por el padre con copia de su identificación. O un padre aparece en la sección de contacto de emergencia del formulario. O el cheque de la tarifa lleva el nombre del padre. Si nada de esto basta, el Departamento puede pedir el formulario DS-3053 notariado.</p>
<h2>Un pasaporte que llega a la edad adulta</h2>
<p>Emitido a los 16, el pasaporte vence a los 26. Esa fecha importa: desde los 25 años se puede usar la ${h.a('renew-passport-online', 'renovación en línea')}, y a los 26 todavía se renueva por correo porque se emitió a los 16. Cuente los meses que pide cada destino; el ${h.a('passport-validity', 'verificador de vigencia')} lo hace para 24 países.</p>`,
  },
});
