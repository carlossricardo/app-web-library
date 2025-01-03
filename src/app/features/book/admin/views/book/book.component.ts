import { Component, OnInit, ViewChild } from '@angular/core';

import { Book } from '../../interfaces/book.interface';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateUpdateComponent } from '../../components/dialog/create-update/create-update.component';
import { BookService } from '../../../services/book.service';
import { ToastService } from 'src/app/utils/services/toast.service';
import { DialogConfirmationService } from 'src/app/utils/services/dialog-confirmation.service';



@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  books: Book[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  offset: number = 0; 

  readonly limit: number = 50; 



  booksFilter: Book[] = [];


  @ViewChild('dt', { static: false }) dt?: Table;  


  searchValue: string | undefined;


  ref: DynamicDialogRef | undefined;

  constructor(
    private bookService: BookService,
    public dialogService: DialogService,
    private toastService: ToastService,
    private dialogConf: DialogConfirmationService,
  ){

  }

  ngOnInit(): void {

    this.bookService.booksItems$.subscribe( items => {
      this.books = items;    
      this.booksFilter = [ ...this.books ];  
    });

    

  }


  applyFilterGlobal($event: Event ) {
    
    const searchValue = ($event.target as HTMLInputElement).value.toLowerCase();
        

    this.booksFilter = this.books.filter( item => item.title.toLowerCase().includes( searchValue ));
  }


  onCreateButtonClick(){

    this.ref = this.dialogService.open( CreateUpdateComponent , {
      header: 'Crear libro',      
      
      contentStyle: { overflow: 'auto' },
      
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

    this.ref.onClose.subscribe( async ( resp: Book ) => {
      

      if( resp ){
        this.bookService.mapperBookSubject( resp );
      }

    });
    
  }

  onClickRemoveItem( book: Book ){


    this.dialogConf.showConfirmation(
      `¿Estás seguro de eliminar este registro "${ book.title }"?`,
      'pi pi-book',
      () => {
        this.bookService.deleteItem( book.id ).subscribe({
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
  
  
  onClickUpdatedBook( data: Book ){

    
    
    this.ref = this.dialogService.open( CreateUpdateComponent , {
      header: `Editar libro - ${ data.id }`,   
      
      data: data,
      contentStyle: { overflow: 'auto' },      
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

    this.ref.onClose.subscribe( async ( resp: Book ) => {
      

      if( resp ){
        this.bookService.mapperBookSubject( resp );
      }

    });
    
  }




  loadBooks( $event: TableLazyLoadEvent ){
    
    const offset = $event.first ? $event.first / 50 : 0;

    this.loading = true;

    this.bookService.loadBooks(offset, this.limit).subscribe({
      next: (resp) => {

     
        this.loading = false;
        this.totalRecords = resp.total_records;

      },
      error: (err) => {
        
        this.loading = false;
      },
    });

  }

  truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

}
