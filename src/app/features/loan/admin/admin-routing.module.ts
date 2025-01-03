import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanComponent } from './views/loan/loan.component';
import { isAdminGuard } from 'src/app/core/guards/is-admin.guard';

const routes: Routes = [

  {
    path: '',
    component: LoanComponent,
    canActivate: [ isAdminGuard ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
