import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForbiddenComponent } from './views/forbidden/forbidden.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '', 
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
    
  },
  {
    path: 'books',    
    loadChildren: () => import("../book/book.module").then( m => m.BookModule ),    
  },

  {
    path: 'loans',    
    loadChildren: () => import("../loan/loan.module").then( m => m.LoanModule ),    
  },

  {
    path: 'categories',    
    loadChildren: () => import("../category/category.module").then( m => m.CategoryModule ),    
  },
  {
    path: '403',
    component: ForbiddenComponent
  }


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }



  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // },

  // {
  //   path: '',
  //   loadChildren: () => import("../dashboard/dashboard.module").then( m => m.DashboardModule ),
  //   canActivate: [ profileGuard ]
  // },