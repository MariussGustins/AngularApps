
import { Routes, RouterModule } from '@angular/router';
import { AllHousesComponent } from './all-houses/all-houses.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';


export const routes: Routes = [
  { path: 'allHouses', component: AllHousesComponent },
  { path: 'House/id', component: HouseDetailComponent },
  { path: '', redirectTo: '/allHouses', pathMatch: 'full' },
  { path: '**', redirectTo: '/allHouses' }
];
export const routing = RouterModule.forRoot(routes, { useHash: true });
