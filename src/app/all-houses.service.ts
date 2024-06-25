import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Houses } from './allHouses.interface';

@Injectable({
  providedIn: 'root'
})
export class AllHousesService {
  private baseUrl = 'http://localhost:5042/api';

  constructor(private http: HttpClient) { }

  getAllHouses(): Observable<Houses[]> {
    return this.http.get<Houses[]>(`${this.baseUrl}/Houses`);
  }
  getHouseById(id: string): Observable<Houses> {
    return this.http.get<Houses>(`${this.baseUrl}/Houses/${id}`);
  }
}
