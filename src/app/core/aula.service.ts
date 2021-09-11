import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Aula } from '../shared/model/Aula';

const url = 'http://localhost:8080/aulas/';
@Injectable({
  providedIn: 'root'
})
export class AulaService {

  constructor(private http: HttpClient) { }

  save(aula: Aula): Observable<Aula> {
    return this.http.post<Aula>(url, aula);
  }

  edit(aula: Aula): Observable<Aula> {
    return this.http.put<Aula>(url + aula.id, aula);
  }

  list(): Observable<Aula[]> {
    return this.http.get<Aula[]>(url);
  }

  show(id: number): Observable<Aula> {
    return this.http.get<Aula>(url + id);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }

}