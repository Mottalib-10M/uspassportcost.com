import { definePage } from '../../lib/guide-types';
import P from '../../data/params-2026.json';
import O from '../../data/official.json';
import { formatNumber } from '../../lib/format';

const T = P.times;
const st = (O as any).stats;
const iss: Record<number, number> = Object.fromEntries(st.issuances_fy);
const app: Record<number, number> = Object.fromEntries(st.applications_fy);
const val: Record<number, number> = Object.fromEntries(st.valid_fy);
const last = Math.max(...Object.keys(iss).map(Number));
const n = (x: number, l: 'en' | 'es') => formatNumber(x, 0, l);
const mil = (x: number, l: 'en' | 'es') => formatNumber(x / 1e6, 1, l);
const worst = 7 * (T.mailInMaxWeeks + T.routineWeeks[1] + T.mailOutMaxWeeks);
const lastApp = Math.max(...Object.keys(app).map(Number));

export default definePage({
  id: 'guide-best-time', group: 'guides', order: 709, mini: 'season', data: { stats: true },
  related: ['passport-processing-time', 'guide-apply-ahead', 'guide-when-to-renew', 'guide-family-cost'],
  sources: ['processing', 'caApi', 'getFast'],
  en: {
    path: 'best-time-to-apply-for-a-passport', nav: 'Best time to apply', card: 'October to December is the quiet season; late winter to summer the busy one.',
    title: 'Best Time to Apply for a Passport 2026: Quiet vs Busy Season',
    description: `The State Department’s busy season runs from late winter into summer, and it suggests applying from October to December. See the volumes and your date.`,
    h1: 'Best time of year to apply for a passport',
    intro: 'Demand for passports is seasonal, and the State Department says so on its processing page. Applying in the quiet months is the cheapest way to get speed.',
    resume: `The State Department’s processing-time page says its busiest time is between late winter and summer, that processing times may change because of increased demand, and that you should plan ahead and apply when it is less busy, between October and December. The published times are ${T.routineWeeks[0]} to ${T.routineWeeks[1]} weeks routine and ${T.expeditedWeeks[0]} to ${T.expeditedWeeks[1]} weeks expedited, plus mail, which makes up to ${worst} days for a routine application from mailbox to mailbox. Volumes explain the seasonality: the Consular Affairs data service counts ${n(app[lastApp], 'en')} applications in fiscal year ${lastApp} and ${n(iss[last], 'en')} passports issued in fiscal year ${last}, with ${n(val[last], 'en')} valid passports in circulation. Many of those applications come in the months before summer trips. Applying in autumn for a trip the following summer avoids both the peak and the ${'$'}60 expedite fee that last-minute applicants often pay.`.replace("${'$'}60", '$60'),
    faqs: [
      { q: 'What is the slowest time of year to get a passport?', a: 'The State Department says its busiest period is between late winter and summer, when demand for passports is higher, and that processing times may change with demand. Applications filed in spring for summer travel compete with the most other applications, so they are the ones most exposed to longer waits.' },
      { q: 'Is it faster to apply for a passport in the fall?', a: 'The State Department recommends applying when it is less busy, between October and December. The published range is the same all year until the Department changes it, but applying in the quiet months leaves more margin before spring and summer trips and less reason to pay for expedited service.' },
      { q: 'How many passports does the State Department issue each year?', a: `The Consular Affairs data service reports ${n(iss[last], 'en')} passports issued in fiscal year ${last}, which ended on September 30 of that year, and ${n(val[last], 'en')} valid passports in circulation. The table on this page shows each fiscal year since 2015, with applications received.` },
      { q: 'Do processing times change during the year?', a: 'They can. The State Department says it changes its processing times as demand changes during the year. This site reads the official page on a schedule and updates its calculator when the published range changes, so the dates shown always use the current range.' },
      { q: 'How far before a summer trip should I renew my passport?', a: `With routine service and mail both ways, the slowest published path is ${worst} days. For a June departure that means mailing by late March at the latest; filing in the October to December quiet season gives far more margin and keeps the option of expediting if a problem appears.` },
      { q: 'Does the season matter for an online renewal?', a: 'Online renewal follows the same routine processing times and cannot be expedited, so it is the route most exposed to a busy season. Because it also requires no travel for six weeks after you submit, it fits best in months without trips, which for many families means the autumn.' },
    ],
    body: (h) => `
<h2>What the State Department says about seasons</h2>
<p>The processing-time page puts it in plain words: demand is higher from late winter into summer, processing times may change because of it, and applicants should plan ahead and apply in the quieter months of October to December. The mini-calculator at the top takes a month of application, tells you which season it falls in, and dates the arrival of a routine mail renewal sent on the 15th of that month, using the current published range.</p>
<h2>The volumes behind the peak</h2>
<p>The Consular Affairs data service publishes yearly counts. In fiscal year ${last}, ${h.num(iss[last])} passports were issued and ${h.num(val[last])} valid passports were in circulation; in fiscal year ${lastApp}, the Department received ${h.num(app[lastApp])} applications. The table below lists every fiscal year since 2015. The yearly totals do not show months, but they show the scale: tens of millions of applications, concentrated before the travel season, handled by ${h.P.network.agencies} agencies and centers.</p>
<h2>Turning the advice into a date</h2>
<p>Work backwards from the trip, then pull the date into the quiet season if you can. A family flying in July needs routine applications mailed by mid-April in the worst published case; mailing them in November leaves five extra months for a rejected photo, a missing birth certificate or a letter asking for more information. Each of those problems pauses processing until you answer, and in spring they can turn a comfortable plan into an expedite fee of ${h.usd(h.P.fees.expedite)} per person.</p>
<h2>Who should not wait for October</h2>
<p>Anyone whose passport is already too short for a planned destination. Six-month countries such as ${h.a('country-th', 'Thailand')}, ${h.a('country-pe', 'Peru')} or ${h.a('country-ae', 'the United Arab Emirates')} count from arrival, so a passport that expires next spring may already fail for a winter trip. The ${h.a('passport-validity', 'validity checker')} tells you whether the season matters at all, or whether the renewal is due now.</p>
${h.mini('lastDay')}
<h2>What a quiet-season application looks like</h2>
<p>Mail it in November, and the timeline is the same published one, but every step has slack. The first status email, “In Process”, can take two weeks after mailing. The passport then follows within the processing range, and your citizenship documents come back separately by First Class Mail, up to four weeks after the passport. If a letter asks for more information, you have time to answer without touching the trip. That is the real value of the quiet season: not a different promise, but margin around the same promise.</p>
<h2>Expediting is the price of applying late</h2>
<p>Expedited service exists for travelers inside six weeks, and in the busy months many applicants buy it because they applied after booking. At ${h.usd(h.P.fees.expedite)} per application, plus ${h.usd2(h.P.fees.delivery)} for fast return delivery, a family of four that applies in May for a June trip can spend more than ${h.usd(4 * (h.P.fees.expedite + h.P.fees.delivery))} that the same family applying in November would not.</p>
<h2>Renewals and the calendar</h2>
<p>Online renewal opens one year before expiry, which makes it possible to plan it in a quiet month: a passport that expires in June can be renewed online from the previous June, so the autumn before is inside the window. Renewal by mail has no such window at all, as long as the passport was issued within 15 years. Either way, renewing in the autumn keeps the summer free of passport questions and leaves the busy months to travelers who had no choice.</p>`,
  },
  es: {
    path: 'mejor-epoca-para-solicitar-pasaporte', nav: 'Mejor época para solicitar', card: 'De octubre a diciembre es la temporada baja; de fines del invierno al verano, la alta.',
    title: 'Mejor época para pedir el pasaporte 2026: temporada baja',
    description: 'La temporada alta del Departamento de Estado va de fines del invierno al verano, y aconseja solicitar de octubre a diciembre. Vea su fecha de llegada.',
    h1: 'La mejor época del año para solicitar el pasaporte',
    intro: 'La demanda de pasaportes es estacional, y el Departamento de Estado lo dice en su página de tiempos. Solicitar en los meses tranquilos es la forma más barata de ganar rapidez.',
    resume: `La página de tiempos del Departamento de Estado dice que su época de más trabajo va de fines del invierno al verano, que los tiempos pueden cambiar por el aumento de la demanda y que conviene planear y solicitar cuando hay menos trabajo, entre octubre y diciembre. Los tiempos publicados son de ${T.routineWeeks[0]} a ${T.routineWeeks[1]} semanas en ordinario y de ${T.expeditedWeeks[0]} a ${T.expeditedWeeks[1]} en urgente, más el correo, lo que da hasta ${worst} días para una solicitud ordinaria de buzón a buzón. Los volúmenes explican la estacionalidad: el servicio de datos de Asuntos Consulares cuenta ${n(app[lastApp], 'es')} solicitudes en el año fiscal ${lastApp} y ${n(iss[last], 'es')} pasaportes emitidos en el año fiscal ${last}, con ${n(val[last], 'es')} pasaportes vigentes. Muchas de esas solicitudes llegan en los meses previos a los viajes de verano. Solicitar en otoño para un viaje del verano siguiente evita el pico y la tarifa urgente de 60 dólares que suelen pagar quienes solicitan a última hora.`,
    faqs: [
      { q: '¿En qué época del año tarda más el pasaporte?', a: 'El Departamento de Estado dice que su periodo de más trabajo va de fines del invierno al verano, cuando la demanda es mayor, y que los tiempos pueden cambiar con la demanda. Las solicitudes presentadas en primavera para viajar en verano compiten con más solicitudes, así que son las más expuestas a esperas largas.' },
      { q: '¿Es más rápido pedir el pasaporte en otoño?', a: 'El Departamento de Estado recomienda solicitar cuando hay menos trabajo, entre octubre y diciembre. El rango publicado es el mismo todo el año hasta que el Departamento lo cambia, pero solicitar en los meses tranquilos deja más margen antes de los viajes de primavera y verano y menos motivos para pagar el urgente.' },
      { q: '¿Cuántos pasaportes emite el Departamento de Estado cada año?', a: `El servicio de datos de Asuntos Consulares informa ${n(iss[last], 'es')} pasaportes emitidos en el año fiscal ${last}, que terminó el 30 de septiembre, y ${n(val[last], 'es')} pasaportes vigentes. La tabla de esta página muestra cada año fiscal desde 2015, con las solicitudes recibidas.` },
      { q: '¿Cambian los tiempos de trámite durante el año?', a: 'Pueden cambiar. El Departamento de Estado dice que ajusta sus tiempos de trámite según la demanda de cada época. Este sitio lee la página oficial de forma programada y actualiza su calculadora cuando cambia el rango publicado, así que las fechas siempre usan el rango vigente.' },
      { q: '¿Con cuánta anticipación renuevo el pasaporte para un viaje de verano?', a: `Con servicio ordinario y correo de ida y vuelta, el camino más lento publicado es de ${worst} días. Para salir en junio, eso significa enviar la renovación a fines de marzo a más tardar; hacerlo en la temporada baja de octubre a diciembre da mucho más margen y conserva la opción del urgente si surge un problema.` },
      { q: '¿Importa la temporada en una renovación en línea?', a: 'La renovación en línea sigue los mismos tiempos ordinarios y no puede ser urgente, así que es la más expuesta a una temporada alta. Como además exige no viajar en las seis semanas siguientes a la solicitud, encaja mejor en meses sin viajes, que para muchas familias son los de otoño.' },
    ],
    body: (h) => `
<h2>Lo que dice el Departamento de Estado sobre las temporadas</h2>
<p>La página de tiempos lo dice claramente: la demanda es mayor de fines del invierno al verano, los tiempos pueden cambiar por eso, y conviene planear y solicitar en los meses más tranquilos, de octubre a diciembre. La minicalculadora de arriba toma un mes de solicitud, le dice en qué temporada cae y fecha la llegada de una renovación ordinaria por correo enviada el día 15 de ese mes, con el rango publicado vigente.</p>
<h2>Los volúmenes detrás del pico</h2>
<p>El servicio de datos de Asuntos Consulares publica cifras anuales. En el año fiscal ${last} se emitieron ${h.num(iss[last])} pasaportes y había ${h.num(val[last])} vigentes; en el año fiscal ${lastApp}, el Departamento recibió ${h.num(app[lastApp])} solicitudes. La tabla de abajo muestra cada año fiscal desde 2015. Los totales anuales no muestran meses, pero sí la escala: decenas de millones de solicitudes, concentradas antes de la temporada de viajes, atendidas por ${h.P.network.agencies} agencias y centros.</p>
<h2>Convertir el consejo en una fecha</h2>
<p>Cuente hacia atrás desde el viaje y luego adelante la fecha hasta la temporada baja si puede. Una familia que vuela en julio necesita enviar sus solicitudes ordinarias a mediados de abril en el peor caso publicado; enviarlas en noviembre deja cinco meses más para una foto rechazada, un acta de nacimiento que falta o una carta que pide más información. Cada uno de esos problemas detiene el trámite hasta que usted responde, y en primavera pueden convertir un plan cómodo en una tarifa urgente de ${h.usd(h.P.fees.expedite)} por persona.</p>
<h2>Quién no debe esperar a octubre</h2>
<p>Quien ya tiene un pasaporte demasiado corto para un destino previsto. Los países de seis meses, como ${h.a('country-pe', 'Perú')} o ${h.a('country-ho', 'Honduras')}, cuentan desde la llegada, así que un pasaporte que vence la próxima primavera quizá ya no sirve para un viaje en invierno. El ${h.a('passport-validity', 'verificador de vigencia')} le dice si la temporada importa o si la renovación es urgente ahora.</p>
${h.mini('lastDay')}
<h2>Cómo es una solicitud en temporada baja</h2>
<p>Envíela en noviembre y el plazo publicado es el mismo, pero cada etapa tiene holgura. El primer correo de estado, “In Process”, puede tardar dos semanas desde el envío. Luego el pasaporte llega dentro del rango de trámite, y sus documentos de ciudadanía regresan aparte por correo de primera clase, hasta cuatro semanas después. Si llega una carta que pide más información, hay tiempo para responder sin tocar el viaje. Ese es el verdadero valor de la temporada baja: no una promesa distinta, sino margen alrededor de la misma promesa.</p>
<h2>El urgente es el precio de solicitar tarde</h2>
<p>El servicio urgente existe para quien viaja en menos de seis semanas, y en los meses de mucha demanda muchos lo compran porque solicitaron después de reservar. A ${h.usd(h.P.fees.expedite)} por solicitud, más ${h.usd2(h.P.fees.delivery)} por la entrega rápida, una familia de cuatro que solicita en mayo para viajar en junio puede gastar más de ${h.usd(4 * (h.P.fees.expedite + h.P.fees.delivery))} que la misma familia no pagaría solicitando en noviembre.</p>
<h2>Renovaciones y calendario</h2>
<p>La renovación en línea abre un año antes del vencimiento, lo que permite planearla en un mes tranquilo: un pasaporte que vence en junio se puede renovar en línea desde el junio anterior, así que el otoño previo está dentro de la ventana. La renovación por correo no tiene esa ventana, siempre que el pasaporte se haya emitido hace menos de 15 años. En los dos casos, renovar en otoño deja el verano libre de preocupaciones por el pasaporte.</p>`,
  },
});
