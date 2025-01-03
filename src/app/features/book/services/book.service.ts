import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Book, BookDto, ResponseBook, ResponseCreateUpdateBook } from '../admin/interfaces/book.interface';
import { BookClient, ResponseBookClient } from '../client/interfaces/book.client';





@Injectable({
  providedIn: 'root'
})
export class BookService {

  api = environment.apiUrl;

  private booksItemsSubject = new BehaviorSubject<Book[]>([]);
  public booksItems$ = this.booksItemsSubject.asObservable();

  private booksItemsClientSubject = new BehaviorSubject<BookClient[]>([]);
  public booksItemsClient$ = this.booksItemsClientSubject.asObservable();

  constructor(

    private http : HttpClient,
  ) { }


  loadBooks(offset: number, limit: number = 10) {
    const url = `${this.api}/administration/book?offset=${offset}&limit=${limit}`;
    return this.http.get<ResponseBook>(url)
      .pipe(        
        map( (item) => {
          ( item.data.length > 0 && item.status ) ? this.booksItemsSubject.next( item.data ): this.booksItemsSubject.next( [] );
          return item;
        })
        
      );
  }


  patchBooks( data: BookDto ){
    const url = `${this.api}/administration/book?book_id=${ data.id }`;
    return this.http.patch<ResponseCreateUpdateBook>(url, data);
  }

  deleteItem( book_id: string ){
    const url = `${this.api}/administration/book/remove?book_id=${ book_id }`;
    return this.http.get<ResponseCreateUpdateBook>(url)
      .pipe(
        map( (resp) => {
          const currentBooks = this.booksItemsSubject.value;
          const itemToRemove = currentBooks.find(item => item.id === book_id);
          if (itemToRemove) {            
            const updatedList = currentBooks.filter(item => item.id !== book_id);
            this.booksItemsSubject.next(updatedList);
              

          }
          return resp;

        })
      );
  }

  createBooks( data: BookDto ){
    const url = `${this.api}/administration/book`;
    return this.http.post<any>(url, data);
  }

  loadBooksClient(offset: number, limit: number = 10) {
    const url = `${this.api}/administration/client/book?offset=${offset}&limit=${limit}`;
    return this.http.get<ResponseBookClient>(url)
      .pipe(        
        map( (item) => {
          ( item.data.length > 0 && item.status ) ? this.booksItemsClientSubject.next( item.data ): this.booksItemsClientSubject.next( [] );
          return item;
        })
        
      );
  }


  mapperBookSubject( data: Book ){

    const currentBooks = this.booksItemsSubject.value;
    
    const existingBookIndex = currentBooks.findIndex(item => item.id === data.id);
  
    
    if (existingBookIndex !== -1) {
      currentBooks[existingBookIndex] = {
        ...currentBooks[existingBookIndex],
        title: data.title,
        description: data.description,
        created_at: data.created_at,
        updated_at: data.updated_at,
        image: data.image,
        autor: data.autor,
        status: !data.status ? 0 : 1,
        emission: data.emission,
        units: data.units,
        categories: data.categories,
      };
    }
      
    if (existingBookIndex === -1) {      
      currentBooks.unshift({
        id: data.id,
        title: data.title,
        description: data.description,
        created_at: data.created_at,
        updated_at: data.updated_at,
        image: data.image,
        autor: data.autor,
        status: !data.status ? 0 : 1,
        emission: data.emission,
        units: data.units,
        categories: data.categories,
      });      
    }
      
    this.booksItemsSubject.next([...currentBooks]);

  }



}
