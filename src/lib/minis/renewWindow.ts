/** Guide « quand renouveler » : date d'expiration → ouverture du renouvellement en ligne, date des 6 mois, dernier envoi. */
import type { MiniSpec } from '../mini-types';
import { tx, f, iso, TODAY, type Lang } from './_kit';
import { addYears, addMonths, addDays } from '../engine/passport';
import P from '../../data/params-2026.json';
export default (l: Lang): MiniSpec => ({
  title: tx(l, 'Your renewal calendar', 'Su calendario de renovación'),
  cta: tx(l, 'Check which renewal route you qualify for', 'Ver qué vía de renovación le corresponde'),
  inputs: [{ id: 'exp', label: tx(l, 'Expiration date on your passport', 'Fecha de vencimiento del pasaporte'), type: 'date', def: addMonths(TODAY, 14) }],
  run: (v) => {
    const F = f(l);
    const e = iso(v.exp) ? v.exp : addMonths(TODAY, 14);
    const six = addMonths(e, -6);
    const worst = 7 * (P.times.mailInMaxWeeks + P.times.routineWeeks[1] + P.times.mailOutMaxWeeks);
    return { head: [tx(l, 'Online renewal opens', 'La renovación en línea abre el'), F.date(addYears(e, -P.online.expiringWithinYears))], rows: [[tx(l, 'Too short for 6-month countries from', 'Insuficiente para países de 6 meses desde'), F.date(six)], [tx(l, 'Mail a routine renewal by', 'Envíe la renovación ordinaria antes del'), F.date(addDays(six, -worst))], [tx(l, 'Online renewal closes', 'La renovación en línea cierra el'), F.date(addDays(addYears(e, P.online.expiredLessThanYears), -1))]] };
  },
});
