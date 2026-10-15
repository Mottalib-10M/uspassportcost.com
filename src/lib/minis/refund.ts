/** Guide « remboursement des 60 $ » : 15 jours ouvrés après réception en agence, fériés fédéraux exclus. */
import type { MiniSpec } from '../mini-types';
import { tx, f, iso, TODAY, type Lang } from './_kit';
import { refundCheck, addDays } from '../engine/passport';
import P from '../../data/params-2026.json';
export default (l: Lang): MiniSpec => ({
  title: tx(l, 'Is your $60 expedite fee refundable?', '¿Le devuelven los 60 dólares del urgente?'),
  cta: tx(l, 'Plan an expedited application', 'Planear una solicitud urgente'),
  inputs: [
    { id: 'in', label: tx(l, 'Date it reached a passport agency (status “In Process”)', 'Fecha en que llegó a la agencia (estado “In Process”)'), type: 'date', def: addDays(TODAY, -30) },
    { id: 'out', label: tx(l, 'Date it was approved or mailed', 'Fecha de aprobación o envío'), type: 'date', def: addDays(TODAY, -6) },
  ],
  run: (v) => {
    const F = f(l);
    const a = iso(v.in) ? v.in : addDays(TODAY, -30), b = iso(v.out) ? v.out : addDays(TODAY, -6);
    const r = refundCheck(a, b);
    return {
      head: [tx(l, 'Expedite refund', 'Reembolso del urgente'), r.eligible ? tx(l, `You can ask for ${F.usd(P.fees.expedite)}`, `Puede pedir ${F.usd(P.fees.expedite)}`) : tx(l, 'Not refundable', 'No reembolsable')],
      rows: [[tx(l, `Due after ${P.times.expediteCommitmentBusinessDays} business days`, `Plazo de ${P.times.expediteCommitmentBusinessDays} días hábiles`), F.date(r.due)], [tx(l, 'Business days late', 'Días hábiles de retraso'), F.num(r.late)]],
      note: tx(l, 'Weekends and federal holidays (OPM calendar) are not business days.', 'Los fines de semana y los feriados federales (calendario de la OPM) no son días hábiles.'),
    };
  },
});
