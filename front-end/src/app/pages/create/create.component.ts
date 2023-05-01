import { Component ,OnInit} from '@angular/core';
import { WarehouseDataService } from '../../warehouse-data.service';
import { WarehouseObject} from "../../models/warehouse"
import { ZoneObject} from "../../models/zone"
import { ShelveObject} from "../../models/shelve"
import { HttpClient  } from '@angular/common/http';
import { ChangeDetectorRef }  from '@angular/core'
import { MatDialog} from '@angular/material/dialog';
import { PopupErrorComponent } from 'src/app/popup-error/popup-error.component';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  warehouses:WarehouseObject[]=[];
  constructor(private service:WarehouseDataService,private http:HttpClient,private refresh:ChangeDetectorRef,private dialog:MatDialog){

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
    if(this.warehouses[warehouseIndex].zones[zoneIndex].shelvesAdd==null)
      this.warehouses[warehouseIndex].zones[zoneIndex].shelvesAdd=1;

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

  checkIfShelveNameExistForNew(name:string[]){



  }

  checkIfShelveNameExistForExisting(name:string){

  }
  async saveAllShelve(warehouseIndex:number,zoneIndex:number){

    if(this.checkIfGroupAreSame(warehouseIndex,zoneIndex))
    {
        //check update data can be saved
        await this.updateShelves(warehouseIndex,zoneIndex);

        //check if new version can be saved, it won't save if it already exist
        await this.saveNewShelve(warehouseIndex,zoneIndex);

    }

  }

  //this save one shevle only
  async saveShelve(warehouseIndex:number,zoneIndex:number,shelveIndex:number){


    let zoneId=this.warehouses[warehouseIndex].zones[zoneIndex].id;
    let shelves=this.warehouses[warehouseIndex].zones[zoneIndex].shelves;
    let shelveId=this.warehouses[warehouseIndex].zones[zoneIndex].shelves[shelveIndex].id;
    let name:string=this.warehouses[warehouseIndex].zones[zoneIndex].shelves[shelveIndex].shelveName;
    let names:string[]=[];
    let ids:number[]=[]

    names[0]=name;
    ids[0]=shelveId

    if(shelveId<=0)//new id
    {
     this.saveShelvesCheck(names,shelves,zoneId);
    }
    else
    {
      await this.service.updateShelves(zoneId,names,ids).subscribe( data =>{})

    }

  }


   //loops threw the list of items in shevles
   checkIfGroupAreSame(warehouseIndex:number,zoneIndex:number) {


    let shelves=this.warehouses[warehouseIndex].zones[zoneIndex].shelves;
    let arrayStackNames:number[]=[]
    for(let index in shelves){

      let name:any=shelves[index].shelveName;
      if(arrayStackNames[name]==null)
        arrayStackNames[name]=1;
      else{
        arrayStackNames[name]++;
        let alertString: string = "You are trying to save --"+name+"---shelve name more han once"
        alert(alertString);
        return false;
      }


    }
    return true;

   }
   saveShelvesCheck(names:string[],shelves:ShelveObject[],zoneId:number){

    // check if the you are saving the same group


    // check on all new Items
    this.service.checkIfShelveNameExist(names).subscribe( existingData=>
      {
          let result=existingData;
          if(existingData[0]==null)
          {
              this.service.saveShelveNameNew(zoneId,names).subscribe( data =>{
                    let addCount=0;
                    for(let i=0;i<shelves.length;i++)
                    {
                        if(shelves[i].id==-1)
                        {
                          shelves[i]=data[addCount++];
                        }
                    }

              });
          }else{
            //if name already exist show location
            let alertString="";
            for(let x=0;x<Object.keys(existingData).length;x++)
            {
              for(let i=0;i<existingData[x].length;i++)
              {
                alertString+="this already exist "+existingData[x][i].shelveName+"      ";

              }
            }

            //alert popup dialog
            this.dialog.open(PopupErrorComponent,{data:existingData});
            this.dialog.afterAllClosed.subscribe(()=>{

            })



        }
      });


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

    this.saveShelvesCheck(names,shelves,zoneId);


  }

  async updateShelves(warehouseIndex:number,zoneIndex:number){
    let names:string[]=[];
    let ids:number[]=[];
    let wareHouseId=this.warehouses[warehouseIndex].id;
    let zoneId=this.warehouses[warehouseIndex].zones[zoneIndex].id;
    let shelves=this.warehouses[warehouseIndex].zones[zoneIndex].shelves;
    let flag=true;
    shelves.map( (data) =>{
        if(data.id>-1 )//intialize -1
        {
           names.push(data.shelveName);
           ids.push(data.id);
        }

    })


    if(names.length)
    {

      //check if update existing name exist
       await this.service.checkIfShelveNameUpdateExist(names,ids).subscribe( existingData =>{
        if(existingData!=null )
        {

          this.dialog.open(PopupErrorComponent,{data:existingData});
          this.dialog.afterAllClosed.subscribe(()=>{})
          flag=false;
          return false;
        }

         this.service.updateShelves(zoneId,names,ids).subscribe( data =>{

           let addCount=0;
           for(let i=0;i<shelves.length;i++)
           {
               if(shelves[i].id==-1)
               {
                 shelves[i]=data[addCount++];

               }
           }

         });



         return flag;
    })


    }

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

    let warehouseId=this.warehouses[warehouseIndex].id;
    let zoneId=this.warehouses[warehouseIndex].zones[zoneIndex].id;
    let ids:number[]=[];

    for(let i=0;i<this.warehouses[warehouseIndex].zones[zoneIndex].shelves.length;i++)
    {
      let tempId=this.warehouses[warehouseIndex].zones[zoneIndex].shelves[i].id;
      if(tempId>-1)
        ids.push(this.warehouses[warehouseIndex].zones[zoneIndex].shelves[i].id);
    }

    this.warehouses[warehouseIndex].zones[zoneIndex].shelves=[];

    if(ids.length>0)
    {
      this.service.deleteShelvePost(ids).subscribe( data=>{
        let finish=data;
      });
    }



   }
   deleteShelvePost(warehouseIndex:number,zoneIndex:number,shelveIndex:number){


    let warehouseId=this.warehouses[warehouseIndex].id;
    let zoneId=this.warehouses[warehouseIndex].zones[zoneIndex].id;
    let shelveId=this.warehouses[warehouseIndex].zones[zoneIndex].shelves[shelveIndex].id;
    this.warehouses[warehouseIndex].zones[zoneIndex].shelves.splice(shelveIndex,1);

    if(zoneId>-1)
    {
      let ids:number[]=[]
      ids[0]=shelveId;
      this.service.deleteShelvePost(ids).subscribe( data=>{
        let finish=data;

      });


    }




  }

}
