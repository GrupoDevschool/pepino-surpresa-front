import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resposta, RespostaDTO } from '../shared/model/Resposta';

const url = 'http://localhost:8080/respostas';
@Injectable({
  providedIn: 'root'
})
export class RespostaService {

  constructor(private http: HttpClient) { }

  save(resposta: RespostaDTO): Observable<Resposta> {
    return this.http.post<Resposta>(url, resposta);
  }

  edit(resposta: RespostaDTO): Observable<Resposta> {
    return this.http.put<Resposta>(url + '/' + resposta.id, resposta);
  }

  list(): Observable<Resposta[]> {
    return this.http.get<Resposta[]>(url);
  }

  listByDisciplina(id: number): Observable<Resposta[]> {
    return this.http.get<Resposta[]>(url + `?disciplinaId=${id}`);
  }

  listByArea(id: number): Observable<Resposta[]> {
    return this.http.get<Resposta[]>(url + `?areaId=${id}`);
  }

  show(id: number): Observable<Resposta> {
    return this.http.get<Resposta>(url + '/' + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + '/' + id);
  }

}
