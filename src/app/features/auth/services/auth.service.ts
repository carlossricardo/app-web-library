import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { AuthRequest, AuthResponse, ResponseUser, User, UserDto } from '../interfaces/auth.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();


  constructor(

    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private tokenService: TokenService
    
  ){

  }


  api = environment.apiUrl;


  initializeUser(): Promise<void> {
    return new Promise((resolve) => {
      const token = this.tokenService.getToken();
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        this.findUserActive().subscribe(() => resolve());
      } else {
        this.userSubject.next(null);
        resolve();
      }
    });
  }

  findUserActive(): Observable<User | null> {
    const url = `${this.api}/security/user`;
    return this.http.get<ResponseUser>(url).pipe(
      map((response) => {
        const user = response.status && response.data ? response.data : null;
        this.userSubject.next(user);
        return user;
      }),
      catchError(() => {
        this.userSubject.next(null);
        return of(null);
      })
    );
  }





  getUser(): any | null {    
    
    return this.userSubject.value;
  }


  signIn(request: AuthRequest): Observable<AuthResponse> {
    const url = `${this.api}/authentication/login`;
    return this.http.post<AuthResponse>(url, request).pipe(
      tap((resp) => {
        if (resp.status) {
          this.tokenService.setToken(resp.token);
          this.findUserActive().subscribe();
        }
      })
    );
  }




  registerClient( dto: UserDto ){

    const url = `${this.api}/authentication/client/register`;
    return this.http.post<AuthResponse>( url, dto )
      .pipe(
        tap( ( resp ) => { 
          if( resp.status ){
            this.setLocalStorage('token', resp.token);   
            this.findUserActive().subscribe();       
          }
      }));

  }

  verifyJwtToken(): Observable<boolean> {
    const token = this.getToken();      
    const isValid = !!token && !this.jwtHelper.isTokenExpired(token);
    return of(isValid);
  }

  setLocalStorage( key:string, token:string ){
    localStorage.setItem(key, JSON.stringify(token));
  }

  removeLocalStorage( key:string ){    
    this.tokenService.removeToken();
  }



  get token(): string | null {    
    return localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  removeUser(){
    this.userSubject.next( null );
  }



}
