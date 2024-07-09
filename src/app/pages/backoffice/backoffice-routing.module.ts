import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { ManageStationsComponent } from './manage-stations/manage-stations.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { CollabsComponent } from './collabs/collabs.component';

const routes: Routes = [
  {
    path: '',
    component: BackofficeComponent,
    children: [
      { path: 'stations', component: ManageStationsComponent },
      { path: 'bookings', component: ManageBookingsComponent },
      { path: 'collabs', component: CollabsComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
