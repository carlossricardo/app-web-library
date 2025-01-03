import {  CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { FooterComponent } from './components/footer/footer.component';
import { SecurityModule } from '../features/security/security.module';
import { LoanModule } from '../features/loan/loan.module';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';


import { DialogConfirmationService } from 'src/app/utils/services/dialog-confirmation.service';

@NgModule({
  declarations: [


    SidebarComponent,
    TopbarComponent,
    FooterComponent,
  ],
  imports: [

    CommonModule,
    PrimeNgModule,
    SecurityModule,

    // LoanModule

  ],
  
  exports: [
    PrimeNgModule,
    SidebarComponent,
    TopbarComponent,
    FooterComponent
  ],

  providers: [
    DialogService,
    // ConfirmationService
    // DialogConfirmationService
  ],
  


  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
