import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AllHousesService } from '../all-houses.service';
import {Apartment} from '../allHouses.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-apartment-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-apartment-dialog.component.html',
  styleUrl: './add-apartment-dialog.component.css'
})
export class AddApartmentDialogComponent {
  newApartment: Apartment = {
    id: 0,
    number: '',
    floor: 0,
    rooms: 0,
    numberOfResidents: 0,
    fullArea: 0,
    livingArea: 0,
    primaryResidentId: 0,
    houseId: this.data.houseId,
    residents: []
  };

  constructor(
    private dialogRef: MatDialogRef<AddApartmentDialogComponent>,
    private allHousesService: AllHousesService,
    @Inject(MAT_DIALOG_DATA) public data: { houseId: number }
  ) { }

  onSave(): void {
    console.log('Payload to send:', this.newApartment);
    this.allHousesService.addApartment(this.newApartment).subscribe({
      next: () => this.dialogRef.close(true),
      error: (error) => console.error('Error adding apartment:', error)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
