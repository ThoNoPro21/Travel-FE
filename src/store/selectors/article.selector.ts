import { orderByUser } from "@/src/types/Product";
import { RootState } from "../store";


export const selectOrderByStatus = (state:RootState, payload: number): orderByUser[] | [] => {
    const result = state.dataProduct.listOrderByUser?.filter((order: orderByUser) => order.status === payload);
    return result;
};