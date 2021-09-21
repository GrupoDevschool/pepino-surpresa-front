import { Gestor } from './Gestor';

export interface Avaliacao {
  id?: number;
  data: string;
  descricao: string;
  gestor?: Gestor;
}

export interface AvaliacaoDTO {
  id?: number;
  data: string;
  descricao: string;
  gestorId?: number;
}
