/**
 * Validité exigée par le pays de destination : expiration du passeport, dates d'arrivée et de départ → date
 * jusqu'à laquelle il doit être valide (règle de la fiche Consular Affairs), marge en jours, et dernier jour pour
 * déposer un renouvellement par courrier qui arrive avant le départ dans le pire cas publié.
 */
import { useEffect, useState } from 'react';
import SelectField from '../ui/SelectField';
import { Rows, Head, Steps, Actions, Disclaimer, DateField, box, frame, layout, fm, type Row } from './kit';
import { validity, COUNTRIES, countryByCode, addDays, addYears, addMonths, isIso } from '../../lib/engine/passport';
import { tx, type L } from '../../lib/labels';
import { readParams, str, updateURL } from '../../lib/url-state';
import C from '../../data/countries.json';

declare const __BUILD_DAY__: string;

export default function ValidityTool({ lang = 'en', country: c0 = 'PE', methodHref }: { lang?: L; country?: string; methodHref?: string }) {
  const f = fm(lang);
  const [code, setCode] = useState(c0);
  const [expiry, setExpiry] = useState<string>(addMonths(__BUILD_DAY__, 7));
  const [arrive, setArrive] = useState<string>(addDays(__BUILD_DAY__, 60));
  const [leave, setLeave] = useState<string>(addDays(__BUILD_DAY__, 74));
  useEffect(() => {
    const u = readParams(window.location.search);
    const d = new Date().toISOString().slice(0, 10);
    const k = str(u, 'c', c0); if (countryByCode(k)) setCode(k);
    const e = str(u, 'exp', addMonths(d, 7)); setExpiry(isIso(e) ? e : addMonths(d, 7));
    const a = str(u, 'arr', addDays(d, 60)); setArrive(isIso(a) ? a : addDays(d, 60));
    const l = str(u, 'dep', addDays(d, 74)); setLeave(isIso(l) ? l : addDays(d, 74));
  }, []);
  useEffect(() => { updateURL({ c: code, exp: expiry, arr: arrive, dep: leave }); }, [code, expiry, arrive, leave]);
  const country = countryByCode(code)!;
  const v = validity(country, isIso(expiry) ? expiry : addYears(__BUILD_DAY__, 1), isIso(arrive) ? arrive : __BUILD_DAY__, isIso(leave) ? leave : arrive, __BUILD_DAY__);
  const RULE: Record<string, string> = {
    entry: tx(lang, 'valid on the day you enter', 'vigente el día de entrada'),
    stay: tx(lang, 'valid for your whole stay', 'vigente durante toda la estancia'),
    afterDeparture: tx(lang, `valid ${country.months} months after you leave`, `vigente ${country.months} meses después de salir`),
    afterEntry: tx(lang, `valid ${country.months} months after you arrive`, `vigente ${country.months} meses después de llegar`),
  };
  const rows: Row[] = [
    { label: tx(lang, 'Rule for', 'Regla de') + ' ' + country.name[lang], value: RULE[country.kind] },
    { label: tx(lang, 'Must be valid at least until', 'Debe estar vigente al menos hasta'), value: f.date(v.mustBeValidUntil), strong: true },
    ...(v.recommendedUntil ? [{ label: tx(lang, 'State Department recommends until', 'El Departamento recomienda hasta'), value: f.date(v.recommendedUntil) }] : []),
    { label: tx(lang, 'Margin', 'Margen'), value: v.margin >= 0 ? tx(lang, `${f.num(v.margin)} day${v.margin === 1 ? '' : 's'} to spare`, `${f.num(v.margin)} día${v.margin === 1 ? '' : 's'} de sobra`) : tx(lang, `${f.num(-v.margin)} day${v.margin === -1 ? '' : 's'} short`, `falta${v.margin === -1 ? '' : 'n'} ${f.num(-v.margin)} día${v.margin === -1 ? '' : 's'}`) },
    ...(!v.ok || !v.okRecommended ? [{ label: tx(lang, 'Mail a routine renewal by', 'Envíe la renovación ordinaria antes del'), value: f.date(v.renewBy), sep: true }] : []),
  ];
  const head = v.ok ? (v.okRecommended ? tx(lang, 'Your passport is valid enough', 'Su pasaporte tiene vigencia suficiente') : tx(lang, 'Meets the rule, short of the advice', 'Cumple la regla, no la recomendación')) : tx(lang, 'Renew before this trip', 'Renueve antes de este viaje');
  const steps = [
    tx(lang, `Rule read in the State Department’s country information for ${country.name.en} (Consular Affairs data, checked ${C.checked}). Airlines may apply a stricter rule at check-in, and transit countries have their own.`, `Regla leída en la ficha del Departamento de Estado para ${country.name.es} (datos de Asuntos Consulares, revisados el ${C.checked}). Las aerolíneas pueden aplicar una regla más estricta y los países de tránsito tienen la suya.`),
    tx(lang, 'The renewal date assumes the slowest published times: 2 weeks of mail each way plus 6 weeks of routine processing.', 'La fecha de renovación supone los tiempos publicados más lentos: 2 semanas de correo en cada sentido y 6 semanas de trámite ordinario.'),
  ];
  return (
    <div className={frame} data-chrome>
      <div className="srg h-1.5" aria-hidden="true" />
      <div className={layout}>
        <form onSubmit={(e) => e.preventDefault()} className="grid content-start gap-y-5">
          <SelectField id="va-c" label={tx(lang, 'Destination', 'Destino')} value={code} onChange={setCode} options={[...COUNTRIES].sort((a, b) => a.name[lang].localeCompare(b.name[lang], lang)).map((c) => ({ value: c.code, label: c.name[lang] }))} />
          <DateField id="va-exp" label={tx(lang, 'Passport expiration date', 'Fecha de vencimiento del pasaporte')} value={expiry} onChange={setExpiry} min="2020-01-01" max="2040-12-31" />
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <DateField id="va-arr" label={tx(lang, 'Arrival date', 'Fecha de llegada')} value={arrive} onChange={setArrive} min="2026-01-01" max="2030-12-31" />
            <DateField id="va-dep" label={tx(lang, 'Departure date', 'Fecha de salida')} value={leave} onChange={setLeave} min="2026-01-01" max="2030-12-31" />
          </div>
        </form>
        <div aria-live="polite" data-resultat className={box}>
          <Head label={`${country.name[lang]} · ${tx(lang, 'passport validity', 'vigencia del pasaporte')}`} value={head} sub={tx(lang, `Must be valid until ${f.date(v.mustBeValidUntil)}`, `Debe valer hasta el ${f.date(v.mustBeValidUntil)}`)} />
          <Rows rows={rows} />
          <Steps lang={lang} steps={steps} />
          <Actions lang={lang} text={() => `${country.name[lang]}: ${head}. ${tx(lang, 'Valid until', 'Vigente hasta')} ${f.date(v.mustBeValidUntil)}.`} />
          <Disclaimer lang={lang} methodHref={methodHref} />
        </div>
      </div>
    </div>
  );
}
