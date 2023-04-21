import { Component } from '@angular/core';
import { MenuObject } from '../models/menu';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuList: MenuObject[]=[
    {title:'Search',
     icon:'search',
     routePath:'search',
     active:'active'
    },
    {title:'Create',
     icon:'edit',
     routePath:'create',
     active:''
    },


  ];
  constructor() { }


  setActive(index:number){
    this.menuList.map( (object,i)=>{
        if(i==index)
          object.active='active';
        else
          object.active='';

    });

  }
}
