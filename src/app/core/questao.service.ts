import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Questao } from '../shared/model/Questao';

const url = 'http://localhost:8080/questoes';
@Injectable({
  providedIn: 'root'
})
export class QuestaoService {

  constructor(private http: HttpClient) { }

  save(questao: Questao): Observable<Questao> {
    return this.http.post<Questao>(url, questao);
  }

  edit(questao: Questao): Observable<Questao> {
    return this.http.put<Questao>(url + '/' + questao.id, questao);
  }

  list(): Observable<Questao[]> {
    return this.http.get<Questao[]>(url);
  }

  listByAvaliacao(id: number): Observable<Questao[]> {
    return this.http.get<Questao[]>(url + `?avaliacaoId=${id}`);
  }

  show(id: number): Observable<Questao> {
    return this.http.get<Questao>(url + '/' + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + '/' + id);
  }

}
