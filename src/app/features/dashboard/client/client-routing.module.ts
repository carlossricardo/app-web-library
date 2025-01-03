import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardClientComponent } from './views/dashboard-client/dashboard-client.component';


const routes: Routes = [



  {
    path: 'client',
    component: DashboardClientComponent,
    // canActivate: [ profileGuard ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
