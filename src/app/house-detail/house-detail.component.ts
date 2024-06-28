import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllHousesService } from '../all-houses.service';
import { Houses, Apartment } from '../allHouses.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-house-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css'] 
})
export class HouseDetailComponent implements OnInit {
  houseId: string = '';
  houseDetails!: Houses;
  houseApartments: Apartment[] = [];
  allApartments: Apartment[] = [];
  editing: boolean = false;

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
  editHouseDetails(): void { 
    this.editing = true;
  }

  cancelEdit(): void { 
    this.editing = false;
  }

  onSubmit(): void { 
    this.allHousesService.updateHouse(this.houseId, this.houseDetails).subscribe(
      () => {
        this.editing = false;
        this.fetchHouseDetails(this.houseId);
      },
      (error: any) => console.error('Error updating house details', error)
    );
  }
}