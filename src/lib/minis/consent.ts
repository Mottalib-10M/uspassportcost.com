/** Guide « passeport d'enfant » : qui se présente → documents à fournir, et ce que coûte le dépôt. */
import type { MiniSpec } from '../mini-types';
import { tx, f, type Lang } from './_kit';
import { cost } from '../engine/passport';
export default (l: Lang): MiniSpec => ({
  title: tx(l, 'Child passport: what to bring', 'Pasaporte de menor: qué llevar'),
  cta: tx(l, 'Child passport cost and date', 'Costo y fecha del pasaporte de menor'),
  inputs: [
    { id: 'who', label: tx(l, 'Who comes with the child?', '¿Quién acompaña al menor?'), type: 'select', def: 'both', options: [{ value: 'both', label: tx(l, 'Both parents', 'Los dos padres') }, { value: 'one', label: tx(l, 'One parent, the other agrees', 'Un padre, el otro está de acuerdo') }, { value: 'sole', label: tx(l, 'One parent with sole custody', 'Un padre con custodia exclusiva') }, { value: 'none', label: tx(l, 'Neither parent (grandparent…)', 'Ninguno (abuelos…)') }, { value: 'missing', label: tx(l, 'Other parent cannot be found', 'No se encuentra al otro padre') }] },
    { id: 'doc', label: tx(l, 'Document', 'Documento'), type: 'select', def: 'book', options: [{ value: 'book', label: tx(l, 'Book', 'Libreta') }, { value: 'card', label: tx(l, 'Card', 'Tarjeta') }, { value: 'both', label: tx(l, 'Both', 'Ambas') }] },
  ],
  run: (v) => {
    const F = f(l);
    const c = cost({ situation: 'child', doc: v.doc as any, service: 'routine', delivery: false, fileSearch: false });
    const need: Record<string, string> = {
      both: tx(l, 'Both IDs and photocopies, no extra form', 'Las dos identificaciones y sus copias, sin formulario extra'),
      one: tx(l, 'Form DS-3053 notarized by the absent parent, within 90 days, plus a copy of their ID', 'Formulario DS-3053 notariado por el padre ausente, de menos de 90 días, y copia de su identificación'),
      sole: tx(l, 'Court order, birth certificate or adoption decree naming only you, or a death certificate', 'Orden judicial, acta de nacimiento o de adopción que solo lo nombre a usted, o acta de defunción'),
      none: tx(l, 'DS-3053 or a notarized statement from both parents, within 90 days, with copies of both IDs', 'DS-3053 o declaración notariada de ambos padres, de menos de 90 días, con copia de las dos identificaciones'),
      missing: tx(l, 'Form DS-5525, Statement of Special Family Circumstances', 'Formulario DS-5525, declaración de circunstancias familiares especiales'),
    };
    return { head: [tx(l, 'Documents for the parents', 'Documentos de los padres'), need[v.who] ?? need.both], rows: [[tx(l, 'Check to the State Department', 'Cheque al Departamento de Estado'), F.usd(c.state)], [tx(l, 'Acceptance facility', 'Centro de aceptación'), F.usd(c.facility)], [tx(l, 'Valid for', 'Vigencia'), tx(l, '5 years, never renewable', '5 años, no se renueva')]] };
  },
});
