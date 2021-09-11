import { Disciplina } from "./Disciplina";

export interface Gestor {
  id: number
  nome: string
  disciplinas: Disciplina[]
  tipo: string

}
