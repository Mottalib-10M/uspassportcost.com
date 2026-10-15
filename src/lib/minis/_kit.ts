/** Outils partagés des mini-simulateurs. */
import { formatMoney, formatNumber, displayDate } from '../format';
import { LANG_TAGS } from '../../data/site-config';
export type Lang = 'en' | 'es';
export const tx = <A,>(l: Lang, en: A, es: A) => (l === 'es' ? es : en);
export const f = (l: Lang) => ({
  usd: (x: number) => formatMoney(x, Number.isInteger(Math.round(x * 100) / 100) ? 0 : 2, l),
  num: (x: number, d = 0) => formatNumber(x, d, l),
  date: (iso: string) => displayDate(iso, LANG_TAGS[l]),
});
export const iso = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
declare const __BUILD_DAY__: string;
/** Jour du build : valeur par défaut des champs date au premier rendu (RECETTE §17.5). */
export const TODAY: string = typeof __BUILD_DAY__ !== 'undefined' ? __BUILD_DAY__ : new Date().toISOString().slice(0, 10);
