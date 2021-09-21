import { Gestor } from './Gestor';
import { Turma } from './Turma';

export interface Aula {

  id?: number;
  data: string;
  assunto: string;
  gestores: Gestor[];
  turma: Turma;

}

export interface AulaDTO {
  id?: number;
  data: string;
  assunto: string;
  gestores: Gestor[]
  turmaId: number;
}
