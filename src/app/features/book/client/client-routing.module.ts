import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookClientComponent } from './views/book-client/book-client.component';

const routes: Routes = [


  {
    path: 'client',
    component: BookClientComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
