import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
    MenuId:number,
    search:string |null;
};

const initialState: State = {
    MenuId:0,
    search:''
};

export const placeSlice = createSlice({
    name: 'dataPlace',
    initialState,
    reducers: {
        setMenuId: (state, action: PayloadAction<number>) => {
            state.MenuId = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search=action.payload;
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
export const {setMenuId, setSearch } = placeSlice.actions;
export default placeSlice.reducer;
