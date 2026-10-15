/** Guide « meilleur moment pour demander » : mois de dépôt → saison (page des délais) et date d'arrivée. */
import type { MiniSpec } from '../mini-types';
import { tx, f, type Lang, TODAY } from './_kit';
import { timeline } from '../engine/passport';
import P from '../../data/params-2026.json';
export default (l: Lang): MiniSpec => {
  const months = Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: new Date(Date.UTC(2026, i, 1)).toLocaleDateString(l === 'es' ? 'es-US' : 'en-US', { month: 'long', timeZone: 'UTC' }) }));
  return {
    title: tx(l, 'Busy season or quiet season?', '¿Temporada alta o baja?'),
    cta: tx(l, 'Estimate your arrival date', 'Estimar su fecha de llegada'),
    inputs: [{ id: 'm', label: tx(l, 'Month you apply', 'Mes en que solicita'), type: 'select', def: '11', options: months }],
    run: (v) => {
      const F = f(l);
      const m = Number(v.m) || 11;
      const quiet = (P.times.quietMonths as number[]).includes(m);
      const busy = m >= 2 && m <= 8;
      const y = Number(TODAY.slice(0, 4)) + (m < Number(TODAY.slice(5, 7)) ? 1 : 0);
      const day = `${y}-${String(m).padStart(2, '0')}-15`;
      const t = timeline({ situation: 'renew-mail', doc: 'book', service: 'routine', delivery: false, applyDate: day });
      return { head: [tx(l, 'Season', 'Temporada'), quiet ? tx(l, 'Quiet: October to December', 'Baja: octubre a diciembre') : busy ? tx(l, 'Busy: late winter into summer', 'Alta: de fines del invierno al verano') : tx(l, 'In between', 'Intermedia')], rows: [[tx(l, 'Mailed on the 15th, routine, arrives', 'Enviado el día 15, ordinario, llega'), `${F.date(t.earliest)} – ${F.date(t.latest)}`]], note: tx(l, 'The published 4 to 6 weeks applies all year; in busy months the State Department may lengthen it.', 'Las 4 a 6 semanas publicadas valen todo el año; en meses de mucha demanda el Departamento puede alargarlas.') };
    },
  };
};
