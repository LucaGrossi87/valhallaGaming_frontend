import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeComponent } from './backoffice.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { ManageStationsComponent } from './manage-stations/manage-stations.component';
import { CollabsComponent } from './collabs/collabs.component';

@NgModule({
  declarations: [
    BackofficeComponent,
    ManageBookingsComponent,
    ManageStationsComponent,
    CollabsComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class BackofficeModule { }
