import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogService } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,       
    FormsModule,
    ReactiveFormsModule,
    SharedModule,


    AdminModule,
    ClientModule
  ],
  providers: [
    DialogService
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookModule { }
