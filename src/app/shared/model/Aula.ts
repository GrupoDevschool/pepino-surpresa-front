import { Gestor } from './Gestor';
import { Turma } from './Turma';

export interface Aula {

  id?: number;
  dataHora: string;
  assunto: string;
  gestoresPresentes: Gestor[];
  turma: Turma;

}

export interface AulaDTO {
  id?: number;
  dataHora: string;
  assunto: string;
  gestores: Gestor[]
  turmaId: number;
}
