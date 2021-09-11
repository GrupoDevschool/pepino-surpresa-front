import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Area } from '../shared/model/Area';
const url = 'http://localhost:8080/areas/';

@Injectable({
  providedIn: 'root'
})

export class AreaService {

  constructor(private http: HttpClient) { }

  save(area: Area): Observable<Area> {
    return this.http.post<Area>(url, area);
  }

  edit(area: Area): Observable<Area> {
    return this.http.put<Area>(url + area.id, area);
  }

  list(): Observable<Area[]> {
    return this.http.get<Area[]>(url);
  }

  show(id: number): Observable<Area> {
    return this.http.get<Area>(url + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }

}
