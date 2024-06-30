import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AllHousesService } from '../all-houses.service';
import { Houses } from '../allHouses.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-house-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-house-dialog.component.html',
  styleUrl: './add-house-dialog.component.css'
})
export class AddHouseDialogComponent {
  newHouse: Houses = {
    id: 0,
    number: '',
    street: '',
    city: '',
    country: '',
    postcode: '',
    apartments: []
  };

  constructor(
    private dialogRef: MatDialogRef<AddHouseDialogComponent>,
    private allHousesService: AllHousesService
  ) { }

  onSave(): void {
    this.allHousesService.addHouse(this.newHouse).subscribe({
      next: () => this.dialogRef.close(true),
      error: (error) => console.error('Error adding house:', error)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
