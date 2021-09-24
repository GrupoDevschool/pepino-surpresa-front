import { Aula } from './Aula';

export interface Turma {
  id?: number;
  nome: string;
  aulas?: Aula[];
}
