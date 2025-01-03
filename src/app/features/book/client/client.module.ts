import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { BookClientComponent } from './views/book-client/book-client.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BookClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
