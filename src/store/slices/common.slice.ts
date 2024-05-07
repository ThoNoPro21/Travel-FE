import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getArticleType } from '@/src/types/Article';

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
        // builder.addMatcher(apiArticleQuery.endpoints.addPost.matchPending, (state, action) => {
        //     state.isFetching = true;
        // });
        // builder.addMatcher(apiArticleQuery.endpoints.addPost.matchFulfilled, (state, action) => {
        //     state.isFetching = false;
        //     state.content='';
        // });
        // builder.addMatcher(apiArticleQuery.endpoints.addPost.matchRejected, (state, action) => {
        //     state.isFetching = false;
        // });
        // builder.addMatcher(apiArticleQuery.endpoints.getPost.matchFulfilled, (state, action) => {
        //     state.listPost = action?.payload?.data;
        // });
    },
});
export const { setSelectedKeys,setMenuId } = commonSlice.actions;
export default commonSlice.reducer;
