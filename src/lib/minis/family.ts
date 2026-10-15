/** Guide « coût pour une famille » : adultes, renouvellements et enfants → total, montant de chaque paiement. */
import type { MiniSpec } from '../mini-types';
import { tx, f, type Lang } from './_kit';
import { cost } from '../engine/passport';
export default (l: Lang): MiniSpec => ({
  title: tx(l, 'Passport cost for the whole family', 'Costo del pasaporte para toda la familia'),
  cta: tx(l, 'Check one person in detail', 'Calcular una persona en detalle'),
  inputs: [
    { id: 'a', label: tx(l, 'Adults applying for the first time', 'Adultos por primera vez'), type: 'number', def: '1', max: 9 },
    { id: 'r', label: tx(l, 'Adults renewing by mail', 'Adultos que renuevan por correo'), type: 'number', def: '1', max: 9 },
    { id: 'k', label: tx(l, 'Children under 16', 'Menores de 16 años'), type: 'number', def: '2', max: 9 },
  ],
  run: (v) => {
    const F = f(l);
    const n = (x: string) => Math.max(0, Math.min(9, Math.round(Number(x) || 0)));
    const A = n(v.a), R = n(v.r), K = n(v.k);
    const one = (s: 'first' | 'renew-mail' | 'child') => cost({ situation: s, doc: 'book', service: 'routine', delivery: false, fileSearch: false });
    const state = A * one('first').state + K * one('child').state;
    const facility = (A + K) * one('first').facility;
    const mail = R * one('renew-mail').state;
    return { head: [tx(l, 'Total for the family', 'Total de la familia'), F.usd(state + facility + mail)], rows: [[tx(l, 'Check(s) handed in at the facility', 'Cheque(s) en el centro'), F.usd(state)], [tx(l, 'Facility fees', 'Tarifas del centro'), F.usd(facility)], [tx(l, 'Check mailed with the DS-82s', 'Cheque enviado con los DS-82'), F.usd(mail)]], note: tx(l, 'One check may cover several applications if the memo lists every name and date of birth.', 'Un solo cheque puede cubrir varias solicitudes si el memo lista cada nombre y fecha de nacimiento.') };
  },
});
