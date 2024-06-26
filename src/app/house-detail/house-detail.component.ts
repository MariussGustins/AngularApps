import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllHousesService } from '../all-houses.service';
import { Houses } from '../allHouses.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-house-detail',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css'] // Changed 'styleUrl' to 'styleUrls'
})
export class HouseDetailComponent implements OnInit {
  houseId: string | null = null; // Allow houseId to be null
  houseDetails: Houses | null = null; // House details will be fetched based on houseId

  constructor(
    private route: ActivatedRoute,
    private allHousesService: AllHousesService
  ) { }

  ngOnInit(): void {
    this.houseId = this.route.snapshot.paramMap.get('id');
    if (this.houseId) {
      this.fetchHouseDetails(this.houseId);
    }
  }

  fetchHouseDetails(id: string): void {
    this.allHousesService.getHouseById(id).subscribe(
      (data: Houses) => this.houseDetails = data,
      error => console.error('Error fetching house details', error)
    );
  }
}
