import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllHousesService } from '../all-houses.service';
import { Houses } from '../allHouses.interface';
import {RouterLink} from "@angular/router";
import { AddHouseDialogComponent } from '../add-house-dialog/add-house-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-all-houses',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './all-houses.component.html',
  styleUrls: ['./all-houses.component.css']
})
export class AllHousesComponent implements OnInit {
  houses: Houses[] = [];

  constructor(private allHousesService: AllHousesService, private dialog: MatDialog) { }

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

  openAddHouseDialog(): void {
    const dialogRef = this.dialog.open(AddHouseDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allHousesService.getAllHouses().subscribe({
          next: (houses) => {
            this.houses = houses;
          },
          error: (error) => {
            console.error('Error fetching houses:', error);
          }
        });
      }
    });
  }
  deleteHouse(id: number): void {  // id is a number
    if (confirm('Are you sure you want to delete this house?')) {
      this.allHousesService.deleteHouse(id.toString()).subscribe({  // Convert id to string
        next: () => {
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Error deleting house:', error);
        }
      });
    }
  }
}
