import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Houses, Apartment, Resident } from './allHouses.interface';
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
  getResidentsByApartmentId(apartmentId: string): Observable<Resident[]> {
    return this.http.get<Resident[]>(`${this.baseUrl}/Apartments/${apartmentId}/Residents?apartmentId=${apartmentId}`);
  }
  updateHouse(id: string, house: Houses): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Houses/${id}`, house);
  }
  updateApartment(id: string, apartment: Apartment): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Apartments/${id}`, apartment);
  }
  updateResident(id: string, resident: Resident): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Residents/${id}`, resident);
  }
  addHouse(house: Houses): Observable<Houses> {
    return this.http.post<Houses>(`${this.baseUrl}/Houses`, house);
  }
  deleteHouse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Houses/${id}`);
  }
}
