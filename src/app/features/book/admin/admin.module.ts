import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookComponent } from './views/book/book.component';
import { CreateUpdateComponent } from './components/dialog/create-update/create-update.component';
import { DialogService } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    BookComponent,
    CreateUpdateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],


  providers: [
    DialogService
  ],

})
export class AdminModule { }
