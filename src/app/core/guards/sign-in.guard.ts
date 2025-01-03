import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';

export const signInGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router = inject( Router );

    const token = authService.token;

    if( token ){
      router.navigate(['']);
      return false;
    }

    return true;
};
