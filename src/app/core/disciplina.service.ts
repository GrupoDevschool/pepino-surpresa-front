import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from '../shared/model/Disciplina';


const url = 'http://localhost:8080/disciplinas/';
@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  constructor(private http: HttpClient) { }

  salvar(avaliacao: Disciplina): Observable<Disciplina> {
    return this.http.post<Disciplina>(url, avaliacao);
  }

  editar(disciplina: Disciplina): Observable<Disciplina> {
    return this.http.put<Disciplina>(url + disciplina.id, disciplina);
  }

  listar(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(url);
  }

  visualizar(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(url + id);
  }


  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }

}
