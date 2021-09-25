import { Aluno } from './Aluno';
import { Aula } from './Aula';

export interface Presenca {
  id?: number;
  aula: Aula;
  aluno: Aluno;
  horaEntrada: Date;
}

export interface PresencaDTO {
  id?: number;
  aulaId: number;
  alunoId: number;
  horaEntrada: String;
}
