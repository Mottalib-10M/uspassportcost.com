/** Guide « combien de temps un passeport est valable » : date de délivrance et âge → expiration et voie de renouvellement. */
import type { MiniSpec } from '../mini-types';
import { tx, f, iso, TODAY, type Lang } from './_kit';
import { expiryOf, addYears } from '../engine/passport';
import P from '../../data/params-2026.json';
export default (l: Lang): MiniSpec => ({
  title: tx(l, 'When does your passport expire?', '¿Cuándo vence su pasaporte?'),
  cta: tx(l, 'See how you can renew it', 'Ver cómo renovarlo'),
  inputs: [
    { id: 'iss', label: tx(l, 'Issue date', 'Fecha de emisión'), type: 'date', def: addYears(TODAY, -8) },
    { id: 'age', label: tx(l, 'Age when it was issued', 'Edad al emitirse'), type: 'number', def: '30', max: 120, unit: tx(l, 'years', 'años') },
  ],
  run: (v) => {
    const F = f(l);
    const i = iso(v.iss) ? v.iss : addYears(TODAY, -8);
    const age = Number(v.age) || 0;
    const e = expiryOf(i, age);
    const adult = age >= P.validity.adultFromAge;
    const renew = !adult ? tx(l, 'Not renewable: new DS-11 in person', 'No se renueva: DS-11 nuevo en persona') : addYears(i, P.mail.issuedWithinYears) < TODAY ? tx(l, 'Over 15 years: apply in person', 'Más de 15 años: en persona') : tx(l, 'By mail (DS-82), online if 25+', 'Por correo (DS-82), en línea desde los 25');
    return { head: [tx(l, 'Expires on', 'Vence el'), F.date(e)], rows: [[tx(l, 'Validity', 'Vigencia'), adult ? tx(l, '10 years', '10 años') : tx(l, '5 years', '5 años')], [tx(l, 'How to renew', 'Cómo renovar'), renew]] };
  },
});
