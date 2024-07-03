import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { Router } from '@angular/router';
import { AllHousesComponent } from './all-houses/all-houses.component';
import {CommonModule} from "@angular/common";
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AllHousesComponent, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularApps';

  constructor(private router: Router, public auth: AuthService) {

    this.router.resetConfig(routes);
  }
}
