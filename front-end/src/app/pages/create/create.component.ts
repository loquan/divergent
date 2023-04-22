import { Component ,OnInit} from '@angular/core';
import { WarehouseDataService } from '../../warehouse-data.service';
import { WarehouseObject} from "../../models/warehouse"
import { HttpClient  } from '@angular/common/http';
import { ChangeDetectorRef }  from '@angular/core'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  warehouses:WarehouseObject[]=[{id:1,visible:false},{id:2,visible:false}];
  constructor(private service:WarehouseDataService,private http:HttpClient){

  }


  ngOnInit(){
    console.log("init");

  }
  addWarehouse(){
      this.service.addWarehouse().subscribe( data =>{
        let info=data;
        this.warehouses=info;

      })
  }

  deleteWarehouse (id:number){
    console.log("start deleting");
      this.service.deleteWarehouse(id).subscribe(data =>{
      try {
        console.log("dddelete"+data);
        let temp=data;
        //this.getWarehouse();

      }
      catch (error) {
          console.error('Here is the error message', error);
      }
     });
     this.getWarehouse();
     console.log("end deleting");

  }
  getWarehouse(){

      this.service.getWarehouse().subscribe(data =>{
        try {
              this.warehouses=[];
              for(let ware in data) {
                console.log(" :"+ware);
                this.warehouses.push(data[ware]);

              }
        }
        catch (error) {
            console.error('Here is the error message', error);
        }

       });

  }
}
