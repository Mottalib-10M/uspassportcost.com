/** Guide « combien de temps avant le voyage » : dernier jour pour déposer selon la voie, pire cas publié. */
import type { MiniSpec } from '../mini-types';
import { tx, f, iso, TODAY, type Lang } from './_kit';
import { timeline, addDays } from '../engine/passport';
export default (l: Lang): MiniSpec => ({
  title: tx(l, 'Last day to apply before your trip', 'Último día para solicitar antes del viaje'),
  cta: tx(l, 'Full cost and date calculator', 'Calculadora completa de costo y fecha'),
  inputs: [
    { id: 'trip', label: tx(l, 'Departure date', 'Fecha de salida'), type: 'date', def: addDays(TODAY, 75) },
    { id: 'way', label: tx(l, 'How you apply', 'Cómo solicita'), type: 'select', def: 'mail', options: [{ value: 'mail', label: tx(l, 'In person or by mail, routine', 'En persona o por correo, ordinario') }, { value: 'exp', label: tx(l, 'Expedited, 1-3 day delivery', 'Urgente, entrega en 1-3 días') }, { value: 'online', label: tx(l, 'Online renewal', 'Renovación en línea') }] },
  ],
  run: (v) => {
    const F = f(l);
    const trip = iso(v.trip) ? v.trip : addDays(TODAY, 75);
    const x = { situation: v.way === 'online' ? 'renew-online' as const : 'first' as const, doc: 'book' as const, service: v.way === 'exp' ? 'expedited' as const : 'routine' as const, delivery: v.way === 'exp', applyDate: TODAY, travelDate: trip };
    const t = timeline(x);
    const worst = t.mailIn[1] + t.processing[1] + t.mailOut[1];
    const last = addDays(trip, -worst);
    const online6 = addDays(trip, -42);
    return {
      head: [tx(l, 'Apply no later than', 'Solicite a más tardar el'), F.date(v.way === 'online' && online6 < last ? online6 : last)],
      rows: [[tx(l, 'Worst case, door to door', 'Peor caso, puerta a puerta'), tx(l, `${worst} days`, `${worst} días`)], [tx(l, 'Applying today, it arrives by', 'Si solicita hoy, llega a más tardar'), F.date(t.latest)]],
      note: v.way === 'online' ? tx(l, 'Online renewal also requires no travel for 6 weeks after you apply.', 'La renovación en línea exige además no viajar en las 6 semanas siguientes.') : undefined,
    };
  },
});
