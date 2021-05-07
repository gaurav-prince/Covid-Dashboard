import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResourceformComponent } from './resourceform/resourceform.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'resourceform', component: ResourceformComponent }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64]
};

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, routerOptions)
  ]
})
export class AppRoutingModule { }
