import { Component, OnInit } from '@angular/core';
import { Loan } from '../../interfaces/loan.admin';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoanService } from '../../../services/loan.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { ManageLoanComponent } from '../../components/manage-loan/manage-loan.component';
import { DialogConfirmationService } from 'src/app/utils/services/dialog-confirmation.service';
import { ToastService } from 'src/app/utils/services/toast.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

  loans: Loan[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  offset: number = 0;
  readonly limit: number = 50; 


  ref: DynamicDialogRef | undefined;

  constructor(
    private loanService: LoanService,
    public dialogService: DialogService,
    private dialogConf: DialogConfirmationService,
    private toastService: ToastService,
  ){

  }

  ngOnInit(): void {

    this.loanService.loanItems$.subscribe( items => {
      this.loans = items;          
    });


  }

  onClickVerifiyData( data: Loan ){

    
    
    this.ref = this.dialogService.open( ManageLoanComponent , {
      header: 'Gestionar información',   
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

    this.ref.onClose.subscribe( async ( resp: Loan ) => {
      if( resp === undefined ) return;

      this.loanService.mapperToLoanSubject( resp );
      
    });


    
  }


  loadLoans( $event: TableLazyLoadEvent ){
    
    const offset = $event.first ? $event.first / 50 : 0;


    this.loading = true;

    this.loanService.findAllLoans(offset, this.limit).subscribe({
      next: (resp) => {              
      
        this.loading = false;
        this.totalRecords = resp.total_records;        
        
      },
      error: (err) => {
        console.error('Error cargando los prestamos:', err);
        this.loading = false;
      },
    });

  }

  onClickRemoveItem( loan: Loan ){


    this.dialogConf.showConfirmation(
      `¿Estás seguro de eliminar este registro "${ loan.id }"?`,
      'pi pi-book',
      () => {
        this.loanService.deleteItem( loan.id ).subscribe({
          next: ( resp ) => {
    
            this.toastService.showSuccess( 'Mensaje del sistema', resp.message,  );
    
          },
          error: ( err ) => {
    
          },
          complete: () => {
    
          }
        });
      },  
    );



  }


  truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }





}
