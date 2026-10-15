/** Guide « où déposer » : situation et délai avant le voyage → guichet (structure, courrier, en ligne, agence). */
import type { MiniSpec } from '../mini-types';
import { tx, f, type Lang } from './_kit';
import { cost, type Situation } from '../engine/passport';
import P from '../../data/params-2026.json';
export default (l: Lang): MiniSpec => ({
  title: tx(l, 'Where do you go for your passport?', '¿Adónde va para su pasaporte?'),
  cta: tx(l, 'Cost and arrival date', 'Costo y fecha de llegada'),
  inputs: [
    { id: 's', label: tx(l, 'Situation', 'Situación'), type: 'select', def: 'first', options: [{ value: 'first', label: tx(l, 'First passport or child', 'Primer pasaporte o menor') }, { value: 'renew-mail', label: tx(l, 'Eligible renewal', 'Renovación elegible') }, { value: 'lost', label: tx(l, 'Lost or stolen passport', 'Pasaporte perdido o robado') }] },
    { id: 'd', label: tx(l, 'Days until you travel', 'Días hasta el viaje'), type: 'number', def: '60', max: 999, unit: tx(l, 'days', 'días') },
  ],
  run: (v) => {
    const F = f(l);
    const d = Math.max(0, Number(v.d) || 0);
    const agency = d <= P.times.urgentDays;
    const renew = v.s === 'renew-mail';
    const place = agency ? tx(l, 'Passport agency, by appointment', 'Agencia de pasaportes, con cita') : renew ? (d >= 42 ? tx(l, 'Online or by mail', 'En línea o por correo') : tx(l, 'By mail, expedited', 'Por correo, urgente')) : tx(l, 'Acceptance facility (post office, clerk, library)', 'Centro de aceptación (correo, juzgado, biblioteca)');
    const c = cost({ situation: (renew ? 'renew-mail' : v.s) as Situation, doc: 'book', service: agency ? 'agency' : d < 42 ? 'expedited' : 'routine', delivery: !agency && d < 42, fileSearch: false });
    return { head: [tx(l, 'Go to', 'Vaya a'), place], rows: [[tx(l, 'Fees for that route', 'Tarifas por esa vía'), F.usd(c.total)], [tx(l, 'Agency window opens', 'La ventana de agencia abre'), tx(l, `${P.times.urgentDays} days before travel`, `${P.times.urgentDays} días antes del viaje`)]] };
  },
});
