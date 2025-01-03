import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './core/interceptors/auth-interceptor.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from './features/auth/services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
  ],
  providers: [

     //APP_INITIALIZER
     {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.initializeUser(),
      deps: [AuthService],
      multi: true
    },
    //HTTP_INTERCEPTORS
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },

    { 
      provide: JWT_OPTIONS, useValue: JWT_OPTIONS 
    },
    JwtHelperService,
    MessageService,
    DialogService,
    ConfirmationService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
