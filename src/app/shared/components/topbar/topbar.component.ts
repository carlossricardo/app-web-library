import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs';

import { LayoutService } from 'src/app/features/layout/services/layout.service';
import { CartComponent } from 'src/app/features/loan/client/components/cart/cart.component';
import { ConfirmationService, MessageService } from 'primeng/api';


import { CartService } from 'src/app/features/loan/services/cart.service';
import { LoanService } from 'src/app/features/loan/services/loan.service';
import { User } from 'src/app/features/security/interfaces/user.interface';
import { UserService } from 'src/app/features/security/services/user.service';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { DialogConfirmationService } from 'src/app/utils/services/dialog-confirmation.service';
import { DashboardService } from 'src/app/features/dashboard/services/dashboard.service';




@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit{

  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;
  ref: DynamicDialogRef | undefined;

  api = environment.apiUrl;   


  user: User | null = null;

  cartItemCount!: BehaviorSubject<number>;

  
  constructor(
    public layoutService: LayoutService,
    public dialogService: DialogService,
    
    private loanService: LoanService,

    private dialogConf: DialogConfirmationService,

    private cartService: CartService,
    private router: Router,
    // private userService: UserService,

    private confirmationService: ConfirmationService,
    public authService: AuthService,
    private dashService: DashboardService
    

    
    
    
    
  ) {


  }


  ngOnInit(): void {
    
   this.cartItemCount = this.cartService.getCartItemCount(); 
      
  
  }



  
  onClickLogOut(event: Event) {


    this.dialogConf.showConfirmation( 
        '¿Estás seguro de cerrar la sesión?', 
        'pi pi-sign-out', 
        () => {          
          this.authService.removeLocalStorage('token');          
          this.authService.removeUser();
          this.router.navigate(['/authentication/login']);
          this.cartService.clearCartItems();
          this.dashService.clearItems();
          this.dashService.clearItemsClient();
        },  
    
    );

  }





  onCreateButtonClick(){

    this.ref = this.dialogService.open( CartComponent , {
      header: 'Carrito de libros',      
      // width: '70%',
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



    this.ref.onClose.subscribe( async ( resp: any ) => {
      if( resp === undefined ) return;
      

      this.router.navigate(['/loans/client'])
      

    

    });
    
  }


}
