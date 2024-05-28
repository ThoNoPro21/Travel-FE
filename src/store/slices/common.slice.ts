import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getArticleType } from '@/src/types/Article';

type State = {
    selectedKeys: string;
    listPost: getArticleType[];
    selectedMenuHeader: string;
    showHeader: boolean;
};

const initialState: State = {
    listPost: [],
    selectedKeys: '/dashboard/',
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
        setHeader: (state) => {
            state.showHeader = false;
        },
    },
    extraReducers: (builder) => {},
});
export const { setSelectedKeys, setSelectedMenuHeader, setHeader } = commonSlice.actions;
export default commonSlice.reducer;
