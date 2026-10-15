import { definePage } from '../../lib/guide-types';
import { requiredDate, addDays } from '../../lib/engine/passport';
import { displayDate } from '../../lib/format';

const d = (iso: string, l: 'en' | 'es') => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const ARR = '2026-12-22';
const need = requiredDate('afterEntry', 6, ARR, addDays(ARR, 15));

export default definePage({
  id: 'country-ho', group: 'country', order: 510, parent: 'passport-validity',
  tool: { kind: 'validity', country: 'HO' },
  data: { country: 'HO' },
  related: ['country-gt', 'country-es', 'guide-child-consent', 'passport-validity'],
  sources: ['caApi', 'processing', 'under16'],
  en: {
    path: 'passport-validity/honduras', nav: 'Honduras', card: 'Six months of validity and onward travel; notarized consent for children under 21.',
    title: 'Passport Validity Honduras 2026: Six Months, Onward Ticket',
    description: 'Honduras in 2026: a U.S. passport with at least six months of validity, proof of onward travel, no visa for 90 days, and notarized consent for minors under 21.',
    h1: 'Passport for Honduras: six months, an onward ticket, and rules for minors',
    intro: 'Honduras is the Central American country of the CA-4 group that asks for six months of passport validity.',
    resume: `To enter Honduras, the State Department lists two documents: a U.S. passport with at least six months validity, and evidence of onward travel. For tourism, stays of up to 90 days need no visa, and those who overstay may face significant exit fines. Counting six months from the day of arrival, a family landing in San Pedro Sula or Tegucigalpa for the holidays on ${d(ARR, 'en')} needs passports valid at least until ${d(need, 'en')}. Honduras also has its own rule for young travelers: under Honduran law, children under age 21 traveling unaccompanied or with only one parent must carry written, notarized permission from the parent who is not traveling. A letter notarized in the United States must be apostilled by the state registrar where the notary is registered.`,
    faqs: [
      { q: 'Does Honduras really require six months on a U.S. passport?', a: 'Yes. The State Department page says that to enter Honduras you need a U.S. passport with at least six months validity and evidence of onward travel. Its neighbors Guatemala and El Salvador do not set a minimum, so a trip through the region is limited by the Honduran rule.' },
      { q: 'My 19-year-old flies to Honduras with me alone: what paperwork is needed?', a: 'Under Honduran law, children under 21 traveling unaccompanied or with only one parent need written, notarized permission from the non-traveling parent. Notarized in the United States, the letter must carry an apostille from the state registrar; a letter notarized at a Honduran consulate may also be accepted.' },
      { q: 'What if the other parent has died or I have sole custody?', a: 'The State Department says that when there is no second parent with legal custody, travelers can show copies of the relevant papers instead, such as a court decision, a birth certificate naming only one parent, or a death certificate. Bring them with the child’s passport.' },
    ],
    body: (h) => `
<h2>The strictest rule of the CA-4</h2>
<p>El Salvador, Guatemala, Honduras and Nicaragua share a 90-day travel area, but not one passport rule. Honduras asks for six months, which means that a family visiting relatives in Choluteca after a stop in Guatemala has to check the Honduran date first. The checker above counts six months from your arrival, which is how the requirement is read.</p>
<h2>The onward ticket</h2>
<p>Evidence of onward travel is listed next to the passport, not as an optional extra. A return flight or a bus ticket out of the country is the usual proof. Keep it printed or on your phone at the border.</p>
<h2>Under 21 means more than a minor</h2>
<p>The Honduran age is unusual: the consent rule covers travelers up to 21, not 18. An apostille is issued by the state, not by the State Department, so it takes its own time. For children under 16, the U.S. passport itself also needs both parents or a ${h.a('guide-child-consent', 'consent form')} when it is issued.</p>
<p>Count the six months from the day you land in Honduras, not from the day you book: a passport expiring in early autumn is already too short for a spring arrival.</p>`,
  },
  es: {
    path: 'vigencia-del-pasaporte/honduras', nav: 'Honduras', card: 'Seis meses de vigencia y boleto de salida; permiso notariado para menores de 21.',
    title: 'Vigencia del pasaporte Honduras 2026: seis meses y salida',
    description: 'Honduras en 2026: pasaporte de EE. UU. con al menos seis meses de vigencia, prueba de viaje de salida, 90 días sin visa y permiso notariado bajo 21 años.',
    h1: 'Pasaporte para Honduras: seis meses, boleto de salida y reglas para menores',
    intro: 'Honduras es el país centroamericano del grupo CA-4 que pide seis meses de vigencia en el pasaporte.',
    resume: `Para entrar a Honduras, el Departamento de Estado pide dos cosas: un pasaporte de EE. UU. con al menos seis meses de vigencia y la prueba de que seguirá viaje. Para turismo, las estancias de hasta 90 días no necesitan visa, y quien se queda de más puede enfrentar multas de salida importantes. Contando seis meses desde el día de llegada, una familia que aterriza en San Pedro Sula o Tegucigalpa para las fiestas el ${d(ARR, 'es')} necesita pasaportes vigentes al menos hasta el ${d(need, 'es')}. Honduras tiene además su propia regla para los jóvenes: según la ley hondureña, los menores de 21 años que viajan solos o con uno solo de los padres deben llevar un permiso escrito y notariado del padre o la madre que no viaja. Una carta notariada en Estados Unidos debe llevar la apostilla del registro del estado donde está inscrito el notario.`,
    faqs: [
      { q: '¿Honduras exige de verdad seis meses de vigencia al pasaporte de EE. UU.?', a: 'Sí. La ficha del Departamento de Estado dice que para entrar a Honduras necesita un pasaporte estadounidense con al menos seis meses de vigencia y la prueba de viaje de salida. Guatemala y El Salvador no fijan mínimo, así que en un viaje por la región manda la regla hondureña.' },
      { q: 'Mi hijo de 19 años viaja conmigo solo a Honduras: ¿qué papeles necesita?', a: 'Según la ley hondureña, los menores de 21 que viajan solos o con un solo padre necesitan un permiso escrito y notariado del padre que no viaja. Si se notariza en Estados Unidos, la carta debe llevar la apostilla del registro estatal; también puede aceptarse una carta notariada en un consulado de Honduras.' },
      { q: '¿Y si el otro padre falleció o tengo la custodia exclusiva?', a: 'El Departamento de Estado dice que, si no hay un segundo padre con custodia legal, pueden presentarse copias de los documentos que lo prueban, como una sentencia, un acta de nacimiento con un solo padre o un acta de defunción. Llévelos junto con el pasaporte del menor.' },
    ],
    body: (h) => `
<h2>La regla más estricta del CA-4</h2>
<p>El Salvador, Guatemala, Honduras y Nicaragua comparten una zona de 90 días, pero no la misma regla de pasaporte. Honduras pide seis meses, de modo que una familia que visita a parientes en Choluteca después de pasar por Guatemala debe revisar primero la fecha hondureña. El verificador de arriba cuenta seis meses desde su llegada, que es como se lee el requisito.</p>
<h2>El boleto de salida</h2>
<p>La prueba de que seguirá viaje aparece junto al pasaporte, no como un extra. Lo habitual es el vuelo de regreso o un boleto de autobús que salga del país. Llévelo impreso o en el teléfono al cruzar la frontera.</p>
<h2>Menor de 21, no de 18</h2>
<p>La edad hondureña es poco común: el permiso cubre a los viajeros de hasta 21 años, no 18. La apostilla la da el estado, no el Departamento de Estado, y tiene sus propios plazos. Para los menores de 16, el pasaporte de EE. UU. también exige a los dos padres o un ${h.a('guide-child-consent', 'formulario de consentimiento')} al emitirse.</p>
<p>Cuente los seis meses desde el día en que aterriza en Honduras, no desde el día en que compra el boleto: un pasaporte que vence a principios del otoño ya no alcanza para una llegada en primavera.</p>`,
  },
});
