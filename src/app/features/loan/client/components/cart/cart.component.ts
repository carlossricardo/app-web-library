import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { environment } from 'src/environments/environment.prod';
import { CartItems, LoanCartItemsDto } from '../../interfaces/cart.client';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from 'src/app/utils/services/toast.service';
import { LoanClient } from '../../interfaces/loan.client';
import { ConfirmationService } from 'primeng/api';
import { DialogConfirmationService } from 'src/app/utils/services/dialog-confirmation.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  loading: boolean = true;

  api = environment.apiUrl;  

  cartItems: CartItems[] = [];

  formCart!: FormGroup;

  cartItemCount!: BehaviorSubject<number>;

  constructor(

    private cartService: CartService,
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private dialogConf: DialogConfirmationService,

  ){
    
  }


  ngOnInit(): void {

    this.initForm();

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.cartItemCount = this.cartService.getCartItemCount();  
    this.formCart.patchValue({
      total_units: this.cartItemCount.value
    });
    
  }

  
  onClickCreateLoan(){    



    const data: LoanClient = {
      ...this.formCart.value,
         
    }


    
    const dto = this.mapperToCartItemDto( data )
    
        

    this.dialogConf.showConfirmation(
      '¿Estás seguro de realizar este prestamo de libros?',
      'pi pi-cart-arrow-down',
      () => {
        this.cartService.sendCartItemsToLoan( dto ).subscribe({
          next: ( resp ) => {            
            this.toastService.showSuccess( 'Mensaje del sistema', resp.message,  );
            this.ref.close( resp.data ); 
            
          },
          error: ( err) => {

            alert( err )
    
          }
        });
      },  
    );

    


    

  }

  initForm() {
    this.formCart = this.fb.group({
      date_returned: [ null, [Validators.required]],  
      note: ['', []]    
          
     
    });
  }

  fieldsValidate(campo: string){
    return this.formCart.get(campo)?.invalid && this.formCart.get(campo)?.touched && this.formCart.get(campo)?.dirty;
  }

  findAllCart( $event: DataViewLazyLoadEvent ){
    this.loading = true;
    this.cartService.findAllCart().subscribe({
      next: ( resp ) => {
        if( resp.status ) this.loading = false;

      },
      error: ( err ) => {

        alert( err.error.message )
        

      }, 
      complete: () => {

      }
    })
  }


  removeAllCartItems(){


    this.dialogConf.showConfirmation(
      '¿Estás seguro de limpiar el carrito de libros?',
      'pi pi-cart-minus',
      () => {
        this.cartService.removeAllCartItems().subscribe({
          next: ( resp ) => {
            
            
    
          },
          error: ( err ) => {
    
          },
          complete: ( ) => {
    
          }
        });
      },  
    );

  

  }

  addBooksToCart( book_id: string ){
    this.cartService.addBooksToCart( book_id ).subscribe({
      next: ( resp ) => {
        
        

      },
      error: ( err ) => {

      },
      complete: ( ) => {

      }
    });

  }

  reduceBooksToCart( cart_id: string ){
    this.cartService.reduceBooksToCart( cart_id ).subscribe({
      next: ( resp ) => {
        
        

      },
      error: ( err ) => {

      },
      complete: ( ) => {

      }
    })

  }

  removeCartItemBook( cart_id: string ){

    this.cartService.removeCartItemBook( cart_id ).subscribe({
      next: ( resp ) => {
        
        

      },
      error: ( err ) => {

      },
      complete: ( ) => {

      }
    })
  }

  mapperToCartItemDto( data: LoanClient ): LoanCartItemsDto {


    return {
      date_returned: data.date_returned,
      total_units: this.cartItemCount.value,
      note: data.note
    }

  }

}
