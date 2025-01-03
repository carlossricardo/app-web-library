import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { TokenService } from 'src/app/features/auth/services/token.service';
import { DialogConfirmationService } from 'src/app/utils/services/dialog-confirmation.service';


@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {
  constructor(private tokenService: TokenService, private dialog: DialogConfirmationService, 
    private router: Router, private authService: AuthService ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });

      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            
            return EMPTY;
          }
          
          if (error.status === 401) {
            
            this.dialog.showConfirmation( 'La sesión ha caducado.', 'pi pi-ban', () => {              
              this.authService.removeLocalStorage('token');
              
              this.router.navigate(['/authentication/login']);              
            });

          }

          return throwError(() => new Error(`${error.error.message}`));
        })
      );
    }

    return next.handle(req);
  }
}

