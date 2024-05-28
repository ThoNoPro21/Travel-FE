import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { apiProductQuery } from '../queries/apiProduct.query';
import { productInCart, productType } from '@/src/types/Product';
import { DataTypeProductInCart } from '@/src/app/product/cart/page';

type State = {
    isSuccess: boolean;
    productSelected?: DataTypeProductInCart[];
    cart: productInCart[];
    search:string |null;
    MenuId:number;
};

const initialState: State = {
    isSuccess: false,
    productSelected: undefined,
    cart: [],
    search:'',
    MenuId:0,
};

export const productSlice = createSlice({
    name: 'dataProduct',
    initialState,
    reducers: {
        addProductSelected: (state, action: PayloadAction<DataTypeProductInCart[]>) => {
            state.productSelected=action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search=action.payload;
        },
        setMenuId: (state, action: PayloadAction<number>) => {
            state.MenuId = action.payload;
        },
    //     deleteCart: (state, action: PayloadAction<number>) => {
    //         state.cart = state.cart.filter((product) => product.product_id !== action.payload);
    //     },
    //     increaseQuantity: (state, action: PayloadAction<number>) => {
    //         const product = state.cart.find((product) => product.product_id === action.payload);
    //         if (product && product?.quantity > 0 && product?.quantity < 10) {
    //             const updatedProduct = { ...product, quantity: product.quantity + 1 };
    //             const updatedCart = state.cart.map((item) =>
    //                 item.product_id === action.payload ? updatedProduct : item
    //             );
    //             state.cart = updatedCart;
    //         }
    //     },
    //     decreaseQuantity: (state, action: PayloadAction<number>) => {
    //         const product = state.cart.find((product) => product.product_id === action.payload);
    //         if (product && product?.quantity > 1 && product?.quantity <= 10) {
    //             const updatedProduct = { ...product, quantity: product.quantity - 1 };
    //             const updatedCart = state.cart.map((item) =>
    //                 item.product_id === action.payload ? updatedProduct : item
    //             );
    //             state.cart = updatedCart;
    //         }
    //     },
    },
    extraReducers: (builder) => {
        // builder.addMatcher(apiProductQuery.endpoints.getProductByCategory.matchFulfilled, (state, action) => {
        //     state.productById = action?.payload.data;
        // });
        builder.addMatcher(apiProductQuery.endpoints.addToCart.matchFulfilled, (state, action) => {
            state.isSuccess = true;
        });
        builder.addMatcher(apiProductQuery.endpoints.addOrders.matchFulfilled, (state, action) => {
            state.isSuccess = true;
        });
    },
});
// export const { addCart, deleteCart, increaseQuantity, decreaseQuantity } = productSlice.actions;
export const { addProductSelected, setSearch, setMenuId } = productSlice.actions;
export default productSlice.reducer;
