import { definePage } from '../../lib/guide-types';
import { addDays } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';

const d = (iso: string, l: 'en' | 'es') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const FLIGHT = '2026-12-19';
const checkMig = addDays(FLIGHT, -3);

export default definePage({
  id: 'country-co', group: 'country', order: 506, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'CO' },
  data: { country: 'CO' },
  related: ['country-es', 'country-cs', 'country-mx', 'passport-validity'],
  sources: ['caApi', 'processing'],
  en: {
    path: 'passport-validity/colombia', nav: 'Colombia', card: 'Valid U.S. passport, Check-Mig 72 hours before, two passports for dual citizens.',
    title: 'Passport Validity Colombia 2026: Check-Mig and Dual Citizens',
    description: 'Colombia in 2026: a valid U.S. passport to enter and leave, the free Check-Mig form 72 hours before flying, 90 visa-free days, two passports for dual nationals.',
    h1: 'Passport for Colombia: Check-Mig, 90 days and dual nationality',
    intro: 'Colombia sets no minimum months on your U.S. passport, but it asks for a form before the flight and has strict rules for people who are also Colombian.',
    resume: `The State Department says you must show a valid U.S. passport to enter and leave Colombia if you are not a Colombian citizen, without naming a minimum validity in months. Before flying, complete Colombia’s free online Check-Mig form 72 hours before your flight to or from the country: for a departure on ${d(FLIGHT, 'en')}, that means from ${d(checkMig, 'en')}. U.S. citizens need no visa for tourism or business stays of 90 days or less, and cumulative stays of 180 days or less per calendar year; a 90-day extension can be requested from Migración Colombia before the first period ends. Travelers may be denied entry without a return ticket. Dual U.S.-Colombian citizens must carry both passports, entering and leaving Colombia on the Colombian one and reentering the United States on the U.S. one.`,
    faqs: [
      { q: 'When do I fill in the Check-Mig form for Colombia?', a: 'The State Department advises completing Colombia’s free online Check-Mig form 72 hours before your flight to or from Colombia, so it is done twice, once for the trip in and once for the trip out. It is a Colombian immigration form, separate from your passport and free of charge.' },
      { q: 'I was born in Colombia: which passport do I use?', a: 'Both. The State Department says U.S.-Colombian citizens should use the Colombian passport to enter and exit Colombia and the U.S. passport to enter the United States, because Colombia may consider anyone born there, or with Colombian parents, a citizen. Colombian citizens cannot leave the country without a valid Colombian passport.' },
      { q: 'How long can a U.S. tourist stay in Colombia?', a: 'Up to 90 days without a visa for tourism or business, and no more than 180 days in total per calendar year. Before the 90 days run out, you can ask Migración Colombia for a 90-day extension. Staying longer than allowed brings a fine, and you may not be able to leave until it is paid.' },
    ],
    body: (h) => `
<h2>A passport without a countdown</h2>
<p>Colombia’s page asks for a valid U.S. passport at entry and at exit, nothing more on validity. In practice that means the expiration date must fall after the day you leave Bogotá, Medellín or Cartagena. A passport expiring a few weeks after the trip is legal, though a delayed return flight would leave you holding an expired document, which the checker above shows as a margin of days.</p>
<h2>The form and the return ticket</h2>
<p>Two practical requirements cause more trouble than validity. The Check-Mig declaration is done online 72 hours before the outbound and return flights. And the State Department warns that travelers can be refused entry without a return ticket, so a one-way booking is a real risk.</p>
<h2>Families with Colombian roots</h2>
<p>A U.S. citizen born in Colombia, or with a Colombian parent, may be treated as Colombian at the border, and Colombian citizens must enter and leave on a Colombian passport. Plan the U.S. side too: the U.S. passport has to be valid and unexpired for the flight home. If it is close to expiry, ${h.a('passport-renewal', 'check the renewal options')} before booking.</p>`,
  },
  es: {
    path: 'vigencia-del-pasaporte/colombia', nav: 'Colombia', card: 'Pasaporte de EE. UU. vigente, Check-Mig 72 horas antes y dos pasaportes para la doble nacionalidad.',
    title: 'Pasaporte para Colombia 2026: vigencia, Check-Mig y 90 días',
    description: 'Colombia en 2026: pasaporte de EE. UU. vigente al entrar y salir, Check-Mig gratuito 72 horas antes, 90 días sin visa y dos pasaportes si es también colombiano.',
    h1: 'Pasaporte para Colombia: Check-Mig, 90 días y doble nacionalidad',
    intro: 'Colombia no fija meses mínimos para el pasaporte estadounidense, pero pide un formulario antes del vuelo y tiene reglas estrictas para quien también es colombiano.',
    resume: `El Departamento de Estado indica que debe mostrar un pasaporte estadounidense vigente para entrar y salir de Colombia si no es ciudadano colombiano, sin fijar meses mínimos de vigencia. Antes de volar hay que llenar el formulario gratuito Check-Mig 72 horas antes del vuelo de ida o de regreso: para una salida el ${d(FLIGHT, 'es')}, eso es a partir del ${d(checkMig, 'es')}. Los ciudadanos estadounidenses no necesitan visa para turismo o negocios por 90 días o menos, ni por estancias que sumen 180 días o menos en el año calendario; antes de que termine el primer periodo se puede pedir a Migración Colombia una prórroga de 90 días. Sin boleto de regreso pueden negarle la entrada. Quien tiene doble nacionalidad estadounidense y colombiana debe viajar con los dos pasaportes: entra y sale de Colombia con el colombiano y regresa a Estados Unidos con el estadounidense.`,
    faqs: [
      { q: '¿Cuándo se llena el formulario Check-Mig para Colombia?', a: 'El Departamento de Estado aconseja llenar el formulario gratuito Check-Mig en línea 72 horas antes del vuelo hacia Colombia o desde Colombia, es decir, dos veces: una para la ida y otra para el regreso. Es un trámite de Migración Colombia, aparte del pasaporte y sin costo.' },
      { q: 'Nací en Colombia: ¿con qué pasaporte viajo?', a: 'Con los dos. El Departamento de Estado dice que quien es ciudadano de ambos países debe usar el pasaporte colombiano para entrar y salir de Colombia y el estadounidense para entrar a Estados Unidos, porque Colombia puede considerar ciudadano a cualquiera nacido allí o con padres colombianos. Un colombiano no puede salir del país sin pasaporte colombiano vigente.' },
      { q: '¿Cuánto tiempo puede quedarse un turista estadounidense en Colombia?', a: 'Hasta 90 días sin visa por turismo o negocios, y no más de 180 días en total por año calendario. Antes de que se cumplan los 90 días puede pedir a Migración Colombia una prórroga de 90 días. Quedarse más de lo permitido trae una multa, y puede que no lo dejen salir hasta pagarla.' },
    ],
    body: (h) => `
<h2>Un pasaporte sin cuenta regresiva</h2>
<p>La ficha de Colombia pide un pasaporte estadounidense vigente al entrar y al salir, y nada más sobre la vigencia. En la práctica, la fecha de vencimiento debe caer después del día en que sale de Bogotá, Medellín o Cartagena. Un pasaporte que vence unas semanas después del viaje es legal, aunque un vuelo de regreso retrasado lo dejaría con un documento vencido; el verificador de arriba lo muestra como margen en días.</p>
<h2>El formulario y el boleto de regreso</h2>
<p>Dos requisitos prácticos dan más problemas que la vigencia. La declaración Check-Mig se hace en línea 72 horas antes del vuelo de ida y del de vuelta. Y el Departamento de Estado advierte que pueden negar la entrada a quien no tenga boleto de regreso, así que reservar solo ida es un riesgo real.</p>
<h2>Familias con raíces colombianas</h2>
<p>Un ciudadano estadounidense nacido en Colombia, o con padre o madre colombianos, puede ser tratado como colombiano en la frontera, y los colombianos entran y salen con pasaporte colombiano. Piense también en el lado estadounidense: el pasaporte de EE. UU. tiene que estar vigente para el vuelo de regreso. Si está por vencer, ${h.a('passport-renewal', 'revise cómo renovarlo')} antes de comprar el boleto.</p>`,
  },
});
