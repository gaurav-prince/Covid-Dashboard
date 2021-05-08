import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';

import { MatTableModule } from '@angular/material/table'
import { CdkTableModule} from '@angular/cdk/table';
import { AppComponent } from './app.component';
import { RouterModule, Router } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ResourceformComponent } from './resourceform/resourceform.component';
import {MatInputModule} from '@angular/material/input';
import { OxygenresourceComponent } from './oxygenresource/oxygenresource.component';
import { VaccinationComponent } from './vaccination/vaccination.component';
import { DonationComponent } from './donation/donation.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ResourceformComponent,
    OxygenresourceComponent,
    VaccinationComponent,
    DonationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule  ,
    MatInputModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    CdkTableModule,
    MatSortModule
  ],
  providers: [MatDatepickerModule, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
