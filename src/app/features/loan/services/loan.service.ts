import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, pipe, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map, Observable } from 'rxjs';

import { Loan, LoanDto, ResponseLoan, ResponsePatchLoan } from '../admin/interfaces/loan.admin';
import { LoanClient, ResponseLoansClient } from '../client/interfaces/loan.client';



@Injectable({
  providedIn: 'root'
})
export class LoanService implements OnInit {



  private loanItemsSubject = new BehaviorSubject<Loan[]>([]);
  public loanItems$ = this.loanItemsSubject.asObservable();

  private loanClientItemsSubject = new BehaviorSubject<LoanClient[]>([]);
  public loanClientItems$ = this.loanClientItemsSubject.asObservable();


  api = environment.apiUrl;

  constructor(
      private http : HttpClient,      
  ) {

    

  }

  ngOnInit(): void {
  }


  patchLoan( data: LoanDto ){
    const url = `${this.api}/administration/loan?loan_id=${ data.id }`;
    // return this.http.patch<ResponseLoan>(url, data);
    return this.http.patch<ResponsePatchLoan>(url, data);
  }


  deleteItem( loan_id: string ){
    const url = `${this.api}/administration/loan/remove?loan_id=${ loan_id }`;
    return this.http.get<ResponsePatchLoan>(url)
      .pipe(
        map( (resp) => {
          const currentLoans = this.loanItemsSubject.value;
          const itemToRemove = currentLoans.find(item => item.id === loan_id);
          if (itemToRemove) {            
            const updatedList = currentLoans.filter(item => item.id !== loan_id);
            this.loanItemsSubject.next(updatedList);
              

          }
          return resp;

        })
      );
  }


  findAllLoans(offset: number, limit: number = 10) {
    const url = `${this.api}/administration/loan?offset=${offset}&limit=${limit}`;
    return this.http.get<ResponseLoan>(url)
      .pipe(        
        map( (item) => {
          ( item.data.length > 0 && item.status ) ? this.loanItemsSubject.next( item.data ): this.loanItemsSubject.next( [] );
          return item;
        })        
      );
  }

  findAllClient(offset: number, limit: number = 10){
    const url = `${this.api}/administration/client/loan?offset=${offset}&limit=${limit}`;
    return this.http.get<ResponseLoansClient>(url)
    .pipe(
      map((item) => {
        if (item.status === true && item.data.length > 0) {          
          this.loanClientItemsSubject.next(item.data);                                                
        } else {
          
          this.loanClientItemsSubject.next([]);
          
        }
  
        return item;
      })
    );
  }



  mapperToLoanSubject( data: Loan ){
    const currentLoans = this.loanItemsSubject.value;
    const updatedLoans = currentLoans.map( ( item ) => item.id === data.id 
      ? { 
          ...item, 
          status: data.status,
          created_at: data.created_at,
          updated_at: data.updated_at,
          total_units: data.total_units,
          details: data.details,
          user: data.user
          
          
          
          // data,
        }
      : item 
    );

    this.loanItemsSubject.next( updatedLoans );

  }






}

