import { Component } from '@angular/core';
import {AuthService, User} from '@auth0/auth0-angular';
import { AsyncPipe } from "@angular/common";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    AsyncPipe,
    CommonModule
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}

  login() {
    this.auth.loginWithRedirect();
  }
  getRole(user: User | null | undefined): string {
    // Check if user and user roles exist
    const roles = user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/roles'];
    return roles && roles.length > 0 ? roles[0] : 'User';
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }
}
