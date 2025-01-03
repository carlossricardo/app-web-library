import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { DashboardClientComponent } from './views/dashboard-client/dashboard-client.component';


@NgModule({
  declarations: [
    DashboardClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
