import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllHousesService } from '../all-houses.service';
import { Houses, Apartment } from '../allHouses.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddApartmentDialogComponent } from "../add-apartment-dialog/add-apartment-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'app-house-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  houseId: string = '';
  houseDetails!: Houses;
  houseApartments: Apartment[] = [];
  allApartments: Apartment[] = [];
  editing: boolean = false;
  isManager = false;
  userEmail: string = '';

  constructor(
    private route: ActivatedRoute,
    private allHousesService: AllHousesService,
    private dialog: MatDialog,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      console.log('User authenticated:', isAuthenticated);
      if (isAuthenticated) {
        this.auth.user$.subscribe(user => {
          this.userEmail = user?.email || '';
          console.log('User email:', this.userEmail);
          this.checkUserRole(() => {
            if (this.isManager) {
              const id = this.route.snapshot.paramMap.get('id');
              if (id) {
                this.houseId = id;
                console.log('Manager user, fetching house details for house ID:', this.houseId);
                this.fetchHouseDetails(this.houseId);
                this.fetchAllApartments();
                this.fetchApartmentsByHouseId(this.houseId);
              }
            } else {
              console.log('Non-manager user, fetching apartment details for user email:', this.userEmail);
              this.fetchResidentApartment(this.userEmail);
            }
          });
        });
      }
    });
  }

  fetchHouseDetails(id: string): void {
    this.allHousesService.getHouseById(id).subscribe(
      (data: Houses) => {
        this.houseDetails = data;
        console.log('Fetched house details:', data);
      },
      (error: any) => console.error('Error fetching house details', error)
    );
  }

  checkUserRole(callback: () => void): void {
    this.auth.user$.subscribe(user => {
      const roles = user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/roles'] || [];
      this.isManager = roles.includes('Manager');
      console.log('User roles:', roles, 'Is manager:', this.isManager);
      callback();
    });
  }

  fetchAllApartments(): void {
    this.allHousesService.getAllApartments().subscribe(
      (data: Apartment[]) => {
        this.allApartments = data;
        console.log('Fetched all apartments:', data);
      },
      (error: any) => console.error('Error fetching all apartments', error)
    );
  }

  fetchApartmentsByHouseId(houseId: string): void {
    this.allHousesService.getApartmentsByHouseId(houseId).subscribe(
      (data: Apartment[]) => {
        this.houseApartments = data;
        console.log('Fetched apartments by house ID:', data);
      },
      (error: any) => console.error('Error fetching apartments by house ID', error)
    );
  }

  fetchResidentApartment(email: string): void {
    this.allHousesService.getApartmentByUserEmail(email).subscribe({
      next: (apartment) => {
        this.houseApartments = [apartment];
        console.log('Fetched resident apartment:', apartment);
        const houseId = apartment.houseId.toString(); // Ensure houseId is a string
        this.fetchHouseDetails(houseId);
      },
      error: (error) => {
        console.error('Error fetching resident apartment:', error);
        alert('Failed to fetch resident apartment. Please check your permissions or try again.');
      }
    });
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

  deleteApartment(id: number): void {
    if (confirm('Are you sure you want to delete this apartment?')) {
      this.allHousesService.deleteApartment(id.toString()).subscribe({
        next: () => {
          this.fetchAllApartments();
        },
        error: (error) => {
          console.error('Error deleting apartment:', error);
        }
      });
    }
  }

  openAddApartmentDialog(): void {
    const dialogRef = this.dialog.open(AddApartmentDialogComponent, {
      width: '500px',
      data: { houseId: this.houseId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allHousesService.getAllApartments().subscribe({
          next: (apartment) => {
            this.allApartments = apartment;
          },
          error: (error) => {
            console.error('Error fetching apartments:', error);
          }
        });
      }
    });
  }
}
