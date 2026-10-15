/** Guide « payer l'accéléré ou non » : les deux fenêtres d'arrivée face à la date de voyage. */
import type { MiniSpec } from '../mini-types';
import { tx, f, iso, TODAY, type Lang } from './_kit';
import { timeline, addDays } from '../engine/passport';
import P from '../../data/params-2026.json';
export default (l: Lang): MiniSpec => ({
  title: tx(l, 'Routine or expedited for this trip?', '¿Ordinario o urgente para este viaje?'),
  cta: tx(l, 'Open the full calculator', 'Abrir la calculadora completa'),
  inputs: [{ id: 'trip', label: tx(l, 'Departure date', 'Fecha de salida'), type: 'date', def: addDays(TODAY, 49) }],
  run: (v) => {
    const F = f(l);
    const trip = iso(v.trip) ? v.trip : addDays(TODAY, 49);
    const base = { situation: 'renew-mail' as const, doc: 'book' as const, applyDate: TODAY, travelDate: trip };
    const r = timeline({ ...base, service: 'routine', delivery: false });
    const e = timeline({ ...base, service: 'expedited', delivery: true });
    const word = (x: string) => ({ safe: tx(l, 'in time', 'a tiempo'), tight: tx(l, 'tight', 'justo'), late: tx(l, 'too late', 'tarde'), agency: tx(l, 'agency', 'agencia'), 'no-trip': '' } as Record<string, string>)[x];
    const choice = r.advice === 'agency' ? tx(l, 'Agency appointment', 'Cita en agencia') : r.verdict === 'safe' ? tx(l, 'Routine is enough', 'Basta el ordinario') : e.verdict === 'late' ? tx(l, 'Agency appointment', 'Cita en agencia') : tx(l, `Expedite (+${F.usd(P.fees.expedite + P.fees.delivery)})`, `Urgente (+${F.usd(P.fees.expedite + P.fees.delivery)})`);
    return { head: [tx(l, 'Best choice if you mail it today', 'Mejor opción si lo envía hoy'), choice], rows: [[tx(l, 'Routine, latest arrival', 'Ordinario, llegada más tardía'), `${F.date(r.latest)} (${word(r.verdict)})`], [tx(l, 'Expedited + delivery, latest', 'Urgente + entrega, más tardía'), `${F.date(e.latest)} (${word(e.verdict)})`]] };
  },
});
