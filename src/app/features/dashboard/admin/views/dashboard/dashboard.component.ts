import { Component, OnInit } from '@angular/core';

import { find } from 'rxjs';
import { DashboardService } from '../../../services/dashboard.service';
import { Data } from '../../interfaces/dashboard.admin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  items: Data[] = [];



  constructor(

    private dashboardService: DashboardService
  ){
  }


  ngOnInit(): void {
    this.findAll();


    this.dashboardService.dashboardItems$.subscribe({
      next: ( item ) => {
        this.items = item;
      }
    })

    // this.findAll();
  }


  findAll(){


    this.dashboardService.findAll().subscribe({
      next: ( resp ) => {

        
        

      },
      error: ( err ) => {

      },
      complete: ( ) => {

      }
    })
  }





}
