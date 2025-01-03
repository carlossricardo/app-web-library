import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmationService {

  constructor(
    private confirmationService: ConfirmationService,
  ) { }


  showConfirmation( message: string, icon: string, acceptCallback: () => void, ){

    this.confirmationService.confirm({
      icon: icon,
      closeOnEscape: false,
      header: 'Mensaje del sistema',
      message: message,
      accept: () => {  
        
        if (acceptCallback) {
          acceptCallback(); 
        }

      },
      reject: () => {

        
        
          
      }
    });

  }
}
