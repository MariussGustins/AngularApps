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

  constructor(
    private route: ActivatedRoute,
    private allHousesService: AllHousesService
  ) { }

  ngOnInit(): void {
    this.fetchApartmentDetails();
  }

  fetchApartmentDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.allHousesService.getApartmentById(id).subscribe(
        (data) => {
          this.apartment = data;
        },
        (error) => {
          console.error('Error fetching apartment details', error);
        }
      );
    }
  }
}