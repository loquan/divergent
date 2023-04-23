import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WarehouseDataService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }

  addWarehouse(){
   return this.http.post<any[]>('http://localhost:3000/api/warehouse',null);
  }

  getWarehouse():Observable<any>{
    return this.http.get<any[]>('http://localhost:3000/api/warehouse');
   }

   deleteWarehouse(idNumber:number):Observable<any>{
    const params = new HttpParams()
    .set('id', idNumber);

    return this.http.delete<any>('http://localhost:3000/api/warehouse', { params });
   }

   deleteWarehousePost(idNumber:number):Observable<any>{
    const params = new HttpParams()
    .set('id', idNumber)
    .set('command', "DELETE");

    return this.http.post<any[]>('http://localhost:3000/api/warehouse',params );
   }

   addZone(WarehouseId:number,total:number){

    const params = new HttpParams()
    .set('warehouseId', WarehouseId)
    .set('total', total);

    return this.http.post<any[]>('http://localhost:3000/api/zone',params);
   }


   getZone(WarehouseId:number):Observable<any>{
    const params = new HttpParams()
    .set('warehouseId', WarehouseId);

     return this.http.get<any[]>('http://localhost:3000/api/zone',{params});
    }

    deleteZone(WarehouseId:number,idNumber:number):Observable<any>{
     const params = new HttpParams()
     .set('warehouseId', WarehouseId)
     .set('zoneId',idNumber);

     return this.http.delete<any>('http://localhost:3000/api/zone', { params });
    }

    deleteZonePost(WarehouseId:number,idNumber:number):Observable<any>{
      const params = new HttpParams()
      .set('zonedId', idNumber)
      .set('command', "DELETE");

      return this.http.post<any[]>('http://localhost:3000/api/zone',  params );
     }

     getShelves(ZoneId:number):Observable<any>{
      const params = new HttpParams()
      .set('zoneId', ZoneId);

       return this.http.get<any[]>('http://localhost:3000/api/shelve',{params});
      }

     checkIfShelveNameExist(name:string):Observable<any>{
      const params = new HttpParams()
      .set('shelveName',name )
      .set('command', "exist");

      return this.http.post<any[]>('http://localhost:3000/api/shelve',  params );

     }


     saveShelveNameNew(zoneId:number,names:string[]):Observable<any>{
      const params = new HttpParams()
      .set('zoneId',zoneId)
      .set('shelveName',JSON.stringify(names))
      .set('command', "new");
      return this.http.post<any[]>('http://localhost:3000/api/shelve',  params )
     }

     updateShelveNameNewExist(name:string):Observable<any>{
      const params = new HttpParams()
      .set('shelveName',name )
      .set('command', "exist");

      return this.http.post<any[]>('http://localhost:3000/api/shelve',  params );

     }


}
