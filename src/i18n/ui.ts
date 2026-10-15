import type { Locale } from './routes';
const en = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Checked by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Questions people ask', relatedCalculators: 'Keep going', sourcesTitle: 'Official sources', writtenBy: 'Published by',
  asOf: 'Fees and times for', lastUpdated: 'checked on', footerValidated: 'Fee chart of October 2026, 22 CFR 22.1 and published processing times, read by script and tested', footerBrowser: 'Calculations run in your browser · nothing you type is stored or sent · free, no account',
  footerDisclaimer: 'US Passport Cost is an independent site published by Radif Partners. Not affiliated with the U.S. Department of State or any government agency, and it sells no expediting or application service. Estimates only, from public data: they do not replace the Department of State’s decision on your fees, processing and travel eligibility. The only official online renewal is on opr.travel.state.gov.', footerPopular: 'Validity by destination', notFound: 'There is no page at this address.',
  readMore: 'Read more',
};
const es: typeof en = {
  updatedOn: 'Actualizado el', editorialPolicy: 'Política editorial', contactLabel: 'Contacto', reviewedBy: 'Revisado por',
  skipToContent: 'Ir al contenido', mainNav: 'Navegación principal', breadcrumbLabel: 'Ruta de navegación', breadcrumbHome: 'Inicio', menuOpen: 'Abrir el menú',
  faqTitle: 'Preguntas frecuentes', relatedCalculators: 'Siga con', sourcesTitle: 'Fuentes oficiales', writtenBy: 'Publicado por',
  asOf: 'Tarifas y plazos de', lastUpdated: 'revisados el', footerValidated: 'Tabla de tarifas de octubre de 2026, 22 CFR 22.1 y tiempos publicados, leídos por programa y probados', footerBrowser: 'Los cálculos se hacen en su navegador · nada de lo que escribe se guarda ni se envía · gratis, sin cuenta',
  footerDisclaimer: 'US Passport Cost es un sitio independiente publicado por Radif Partners. No está afiliado al Departamento de Estado ni a ninguna agencia del gobierno, y no vende ningún servicio de agilización ni de solicitud. Estimaciones con datos públicos que no sustituyen la decisión del Departamento de Estado sobre sus tarifas, el trámite y si puede viajar. La única renovación oficial en línea está en opr.travel.state.gov.', footerPopular: 'Vigencia por destino', notFound: 'No hay ninguna página en esta dirección.',
  readMore: 'Leer más',
};
export function t(lang: Locale) { return lang === 'es' ? es : en; }
