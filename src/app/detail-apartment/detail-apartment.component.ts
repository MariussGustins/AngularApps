import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Apartment, Resident } from '../allHouses.interface';
import { AllHousesService } from '../all-houses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-apartment',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './detail-apartment.component.html',
  styleUrls: ['./detail-apartment.component.css']
})
export class DetailApartmentComponent implements OnInit {
  apartment: Apartment | null = null;
  apartmentResidents: Resident[] =[];
  apartmentId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private allHousesService: AllHousesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apartmentId = id;
      this.fetchApartmentDetails(this.apartmentId);
      this.fetchResidentsByApartmentId(this.apartmentId);
    }
  }

  fetchApartmentDetails(id: string): void {
    this.allHousesService.getApartmentById(id).subscribe(
      (data: Apartment) => {
        this.apartment = data;
      },
      (error: any) => {
        console.error('Error fetching apartment details', error);
      }
    );
  }

  fetchResidentsByApartmentId(apartmentId: string): void {
    this.allHousesService.getResidentsByApartmentId(apartmentId).subscribe(
      (data: Resident[]) => {
        this.apartmentResidents = data;
      },
      (error: any) => {
        console.error('Error fetching residents by apartment id', error);
      }
    );
  }
}