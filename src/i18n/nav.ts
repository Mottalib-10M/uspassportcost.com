import { route, hasRoute, type Locale } from './routes';
import { PAGES, pageById, GROUPS } from '../lib/guides';
import type { Group } from '../lib/guide-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  en: { home: 'Passport cost and date', method: 'Method and sources', about: 'About', widget: 'Embed the calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
  es: { home: 'Costo y fecha del pasaporte', method: 'Método y fuentes', about: 'Quiénes somos', widget: 'Insertar la calculadora', contact: 'Contacto', editorial: 'Política editorial', privacy: 'Privacidad', terms: 'Aviso legal', cookies: 'Cookies' },
};
const GROUP_LABEL: Record<Locale, Record<Group, string>> = {
  en: { cost: 'Fees', renew: 'Renewal', speed: 'Timing', validity: 'Validity', country: 'By destination', guides: 'Guides' },
  es: { cost: 'Costos', renew: 'Renovación', speed: 'Plazos', validity: 'Vigencia', country: 'Por destino', guides: 'Guías' },
};
export const label = (id: string, lang: Locale) => CORE[lang][id] ?? (pageById(id)?.[lang] ?? pageById(id)?.en)?.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
/** Liens d'une rubrique dans une langue : seulement les pages qui existent dans cette langue. */
const inGroup = (g: Group, lang: Locale, max = 99) => PAGES.filter((p) => p.group === g && hasRoute(p.id, lang)).slice(0, max).map((p) => link(p.id, lang));
const MENU: Group[] = ['cost', 'renew', 'speed', 'validity', 'guides'];
export function navCategories(lang: Locale): NavCategory[] {
  return MENU.map((g) => ({ label: GROUP_LABEL[lang][g], links: [...inGroup(g, lang, 14), ...(g === 'validity' ? inGroup('country', lang, 8) : [])] })).filter((c) => c.links.length);
}
export const groupLabel = (g: Group, lang: Locale) => GROUP_LABEL[lang][g];
export const navDirect = (lang: Locale): NavLink[] => [link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...(['cost', 'renew', 'speed', 'validity', 'country', 'guides'] as Group[]).map((g) => ({ label: GROUP_LABEL[lang][g], links: inGroup(g, lang, 30) })).filter((c) => c.links.length),
  { label: lang === 'es' ? 'Este sitio' : 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
export const popularLinks = (lang: Locale): NavLink[] => inGroup('country', lang, 12);
export { GROUPS };
