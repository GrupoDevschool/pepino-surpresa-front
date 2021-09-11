import { Gestor } from './../shared/model/Gestor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const url = 'http://localhost:8080/gestores/';
@Injectable({
  providedIn: 'root'
})
export class GestorService {

  constructor(private http: HttpClient) { }

  save(gestor: Gestor): Observable<Gestor> {
    return this.http.post<Gestor>(url, gestor);
  }

  edit(gestor: Gestor): Observable<Gestor> {
    return this.http.put<Gestor>(url + gestor.id, gestor);
  }

  list(): Observable<Gestor[]> {
    return this.http.get<Gestor[]>(url);
  }

  show(id: number): Observable<Gestor> {
    return this.http.get<Gestor>(url + id);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }

}
