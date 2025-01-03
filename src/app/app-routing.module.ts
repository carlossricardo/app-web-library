import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './features/layout/components/layout/layout.component';
import { signInGuard } from './core/guards/sign-in.guard';
import { authGuard } from './core/guards/auth.guard';
import { isAdminGuard } from './core/guards/is-admin.guard';

const routes: Routes = [

  {
    path: '', 
    redirectTo: '',
    pathMatch: 'full'
  },

  {
    path: 'authentication',
    loadChildren: () => import("./features/auth/auth.module").then( m => m.AuthenticationModule ),
    canActivate: [ signInGuard ]
  },

  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import("./features/layout/layout.module").then( m => m.LayoutModule ),
    canActivate: [ authGuard ]
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
