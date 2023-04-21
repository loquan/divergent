import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

}
