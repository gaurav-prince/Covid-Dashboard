import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonationComponent } from './donation/donation.component';
import { ResourceformComponent } from './resourceform/resourceform.component';
import { VaccinationComponent } from './vaccination/vaccination.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'resourceform', component: ResourceformComponent },
  { path: 'vaccinations', component: VaccinationComponent },
  { path: 'donate', component: DonationComponent }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
  useHash: true
};

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, routerOptions)
  ]
})
export class AppRoutingModule { }
