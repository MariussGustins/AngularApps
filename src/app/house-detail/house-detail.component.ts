import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllHousesService } from '../all-houses.service';
import { Houses, Apartment } from '../allHouses.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-house-detail',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css'] 
})
export class HouseDetailComponent implements OnInit {
  houseId: string = '';
  houseDetails!: Houses;
  houseApartments: Apartment[] = [];
  allApartments: Apartment[] = [];

  constructor(
    private route: ActivatedRoute,
    private allHousesService: AllHousesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.houseId = id; 
      this.fetchHouseDetails(this.houseId);
      this.fetchAllApartments();
      this.fetchApartmentsByHouseId(this.houseId);
    }
  }

  fetchHouseDetails(id: string): void {
    this.allHousesService.getHouseById(id).subscribe(
      (data: Houses) => {
        this.houseDetails = data;
      },
      (error: any) => console.error('Error fetching house details', error)
    );
  }

  fetchAllApartments(): void {
    this.allHousesService.getAllApartments().subscribe(
      (data: Apartment[]) => this.allApartments = data,
      (error: any) => console.error('Error fetching all apartments', error)
    );
  }

  fetchApartmentsByHouseId(houseId: string): void {
    this.allHousesService.getApartmentsByHouseId(houseId).subscribe(
      (data: Apartment[]) => this.houseApartments = data,
      (error: any) => console.error('Error fetching apartments by house id', error)
    );
  }
}