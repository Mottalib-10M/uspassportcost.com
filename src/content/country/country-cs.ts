import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';

const d = (iso: string, l: 'en' | 'es') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const ARR = '2027-01-08';
const LEAVE = addDays(ARR, 179);
const need = requiredDate('stay', 0, ARR, LEAVE);

export default definePage({
  id: 'country-cs', group: 'country', order: 505, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'CS' },
  data: { country: 'CS' },
  related: ['country-pe', 'country-co', 'country-ho', 'passport-validity'],
  sources: ['caApi', 'processing'],
  en: {
    path: 'passport-validity/costa-rica', nav: 'Costa Rica', card: 'Valid for the whole stay, undamaged, with an onward ticket; up to 180 days.',
    title: 'Passport Validity Costa Rica 2026: Whole Stay, No Damage',
    description: 'Costa Rica passport rules for 2026: valid for the whole stay, in good condition, with a return or onward ticket. Up to 180 days may be allowed, not guaranteed.',
    h1: 'Passport for Costa Rica: the length of your stay sets the date',
    intro: 'Costa Rica asks for a passport that lasts as long as you do, and immigration can turn away one that is damaged.',
    resume: `The State Department lists, as the first general entry requirement for Costa Rica, a valid passport for the duration of your stay. The rule moves with your departure date rather than a fixed number of months. Immigration may deny entry if the passport is damaged, and travelers need a return ticket or proof of onward travel, plus proof of yellow fever vaccination when arriving from certain countries in South America or Africa. Authorities may allow visitors to stay up to 180 days without a visa, though this is not guaranteed. A retiree arriving on ${d(ARR, 'en')} and planning to leave after 180 days, on ${d(LEAVE, 'en')}, needs a passport valid at least until ${d(need, 'en')}. Overstaying can bring fines, delays, deportation and refusal of future entry.`,
    faqs: [
      { q: 'Will Costa Rica accept a passport with a torn page or water damage?', a: 'It may not. The State Department page says immigration may deny your entry if the passport is damaged. The U.S. rules treat water damage, mold, significant tears or missing pages as damage, while folded pages and small bends count as normal wear. A damaged passport cannot be renewed by mail: it is replaced in person with Form DS-11.' },
      { q: 'How long does my passport need to be valid for Costa Rica?', a: 'For the duration of your stay, according to the State Department. There is no six-month figure on the country page. Plan the date from your real departure: if officials grant a long stay, close to the 180 days they may allow, the passport has to cover all of it.' },
      { q: 'Can I owe money and still leave Costa Rica?', a: 'Not always. The State Department warns that authorities may stop people with debts in Costa Rica from leaving, including unpaid bills from car accidents or medical costs, and that someone who owes child support there may have to pay up to 13 months of support before departing.' },
    ],
    body: (h) => `
<h2>A rule tied to your departure</h2>
<p>Costa Rica belongs to the group of destinations where the passport must outlast the visit itself. For a ten-day trip to Guanacaste that is rarely a problem. It matters more for long stays: visitors spending a winter on the Pacific coast often stay several months, and the State Department notes that up to 180 days may be granted without a visa. The checker above uses your departure date as the deadline, which is exactly how this rule works.</p>
<h2>Condition counts as much as dates</h2>
<p>The page adds a warning many travelers overlook: a damaged passport can be refused. A booklet that went through the washing machine, has a ripped data page or loose pages is a risk at Juan Santamaría airport. Replacing it is a new application in person, ${h.a('lost-or-stolen-passport', 'like a lost passport')}, not a renewal.</p>
<h2>Children born in Costa Rica</h2>
<p>All children born in Costa Rica get Costa Rican citizenship at birth, and Costa Rican minors need an exit permit from immigration to leave. Parents of such children should consult Costa Rican authorities before travel, whatever U.S. passport the child holds.</p>`,
  },
  es: {
    path: 'vigencia-del-pasaporte/costa-rica', nav: 'Costa Rica', card: 'Vigente toda la estancia, sin daños y con boleto de salida; hasta 180 días.',
    title: 'Vigencia del pasaporte Costa Rica 2026: toda la estancia',
    description: 'Pasaporte para Costa Rica en 2026: vigente toda la estancia, en buen estado y con boleto de salida. Pueden darle hasta 180 días, pero no está garantizado.',
    h1: 'Pasaporte para Costa Rica: la duración de la estancia fija la fecha',
    intro: 'Costa Rica pide un pasaporte que dure tanto como su visita, y Migración puede rechazar uno dañado.',
    resume: `El Departamento de Estado pone como primer requisito general de entrada a Costa Rica un pasaporte vigente durante toda la estancia. La regla se mueve con su fecha de salida, no con un número fijo de meses. Migración puede negar la entrada si el pasaporte está dañado, y el viajero necesita boleto de regreso o prueba de que seguirá a otro país, además de la vacuna contra la fiebre amarilla si llega de ciertos países de Sudamérica o África. Las autoridades pueden permitir hasta 180 días sin visa, aunque no está garantizado. Un jubilado que llega el ${d(ARR, 'es')} y piensa salir a los 180 días, el ${d(LEAVE, 'es')}, necesita un pasaporte vigente al menos hasta el ${d(need, 'es')}. Quedarse más tiempo del permitido puede traer multas, demoras, deportación y la negativa de entrada en el futuro.`,
    faqs: [
      { q: '¿Costa Rica acepta un pasaporte con una página rota o mojado?', a: 'Puede que no. La ficha del Departamento de Estado dice que Migración puede negar la entrada si el pasaporte está dañado. Para las reglas de EE. UU., el agua, el moho, los desgarros grandes o las páginas faltantes son daño, mientras que las páginas dobladas son desgaste normal. Un pasaporte dañado no se renueva por correo: se reemplaza en persona con el DS-11.' },
      { q: '¿Cuánto tiempo de vigencia necesita el pasaporte para Costa Rica?', a: 'Toda la estancia, según el Departamento de Estado. La ficha no menciona seis meses. Calcule la fecha con su salida real: si le conceden una estancia larga, cerca de los 180 días que pueden permitir, el pasaporte tiene que cubrirla entera.' },
      { q: '¿Puedo salir de Costa Rica si tengo deudas allí?', a: 'No siempre. El Departamento de Estado advierte que las autoridades pueden impedir la salida a quien tenga deudas en Costa Rica, incluidas cuentas de accidentes de tránsito o gastos médicos, y que quien deba pensión alimenticia allí puede tener que pagar hasta 13 meses antes de irse.' },
    ],
    body: (h) => `
<h2>Una regla atada a su salida</h2>
<p>Costa Rica está entre los destinos donde el pasaporte debe durar más que la visita. Para diez días en Guanacaste casi nunca es un problema. Importa más en las estancias largas: quienes pasan el invierno en la costa del Pacífico se quedan varios meses, y el Departamento de Estado indica que pueden concederse hasta 180 días sin visa. El verificador de arriba usa su fecha de salida como límite, que es justo como funciona esta regla.</p>
<h2>El estado del pasaporte pesa tanto como las fechas</h2>
<p>La ficha agrega una advertencia que muchos pasan por alto: un pasaporte dañado puede ser rechazado. Una libreta que pasó por la lavadora, con la página de datos rota o con hojas sueltas, es un riesgo en el aeropuerto Juan Santamaría. Reemplazarla es una solicitud nueva en persona, ${h.a('lost-or-stolen-passport', 'como un pasaporte perdido')}, no una renovación.</p>
<h2>Niños nacidos en Costa Rica</h2>
<p>Todos los niños nacidos en Costa Rica son costarricenses de nacimiento, y los menores costarricenses necesitan un permiso de salida de Migración. Los padres de estos niños deben consultar a las autoridades costarricenses antes de viajar, sea cual sea el pasaporte estadounidense del menor.</p>`,
  },
});
