import { Disciplina } from './Disciplina';
export interface Resposta {
  id?: number;
  conteudo: string;
  disciplina: Disciplina;
}

export interface RespostaDTO {
  id?: number
  conteudo: string
  disciplinaId: number
}
