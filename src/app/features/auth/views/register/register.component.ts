import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FileSelectEvent } from 'primeng/fileupload';
import { cedulaEcuatorianaValidator } from 'src/app/shared/validators/ecuadorian-id.validator';
import { UserDto } from '../../interfaces/auth.interface';
import { ToolService } from 'src/app/utils/services/tool.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerForm!: FormGroup;

  selectedFile: any | null = null;


  files: File[] = [];


  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,    
    private toolService: ToolService,
    private confirmationService: ConfirmationService,
  ){

  }


  ngOnInit(): void {


    this.initForm();

    
  }

  onClickRegister(){

    if (!this.registerForm.valid) {      
      return;      
    } 

    const dto: UserDto = { ...this.registerForm.value }
    dto.profiles = ['STUDENT']    

    this.toolService.uploadFiles( this.files, 'users').subscribe({
      next: ( resp ) => {
        

        dto.image = resp.data;        

        this.authService.registerClient( dto ).subscribe({
          next: ( resp ) => {
    
            

            this.confirmationService.confirm({
              closeOnEscape: false,
              header: 'Mensaje del sistema',
              message: resp.message,
              accept: () => {
                  
                  this.router.navigate(['/']);
              },
              reject: () => {                  
              }
            });


            
    
          },
          error: ( err ) => {            
            
    
          },
          complete: ( ) => {
    
          }
        });
        
      },
      error: ( err ) => {

      },
      complete: () => {

      }
    });



    

  }


  initForm(){
    this.registerForm = this.formBuilder.group({
      identification: ['', [Validators.required, cedulaEcuatorianaValidator]],
      names: ['', [Validators.required]],
      surnames: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/) ]],
      email: ['', [Validators.required, Validators.email ]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z]).*$/),
        ]
      ],
      image: ['', []],
    });
  }

  choose(event: any, callback: any) {
    callback();
  }

  onSelect(event: FileSelectEvent) {

    if( event.files && event.files.length > 0 ){


      this.files = event.currentFiles;      
      this.registerForm.get('image')?.setValue(this.files[0].name);

    }
    
  }

  
  removeFile( removeFileCallback: any, index: any) {

    this.selectedFile = null;  
    this.registerForm.get('image')?.setValue('a9584a1f-840b-4cb8-966b-79f4692aae37_20241226_124831.jpg'); 
    removeFileCallback(event, index);

    
  }

  fieldsValidate(campo: string){
    return this.registerForm.get(campo)?.invalid && this.registerForm.get(campo)?.touched && this.registerForm.get(campo)?.dirty;
  }



}
