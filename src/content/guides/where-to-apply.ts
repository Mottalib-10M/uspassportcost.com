import { definePage } from '../../lib/guide-types';
import { cost } from '../../lib/engine/passport';
import P from '../../data/params-2026.json';
import O from '../../data/official.json';
import { formatMoney, formatNumber } from '../../lib/format';

const F = P.fees, T = P.times;
const $ = (n: number, l: 'en' | 'es') => formatMoney(n, Number.isInteger(n) ? 0 : 2, l);
const n = (x: number, l: 'en' | 'es') => formatNumber(x, 0, l);
const st = (O as any).stats;
const L = st.locations_by_state as Record<string, { total: number; Postal: number; Library: number }>;
const NAMES: Record<string, [string, string]> = { CA: ['California', 'California'], NY: ['New York', 'Nueva York'], TX: ['Texas', 'Texas'], FL: ['Florida', 'Florida'] };
const top = Object.entries(L).sort((a, b) => b[1].total - a[1].total).slice(0, 3);
const postal = Object.values(L).reduce((a, v) => a + v.Postal, 0);
const libraries = Object.values(L).reduce((a, v) => a + v.Library, 0);
const facility = cost({ situation: 'first', doc: 'book', service: 'routine', delivery: false, fileSearch: false });
const agency = cost({ situation: 'first', doc: 'book', service: 'agency', delivery: false, fileSearch: false });
const nm = (code: string, l: 'en' | 'es') => (NAMES[code] ? NAMES[code][l === 'es' ? 1 : 0] : code);
const tops = (l: 'en' | 'es') => top.map(([k, v]) => `${nm(k, l)} (${n(v.total, l)})`).join(', ');

export default definePage({
  id: 'where-to-apply', group: 'guides', order: 712, mini: 'where', data: { states: true },
  related: ['first-time-passport', 'passport-appointment', 'passport-execution-fee', 'child-passport', 'passport-renewal'],
  sources: ['whereToApply', 'appointment', 'caApi', 'mail'],
  en: {
    path: 'where-to-apply-for-a-passport', nav: 'Where to apply', card: 'Acceptance facility, mail, online or passport agency: which door fits your case, state by state.',
    title: 'Passport Application Locations 2026: Facility, Mail, Agency',
    description: `Apply at one of ${n(P.network.acceptanceFacilities, 'en')}+ acceptance facilities, renew by mail or online, or book one of ${P.network.agencies} passport agencies for urgent travel. See locations by state and fees.`,
    h1: 'Where to apply for a US passport',
    intro: 'Four doors lead to a passport: an acceptance facility, the mail, the online renewal system and a passport agency. Your situation and your travel date choose one.',
    resume: `New passports, children’s passports and replacements for lost ones are filed in person at an acceptance facility: the State Department counts more than ${n(P.network.acceptanceFacilities, 'en')}, mostly post offices, clerks of court, public libraries and other local government offices. They take new applications only, not renewals, offer routine or expedited service, may require appointments and charge the ${$(F.execution, 'en')} execution fee, so a first adult book costs ${$(facility.total, 'en')} there. Eligible adults renew by mail with Form DS-82 or online on opr.travel.state.gov, with no facility visit. Passport agencies and centers, ${P.network.agencies} of them, are run by the State Department for travel within ${T.urgentDays} days or a foreign visa needed within ${T.urgentVisaDays} days; they require an appointment, proof of travel and the ${$(F.expedite, 'en')} expedite fee, ${$(agency.total, 'en')} for a first adult book. The Consular Affairs location list holds ${n(st.locations_total, 'en')} entries, led by ${tops('en')}.`,
    faqs: [
      { q: 'Can I renew my passport at the post office?', a: 'Not as an in-person service. Acceptance facilities, including post offices, accept new applications and do not accept forms to renew or correct existing passports. You can mail a DS-82 renewal through the postal service, and the State Department says postal employees should not review it or charge the facility fee.' },
      { q: 'Do I need an appointment at a passport acceptance facility?', a: 'Many facilities require one, and some host special passport acceptance events with expanded hours. The State Department’s locator lists facilities by ZIP code; check the facility’s own instructions for appointments and the payment methods it accepts for the execution fee.' },
      { q: 'What is the difference between an acceptance facility and a passport agency?', a: `An acceptance facility, such as a post office or county clerk, takes your application and forwards it to the State Department. A passport agency is run by the State Department itself, processes applications, and receives the public only by appointment for travel within ${T.urgentDays} days or a foreign visa within ${T.urgentVisaDays} days.` },
      { q: 'How many passport acceptance locations are there in my state?', a: `The table on this page counts the entries of the Consular Affairs location list by state and by type, post offices, courts and county or city offices, and libraries. The largest states lead: ${tops('en')}. Entries without a type are counted only in the state total.` },
      { q: 'Can I apply for a passport at a passport agency without urgent travel?', a: `No. Agencies require an appointment, and appointments are for international travel within ${T.urgentDays} calendar days, a foreign visa within ${T.urgentVisaDays} days, or a life-or-death emergency. Without one of those, apply at an acceptance facility or renew by mail or online.` },
      { q: 'Where do I apply if I live outside the United States?', a: 'Contact the nearest U.S. embassy or consulate for instructions, or follow the State Department’s separate process for renewing from Canada. Online renewal is only for eligible citizens located in a U.S. state or territory at the time they submit the application.' },
    ],
    body: (h) => `
<h2>Choosing the door</h2>
<p>The mini-calculator at the top asks two things, what you are applying for and how many days remain before you travel, and points to the right door with its fees. The logic follows the State Department’s own page. First passports, children under 16, teenagers of 16 and 17 and anyone replacing a lost or stolen passport go to an acceptance facility. Adults who meet the renewal rules stay home and renew by mail or online. Anyone within ${T.urgentDays} days of an international trip, or ${T.urgentVisaDays} days if a foreign visa is needed, books a passport agency.</p>
<h2>Acceptance facilities</h2>
<p>These are not State Department offices. They are post offices, clerks of court, county and city offices and libraries that have agents trained to check identity, witness the signature and forward the application. The Consular Affairs data service lists ${h.num(st.locations_total)} location entries, among them ${h.num(postal)} postal facilities and ${h.num(libraries)} libraries. The table below counts them by state. Each facility collects the ${h.usd(F.execution)} execution fee on its own terms and may sell faster mail to the State Department, USPS Priority Mail Express, at a price it sets.</p>
<h2>Mail and online</h2>
<p>For eligible adults, the best door is often no door at all. A DS-82 travels by mail to one of the processing centers listed on the renewal page, and the facility fee disappears. Online renewal skips the envelope as well. Both cost ${h.usd(F.book.adult)} for a book. Online, you must be in the United States and have no travel planned for six weeks.</p>
${h.mini('lastDay')}
<h2>Passport agencies and centers</h2>
<p>The ${h.P.network.agencies} agencies and centers listed by the State Department, from Boston and New York to Honolulu and San Juan, process all applications and receive the public only by appointment. Appointments are free and booked in the Online Passport Appointment System, for up to seven people in a household; a request to pay for one should be treated as fraud. At the counter, the ${h.usd(F.expedite)} expedite fee is always charged, whatever the date of your trip.</p>
<h2>Reading the state table</h2>
<p>The counts reflect how each state organizes the service. Large states lead in absolute numbers, ${tops('en')}, but the mix varies: some rely mostly on post offices, others on county clerks and courts, a few on libraries. A high count does not mean shorter waits, since appointment availability depends on each office’s staff and hours, and some facilities host special acceptance fairs with expanded hours. Use the table to see which kinds of offices exist where you live, then the State Department’s locator to find the nearest one by ZIP code.</p>
<h2>Where a renewal envelope goes</h2>
<p>Routine renewals from California, Florida, Illinois, Minnesota, New York and Texas go to the processing center in Irving, Texas; other states send theirs to Philadelphia; expedited renewals, marked “EXPEDITE” on the envelope, have their own Philadelphia box. The exact addresses are on the ${h.a('passport-renewal', 'renewal page')}.</p>
<h2>Bring the same file everywhere</h2>
<p>Whichever door you use, the application needs the same core: the correct form, citizenship evidence or the previous passport, a photo, and the fees. At a facility or an agency, add a valid photo ID and photocopies. Preparing the file once, with the full calculator’s payment breakdown, avoids a second trip, and a second appointment that may be weeks away in the busy season.</p>`,
  },
  es: {
    path: 'donde-solicitar-el-pasaporte', nav: 'Dónde solicitar', card: 'Centro de aceptación, correo, en línea o agencia: qué puerta corresponde a su caso, estado por estado.',
    title: 'Lugares para solicitar el pasaporte 2026: centro o agencia',
    description: `Solicite en uno de los más de ${n(P.network.acceptanceFacilities, 'es')} centros de aceptación, renueve por correo o en línea, o pida cita en una de las ${P.network.agencies} agencias. Lugares por estado y tarifas.`,
    h1: 'Dónde solicitar el pasaporte de EE. UU.',
    intro: 'Cuatro puertas llevan a un pasaporte: un centro de aceptación, el correo, la renovación en línea y una agencia. Su situación y su fecha de viaje eligen una.',
    resume: `Los pasaportes nuevos, los de menores y los reemplazos de pasaportes perdidos se presentan en persona en un centro de aceptación: el Departamento de Estado cuenta más de ${n(P.network.acceptanceFacilities, 'es')}, sobre todo oficinas de correos, juzgados, bibliotecas públicas y otras oficinas del gobierno local. Solo reciben solicitudes nuevas, no renovaciones, ofrecen servicio ordinario o urgente, pueden pedir cita y cobran la tarifa de ejecución de ${$(F.execution, 'es')}, así que una primera libreta de adulto cuesta allí ${$(facility.total, 'es')}. Los adultos elegibles renuevan por correo con el DS-82 o en línea en opr.travel.state.gov, sin pasar por un centro. Las agencias y centros de pasaportes, ${P.network.agencies} en total, los administra el Departamento para viajes en ${T.urgentDays} días o visas extranjeras necesarias en ${T.urgentVisaDays} días; exigen cita, prueba del viaje y la tarifa urgente de ${$(F.expedite, 'es')}, ${$(agency.total, 'es')} por una primera libreta de adulto. La lista de lugares de Asuntos Consulares tiene ${n(st.locations_total, 'es')} registros, encabezada por ${tops('es')}.`,
    faqs: [
      { q: '¿Puedo renovar el pasaporte en la oficina de correos?', a: 'No como servicio en persona. Los centros de aceptación, incluidas las oficinas de correos, reciben solicitudes nuevas y no aceptan formularios para renovar o corregir pasaportes. Puede enviar una renovación DS-82 por el servicio postal, y el Departamento de Estado dice que los empleados no deben revisarla ni cobrar la tarifa del centro.' },
      { q: '¿Necesito cita en un centro de aceptación de pasaportes?', a: 'Muchos centros la piden, y algunos organizan jornadas especiales de pasaportes con horario ampliado. El buscador del Departamento de Estado muestra los centros por código postal; revise las instrucciones del propio centro sobre citas y sobre los medios de pago que acepta para la tarifa de ejecución.' },
      { q: '¿Qué diferencia hay entre un centro de aceptación y una agencia de pasaportes?', a: `Un centro de aceptación, como una oficina de correos o el secretario del condado, recibe su solicitud y la envía al Departamento de Estado. Una agencia la administra el propio Departamento, procesa las solicitudes y solo atiende al público con cita para viajes en ${T.urgentDays} días o visas extranjeras en ${T.urgentVisaDays} días.` },
      { q: '¿Cuántos lugares para solicitar el pasaporte hay en mi estado?', a: `La tabla de esta página cuenta los registros de la lista de lugares de Asuntos Consulares por estado y por tipo: oficinas de correos, juzgados y oficinas del condado o la ciudad, y bibliotecas. Encabezan los estados más grandes: ${tops('es')}. Los registros sin tipo solo cuentan en el total del estado.` },
      { q: '¿Puedo solicitar en una agencia de pasaportes sin un viaje urgente?', a: `No. Las agencias exigen cita, y las citas son para viajes internacionales en ${T.urgentDays} días naturales, visas extranjeras en ${T.urgentVisaDays} días o emergencias de vida o muerte. Sin uno de esos motivos, solicite en un centro de aceptación o renueve por correo o en línea.` },
      { q: '¿Dónde solicito el pasaporte si vivo fuera de EE. UU.?', a: 'Comuníquese con la embajada o el consulado de EE. UU. más cercano para recibir instrucciones, o siga el procedimiento aparte del Departamento de Estado para renovar desde Canadá. La renovación en línea solo es para ciudadanos elegibles que estén en un estado o territorio de EE. UU. al enviar la solicitud.' },
    ],
    body: (h) => `
<h2>Elegir la puerta</h2>
<p>La minicalculadora de arriba pregunta dos cosas, qué solicita y cuántos días faltan para el viaje, y señala la puerta correcta con sus tarifas. La lógica sigue la página del propio Departamento de Estado. Los primeros pasaportes, los menores de 16, los jóvenes de 16 y 17 y quien reemplaza un pasaporte perdido o robado van a un centro de aceptación. Los adultos que cumplen las reglas de renovación se quedan en casa y renuevan por correo o en línea. Quien viaja al extranjero en ${T.urgentDays} días o menos, o en ${T.urgentVisaDays} si necesita una visa, pide cita en una agencia.</p>
<h2>Centros de aceptación</h2>
<p>No son oficinas del Departamento de Estado. Son oficinas de correos, juzgados, oficinas del condado y de la ciudad y bibliotecas con agentes capacitados para verificar la identidad, presenciar la firma y enviar la solicitud. El servicio de datos de Asuntos Consulares lista ${h.num(st.locations_total)} lugares, entre ellos ${h.num(postal)} oficinas postales y ${h.num(libraries)} bibliotecas. La tabla de abajo los cuenta por estado. Cada centro cobra la tarifa de ejecución de ${h.usd(F.execution)} según sus reglas y puede vender el envío rápido al Departamento, USPS Priority Mail Express, al precio que fije.</p>
<h2>Por correo y en línea</h2>
<p>Para los adultos elegibles, la mejor puerta muchas veces es no salir de casa. Un DS-82 viaja por correo a uno de los centros de trámite que indica la página de renovación, y la tarifa del centro desaparece. La renovación en línea se salta también el sobre. Las dos cuestan ${h.usd(F.book.adult)} por la libreta. En línea, debe estar en EE. UU. y no tener viajes en seis semanas.</p>
${h.mini('lastDay')}
<h2>Agencias y centros de pasaportes</h2>
<p>Las ${h.P.network.agencies} agencias y centros que lista el Departamento de Estado, de Boston y Nueva York a Honolulu y San Juan, procesan todas las solicitudes y solo atienden con cita. Las citas son gratis y se reservan en el sistema de citas en línea, hasta para siete personas de un hogar; un pedido de pago por una cita debe tratarse como fraude. En la ventanilla siempre se cobra la tarifa urgente de ${h.usd(F.expedite)}.</p>
<h2>Cómo leer la tabla por estado</h2>
<p>Las cifras reflejan cómo organiza el servicio cada estado. Los estados grandes encabezan en números absolutos, ${tops('es')}, pero la mezcla cambia: algunos dependen sobre todo de oficinas de correos, otros de secretarios del condado y juzgados, unos pocos de bibliotecas. Una cifra alta no significa menos espera, porque la disponibilidad de citas depende del personal y el horario de cada oficina, y algunos centros organizan jornadas especiales con horario ampliado. Use la tabla para ver qué tipo de oficinas hay donde vive, y luego el buscador del Departamento por código postal.</p>
<h2>Adónde va el sobre de una renovación</h2>
<p>Las renovaciones ordinarias de California, Florida, Illinois, Minnesota, Nueva York y Texas van al centro de trámite de Irving, Texas; los demás estados envían las suyas a Filadelfia; las urgentes, con “EXPEDITE” en el sobre, tienen su propio apartado en Filadelfia. Las direcciones exactas están en la ${h.a('passport-renewal', 'página de renovación')}.</p>
<h2>El mismo expediente en todas partes</h2>
<p>Use la puerta que use, la solicitud necesita lo mismo: el formulario correcto, la prueba de ciudadanía o el pasaporte anterior, una foto y las tarifas. En un centro o una agencia, agregue una identificación con foto vigente y las copias. Preparar el expediente una sola vez, con el desglose de pagos de la calculadora completa, evita un segundo viaje.</p>`,
  },
});
