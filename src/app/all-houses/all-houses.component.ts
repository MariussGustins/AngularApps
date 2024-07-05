import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllHousesService } from '../all-houses.service';
import { Houses } from '../allHouses.interface';
import { RouterLink } from '@angular/router';
import { AddHouseDialogComponent } from '../add-house-dialog/add-house-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-all-houses',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarComponent],
  templateUrl: './all-houses.component.html',
  styleUrls: ['./all-houses.component.css']
})
export class AllHousesComponent implements OnInit {
  houses: Houses[] = [];
  isManager = false;

  constructor(
    private allHousesService: AllHousesService,
    private dialog: MatDialog,
    public auth: AuthService
  ) {}

  ngOnInit() {
    // Check if the user is authenticated
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        // Fetch houses if authenticated
        this.fetchHouses();
        // Check user role
        this.checkUserRole();
      } else {
        this.houses = [];
      }
    });
  }

  fetchHouses() {
    this.allHousesService.getAllHouses().subscribe({
      next: (houses) => {
        this.houses = houses;
        console.log('Received houses:', houses);
      },
      error: (error) => {
        console.error('Error fetching houses:', error);
        alert('Failed to fetch houses. Please check your permissions or try again.');
      }
    });
  }



  checkUserRole() {
    this.auth.user$.subscribe(user => {
      const roles = user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/roles'] || [];
      this.isManager = roles.includes('Manager');
    });
  }

  openAddHouseDialog(): void {
    const dialogRef = this.dialog.open(AddHouseDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchHouses();
      }
    });
  }

  deleteHouse(id: number): void {
    if (confirm('Are you sure you want to delete this house?')) {
      this.allHousesService.deleteHouse(id.toString()).subscribe({
        next: () => {
          this.fetchHouses();  // Refresh the houses list after deletion
        },
        error: (error) => {
          console.error('Error deleting house:', error);
        }
      });
    }
  }
}
