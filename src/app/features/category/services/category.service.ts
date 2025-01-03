import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Category, CategoryDto, CategoryResponse, ResponseCreateUpdateCategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryItemsSubject = new BehaviorSubject<Category[]>([]);
  public categoryItems$ = this.categoryItemsSubject.asObservable();

  api = environment.apiUrl;

  constructor(

    private http : HttpClient,
  ) { }


  findAll( offset: number, limit: number = 10 ){
    const url = `${this.api}/administration/category?offset=${offset}&limit=${limit}`;
    return this.http.get<CategoryResponse>(url)
      .pipe(        
        map( (item) => {
          ( item.data.length > 0 && item.status ) ? this.categoryItemsSubject.next( item.data ): this.categoryItemsSubject.next( [] );
          return item;
        })
        
      );

  }

  deleteItem( category_id: string ){
    const url = `${this.api}/administration/category/remove?category_id=${ category_id }`;
    return this.http.get<ResponseCreateUpdateCategory>(url)
      .pipe(
        map( (resp) => {
          const currentCategories = this.categoryItemsSubject.value;
          const itemToRemove = currentCategories.find(item => item.id === category_id);
          if (itemToRemove) {            
            const updatedList = currentCategories.filter(item => item.id !== category_id);
            this.categoryItemsSubject.next(updatedList);
              

          }
          return resp;

        })
      );
  }

  patch( data: CategoryDto ){
    const url = `${this.api}/administration/category?category_id=${ data.id }`;
    return this.http.patch<ResponseCreateUpdateCategory>(url, data);
  }

  create( data: CategoryDto ){
    const url = `${this.api}/administration/category`;
    return this.http.post<ResponseCreateUpdateCategory>(url, data);
  }


  loadCategories(): Observable<Category[]> {
    const url = `${this.api}/administration/client/category`;
    return this.http.get<CategoryResponse>(url).pipe(
      map((resp) => resp.data)
    );
  }


  mapperCategorySubject( data: Category ){

    const currentCategories = this.categoryItemsSubject.value;
    
    const existingCategoryIndex = currentCategories.findIndex(item => item.id === data.id);
  
    
    if (existingCategoryIndex !== -1) {
      currentCategories[existingCategoryIndex] = {
        ...currentCategories[existingCategoryIndex],
        code: data.code,
        name: data.name,
        description: data.description,
        created_at: data.created_at,
        updated_at: data.updated_at,
        status: !data.status ? 0 : 1,   
      };
    }
      
    if (existingCategoryIndex === -1) {      
      currentCategories.unshift({
        id: data.id,
        code: data.code,
        name: data.name,
        description: data.description,
        created_at: data.created_at,
        updated_at: data.updated_at,
        status: !data.status ? 0 : 1,  
      });      
    }
      
    this.categoryItemsSubject.next([...currentCategories]);

  }





}
