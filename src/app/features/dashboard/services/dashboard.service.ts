import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Data, ResponseDashboard } from '../admin/interfaces/dashboard.admin';
import { ResponseDashboardClient } from '../client/interfaces/dashboard.client';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private dashboardItemsSubject = new BehaviorSubject<Data[]>([]);
  public dashboardItems$ = this.dashboardItemsSubject.asObservable();

  private dashboardClientItemsSubject = new BehaviorSubject<Data[]>([]);
  public dashboardClientItems$ = this.dashboardClientItemsSubject.asObservable();



  api = environment.apiUrl;


  constructor(

    private http: HttpClient
  ) { }


  findAll(){

    const url = `${this.api}/dashboard/active`;
    return this.http.get<ResponseDashboard>(url)
      .pipe(        
        map( (item) => {
          ( item.data.length > 0 && item.status ) ? this.dashboardItemsSubject.next( item.data ): this.dashboardItemsSubject.next( [] );
          return item;
        })
        
      );

  }

  findAllClient(){

    const url = `${this.api}/dashboard/client/active`;
    return this.http.get<ResponseDashboardClient>(url)
      .pipe(        
        map( (item) => {
          ( item.data.length > 0 && item.status ) ? this.dashboardClientItemsSubject.next( item.data ): this.dashboardClientItemsSubject.next( [] );
          return item;
        })
        
      );

  }

  clearItemsClient(): void {
    this.dashboardClientItemsSubject.next([]);
    
  }
  clearItems(): void {
    this.dashboardItemsSubject.next([]);
    
  }
  // clearCartItems(): void {
  //   this.cartItemsSubject.next([]);
  //   this.cartItemCount.next(0);
  // }
}
