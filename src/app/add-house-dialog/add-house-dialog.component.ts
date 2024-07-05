import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AllHousesService } from '../all-houses.service';
import { Houses } from '../allHouses.interface';
import { AuthService } from '@auth0/auth0-angular';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-house-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-house-dialog.component.html',
  styleUrls: ['./add-house-dialog.component.css']
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
    private allHousesService: AllHousesService,
    private auth: AuthService
  ) { }

  onSave(): void {
    // Ensure user is authenticated before sending the request
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.allHousesService.addHouse(this.newHouse).subscribe({
          next: () => this.dialogRef.close(true),
          error: (error) => {
            console.error('Error adding house:', error);
            alert('Failed to add house. Please check your permissions or try again.');
          }
        });
      } else {
        console.error('User is not authenticated');
        alert('You must be logged in to add a house.');
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
