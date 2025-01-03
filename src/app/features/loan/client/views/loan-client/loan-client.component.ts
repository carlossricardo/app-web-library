import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoanService } from '../../../services/loan.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { LoanClient } from '../../interfaces/loan.client';
import { Loan } from '../../../admin/interfaces/loan.admin';
import { ManageClientComponent } from '../../components/manage-client/manage-client.component';


@Component({
  selector: 'app-loan-client',
  templateUrl: './loan-client.component.html',
  styleUrls: ['./loan-client.component.scss']
})
export class LoanClientComponent implements OnInit {
  
  
  ref: DynamicDialogRef | undefined;

  loanItems: LoanClient[] = [];

  totalRecords: number = 0;
  loading: boolean = true;
  offset: number = 0;
  readonly limit: number = 10; 


  constructor(    
    public dialogService: DialogService,
    private loanService: LoanService
  ){

  }
  
  ngOnInit(): void {

    this.loanService.loanClientItems$.subscribe(items => {
      this.loanItems = items;
    });
    
  }

  onClickVerifiyData( data: Loan ){

    
    
    this.ref = this.dialogService.open( ManageClientComponent , {
      header: 'Verificar información',   
      data: data,
      contentStyle: { overflow: 'auto' },
      // baseZIndex: 10000,
      maximizable: false,
      
      styleClass: '',
      closeOnEscape: false,

      width: '50vw',
      height: '90vh',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });

    // this.ref.onClose.subscribe( async ( resp: Loan ) => {
    //   if( resp === undefined ) return;

    //   this.loanService.mapperToLoanSubject( resp );
      
    // });


    
  }


  findAllClient( $event: TableLazyLoadEvent ){
    
    const offset = $event.first ? $event.first / 10 : 0;

    this.loading = true;

    this.loanService.findAllClient( offset, this.limit ).subscribe({
      next: ( resp ) => {
        this.loading = false;
        
        

      },
      error: ( err ) => {

      },
      complete: () => {

      }

    })
  }

  truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }



  
}
