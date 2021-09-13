import { Disciplina } from './Disciplina';

export interface Trilha {

  id?: number;
  nome: string;
  disciplinas: Disciplina[];

}
