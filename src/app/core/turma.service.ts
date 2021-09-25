import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turma } from '../shared/model/Turma';


const url = 'http://localhost:8080/turmas/';
@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  constructor(private http: HttpClient) { }

  save(turma: Turma): Observable<Turma> {
    return this.http.post<Turma>(url, turma);
  }

  edit(turma: Turma): Observable<Turma> {
    return this.http.put<Turma>(url + turma.id, turma);
  }

  list(): Observable<Turma[]> {
    return this.http.get<Turma[]>(url);
  }

  show(id: number): Observable<Turma> {
    return this.http.get<Turma>(url + id);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }

}
