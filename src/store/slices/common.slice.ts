import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getArticleType } from '@/src/types/Article';
import { apiCommonQuery } from '../queries/apiCommon.query';

type State = {
    selectedKeys: string;
    listPost: getArticleType[];
    MenuId: number;
    selectedMenuHeader: string;
    showHeader: boolean;
};

const initialState: State = {
    listPost: [],
    selectedKeys: '/dashboard/',
    MenuId: 0,
    selectedMenuHeader: '/',
    showHeader: true,
};

export const commonSlice = createSlice({
    name: 'dataCommon',
    initialState,
    reducers: {
        setSelectedKeys: (state, action: PayloadAction<string>) => {
            state.selectedKeys = action.payload;
        },
        setSelectedMenuHeader: (state, action: PayloadAction<string>) => {
            state.selectedMenuHeader = action.payload;
        },
        setMenuId: (state, action: PayloadAction<number>) => {
            state.MenuId = action.payload;
        },
        setHeader: (state) => {
            state.showHeader = false;
        },
    },
    extraReducers: (builder) => {},
});
export const { setSelectedKeys, setSelectedMenuHeader, setMenuId, setHeader } = commonSlice.actions;
export default commonSlice.reducer;
