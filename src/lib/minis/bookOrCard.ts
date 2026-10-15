/** Guide « livret ou carte » : le type de voyage dit si la carte suffit, et l'écart de prix. */
import type { MiniSpec } from '../mini-types';
import { tx, f, type Lang } from './_kit';
import P from '../../data/params-2026.json';
export default (l: Lang): MiniSpec => ({
  title: tx(l, 'Will a passport card do for this trip?', '¿Sirve la tarjeta para este viaje?'),
  cta: tx(l, 'Price the book, the card or both', 'Calcular libreta, tarjeta o ambas'),
  inputs: [
    { id: 'trip', label: tx(l, 'Trip', 'Viaje'), type: 'select', def: 'drive', options: [{ value: 'fly', label: tx(l, 'Flying anywhere abroad', 'Avión a cualquier país') }, { value: 'drive', label: tx(l, 'Driving to Canada or Mexico', 'En auto a Canadá o México') }, { value: 'cruise', label: tx(l, 'Cruise to the Caribbean or Bermuda', 'Crucero al Caribe o Bermudas') }, { value: 'domestic', label: tx(l, 'Domestic flight, as REAL ID', 'Vuelo nacional, como REAL ID') }] },
    { id: 'who', label: tx(l, 'Applicant', 'Solicitante'), type: 'select', def: 'adult', options: [{ value: 'adult', label: tx(l, 'Adult, first time', 'Adulto, primera vez') }, { value: 'minor', label: tx(l, 'Child under 16', 'Menor de 16') }] },
  ],
  run: (v) => {
    const F = f(l);
    const w = v.who === 'minor' ? 'minor' : 'adult';
    const ok = v.trip !== 'fly';
    const book = P.fees.book[w] + P.fees.execution, card = P.fees.card[w] + P.fees.execution, both = P.fees.both[w] + P.fees.execution;
    return {
      head: [tx(l, 'Passport card', 'Tarjeta'), ok ? tx(l, 'Accepted for this trip', 'Válida para este viaje') : tx(l, 'Not valid by air', 'No vale en avión')],
      rows: [[tx(l, 'Card, all in', 'Tarjeta, total'), F.usd(card)], [tx(l, 'Book, all in', 'Libreta, total'), F.usd(book)], [tx(l, 'Both together', 'Ambas juntas'), F.usd(both)]],
      note: tx(l, `Applying for both at once saves the second ${F.usd(P.fees.execution)} execution fee.`, `Pedir ambas a la vez ahorra la segunda tarifa de ejecución de ${F.usd(P.fees.execution)}.`),
    };
  },
});
