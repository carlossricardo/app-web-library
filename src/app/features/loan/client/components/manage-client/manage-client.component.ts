import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoanService } from '../../../services/loan.service';
import { environment } from 'src/environments/environment.prod';
import { Loan } from '../../../admin/interfaces/loan.admin';

@Component({
  selector: 'app-manage-client',
  templateUrl: './manage-client.component.html',
  styleUrls: ['./manage-client.component.scss']
})
export class ManageClientComponent implements OnInit {



  api = environment.apiUrl;   

  loanValue!: Loan; 

  constructor(
    private config: DynamicDialogConfig<any>,
    private ref: DynamicDialogRef,
    private loanService: LoanService
  ){

  }


  ngOnInit(): void {

    this.loanValue =  this.config.data ;
    
  }

}
