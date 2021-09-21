import { Gestor } from './Gestor';

export interface Aula {

  id?: number;
  data: string;
  assunto: string;
  gestores: Gestor[];

}
