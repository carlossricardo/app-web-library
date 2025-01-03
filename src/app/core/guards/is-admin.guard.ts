import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth.service';

export const isAdminGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router = inject( Router );

  return authService.user$.pipe(      
    map((user) => {
      if (user?.isAdmin) {
        return true;
      } else {          
        if (state.url === '/') {            
          return router.createUrlTree(['/client']);
        }
        if (state.url.startsWith('/client')) {
          return true;
        }        
        return router.createUrlTree(['/403']);
      }
    })
  );
};
