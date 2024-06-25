import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { AllHousesService } from '../all-houses.service';
import { Houses } from '../allHouses.interface';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-all-houses',
  standalone: true,
  imports: [CommonModule, RouterLink],  // Add CommonModule here
  templateUrl: './all-houses.component.html',
  styleUrls: ['./all-houses.component.css']
})
export class AllHousesComponent implements OnInit {
  houses: Houses[] = [];

  constructor(private allHousesService: AllHousesService) { }

  ngOnInit() {
    this.allHousesService.getAllHouses().subscribe({
      next: (houses) => {
        this.houses = houses;
        console.log('Received houses:', houses);
      },
      error: (error) => {
        console.error('Error fetching houses:', error);
      }
    });
  }
}
