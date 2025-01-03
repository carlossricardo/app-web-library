import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './views/category/category.component';
import { isAdminGuard } from 'src/app/core/guards/is-admin.guard';

const routes: Routes = [


  {
    path: '',
    component: CategoryComponent,
    canActivate: [ isAdminGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
