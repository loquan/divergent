import { Component ,OnInit} from '@angular/core';
import { WarehouseDataService } from '../../warehouse-data.service';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  warehouse:any;
  constructor(private service:WarehouseDataService,private http:HttpClient){

  }


  ngOnInit(){
    console.log("init");
    //this.getWarehouse();
  }
  addWarehouse(){
      this.service.addWarehouse().subscribe( data =>{
        let info=data;
        this.warehouse=info;
      })
  }

  getWarehouse(){

      this.service.getWarehouse().subscribe(data =>{
        try {
             this.warehouse=data;
        }
        catch (error) {
            console.error('Here is the error message', error);
        }

      });
      // console.log("start");
      //  this.http.get<any>('http://localhost:3000/api/warehouse').subscribe( data =>{
      //    try { this.warehouse=data;
      //          console.log("found");
      //    }
      //    catch (error) {
      //     console.error('Here is the error message', error);
      //    }
      //  });
    // this.service.getWarehouse().subscribe( data =>{
    //   let info=data;
    //   return info;
    // })
  }
}
