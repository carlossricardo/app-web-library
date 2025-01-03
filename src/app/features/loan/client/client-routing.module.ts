import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanClientComponent } from './views/loan-client/loan-client.component';


const routes: Routes = [

  {
    path: 'client',
    component: LoanClientComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
