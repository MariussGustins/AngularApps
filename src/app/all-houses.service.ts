import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Houses, Apartment } from './allHouses.interface';
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

  getHouseById(id: string): Observable<Houses> {
    return this.http.get<Houses>(`${this.baseUrl}/Houses/${id}`);
  }

  getAllApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(`${this.baseUrl}/Apartments`);
  }

  getApartmentsByHouseId(houseId: string): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(`${this.baseUrl}/Houses/${houseId}/Apartments`);
  }
  getApartmentById(id: string): Observable<Apartment>{
    return this.http.get<Apartment>(`${this.baseUrl}/Apartments/${id}`);
  }
}