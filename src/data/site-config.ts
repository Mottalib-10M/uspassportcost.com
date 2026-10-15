/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://uspassportcost.com";
export const SITE_NAMES: Record<string, string> = {"en": "US Passport Cost", "es": "US Passport Cost"};
export const LANG_TAGS: Record<string, string> = {"en": "en-US", "es": "es-US"};
export const OG_LOCALES: Record<string, string> = {"en": "en_US", "es": "es_US"};
export const LOCALE_TAG = 'en-US';
export const LOCALE_BY_LANG: Record<string, string> = { en: 'en-US', es: 'es-US' };
export const CURRENCY = 'USD';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-15';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"en": "Publisher of a free US passport cost and arrival-date calculator built on State Department fee charts", "es": "Editor de una calculadora gratuita del costo y la fecha de llegada del pasaporte de EE. UU., con las tarifas del Departamento de Estado"};
export const AUTHOR_DESC: Record<string, string> = {"en": "Radif Partners reads the State Department's own fee chart (October 2026 edition), the fee schedule in 22 CFR 22.1 and the processing times page, then adds up what you will write on each check and when the passport should reach your mailbox. No expediting service is sold here and nothing you type leaves your browser.", "es": "Radif Partners lee la tabla de tarifas del Departamento de Estado (edición de octubre de 2026), la lista de tarifas del 22 CFR 22.1 y la página de tiempos de trámite, y suma lo que usted escribirá en cada cheque y cuándo debería llegar el pasaporte a su buzón. Aquí no se vende ningún servicio de agilización y nada de lo que escribe sale de su navegador."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"en": ["US passport fees (DS-11, DS-82, passport card)", "Passport processing times and expedited service", "Online passport renewal eligibility", "Child passport applications under 16", "Passport validity requirements by destination country", "Passport acceptance facilities and execution fee"], "es": ["Tarifas del pasaporte de EE. UU. (DS-11, DS-82, tarjeta)", "Tiempos de trámite del pasaporte y servicio urgente", "Requisitos de la renovación en línea", "Pasaporte para menores de 16 años", "Vigencia del pasaporte exigida por país de destino", "Centros de aceptación y tarifa de ejecución"]};
export const CONTACT_EMAIL = "contact@uspassportcost.com";
export const THEME_COLOR = '#24407A';
export const LOGO_SYMBOL = 'PP';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau, aucun cookie, Clarity chargé en mode sans cookie (consentv2 denied).
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = '8c2e5a1f7b9d4c3e6a0f2b8d1e7c4a95';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "VAT",
  vatNumber: '',
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
