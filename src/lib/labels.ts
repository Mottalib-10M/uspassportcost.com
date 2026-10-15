/** Libellés communs des outils et des mini-simulateurs, en anglais et en espagnol. */
import type { Situation, Doc, Service, Reason } from './engine/passport';
export type L = 'en' | 'es';

export const SITUATIONS: Situation[] = ['first', 'renew-mail', 'renew-online', 'child', 'teen', 'lost', 'name-change'];
export const SITUATION_LABEL: Record<L, Record<Situation, string>> = {
  en: { first: 'First passport, age 18+ (DS-11)', 'renew-mail': 'Renew by mail (DS-82)', 'renew-online': 'Renew online', child: 'Child under 16 (DS-11)', teen: 'Age 16 or 17 (DS-11)', lost: 'Replace a lost or stolen one (DS-11)', 'name-change': 'Name change within 1 year (DS-5504)' },
  es: { first: 'Primer pasaporte, 18 años o más (DS-11)', 'renew-mail': 'Renovar por correo (DS-82)', 'renew-online': 'Renovar en línea', child: 'Menor de 16 años (DS-11)', teen: '16 o 17 años (DS-11)', lost: 'Reemplazar uno perdido o robado (DS-11)', 'name-change': 'Cambio de nombre en el primer año (DS-5504)' },
};
export const DOC_LABEL: Record<L, Record<Doc, string>> = {
  en: { book: 'Passport book', card: 'Passport card', both: 'Book and card' },
  es: { book: 'Libreta', card: 'Tarjeta', both: 'Libreta y tarjeta' },
};
export const SERVICE_LABEL: Record<L, Record<Service, string>> = {
  en: { routine: 'Routine (4 to 6 weeks)', expedited: 'Expedited (2 to 3 weeks)', agency: 'Agency appointment (trip within 14 days)' },
  es: { routine: 'Ordinario (4 a 6 semanas)', expedited: 'Urgente (2 a 3 semanas)', agency: 'Cita en agencia (viaje en 14 días)' },
};
export const LINE_LABEL: Record<L, Record<string, string>> = {
  en: { application: 'Application fee', expedite: 'Expedited service', delivery: '1-3 day return delivery', fileSearch: 'File search', execution: 'Execution (acceptance) fee' },
  es: { application: 'Tarifa de solicitud', expedite: 'Servicio urgente', delivery: 'Entrega de regreso en 1 a 3 días', fileSearch: 'Búsqueda de expediente', execution: 'Tarifa de ejecución (aceptación)' },
};
export const REASON_LABEL: Record<L, Record<Reason, string>> = {
  en: { age: 'you must be 25 or older', 'issued-young': 'it was issued before you turned 16', 'too-old': 'it was issued more than 15 years ago', 'not-in-window': 'it must expire within 1 year or have expired less than 5 years ago', name: 'your name changed', damaged: 'it is damaged, lost or stolen', abroad: 'you are outside the United States', 'travel-soon': 'you travel within 6 weeks', 'not-10-year': 'it was not a 10-year passport' },
  es: { age: 'debe tener 25 años o más', 'issued-young': 'se emitió antes de sus 16 años', 'too-old': 'se emitió hace más de 15 años', 'not-in-window': 'debe vencer en menos de 1 año o haber vencido hace menos de 5', name: 'su nombre cambió', damaged: 'está dañado, perdido o robado', abroad: 'usted está fuera de EE. UU.', 'travel-soon': 'viaja en menos de 6 semanas', 'not-10-year': 'no era un pasaporte de 10 años' },
};
export const tx = <A,>(l: L, en: A, es: A) => (l === 'es' ? es : en);
export const yesNo = (l: L) => [{ value: '0', label: 'No' }, { value: '1', label: tx(l, 'Yes', 'Sí') }];
