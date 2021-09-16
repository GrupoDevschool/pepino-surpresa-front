import { Aula } from "./Aula";
import { Disciplina } from "./Disciplina";
import { Turma } from "./Turma";

export interface Gestor {
  id: number
  nome: string
  aulas: Aula[]
  tipo: string[]

}
