/** Guide « services d'expédition » : part qui revient au gouvernement dans un devis privé. */
import type { MiniSpec } from '../mini-types';
import { tx, f, type Lang } from './_kit';
import { cost, type Situation } from '../engine/passport';
export default (l: Lang): MiniSpec => ({
  title: tx(l, 'How much of a quote is government fees?', '¿Cuánto de un presupuesto es tarifa del gobierno?'),
  cta: tx(l, 'Official cost with your dates', 'Costo oficial con sus fechas'),
  inputs: [
    { id: 's', label: tx(l, 'Application', 'Solicitud'), type: 'select', def: 'renew-mail', options: [{ value: 'renew-mail', label: tx(l, 'Adult renewal', 'Renovación de adulto') }, { value: 'first', label: tx(l, 'Adult, first passport', 'Adulto, primer pasaporte') }, { value: 'child', label: tx(l, 'Child under 16', 'Menor de 16') }] },
    { id: 'q', label: tx(l, 'Price you were quoted, before government fees', 'Precio cotizado, sin las tarifas del gobierno'), type: 'number', def: '349', max: 5000, unit: '$' },
  ],
  run: (v) => {
    const F = f(l);
    const c = cost({ situation: v.s as Situation, doc: 'book', service: 'expedited', delivery: true, fileSearch: false });
    const q = Math.max(0, Number(v.q) || 0);
    return { head: [tx(l, 'You would pay in total', 'Pagaría en total'), F.usd(q + c.total)], rows: [[tx(l, 'Government fees, expedited + 1-3 day delivery', 'Tarifas del gobierno, urgente + entrega 1-3 días'), F.usd(c.total)], [tx(l, 'Private service fee on top', 'Tarifa privada encima'), F.usd(q)], [tx(l, 'Refunded by the State Department if late', 'Lo que reembolsa el Departamento si se retrasa'), tx(l, 'only the $60 expedite fee', 'solo los 60 dólares del urgente')]] };
  },
});
