import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { Data } from '../../interfaces/dashboard.client';


@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent implements OnInit {

  items: Data[] = [];


  constructor(
    private dashboardService: DashboardService
  ){

  }
  
  ngOnInit(): void {

    this.findAllClient();


    this.dashboardService.dashboardClientItems$.subscribe({
      next: ( item ) => {
        this.items = item;
      }
    })
    
  }



  findAllClient(){


    this.dashboardService.findAllClient().subscribe({
      next: ( resp ) => {

        
        

      },
      error: ( err ) => {

      },
      complete: ( ) => {

      }
    })
  }

}
