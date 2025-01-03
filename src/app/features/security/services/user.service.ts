import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ResponseUser, User } from '../interfaces/user.interface';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();



  api = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {

    
    
   }


  findUserActive(){
    const url = `${this.api}/security/user`;
    return this.http.get<ResponseUser>( url )
      .pipe(
        map( (item) => item.status && item.data ? this.userSubject.next( item.data ): this.userSubject.next( null ) )
      )

  }

  getUser(): User | null {    
    
    return this.userSubject.value;
  }

  clearUser(): void {
    this.userSubject.next(null);
  }




}
