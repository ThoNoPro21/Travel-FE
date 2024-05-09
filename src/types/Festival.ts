import { imagesJson } from "./Article";
import { locationType } from "./Location";

export type festivalType = {
    festivals_id:number;
    name:string;
    description:string;
    address:string;
    start_date:Date;
    end_date:Date;
    price:number;
    images:imagesJson;
    listImg?:any[]
    avatar?: any[];
    location:locationType;
    status:number
}