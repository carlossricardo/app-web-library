import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { BookClient } from '../../interfaces/book.client';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { LoanService } from 'src/app/features/loan/services/loan.service';
import { environment } from 'src/environments/environment.prod';
import { CartService } from 'src/app/features/loan/services/cart.service';
import { ToastService } from 'src/app/utils/services/toast.service';

@Component({
  selector: 'app-book-client',
  templateUrl: './book-client.component.html',
  styleUrls: ['./book-client.component.scss']
})
export class BookClientComponent implements OnInit {

  api = environment.apiUrl;   
  
  books: BookClient[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  offset: number = 0; 

  @ViewChild('dv', { static: false }) dataView?: DataView;  
  readonly limit: number = 50; 


  filteredBooks: BookClient[] = [];
  



  constructor(
    private bookService: BookService,
    private loanService: LoanService,
    private cartService: CartService,
    private toastService: ToastService
  ){


  }


  ngOnInit(): void {


    this.bookService.booksItemsClient$.subscribe(items => {
      this.books = items;
      this.filteredBooks = [...this.books];
      
    });
    

    
  }

  filterBooks(event: Event) {        
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredBooks = this.books.filter(book => 
        book.title.toLowerCase().includes(searchValue)
    );
  }


  addBooksToCart(book_id: string): void {


    this.cartService.addBooksToCart( book_id ).subscribe({
      next: ( resp ) => {

        // this.toastService.showSuccess( 'Mensaje del sistema', resp!.message  );

      },
      error: ( err ) => {

      },
      complete: () => {

      }
      
    })
  }

  loadBooks( $event: DataViewLazyLoadEvent ){

    const offset = $event.first ? $event.first / 50 : 0;

    this.loading = true;

    this.bookService.loadBooksClient(offset, this.limit).subscribe({
      next: ( resp ) => {              
        this.totalRecords = resp.total_records;
        
        this.loading = false;
   
        
      },
      error: (err) => {
        
        this.loading = false;
      },
    });

  }




  

}