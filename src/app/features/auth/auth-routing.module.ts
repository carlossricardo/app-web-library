import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [


  {
    path: 'login',
    component: SignInComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: '**',
    redirectTo: 'authentication/login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
