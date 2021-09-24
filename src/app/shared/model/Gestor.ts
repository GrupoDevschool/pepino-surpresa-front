import { TipoGestor } from "./TipoGestor";

export interface Gestor {
  id?: number
  nome: string
  tipo: TipoGestor[]
}
