import { imagesJson } from './Article';
import { locationType } from './Location';
import { productType } from './Product';

export type placeType = {
    places_id: number;
    name: string;
    location_name?: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    location: locationType;
    images: imagesJson;
    listImg?: any[];
    avatar?: any[];
    items: any;
};
export type ResponseLocation_Place = {
    locations_id: number;
    name: string;
    products: productType[];
};
export type ResponsePlaceById = {
    address: string;
    name:string;
    description: string;
    images: imagesJson;
    location: ResponseLocation_Place;
};
