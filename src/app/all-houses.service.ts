import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Houses } from './allHouses.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AllHousesService {
  private baseUrl = 'http://localhost:5042/api';

  constructor(private http: HttpClient) { }

  getAllHouses(): Observable<Houses[]> {
    return this.http.get<Houses[]>(`${this.baseUrl}/Houses`);
  }
  getHouseById(id: number): Observable<Houses> {
    return this.http.get<Houses>(`${this.baseUrl}/Houses/${id}`).pipe(
      map((data: any) => ({
        id: data.id,
        number: data.number,
        street: data.street,
        city: data.city,
        country: data.country,
        postcode: data.postcode,
        apartments: data.apartments
      }))
    );
  }
}
