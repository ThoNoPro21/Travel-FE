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

export type orderDetail ={
    order_details_id: number,
    quantity: number,
    total_amount: number,
    order_id: number,
    product_id: number,
    created_at: string,
    product:productType
}

export type orderByUser = {
    orders_id:number,
    address: string,
    phone_number:string,
    total_amount: number,
    note?: string,
    status: number,
    created_at: string,
    order_details:orderDetail[]
}
export type DataTypeProductInCart = {
    key: React.Key;
    name: string;
    price: number;
    quantity: number;
    avatar: string;
    product_id: number;
}