import { Turma } from "./Turma";

export interface Aluno {

    matricula?: number;
    nome: string;
    telefone: string;
    email: string;
    observacao: string;
    turmaid: Turma["id"];

}

  export interface AlunoDTO {

    matricula?: number;
    nome: string;
    telefone: string;
    email: string;
    observacao: string;
    turmaid: Turma["id"];

}
