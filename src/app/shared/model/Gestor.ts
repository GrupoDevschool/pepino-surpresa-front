import { Disciplina } from "./Disciplina";
import { Turma } from "./Turma";

export interface Gestor {
  id: number
  nome: string
  disciplinas: Disciplina[]
  turmas: Turma[]
  tipo: string[]

}
