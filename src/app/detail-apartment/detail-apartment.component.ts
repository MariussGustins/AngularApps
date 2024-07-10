import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apartment, Houses, Resident } from '../allHouses.interface';
import { AllHousesService } from '../all-houses.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditResidentDialogComponent } from '../edit-resident-dialog/edit-resident-dialog.component';
import { AddResidentDialogComponent } from '../add-resident-dialog/add-resident-dialog.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'app-detail-apartment',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './detail-apartment.component.html',
  styleUrls: ['./detail-apartment.component.css']
})
export class DetailApartmentComponent implements OnInit {
  apartment: Apartment | null = null;
  editApartment: Apartment = {
    id: 0,
    number: '',
    floor: 0,
    rooms: 0,
    numberOfResidents: 0,
    fullArea: 0,
    livingArea: 0,
    primaryResidentId: 0,
    houseId: 0,
    residents: []
  };
  apartmentResidents: Resident[] = [];
  apartmentId: string = '';
  isEditMode: boolean = false;
  isManager = false;
  userEmail: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private allHousesService: AllHousesService,
    private dialog: MatDialog,
    public auth: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.auth.user$.subscribe(user => {
          this.userEmail = user?.email || null;
          if (this.userEmail) {
            this.fetchApartmentByUserEmail(this.userEmail);
          }
          this.checkUserRole();
        });
      }
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apartmentId = id;
      this.fetchApartmentDetails(this.apartmentId);
    }
  }

  fetchApartmentByUserEmail(userEmail: string): void {
    this.allHousesService.getApartmentByUserEmail(userEmail).subscribe(
      (data: Apartment) => {
        this.apartment = data;
        this.editApartment = {...data};
        this.apartmentId = data.id.toString();
        this.fetchResidentsByApartmentIdAndEmail(this.apartmentId, this.userEmail!);
      },
      (error: any) => {
        console.error('Error fetching apartment by user email', error);
      }
    );
  }

  fetchApartmentDetails(id: string): void {
    this.allHousesService.getApartmentById(id).subscribe(
      (data: Apartment) => {
        this.apartment = data;
        this.editApartment = {...data};
      },
      (error: any) => {
        console.error('Error fetching apartment details', error);
      }
    );
  }

  checkUserRole() {
    this.auth.user$.subscribe(user => {
      const roles = user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/roles'] || [];
      this.isManager = roles.includes('Manager');
      if (this.isManager) {
        this.fetchResidentsByApartmentId(this.apartmentId);
      } else if (this.userEmail) {
        this.fetchResidentsByApartmentIdAndEmail(this.apartmentId, this.userEmail);
      }
    });
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

  fetchResidentsByApartmentIdAndEmail(apartmentId: string, email: string): void {
    this.allHousesService.getResidentsByApartmentIdAndEmail(apartmentId, email).subscribe(
      (data: Resident[]) => {
        this.apartmentResidents = data;
      },
      (error: any) => {
        console.error('Error fetching residents by apartment id and email', error);
      }
    );
  }


  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  updateApartment(): void {
    if (this.editApartment && this.apartmentId) {
      this.allHousesService.updateApartment(this.apartmentId, this.editApartment).subscribe(
        () => {
          this.apartment = {...this.editApartment};
          this.toggleEditMode();
        },
        (error: any) => {
          console.error('Error updating apartment details', error);
        }
      );
    }
  }

  deleteResident(id: string): void {
    if (confirm('Are you sure you want to delete this resident?')) {
      this.allHousesService.deleteResident(id).subscribe({
        next: () => {
          if (this.isManager) {
            this.fetchResidentsByApartmentId(this.apartmentId);
          } else if (this.userEmail) {
            this.fetchResidentsByApartmentIdAndEmail(this.apartmentId, this.userEmail);
          }
        },
        error: (error) => {
          console.error('Error deleting resident', error);
        }
      });
    }
  }

  openEditDialog(resident: Resident): void {
    const dialogRef = this.dialog.open(EditResidentDialogComponent, {
      width: '400px',
      data: resident
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allHousesService.updateResident(result.id, result).subscribe({
          next: () => {
            const index = this.apartmentResidents.findIndex(r => r.id === result.id);
            if (index !== -1) {
              this.apartmentResidents[index] = { ...result };
            }
          },
          error: (error) => {
            console.error('Error updating resident:', error);
          }
        });
      }
    });
  }


  openAddResidentDialog(): void {
    const dialogRef = this.dialog.open(AddResidentDialogComponent, {
      width: '500px',
      data: {apartmentId: this.apartmentId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allHousesService.addResident(result).subscribe({
          next: (newResident) => {
            this.apartmentResidents.push(newResident);
          },
          error: (error) => {
            console.error('Error adding resident:', error);
          }
        });
      }
    });
  }
}
