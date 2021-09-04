import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Avaliacao } from '../shared/model/Avaliacao';

const url = 'http://localhost:8080/avaliacao/';
@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  constructor(private http: HttpClient) { }

  salvar(avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(url, avaliacao);
  }

  editar(avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.put<Avaliacao>(url + avaliacao.id, avaliacao);
  }

  listar(): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(url);
  }

  visualizar(id: number): Observable<Avaliacao> {
    return this.http.get<Avaliacao>(url + id);
  }


  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }

}
