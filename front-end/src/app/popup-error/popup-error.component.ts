import { Component,OnInit, Inject  } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-popup-error',
  templateUrl: './popup-error.component.html',
  styleUrls: ['./popup-error.component.css']
})
export class PopupErrorComponent {


  errorStack:any[]=[];
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}

  ngOnInit() {

    for(let i in this.data){

      for(let x in this.data[i])
      {
        if(this.data[i][x]!=null)
          this.errorStack.push(this.data[i][x])
      }


    }

 }

}
