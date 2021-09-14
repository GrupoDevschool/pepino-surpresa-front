import { Disciplina } from './Disciplina';
import { Resposta } from './Resposta';
export interface Pergunta {
  id: number;
  descricao: string;
  disciplina: Disciplina;
  respostas: Resposta[];
}
