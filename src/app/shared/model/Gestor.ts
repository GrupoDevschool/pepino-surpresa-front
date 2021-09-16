import { Aula } from "./Aula";
import { TipoGestor } from "./TipoGestor";

export interface Gestor {
  id: number
  nome: string
  aulas: Aula[]
  tipo: TipoGestor[]

}
