/**
 * Destinations sans page propre dans une langue (plafond de 100 pages, RECETTE §3) : leur règle reste dans
 * le vérificateur et leur fiche officielle est résumée sur la page de synthèse (passport-validity), sous une
 * ancre stable. Tout lien interne vers une telle destination pointe sur cette ancre.
 */
import C from '../data/countries.json';
import { route, hasRoute, type Locale } from '../i18n/routes';

export const countryPageId = (code: string) => `country-${code.toLowerCase()}`;
export const destAnchor = (code: string, lang: Locale) => C.list.find((c) => c.code === code)!.slug[lang];
/** Lien vers la destination : sa page si elle existe dans la langue, sinon son résumé sur la synthèse. */
export const destHref = (code: string, lang: Locale) =>
  hasRoute(countryPageId(code), lang) ? route(countryPageId(code), lang) : `${route('passport-validity', lang)}#${destAnchor(code, lang)}`;
/** Destinations résumées sur la synthèse dans cette langue (sans page propre). */
export const summarized = (lang: Locale) => C.list.filter((c) => !hasRoute(countryPageId(c.code), lang));
