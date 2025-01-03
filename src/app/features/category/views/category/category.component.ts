import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category.interface';
import { TableLazyLoadEvent } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateUpdateComponent } from '../../components/create-update/create-update.component';
import { DialogConfirmationService } from 'src/app/utils/services/dialog-confirmation.service';
import { ToastService } from 'src/app/utils/services/toast.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  offset: number = 0; 

  readonly limit: number = 50; 

  ref: DynamicDialogRef | undefined;

  categoriesFilter: Category[] = [];


  constructor(
    private categoryService: CategoryService,
    public dialogService: DialogService,
    private dialogConf: DialogConfirmationService,
    private toastService: ToastService,
  ){

  }

  ngOnInit(): void {

    this.categoryService.categoryItems$.subscribe( items => {
      this.categories = items;    
      this.categoriesFilter = [ ...this.categories ];  
    });
    
  }

  onCreateButtonClick(){

    this.ref = this.dialogService.open( CreateUpdateComponent , {
      header: 'Crear categoría',      
      
      contentStyle: { overflow: 'auto' },
      
      maximizable: false,
      
      styleClass: '',
      closeOnEscape: false,

      width: '50vw',
      height: '70vh',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });

    this.ref.onClose.subscribe( async ( resp: Category ) => {

      if( resp === undefined ) return;
      

      if( resp ){
        this.categoryService.mapperCategorySubject( resp );
      }

    });
    
  }

  onClickUpdatedCategory( data: Category ){

    
    
    this.ref = this.dialogService.open( CreateUpdateComponent , {
      header: `Editar categoría - ${ data.id }`,   
      
      data: data,
      contentStyle: { overflow: 'auto' },      
      maximizable: false,
      
      styleClass: '',
      closeOnEscape: false,

      width: '50vw',
      height: '70vh',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });

    this.ref.onClose.subscribe( async ( resp: Category ) => {
      if( resp === undefined ) return;

      if( resp ){
        this.categoryService.mapperCategorySubject( resp );
      }

    });
    
  }


  onClickRemoveItem( category: Category ){


    this.dialogConf.showConfirmation(
      `¿Estás seguro de eliminar este registro "${ category.name }"?`,
      'pi pi-book',
      () => {
        this.categoryService.deleteItem( category.id ).subscribe({
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

  findAll( $event: TableLazyLoadEvent ){
    const offset = $event.first ? $event.first / 50 : 0;

    this.loading = true;

    this.categoryService.findAll(offset, this.limit).subscribe({
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

  applyFilterGlobal($event: Event ) {
    
    const searchValue = ($event.target as HTMLInputElement).value.toLowerCase();
        

    this.categoriesFilter = this.categories.filter( item => item.code.toLowerCase().includes( searchValue ));
  }


}
