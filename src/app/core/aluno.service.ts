import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno, AlunoDTO } from '../shared/model/Aluno';

const url = 'http://localhost:8080/alunos';
@Injectable({
  providedIn: 'root'
})

export class AlunoService {

  constructor(private http: HttpClient) { }

  save(aluno: AlunoDTO): Observable<Aluno> {
    return this.http.post<Aluno>(url, aluno);
  }

  edit(aluno: AlunoDTO): Observable<Aluno> {
    return this.http.put<Aluno>(url + '/' + aluno.matricula, aluno);
  }

  list(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(url);
  }

  listByTurma(turmaId: number): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(url + `?turmaId?=${turmaId}`);
  }

  show(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(url + '/' + id);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + '/' + id);
  }

}
