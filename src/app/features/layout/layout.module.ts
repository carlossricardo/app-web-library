import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import { DialogService } from 'primeng/dynamicdialog';
import { ForbiddenComponent } from './views/forbidden/forbidden.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ],


  providers: [
    // DialogService
  ]
})
export class LayoutModule { }
