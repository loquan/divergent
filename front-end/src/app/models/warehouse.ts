
import { ZoneObject} from "./zone"
export interface WarehouseObject {
  id:number;
  visible:boolean;
  remove:boolean;
  zones:ZoneObject[];
}
