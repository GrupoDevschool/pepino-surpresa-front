import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aula, AulaDTO } from '../shared/model/Aula';


const url = 'http://localhost:8080/aulas';
@Injectable({
  providedIn: 'root'
})
export class AulaService {

  constructor(private http: HttpClient) { }

  save(aula: AulaDTO): Observable<Aula> {
    return this.http.post<Aula>(url, aula);
  }

  edit(aula: AulaDTO): Observable<Aula> {
    return this.http.put<Aula>(url + '/' + aula.id, aula);
  }

  list(): Observable<Aula[]> {
    return this.http.get<Aula[]>(url);
  }

  listByTurma(turmaId: number): Observable<Aula[]>{
    return this.http.get<Aula[]>(url + `?turmaId=${turmaId}`)
  }

  listByDay(data: Date): Observable<Aula[]>{
    return this.http.get<Aula[]>(url + `?data=${data}`)
  }

  show(id: number): Observable<Aula> {
    return this.http.get<Aula>(url + '/' + id);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + '/' + id);
  }

}
