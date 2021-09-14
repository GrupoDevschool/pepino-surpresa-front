import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resposta } from '../shared/model/Resposta';

const url = 'http://localhost:8080/respostas/';
@Injectable({
  providedIn: 'root'
})
export class RespostaService {

  constructor(private http: HttpClient) { }

  save(resposta: Resposta): Observable<Resposta> {
    return this.http.post<Resposta>(url, resposta);
  }

  edit(resposta: Resposta): Observable<Resposta> {
    return this.http.put<Resposta>(url + resposta.id, resposta);
  }

  list(): Observable<Resposta[]> {
    return this.http.get<Resposta[]>(url);
  }

  listByDisciplina(id: number): Observable<Resposta[]> {
    return this.http.get<Resposta[]>(url + `?disciplinaId=${id}`);
  }

  show(id: number): Observable<Resposta> {
    return this.http.get<Resposta>(url + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }

}
