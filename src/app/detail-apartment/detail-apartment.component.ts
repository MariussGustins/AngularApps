import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Apartment, Houses, Resident} from '../allHouses.interface';
import { AllHousesService } from '../all-houses.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditResidentDialogComponent } from '../edit-resident-dialog/edit-resident-dialog.component';
import { AddResidentDialogComponent } from '../add-resident-dialog/add-resident-dialog.component';

@Component({
  selector: 'app-detail-apartment',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
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

  constructor(
    private route: ActivatedRoute,
    private allHousesService: AllHousesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apartmentId = id;
      this.fetchApartmentDetails(this.apartmentId);
      this.fetchResidentsByApartmentId(this.apartmentId);
    }
  }

  fetchApartmentDetails(id: string): void {
    this.allHousesService.getApartmentById(id).subscribe(
      (data: Apartment) => {
        this.apartment = data;
        this.editApartment = { ...data };
      },
      (error: any) => {
        console.error('Error fetching apartment details', error);
      }
    );
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

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  updateApartment(): void {
    if (this.editApartment && this.apartmentId) {
      this.allHousesService.updateApartment(this.apartmentId, this.editApartment).subscribe(
        () => {
          this.apartment = { ...this.editApartment };
          this.toggleEditMode();
        },
        (error: any) => {
          console.error('Error updating apartment details', error);
        }
      );
    }
  }
  openEditDialog(resident: Resident): void {
    const dialogRef = this.dialog.open(EditResidentDialogComponent, {
      width: '400px',
      data: resident
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchResidentsByApartmentId(this.apartmentId!);
      }
    });
  }
  openAddResidentDialog(): void {
    const dialogRef = this.dialog.open(AddResidentDialogComponent, {
      width: '500px',
      data: { apartmentId: this.apartmentId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allHousesService.getAllResidents().subscribe({
          next: (resident) => {
            this.apartmentResidents = resident;
          },
          error: (error) => {
            console.error('Error fetching residents:', error);
          }
        });
      }
    });
  }
}
