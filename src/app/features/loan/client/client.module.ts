import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';

import { LoanClientComponent } from './views/loan-client/loan-client.component';

import { SharedModule } from 'src/app/shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { ManageClientComponent } from './components/manage-client/manage-client.component';

@NgModule({
  declarations: [
    
    LoanClientComponent,
    
    CartComponent,
         ManageClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ], 

  exports: [
    
  ],

  providers: [    
  ]
})
export class ClientModule { }
