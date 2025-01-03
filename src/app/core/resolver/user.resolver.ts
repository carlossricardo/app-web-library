import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { first, Observable } from 'rxjs';
import { User } from 'src/app/features/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/features/auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User | null> {

  constructor(private authService: AuthService) {}

  resolve(): Observable<User | null> {
    return this.authService.findUserActive();
    // return this.authService.findUserActive().pipe(first());
  }
}

// export const userResolver: ResolveFn<boolean> = (route, state) => {
//   return true;
// };
