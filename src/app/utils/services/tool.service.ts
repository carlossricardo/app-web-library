import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ToolService {

  api = environment.apiUrl;   
  http = inject(HttpClient);


  getFile(folder : string, file : string) {
    const url = `${this.api}/files/getFile/${folder}/${file}`;
    return url;
  }

  subirArchivo(file: any, folder: string): Observable<any> {
    const urlCompleta = `${this.api}/upload`;
    const formData = new FormData();
    formData.append('file', file, file.name); 
    formData.append('folder', folder); 

    
    return this.http.post<any>(urlCompleta, formData);
  }


  uploadFiles( files: Array<File>, folder: string ){
    const urlCompleta = `${this.api}/upload`;
    let formdata = new FormData();
    
    if(files){
      for(let i = 0; i < files.length; i++){
        formdata.append('file', files[i], files[i].name);
     }
    }
    
    formdata.append('folder', folder);
    return this.http.post<any>(urlCompleta, formdata);
  }
 

}
