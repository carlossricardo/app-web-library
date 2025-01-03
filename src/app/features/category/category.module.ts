import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './views/category/category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateUpdateComponent } from './components/create-update/create-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoryComponent,
    CreateUpdateComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CategoryModule { }
