import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthRequest } from '../../interfaces/auth.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;
  hide : boolean = true;  

  private subscription: Subscription | undefined;



  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private service: AuthService,

  ){ }


  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email ]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z]).*$/),
        ]
      ],
    });
  }

  fieldsValidate(campo: string){
    return this.signInForm.get(campo)?.invalid && this.signInForm.get(campo)?.touched && this.signInForm.get(campo)?.dirty;
  }

  signIn(){
    this.signInForm.markAllAsTouched();
    if (this.signInForm.invalid) { return; }
    
    if (this.signInForm.valid) {
      this.signInForm.disable();
      
      const form : AuthRequest = this.signInForm.value; 
      this.signInService(form);
    }
  }


  signInService( data: AuthRequest){
    
    
    this.subscription = this.service.signIn( data ).subscribe({
      next: ( resp ) => {

        
        if( resp.status ){          
          alert( resp.message );
          this.router.navigate(['/'])
        } else {          
          
          
        }
      }, 
      error: ( err ) => {
        alert( err.error.message );
        
        
        
      },
      complete: () => { 
        
      }
    })
  }

}



