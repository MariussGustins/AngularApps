import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AllHousesService } from '../all-houses.service';
import { Resident } from '../allHouses.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-resident-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-resident-dialog.component.html',
  styleUrls: ['./add-resident-dialog.component.css']
})
export class AddResidentDialogComponent {
  newResident: Resident = {
    id: 0,
    name: '',
    lastName: '',
    personalNumber: '',
    birthday: new Date(),
    phoneNumber: 0,
    email: '',
    isOwner: true,
    apartmentId: this.data.apartmentId
  };

  constructor(
    private dialogRef: MatDialogRef<AddResidentDialogComponent>,
    private allHousesService: AllHousesService,
    @Inject(MAT_DIALOG_DATA) public data: { apartmentId: number }
  ) { }

  onSave(): void {
    console.log('Payload to send:', this.newResident);
    this.allHousesService.addResident(this.newResident).subscribe({
      next: () => this.dialogRef.close(true),
      error: (error) => console.error('Error adding resident:', error)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
