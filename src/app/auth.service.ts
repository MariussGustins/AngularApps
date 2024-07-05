import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth0: Auth0Service) {}

  async getAccessToken(): Promise<string> {
    const token = await this.auth0.getAccessTokenSilently().toPromise();
    if (!token) {
      throw new Error('Token is undefined');
    }
    return token;
  }
}
