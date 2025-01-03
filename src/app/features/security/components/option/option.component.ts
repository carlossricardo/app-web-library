import { Component, OnInit } from '@angular/core';
import { OptionService } from '../../services/option.service';
import {MenuItem} from 'primeng/api';
import { Option } from '../../interfaces/security.interface';
import { User } from '../../interfaces/user.interface';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/features/auth/services/auth.service';



@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  items: MenuItem[] = [];
  menu: Option[] = [];
  user: User | null = null;


  api = environment.apiUrl;   

  constructor(
    private optionService: OptionService,
    public authService: AuthService        
  ){




  }
  ngOnInit(): void {
    this.loadOptions();
    
  }

  loadOptions(){

    this.optionService.loadOptions().subscribe({

      next: ( resp ) => {
        
        this.menu = resp.data;
                let arrayMenu: MenuItem[] = [];
                for( let m of this.menu ){
                    let arrayMenuItem: MenuItem[] = []
                    if( !(m.children!.length == 0) ){
                        for( let mc of m.children! ){
                            if( mc.parent_id == m.id ){
                                let menuItems: MenuItem = {
                                    label: mc.name,
                                    
                                    icon: mc.icon,
                                    routerLink: mc.url != null ? [mc.url] : ['']
                                }
                                arrayMenuItem.push( menuItems );
                            }
                        }
                    }

                    m.children = [];

                    let menu: MenuItem = {
                        label: m.name,

                        icon: m.icon,                        
                        items: arrayMenuItem
                    }

                    

                    arrayMenu.push( menu );

                   

                }
                this.items = arrayMenu;  


      },
      error: ( err ) => {

      },
      complete: () => {

      }
    })
  }






}
