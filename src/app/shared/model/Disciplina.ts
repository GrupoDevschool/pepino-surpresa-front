import { Area } from "./Area";

export interface Disciplina {

  id?: number;
  nome: string;
  area: Area;

}

export interface DisciplinaDTO {

  id?: number;
  nome: string;
  area: number;

}

