import { Routes, RouterModule } from '@angular/router';
import { AllHousesComponent } from './all-houses/all-houses.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import { DetailApartmentComponent } from './detail-apartment/detail-apartment.component';
import { AuthGuard } from '@auth0/auth0-angular';


export const routes: Routes = [
  { path: 'allHouses', component: AllHousesComponent, canActivate: [AuthGuard] },
  { path: 'house/:id', component: HouseDetailComponent, canActivate: [AuthGuard] },
  { path: 'apartment/:id', component: DetailApartmentComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/allHouses', pathMatch: 'full' },
  { path: '**', redirectTo: '/allHouses' }
];
export const routing = RouterModule.forRoot(routes, { useHash: true });
