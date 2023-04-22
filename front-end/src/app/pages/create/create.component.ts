import { Component ,OnInit} from '@angular/core';
import { WarehouseDataService } from '../../warehouse-data.service';
import { WarehouseObject} from "../../models/warehouse"
import { ZoneObject} from "../../models/zone"
import { ShelveObject} from "../../models/shelve"
import { HttpClient  } from '@angular/common/http';
import { ChangeDetectorRef }  from '@angular/core'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  warehouses:WarehouseObject[]=[];
  constructor(private service:WarehouseDataService,private http:HttpClient){

  }


  ngOnInit(){
    console.log("init");
    this.getWarehouse();
  }
  addWarehouse(){
      this.service.addWarehouse().subscribe( data =>{
        let info=data;
        this.warehouses=info;

      })
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

  async deleteWarehouse (id:number){
    console.log("start deleting");
      await this.service.deleteWarehouse(id).subscribe(data =>{
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
  deleteWarehousePost (id:number){
    console.log("start deleting");
      this.service.deleteWarehousePost(id).subscribe(data =>{
      try {
        console.log("dddelete"+data);
        let temp=data;
        this.getWarehouse();

      }
      catch (error) {
          console.error('Here is the error message', error);
      }
     });

     console.log("end deleting");

  }

  toggleWarehouse(index:number){
    this.warehouses[index].visible=!this.warehouses[index].visible;
    if(this.warehouses[index].visible==true)
    {
      if(this.warehouses[index].zone==null)
      {
          this.getZone(this.warehouses[index].id,index);
      }

    }

  }

  addZone(WareHouseId:number,index:number)
  {

    this.service.addZone(WareHouseId).subscribe( data =>{
      let info=data;
      this.warehouses[index].zone=[];
      let zoneArray = this.warehouses[index].zone;


      for(let ware in data) {
        console.log(" :"+ware);
        zoneArray.push(data[ware]);

      }




    })

  }
   getZone(WareHouseId:number,index:number){

      this.service.getZone(WareHouseId).subscribe(data =>{
      try {
            let zone:ZoneObject[]=[];
            for(let ware in data) {
              console.log(" :"+ware);
              zone.push(data[ware]);
            }
            this.warehouses[index].zone=zone;
      }
      catch (error) {
          console.error('Here is the error message', error);
      }

     });

  }

  async deleteZone(warehouseIndex:number,zoneIndex:number){
    let warehouseId=this.warehouses[warehouseIndex].id;
    let zoneId=this.warehouses[warehouseIndex].zone[zoneIndex].id;
    let finish=await this.service.deleteZone(warehouseId,zoneId).subscribe( data=>{
      let finish=data;
    });

    this.getZone(warehouseId,warehouseIndex);


  }

   deleteZonePost(warehouseIndex:number,zoneIndex:number){
    let warehouseId=this.warehouses[warehouseIndex].id;
    let zoneId=this.warehouses[warehouseIndex].zone[zoneIndex].id;
    this.service.deleteZonePost(warehouseId,zoneId).subscribe( data=>{
      let finish=data;
      this.getZone(warehouseId,warehouseIndex);
    });




  }
  toggleZone(indexWarehouse:number,indexZone:number){
    this.warehouses[indexWarehouse].zone[indexZone].visible=!this.warehouses[indexWarehouse].zone[indexZone].visible;

  }
}
