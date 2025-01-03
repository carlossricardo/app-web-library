import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './views/register/register.component';

@NgModule({
  declarations: [
    SignInComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
