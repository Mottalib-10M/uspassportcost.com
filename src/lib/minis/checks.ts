/** Guide « deux paiements » : montant de chaque chèque selon la situation et les options. */
import type { MiniSpec } from '../mini-types';
import { tx, f, type Lang } from './_kit';
import { cost, type Situation } from '../engine/passport';
export default (l: Lang): MiniSpec => ({
  title: tx(l, 'What goes on each check', 'Lo que va en cada cheque'),
  cta: tx(l, 'Add dates and your trip', 'Agregar fechas y viaje'),
  inputs: [
    { id: 's', label: tx(l, 'Application', 'Solicitud'), type: 'select', def: 'first', options: [{ value: 'first', label: tx(l, 'Adult, first passport (DS-11)', 'Adulto, primer pasaporte (DS-11)') }, { value: 'child', label: tx(l, 'Child under 16 (DS-11)', 'Menor de 16 (DS-11)') }, { value: 'renew-mail', label: tx(l, 'Renewal by mail (DS-82)', 'Renovación por correo (DS-82)') }] },
    { id: 'o', label: tx(l, 'Options', 'Opciones'), type: 'select', def: 'none', options: [{ value: 'none', label: tx(l, 'None', 'Ninguna') }, { value: 'exp', label: tx(l, 'Expedited', 'Urgente') }, { value: 'both', label: tx(l, 'Expedited + 1-3 day delivery', 'Urgente + entrega 1-3 días') }] },
  ],
  run: (v) => {
    const F = f(l);
    const c = cost({ situation: v.s as Situation, doc: 'book', service: v.o === 'none' ? 'routine' : 'expedited', delivery: v.o === 'both', fileSearch: false });
    return {
      head: [tx(l, 'Check to “U.S. Department of State”', 'Cheque a “U.S. Department of State”'), F.usd(c.state)],
      rows: [[tx(l, 'Acceptance facility (its own payment rules)', 'Centro de aceptación (sus propias reglas)'), c.facility ? F.usd(c.facility) : tx(l, 'nothing: you mail it', 'nada: se envía por correo')], [tx(l, 'Total', 'Total'), F.usd(c.total)]],
      note: tx(l, 'Write the applicant’s name and date of birth in the memo line.', 'Escriba el nombre y la fecha de nacimiento del solicitante en la línea del memo.'),
    };
  },
});
