import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getArticleType } from '@/src/types/Article';
import { apiCommonQuery } from '../queries/apiCommon.query';

type State = {
    selectedKeys: string;
    listPost: getArticleType[];
    MenuId: number;
};

const initialState: State = {
    listPost: [],
    selectedKeys: '/dashboard/',
    MenuId: 0,
};

export const commonSlice = createSlice({
    name: 'dataCommon',
    initialState,
    reducers: {
        setSelectedKeys: (state, action: PayloadAction<string>) => {
            state.selectedKeys = action.payload;
        },
        setMenuId: (state, action: PayloadAction<number>) => {
            state.MenuId = action.payload;
        },
    },
    extraReducers: (builder) => {
    },
});
export const { setSelectedKeys,setMenuId } = commonSlice.actions;
export default commonSlice.reducer;
