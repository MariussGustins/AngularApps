import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRole = route.data['expectedRole'];
    return this.auth.user$.pipe(map(user => {
      const roles = user && user['roles'];
      if (!roles || roles.indexOf(expectedRole) === -1) {
        this.router.navigate(['unauthorized']);
        return false;
      }
      return true;
    }));
  }
}
