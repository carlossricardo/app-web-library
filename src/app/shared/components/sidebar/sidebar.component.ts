import { Component, ElementRef } from '@angular/core';
// import { OptionComponent } from 'src/app/features/security/components/option/option.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {



  constructor(


    public el: ElementRef,
  ){

  }

}
