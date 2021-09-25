import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Avaliacao, AvaliacaoDTO } from '../shared/model/Avaliacao';


const url = 'http://localhost:8080/avaliacoes';
@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  constructor(private http: HttpClient) { }

  save(avaliacao: AvaliacaoDTO): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(url, avaliacao);
  }

  edit(avaliacao: AvaliacaoDTO): Observable<Avaliacao> {
    return this.http.put<Avaliacao>(url + '/' + avaliacao.id, avaliacao);
  }

  list(): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(url);
  }

  listByGestorId(id: number): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(url + `?gestorId=${id}`);
  }

  show(id: number): Observable<Avaliacao> {
    return this.http.get<Avaliacao>(url + '/' + id);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + '/' + id);
  }

}
