import { imagesJson } from "./Article";

export type productType = {
    products_id: number;
    name: string;
    description: string;
    price: number;
    price_sale?: number;
    quantity: number;
    category_id?: number;
    location_id?: number;
    images: imagesJson;
    listImg?:any[]
    avatar?: any[];
};

export type categoryType = {
    categories_id: number;
    name: string;
};

export type productInCart = {
    carts_id: number;
    price: number;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    products:productType;
    quantity:number
};
