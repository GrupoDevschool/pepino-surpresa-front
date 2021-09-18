import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pergunta, PerguntaDTO } from '../shared/model/Pergunta';

const url = 'http://localhost:8080/perguntas/';
@Injectable({
  providedIn: 'root'
})
export class PerguntaService {

  constructor(private http: HttpClient) { }

  save(pergunta: PerguntaDTO): Observable<Pergunta> {
    return this.http.post<Pergunta>(url, pergunta);
  }

  edit(pergunta: PerguntaDTO): Observable<Pergunta> {
    return this.http.put<Pergunta>(url + pergunta.id, pergunta);
  }

  list(): Observable<Pergunta[]> {
    return this.http.get<Pergunta[]>(url);
  }

  listByArea(id: number): Observable<Pergunta[]> {
    return this.http.get<Pergunta[]>(url + `?areaId=${id}`);
  }

  listByDisciplina(id: number): Observable<Pergunta[]> {
    return this.http.get<Pergunta[]>(url + `?disciplinaId=${id}`);
  }

  show(id: number): Observable<Pergunta> {
    return this.http.get<Pergunta>(url + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }

}
