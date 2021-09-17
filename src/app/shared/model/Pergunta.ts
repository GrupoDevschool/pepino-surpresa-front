import { Disciplina } from './Disciplina';
import { Resposta } from './Resposta';
export interface Pergunta {
  id?: number;
  enunciado: string;
  disciplina: Disciplina;
  respostas: Resposta[];
}

export interface PerguntaDTO {
  id?: number;
  enunciado: string;
  disciplinaId: number;
  respostas: Resposta[];
}

