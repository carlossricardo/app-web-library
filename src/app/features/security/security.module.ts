import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { OptionComponent } from './components/option/option.component';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    OptionComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,        
    PrimeNgModule
    
  ],
  exports: [
    OptionComponent,
  ]
})
export class SecurityModule { }
