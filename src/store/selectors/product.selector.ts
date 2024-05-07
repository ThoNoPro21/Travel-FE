import { productType } from '@/src/types/Product';
import { RootState } from '../store';

export const selectProductById = (state: RootState, payload: string): productType | undefined => {
    const result = state.dataProduct.productById.find((product: productType) => product.products_id === parseInt(payload,10));
    return result;
};
