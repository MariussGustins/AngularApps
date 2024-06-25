import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllHousesService } from '../all-houses.service'; // Adjust the service as per your implementation
import { Houses } from '../allHouses.interface';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-house-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './house-detail.component.html',
  styleUrl: './house-detail.component.css'
})
export class HouseDetailComponent implements OnInit {
  house!: Houses; // Initialize with null or undefined

  constructor(
    private route: ActivatedRoute,
    private allHousesService: AllHousesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const houseId = params['id'];
      if (houseId) {
        this.allHousesService.getHouseById(houseId).subscribe({
          next: house => this.house = house,
          error: err => console.error(err)
        });
      }
    });
  }
}
// testing
