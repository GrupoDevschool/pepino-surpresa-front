import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Trilha } from '../shared/model/Trilha';

const url = 'http://localhost:8080/trilha/';
@Injectable({
  providedIn: 'root'
})
export class TrilhaService {

  constructor(private http: HttpClient) { }

  save(trilha: Trilha): Observable<Trilha> {
    return this.http.post<Trilha>(url, trilha);
  }

  edit(trilha: Trilha): Observable<Trilha> {
    return this.http.put<Trilha>(url + trilha.id, trilha);
  }

  list(): Observable<Trilha[]> {
    return this.http.get<Trilha[]>(url);
  }

  show(id: number): Observable<Trilha> {
    return this.http.get<Trilha>(url + id);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }

}
