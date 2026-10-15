/**
 * Une page = UN fichier dans `src/content/<groupe>/<id>.ts` (CONTRIBUTING-PAGES.md).
 * Le fichier porte l'anglais (obligatoire) et l'espagnol (facultatif), le texte, la FAQ, les sources, l'outil ou
 * le mini-simulateur, et les blocs de données générés à montrer. Le cœur (routes, menus, sitemap, hreflang,
 * schémas, pied de page) lit ces fichiers seul.
 */
import type { SourceKey, Params } from './params';
import type { Situation, Doc, Service } from './engine/passport';

export type Lang = 'en' | 'es';
/** Rubrique du menu. */
export type Group = 'cost' | 'renew' | 'speed' | 'validity' | 'country' | 'guides';
export interface FAQ { q: string; a: string }

/** Outil principal d'une page (île React) et son préréglage. */
export type ToolSpec =
  | { kind: 'passport'; situation?: Situation; doc?: Doc; service?: Service; delivery?: boolean; fileSearch?: boolean; focus?: 'cost' | 'date' }
  | { kind: 'renew'; focus?: 'online' | 'mail' }
  | { kind: 'validity'; country?: string };

/** Blocs de données générés sous le texte (tableaux tirés des paramètres et des relevés officiels). */
export interface DataSpec {
  fees?: boolean;
  times?: boolean;
  delivery?: boolean;
  country?: string;
  countries?: boolean;
  states?: boolean;
  stats?: boolean;
  law?: boolean;
}

export interface Helpers {
  lang: Lang;
  /** Lien interne par identifiant de page (texte affiché). */
  a: (id: string, text: string) => string;
  usd: (n: number) => string;
  /** Montant au centime quand il en a (26,87 $), entier sinon. */
  usd2: (n: number) => string;
  num: (n: number, decimals?: number) => string;
  pct: (x: number, decimals?: number) => string;
  /** Date ISO écrite en toutes lettres dans la langue. */
  date: (iso: string) => string;
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  src: (key: SourceKey, text?: string) => string;
  /** Mini-simulateur de sujet inséré dans le corps (RECETTE §9.3). */
  mini: (kind: string) => string;
  /** Paramètres 2026 (frais, délais, règles) : chaque chiffre vient d'ici. */
  P: Params;
}

export interface PageText {
  /** Chemin sans langue ni barres extrêmes, ex. « passport-validity/mexico ». */
  path: string;
  nav: string;
  card: string;
  /** 50 à 60 caractères, terme-clé en tête (RECETTE §11). */
  title: string;
  /** 150 à 160 caractères. */
  description: string;
  h1: string;
  intro: string;
  /** Paragraphe citable, au moins 120 mots, un seul paragraphe (RECETTE §21). */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
}

export interface PageDef {
  id: string;
  group: Group;
  order: number;
  tool?: ToolSpec;
  /** Mini-simulateur en tête de page (guides) : fichier `src/lib/minis/<kind>.ts`. */
  mini?: string;
  data?: DataSpec;
  /** Page parente dans le fil d'Ariane (identifiant). */
  parent?: string;
  related: string[];
  sources: SourceKey[];
  en: PageText;
  es?: PageText;
}

export const definePage = (p: PageDef): PageDef => p;
