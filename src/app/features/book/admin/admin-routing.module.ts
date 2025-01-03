import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './views/book/book.component';
import { isAdminGuard } from 'src/app/core/guards/is-admin.guard';

const routes: Routes = [


  {
    path: '',
    component: BookComponent,
    canActivate: [ isAdminGuard ],
        
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
