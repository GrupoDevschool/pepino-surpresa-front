import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Presenca, PresencaDTO } from '../shared/model/Presenca';

const url = 'http://localhost:8080/presenca/';
@Injectable({
  providedIn: 'root'
})
export class PresencaService {

  constructor(private http: HttpClient) { }

  save(presenca: PresencaDTO): Observable<Presenca> {
    return this.http.post<Presenca>(url, presenca);
  }

  edit(presenca: PresencaDTO): Observable<Presenca> {
    return this.http.put<Presenca>(url + presenca.id, presenca);
  }

  list(): Observable<Presenca[]> {
    return this.http.get<Presenca[]>(url);
  }

  listByAula(id: number): Observable<Presenca[]> {
    return this.http.get<Presenca[]>(url + `?aulaId=${id}`);
  }

  listByAluno(id: number): Observable<Presenca[]> {
    return this.http.get<Presenca[]>(url + `?alunoId=${id}`);
  }

  show(id: number): Observable<Presenca> {
    return this.http.get<Presenca>(url + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
