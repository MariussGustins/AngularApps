import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Resident } from '../allHouses.interface';
import { AllHousesService } from '../all-houses.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-resident-dialog',
  templateUrl: './edit-resident-dialog.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ReactiveFormsModule,],
  styleUrls: ['./edit-resident-dialog.component.css']
})
export class EditResidentDialogComponent {
  resident: Resident;

  constructor(
    public dialogRef: MatDialogRef<EditResidentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Resident,
    private allHousesService: AllHousesService
  ) {
    this.resident = { ...data };
  }

  onSave(): void {
    this.allHousesService.updateResident(this.resident.id.toString(), this.resident).subscribe(
      () => {
        this.dialogRef.close(this.resident);
      },
      (error: any) => {
        console.error('Error updating resident details', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
