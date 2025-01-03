import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router = inject( Router );

    return authService.verifyJwtToken()
      .pipe( tap( (isAutenticated) => {
        if( !isAutenticated ){
          localStorage.removeItem('token');
          router.navigate(['/authentication/login'])
        }
      }))
};
