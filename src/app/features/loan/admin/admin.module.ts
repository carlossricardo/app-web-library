import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoanComponent } from './views/loan/loan.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageLoanComponent } from './components/manage-loan/manage-loan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoanComponent,
    ManageLoanComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
ReactiveFormsModule
  ]
})
export class AdminModule { }
