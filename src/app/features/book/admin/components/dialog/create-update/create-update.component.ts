import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileRemoveEvent, FileSelectEvent, FileUploadEvent } from 'primeng/fileupload';
import { Category } from 'src/app/features/category/interfaces/category.interface';
import { CategoryService } from 'src/app/features/category/services/category.service';
import { Book, BookDto } from '../../../interfaces/book.interface';
import { BookService } from 'src/app/features/book/services/book.service';
import { ToolService } from 'src/app/utils/services/tool.service';
import { environment } from 'src/environments/environment.prod';
import { ToastService } from 'src/app/utils/services/toast.service';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateComponent implements OnInit {



  api = environment.apiUrl;   
  
  selectedFile: any | null = null;    
  
  formBook!: FormGroup;

  categoriesList: Category[] = [];

  isChange: boolean = false;

  isBlocked: boolean = false;

  bookData!: any;

  constructor(
    private fb: FormBuilder,
    private config: DynamicDialogConfig<any>,
    private ref: DynamicDialogRef,
    private categoryService: CategoryService,
    private bookService: BookService,
    private toolService: ToolService,
    private toastService: ToastService,
    

  ){

  }

  async ngOnInit() {

    this.initForm();
    this.loadCategories();
    this.setBook();
  }

  onRemove( event: FileRemoveEvent ){
    

  }

  removeFile() {

    this.selectedFile = null;     
    this.formBook.get('image')?.setValue('53336135-f0fe-4fd2-9fb8-7730a5900a45_20241219_215014.jpg'); // Default image not found


    
  }

  onSelect(event: FileSelectEvent) {
    
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      
      
      this.selectedFile = file;
            
      this.formBook.get('image')?.setValue(this.selectedFile.name);
      
    }
  }


  initForm() {
    this.formBook = this.fb.group({
      title: ['', [Validators.required]],      
      description: ['', [Validators.required]],
      emission: ['', [Validators.required]],            
      status: [ '', [Validators.required]],
      units: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      categories: [[], [ Validators.required ]],
      image: ['', []],
     
    });
  }

  setBook(){


    if( this.config.data === undefined ){

      this.isChange = true;
      return;
    }

    const { id, title, description, categories, image, units, autor, emission, status } = this.config.data;
    if( image !== undefined ){
      this.setDefaultImage( image );
    }

    this.formBook.patchValue({ id, title, description, categories, image, units, autor, status: status === 1, emission: new Date(emission) });
    this.bookData = { title, description, categories, image, units, autor,  status: status === 1, emission: new Date(emission), };

    this.formBook.valueChanges.subscribe((value) => {
      
      const isEqual =
        value.title === this.bookData.title &&
        value.image === this.bookData.image &&
        value.units === this.bookData.units &&
        value.autor === this.bookData.autor &&
        value.status === this.bookData.status &&
        this.formatDate( value.emission ) === this.formatDate( this.bookData.emission ) &&
        value.description === this.bookData.description &&
        JSON.stringify(value.categories) === JSON.stringify(this.bookData.categories);
  
      this.isChange = !isEqual;
    });
    
  }



  setDefaultImage(image: string) {
    const fileObject = {
      name: image,
      objectURL: `${this.api}/files/getFile/books/${image}`,
    };

    this.selectedFile = fileObject;

  }

  choose(event: any, callback: any) {
    callback();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return `${year}/${month}/${day}`;
  }
    
  compareDates(date1: Date, date2: Date): boolean {
    return this.formatDate(date1) === this.formatDate(date2);
  }


  fieldsValidate(campo: string){
    return this.formBook.get(campo)?.invalid && this.formBook.get(campo)?.touched && this.formBook.get(campo)?.dirty;
  }

  createBookService( bookDto: BookDto ){

    this.bookService.createBooks( bookDto ).subscribe({
      next: ( resp ) => {        

        this.toastService.showSuccess( 'Mensaje del sistema', resp.message,  );  
        this.ref.close( resp.data ); 

      }, 
      error: ( err ) => {        
        

      },
      complete: () => {
        
      }
    });

  }

  updateBookService( bookDto: BookDto ){

    this.bookService.patchBooks( bookDto ).subscribe({
      next: ( resp ) => {
         
        this.formBook.disable();
        this.toastService.showSuccess( 'Mensaje del sistema', resp.message,  );
        this.ref.close( resp.data ); 
      }, 
      error: ( err ) => {
                
        this.toastService.showSuccess( 'Mensaje del sistema', err,  );

        

      },
      complete: () => {

      }
    });

  }

  uploadFileBook(){
    this.toolService.subirArchivo( this.selectedFile, 'books').subscribe({
      next: ( resp ) => {        


        
      },
      error: ( err ) => {

      },
      complete: () => {

      }
    })

  }

  onClickCreateUpdateBook(){

    this.formBook.disable();
    this.isBlocked = true;
    
    if( this.config.data ){      
      let data: Book = {
  
        ...this.formBook.value,
        id: this.config.data.id
  
      };
  
      let bookDto = this.mapperToBook( data );      

      if( bookDto.image === '53336135-f0fe-4fd2-9fb8-7730a5900a45_20241219_215014.jpg' ){        
        
        this.updateBookService( bookDto );
        return;
      }
      
      if( bookDto.image === this.config.data.image ){                
        
        this.updateBookService( bookDto );

        return;

      }
      
      this.toolService.subirArchivo( this.selectedFile, 'books').subscribe({
        next: ( resp ) => {          
          bookDto.image = resp.data;          
          this.updateBookService( bookDto );

          
        },
        error: ( err ) => {
  
        },
        complete: () => {
  
        }
      });
      
      
      return;
    }
    

    this.formBook.disable();

    
    let data: Book = this.formBook.value;

    let bookDto = this.mapperToBook( data );
    

    if( bookDto.image === '53336135-f0fe-4fd2-9fb8-7730a5900a45_20241219_215014.jpg' || bookDto.image === '' ){
      
      bookDto.image =  '53336135-f0fe-4fd2-9fb8-7730a5900a45_20241219_215014.jpg';
      
      
      this.createBookService( bookDto );
      return;
    }



    this.toolService.subirArchivo( this.selectedFile, 'books').subscribe({
      next: ( resp ) => {
        

        bookDto.image = resp.data;
        
        this.createBookService( bookDto );

        
      },
      error: ( err ) => {

      },
      complete: () => {

      }
    })
    
    
    
  }


  mapperToBook( data: Book ): BookDto {
    
    
    return  {
      id: data.id,
      title: data.title,
      description: data.description,
      image: data.image,
      autor: data.autor,
      emission: data.emission,
      status : data.status,
      units: data.units,      
      categories: data.categories
    }

  }
  


  loadCategories(){

    this.categoryService.loadCategories().subscribe({
      next: ( resp ) => {        
        
        this.categoriesList = resp;

      },
      error: ( err  ) => {

        
        

      },
      complete: () => {

      }
    })

  }







}
