



import { ShelveObject } from "./shelve";

export interface ZoneObject {
  id:number;
  warehouseId:number;
  visible:boolean;
  remove:boolean;
  shelves:ShelveObject[];
  shelvesAdd:number;
}
