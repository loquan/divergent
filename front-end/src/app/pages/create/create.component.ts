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
  constructor(private service:WarehouseDataService,private http:HttpClient,private refresh:ChangeDetectorRef){

  }

  totalZone:number=10;
  ngOnInit(){
    console.log("init");
    this.getWarehouse();
  }
  addWarehouse(){

        this.service.addWarehouse().subscribe( data =>{


          let info=data;
          this.warehouses=info;
          let lastIndex=this.warehouses.length-1;
          let newId=this.warehouses[lastIndex].id;

          this.addZone(newId,lastIndex,this.totalZone);

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
      if(this.warehouses[index].zones==null)
      {
          this.getZone(this.warehouses[index].id,index);
      }

    }

  }

  addZone(WareHouseId:number,index:number,amount:number)
  {

    this.service.addZone(WareHouseId,amount).subscribe( data =>{
      let info=data;
      this.warehouses[index].zones=data;
      // let zoneArray = this.warehouses[index].zones;


      // for(let ware in data) {
      //   console.log(" :"+ware);
      //   zoneArray.push(data[ware]);

      // }




    })

  }
   getZone(WareHouseId:number,index:number){

      this.service.getZone(WareHouseId).subscribe(data =>{
      try {
            let zones:ZoneObject[]=[];
            for(let ware in data) {
              console.log(" :"+ware);
              zones.push(data[ware]);
            }
            this.warehouses[index].zones=zones;
      }
      catch (error) {
          console.error('Here is the error message', error);
      }

     });

  }

  async deleteZone(warehouseIndex:number,zoneIndex:number){
    let warehouseId=this.warehouses[warehouseIndex].id;
    let zoneId=this.warehouses[warehouseIndex].zones[zoneIndex].id;
    let finish=await this.service.deleteZone(warehouseId,zoneId).subscribe( data=>{
      let finish=data;
    });

    this.getZone(warehouseId,warehouseIndex);


  }

   deleteZonePost(warehouseIndex:number,zoneIndex:number){
    let warehouseId=this.warehouses[warehouseIndex].id;
    let zoneId=this.warehouses[warehouseIndex].zones[zoneIndex].id;
    this.service.deleteZonePost(warehouseId,zoneId).subscribe( data=>{
      let finish=data;
      this.getZone(warehouseId,warehouseIndex);
    });




  }
  toggleZone(indexWarehouse:number,indexZone:number){
    this.warehouses[indexWarehouse].zones[indexZone].visible=!this.warehouses[indexWarehouse].zones[indexZone].visible;

  }

  addShelves(warehouseIndex:number,zoneIndex:number)
  {

    let maxShelves=10;

    let currentSize=0;
    let newShelves= this.warehouses[warehouseIndex].zones[zoneIndex].shelvesAdd;
    let maxAdd=maxShelves-currentSize;

    if(this.warehouses[warehouseIndex].zones[zoneIndex].shelves==null)
        this.warehouses[warehouseIndex].zones[zoneIndex].shelves=[]
    else
      currentSize=this.warehouses[warehouseIndex].zones[zoneIndex].shelves.length;

    if(newShelves>maxAdd)
    {
      newShelves=maxAdd;
      this.warehouses[warehouseIndex].zones[zoneIndex].shelvesAdd=maxAdd;
    }
    for(let i=0;i<newShelves;i++)
    {
      let shelve:ShelveObject={ id:-1,
        shelveName:"",
        zoneId:this.warehouses[warehouseIndex].zones[zoneIndex].id,
        remove:false
       };
       this.warehouses[warehouseIndex].zones[zoneIndex].shelves.push(shelve);

    }

  }

  checkIfShelveNameExistForNew(name:string){

  }

  checkIfShelveNameExistForExisting(name:string){

  }
  saveAllShelve(warehouseIndex:number,zoneIndex:number){

    this.saveNewShelve(warehouseIndex,zoneIndex);

  }

  async saveNewShelve(warehouseIndex:number,zoneIndex:number){

    let names:string[]=[];
    let wareHouseId=this.warehouses[warehouseIndex].id;
    let zoneId=this.warehouses[warehouseIndex].zones[zoneIndex].id;
    let shelves=this.warehouses[warehouseIndex].zones[zoneIndex].shelves;

    shelves.map( (data) =>{
        if(data.id<0 && data.shelveName!=null && data.shelveName.length>0)//intialize -1
        {
           names.push(data.shelveName);
        }

    })


    if(names.length)
      await this.service.saveShelveNameNew(zoneId,names).subscribe( data =>{

        let addCount=0;
        for(let i=0;i<shelves.length;i++)
        {
            if(shelves[i].id==-1)
            {
              shelves[i]=data[addCount++];

            }
        }

      });

  }

  updateAllShelve(warehouseIndex:number,zoneIndex:number){


  }

  saveShelve(warehouseIndex:number,zoneIndex:number,shelveId:number){

  }
  getShelves(WareHouseIndex:number,ZoneIndex:number){

      let ZoneId=this.warehouses[WareHouseIndex].zones[ZoneIndex].id;
      this.service.getShelves(ZoneId).subscribe(data =>{
          try {
                let result=data;
                let newShelve:ShelveObject[]=[];

                this.warehouses[WareHouseIndex].zones[ZoneIndex].shelves=newShelve;

                for(let i in data)
                {

                  this.warehouses[WareHouseIndex].zones[ZoneIndex].shelves.push(data[i]);

                }

                this.refresh.detectChanges()
          }
          catch (error) {
              console.error('Here is the error message', error);
          }

     });

  }

  deleteAllShelvesPost(warehouseIndex:number,zoneIndex:number){

  }
   deleteShelvePost(warehouseIndex:number,zoneIndex:number,shelveIndex:number){
    let warehouseId=this.warehouses[warehouseIndex].id;
    let zoneId=this.warehouses[warehouseIndex].zones[zoneIndex].id;
    this.service.deleteZonePost(warehouseId,zoneId).subscribe( data=>{
      let finish=data;
      this.getZone(warehouseId,warehouseIndex);
    });




  }

}
