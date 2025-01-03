import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment.prod';
import { CategoryService } from '../../services/category.service';
import { ToolService } from 'src/app/utils/services/tool.service';
import { ToastService } from 'src/app/utils/services/toast.service';
import { Category, CategoryDto } from '../../interfaces/category.interface';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateComponent implements OnInit {

  api = environment.apiUrl;   
  
  selectedFile: any | null = null;    
  
  formCategory!: FormGroup;  

  isChange: boolean = false;

  isBlocked: boolean = false;

  categoryData!: any;



  constructor(
    private fb: FormBuilder,
    private config: DynamicDialogConfig<any>,
    private ref: DynamicDialogRef,
    private categoryService: CategoryService,    
    private toolService: ToolService,
    private toastService: ToastService,

  ){

  }


  ngOnInit(): void {

    this.initForm();
    this.setCategory();
    
  }

  initForm() {
    this.formCategory = this.fb.group({
      code: ['', [Validators.required]],      
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],            
      status: [ '', [Validators.required]],
    });
  }

  setCategory(){


    if( this.config.data === undefined ){

      this.isChange = true;
      return;
    }

    const { id, code, name, description, status } = this.config.data;


    this.formCategory.patchValue({ id, code, name, description, status: status === 1 });
    this.categoryData = {  code, name, description, status: status === 1 };

    this.formCategory.valueChanges.subscribe((value) => {
      
      const isEqual =
        value.code === this.categoryData.code &&
        value.name === this.categoryData.name &&
        value.description === this.categoryData.description &&
        value.status === this.categoryData.status;    

  
      this.isChange = !isEqual;
    });
    
  }

  onClickCreateUpdateCategory(){

    this.formCategory.disable();
    this.isBlocked = true;
    
    if( this.config.data ){      
      let data: Category = {
  
        ...this.formCategory.value,
        id: this.config.data.id
  
      };
  
      let categoryDto = this.mapperToCategory( data );      

      // if( categoryDto.image === '53336135-f0fe-4fd2-9fb8-7730a5900a45_20241219_215014.jpg' ){        
        
      this.updateCategoryService( categoryDto );
      //   return;
      // }
      
      // if( categoryDto.image === this.config.data.image ){                
        
      //   this.updateBookService( categoryDto );

      //   return;

      // }
      
      // this.toolService.subirArchivo( this.selectedFile, 'books').subscribe({
      //   next: ( resp ) => {          
      //     categoryDto.image = resp.data;          
      //     this.updateBookService( categoryDto );

          
      //   },
      //   error: ( err ) => {
  
      //   },
      //   complete: () => {
  
      //   }
      // });
      
      
      return;
    }
    

    this.formCategory.disable();

    
    let data: Category = this.formCategory.value;

    let categoryDto = this.mapperToCategory( data );
    

    // if( categoryDto.image === '53336135-f0fe-4fd2-9fb8-7730a5900a45_20241219_215014.jpg' || categoryDto.image === '' ){
      
    //   categoryDto.image =  '53336135-f0fe-4fd2-9fb8-7730a5900a45_20241219_215014.jpg';
      
      
    this.createCategoryService( categoryDto );
    //   return;
    // }



    // this.toolService.subirArchivo( this.selectedFile, 'books').subscribe({
    //   next: ( resp ) => {
        

    //     categoryDto.image = resp.data;
        
    //     this.createBookService( categoryDto );

        
    //   },
    //   error: ( err ) => {

    //   },
    //   complete: () => {

    //   }
    // })
    
    
    
  }

  updateCategoryService( categoryDto: CategoryDto ){

    this.categoryService.patch( categoryDto ).subscribe({
      next: ( resp ) => {
         
        this.formCategory.disable();
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

  createCategoryService( categoryDto: CategoryDto ){

    this.categoryService.create( categoryDto ).subscribe({
      next: ( resp ) => {
         
        this.formCategory.disable();
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

  mapperToCategory( data: Category ): CategoryDto {
    
    
    return  {
      id: data.id,
      code: data.code,
      name: data.name,
      description: data.description,
      status : data.status,

    }

  }

  fieldsValidate(campo: string){
    return this.formCategory.get(campo)?.invalid && this.formCategory.get(campo)?.touched && this.formCategory.get(campo)?.dirty;
  }

}
