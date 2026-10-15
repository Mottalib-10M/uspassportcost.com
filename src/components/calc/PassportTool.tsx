/**
 * « Combien je paie et quand je le reçois » : situation, document, service, livraison, date de dépôt et de voyage
 * → total ventilé par paiement (chèque au Département d'État, frais d'exécution à la structure d'accueil) et
 * fenêtre d'arrivée comparée au voyage. Premier rendu = valeurs par défaut et __BUILD_DAY__ (RECETTE §17.5).
 */
import { useEffect, useState } from 'react';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { Rows, Head, Steps, Actions, Disclaimer, DateField, box, frame, layout, fm, type Row } from './kit';
import { cost, timeline, addDays, isIso, type Situation, type Doc, type Service } from '../../lib/engine/passport';
import { SITUATIONS, SITUATION_LABEL, DOC_LABEL, SERVICE_LABEL, LINE_LABEL, tx, yesNo, type L } from '../../lib/labels';
import { readParams, str, updateURL } from '../../lib/url-state';
import P from '../../data/params-2026.json';

declare const __BUILD_DAY__: string;

interface Props { lang?: L; situation?: Situation; doc?: Doc; service?: Service; delivery?: boolean; fileSearch?: boolean; focus?: 'cost' | 'date'; methodHref?: string; compact?: boolean }

export default function PassportTool({ lang = 'en', situation: s0 = 'first', doc: d0 = 'book', service: v0 = 'routine', delivery: dl0 = false, fileSearch: fs0 = false, focus = 'cost', methodHref, compact = false }: Props) {
  const f = fm(lang);
  const [situation, setSituation] = useState<Situation>(s0);
  const [doc, setDoc] = useState<Doc>(d0);
  const [service, setService] = useState<Service>(v0);
  const [delivery, setDelivery] = useState(dl0 ? '1' : '0');
  const [fileSearch, setFileSearch] = useState(fs0 ? '1' : '0');
  const [apply, setApply] = useState<string>(__BUILD_DAY__);
  const [travel, setTravel] = useState<string>(addDays(__BUILD_DAY__, focus === 'date' ? 45 : 90));

  // Après le premier rendu seulement : lien partagé et date du jour (§17.5).
  useEffect(() => {
    const u = readParams(window.location.search);
    const today = new Date().toISOString().slice(0, 10);
    const sit = str(u, 's', s0) as Situation;
    if (SITUATIONS.includes(sit)) setSituation(sit);
    const d = str(u, 'doc', d0); if (d === 'book' || d === 'card' || d === 'both') setDoc(d);
    const sv = str(u, 'svc', v0); if (sv === 'routine' || sv === 'expedited' || sv === 'agency') setService(sv);
    setDelivery(str(u, 'dl', dl0 ? '1' : '0') === '1' ? '1' : '0');
    setFileSearch(str(u, 'fs', fs0 ? '1' : '0') === '1' ? '1' : '0');
    const a = str(u, 'apply', today); setApply(isIso(a) ? a : today);
    const t = str(u, 'trip', addDays(today, focus === 'date' ? 45 : 90)); setTravel(isIso(t) ? t : addDays(today, 90));
  }, []);
  useEffect(() => { updateURL({ s: situation, doc, svc: service, dl: delivery, fs: fileSearch, apply, trip: travel }); }, [situation, doc, service, delivery, fileSearch, apply, travel]);

  const online = situation === 'renew-online';
  const ds11 = situation === 'first' || situation === 'teen' || situation === 'child' || situation === 'lost';
  const svc: Service = online ? 'routine' : service;
  const c = cost({ situation, doc, service: svc, delivery: delivery === '1', fileSearch: ds11 && fileSearch === '1' });
  const t = timeline({ situation, doc, service: svc, delivery: delivery === '1', applyDate: isIso(apply) ? apply : __BUILD_DAY__, travelDate: isIso(travel) ? travel : undefined });

  const rows: Row[] = c.lines.map((l) => ({ label: `${LINE_LABEL[lang][l.key]}${l.key === 'application' ? ` · ${c.form === 'online' ? tx(lang, 'online', 'en línea') : c.form}` : ''}`, value: f.usd2(l.amount) }));
  const payee = c.payState === 'card'
    ? tx(lang, online ? 'Paid by card on opr.travel.state.gov' : 'Paid by card at the passport agency', online ? 'Pago con tarjeta en opr.travel.state.gov' : 'Pago con tarjeta en la agencia')
    : tx(lang, 'Check or money order to “U.S. Department of State”', 'Cheque o giro a nombre de “U.S. Department of State”');
  rows.push({ label: payee, value: f.usd2(c.state), sep: true, strong: !c.facility });
  if (c.facility) {
    rows.push({ label: tx(lang, 'Separate payment to the acceptance facility', 'Pago aparte al centro de aceptación'), value: f.usd2(c.facility) });
    rows.push({ label: tx(lang, 'Total', 'Total'), value: f.usd2(c.total), strong: true });
  }

  const verdict = {
    safe: tx(lang, 'Arrives before your trip even with the slowest published times.', 'Llega antes del viaje incluso con los tiempos publicados más lentos.'),
    tight: tx(lang, 'Tight: it arrives in time only if mail and processing are fast.', 'Justo: solo llega a tiempo si el correo y el trámite van rápido.'),
    late: tx(lang, 'Will not arrive in time with this service.', 'No llegará a tiempo con este servicio.'),
    agency: tx(lang, 'Issued at the agency, usually before your trip, if you get an appointment.', 'Se emite en la agencia, normalmente antes del viaje, si consigue cita.'),
    'no-trip': '',
  }[t.verdict];
  const advice = {
    routine: tx(lang, 'Official rule: routine service if you travel in 6 weeks or more.', 'Regla oficial: servicio ordinario si viaja en 6 semanas o más.'),
    expedited: tx(lang, `Official rule: expedite (+${f.usd(P.fees.expedite)}) when travel is less than 6 weeks away.`, `Regla oficial: urgente (+${f.usd(P.fees.expedite)}) si viaja en menos de 6 semanas.`),
    agency: tx(lang, `Official rule: book a passport agency appointment once you are within ${P.times.urgentDays} days of travel (${P.times.urgentVisaDays} if you need a foreign visa).`, `Regla oficial: pida cita en una agencia cuando falten ${P.times.urgentDays} días o menos para viajar (${P.times.urgentVisaDays} si necesita una visa extranjera).`),
    'too-late-online': tx(lang, 'Online renewal requires no travel for at least 6 weeks: renew by mail with expedited service instead.', 'La renovación en línea exige no viajar en al menos 6 semanas: renueve por correo con servicio urgente.'),
  }[t.advice];
  const dateRows: Row[] = [
    ...(t.mailIn[1] ? [{ label: tx(lang, 'Mail to the State Department', 'Correo hacia el Departamento'), value: tx(lang, `up to ${t.mailIn[1] / 7} weeks`, `hasta ${t.mailIn[1] / 7} semanas`) }] : []),
    ...(t.service !== 'agency' ? [{ label: tx(lang, 'Processing', 'Trámite'), value: tx(lang, `${t.processing[0] / 7} to ${t.processing[1] / 7} weeks`, `${t.processing[0] / 7} a ${t.processing[1] / 7} semanas`) }] : []),
    ...(t.service !== 'agency' ? [{ label: tx(lang, 'Mail back to you', 'Correo de regreso'), value: t.mailOut[1] <= 3 ? tx(lang, '1 to 3 days', '1 a 3 días') : tx(lang, `up to ${t.mailOut[1] / 7} weeks`, `hasta ${t.mailOut[1] / 7} semanas`) }] : []),
    ...(t.lastRoutine ? [{ label: tx(lang, 'Last day to apply, routine, worst case', 'Último día para solicitar, ordinario, peor caso'), value: f.date(t.lastRoutine) }, { label: tx(lang, 'Last day to apply, expedited, worst case', 'Último día, urgente, peor caso'), value: f.date(t.lastExpedited) }] : []),
  ];
  const head = focus === 'date' && t.service !== 'agency'
    ? { label: tx(lang, 'Your passport should arrive between', 'Su pasaporte debería llegar entre'), value: `${f.date(t.earliest)} – ${f.date(t.latest)}`, sub: tx(lang, `You pay ${f.usd2(c.total)} in total`, `Paga ${f.usd2(c.total)} en total`) }
    : { label: tx(lang, `${SITUATION_LABEL[lang][situation].replace(/ \(.*\)$/, '')}: what you pay`, `${SITUATION_LABEL[lang][situation].replace(/ \(.*\)$/, '')}: lo que paga`), value: f.usd2(c.total), sub: t.service === 'agency' ? tx(lang, 'Issued at the agency appointment', 'Se emite en la cita de la agencia') : tx(lang, `Arrives between ${f.date(t.earliest)} and ${f.date(t.latest)}`, `Llega entre el ${f.date(t.earliest)} y el ${f.date(t.latest)}`) };

  const steps = [
    tx(lang, `Fees from the State Department chart “United States Passport Fees”, ${P.feeChartEdition} edition, and 22 CFR 22.1 (${f.usd(P.feeLaw.bookApplication16Plus)} application + ${f.usd(P.feeLaw.securitySurcharge)} security surcharge = ${f.usd(P.fees.book.adult)} for an adult book).`, `Tarifas de la tabla del Departamento de Estado, edición de octubre de 2026, y del 22 CFR 22.1 (${f.usd(P.feeLaw.bookApplication16Plus)} de solicitud + ${f.usd(P.feeLaw.securitySurcharge)} de recargo de seguridad = ${f.usd(P.fees.book.adult)} por una libreta de adulto).`),
    tx(lang, `Times from the processing-time page updated ${f.date(P.times.pageUpdated)}: routine ${P.times.routineWeeks.join(' to ')} weeks, expedited ${P.times.expeditedWeeks.join(' to ')} weeks, mail up to ${P.times.mailInMaxWeeks} weeks each way. The earliest date leaves mail out, the latest adds both legs.`, `Tiempos de la página actualizada el ${f.date(P.times.pageUpdated)}: ordinario ${P.times.routineWeeks.join(' a ')} semanas, urgente ${P.times.expeditedWeeks.join(' a ')} semanas, correo hasta ${P.times.mailInMaxWeeks} semanas en cada sentido. La fecha temprana no cuenta el correo; la tardía suma los dos trayectos.`),
    ...(c.adjusted.includes('online-routine-only') ? [tx(lang, 'Online renewals cannot be expedited, so the routine service is used.', 'La renovación en línea no puede ser urgente: se usa el servicio ordinario.')] : []),
    ...(c.adjusted.includes('no-delivery-card') ? [tx(lang, '1-3 day delivery does not apply to a card alone: cards travel by First Class Mail.', 'La entrega de 1 a 3 días no se aplica a una tarjeta sola: las tarjetas van por correo de primera clase.')] : []),
    tx(lang, 'Not included: photos, the price of faster USPS mail to the State Department (set by the facility), and any private expediter fee.', 'No incluido: fotos, el envío más rápido por USPS hacia el Departamento (lo fija el centro) y cualquier tarifa de un gestor privado.'),
  ];

  return (
    <div className={frame} data-chrome>
      <div className="srg h-1.5" aria-hidden="true" />
      <div className={layout}>
        <form onSubmit={(e) => e.preventDefault()} className="grid content-start gap-y-5">
          <SelectField id="pp-sit" label={tx(lang, 'What are you doing?', '¿Qué trámite hace?')} value={situation} onChange={(v) => setSituation(v as Situation)} options={SITUATIONS.map((s) => ({ value: s, label: SITUATION_LABEL[lang][s] }))} />
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <SelectField id="pp-doc" label={tx(lang, 'Document', 'Documento')} value={doc} onChange={(v) => setDoc(v as Doc)} options={(['book', 'card', 'both'] as Doc[]).map((d) => ({ value: d, label: DOC_LABEL[lang][d] }))} />
            <SelectField id="pp-svc" label={tx(lang, 'Service', 'Servicio')} value={svc} onChange={(v) => setService(v as Service)} options={(online ? ['routine'] as Service[] : ['routine', 'expedited', 'agency'] as Service[]).map((s) => ({ value: s, label: SERVICE_LABEL[lang][s] }))} />
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <DateField id="pp-apply" label={tx(lang, 'Day you apply or mail it', 'Día en que solicita o envía')} value={apply} onChange={setApply} min="2026-01-01" max="2028-12-31" />
            <DateField id="pp-trip" label={tx(lang, 'Departure date', 'Fecha de salida del viaje')} value={travel} onChange={setTravel} min="2026-01-01" max="2029-12-31" />
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <Toggle id="pp-dl" label={tx(lang, `1-3 day delivery (+${f.usd2(P.fees.delivery)})`, `Entrega en 1-3 días (+${f.usd2(P.fees.delivery)})`)} value={doc === 'card' || svc === 'agency' ? '0' : delivery} onChange={setDelivery} options={yesNo(lang)} />
            {ds11 ? <Toggle id="pp-fs" label={tx(lang, `No proof of citizenship (+${f.usd(P.fees.fileSearch)})`, `Sin prueba de ciudadanía (+${f.usd(P.fees.fileSearch)})`)} value={fileSearch} onChange={setFileSearch} options={yesNo(lang)} /> : <div />}
          </div>
        </form>
        <div aria-live="polite" data-resultat className={box}>
          <Head label={head.label} value={head.value} sub={head.sub} />
          <Rows rows={rows} caption={tx(lang, 'What you pay, by payment', 'Lo que paga, por pago')} />
          <Rows rows={dateRows} caption={tx(lang, 'When it arrives', 'Cuándo llega')} />
          {verdict && <p className={`mt-3 text-sm font-semibold ${t.verdict === 'late' ? 'text-red-800' : t.verdict === 'tight' ? 'text-amber-900' : 'text-accent-800'}`}>{verdict}</p>}
          <p className="mt-1 text-sm text-navy-700">{advice}</p>
          {!compact && <Steps lang={lang} steps={steps} />}
          <Actions lang={lang} text={() => `${SITUATION_LABEL[lang][situation]} · ${DOC_LABEL[lang][doc]}: ${f.usd2(c.total)} (${f.usd2(c.state)} + ${f.usd2(c.facility)}). ${tx(lang, 'Arrives', 'Llega')} ${f.date(t.earliest)} – ${f.date(t.latest)}.`} />
          <Disclaimer lang={lang} methodHref={methodHref} />
        </div>
      </div>
    </div>
  );
}
