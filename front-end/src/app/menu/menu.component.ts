import { Component } from '@angular/core';
import { MenuObject } from '../models/menu';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  DisplayTitle:String="ADD WAREHOUSE, ZONE, and SHELVES";
  menuList: MenuObject[]=[
    {title:'Create',
     icon:'edit',
     routePath:'create',
     active:'active'
    },
    {title:'Search',
     icon:'search',
     routePath:'search',
     active:''
    },



  ];
  constructor() { }


  setActive(index:number){
    this.menuList.map( (object,i)=>{


        if(i==index)
        {
          this.DisplayTitle="SEARCH SHELVE";
          object.active='active';

        }
        else{
          this.DisplayTitle="ADD WAREHOUSE, ZONE, and SHELVES";

          object.active='';
        }


    });

  }
}
