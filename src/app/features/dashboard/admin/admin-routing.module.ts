import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { isAdminGuard } from 'src/app/core/guards/is-admin.guard';

const routes: Routes = [



  {
    path: '',
    component: DashboardComponent,
    canActivate: [ isAdminGuard ]
  }
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
