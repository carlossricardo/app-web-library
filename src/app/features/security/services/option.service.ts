import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OptionService {


  http = inject(HttpClient);


  api = environment.apiUrl;

  constructor() { }

  loadOptions(){

    const url = `${this.api}/permission/option`;
    return this.http.get<any>( url );

  }

  findUserActive(){
    const url = `${this.api}/security/user`;
    return this.http.get<any>( url );

  }


}
