import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { apiArticleQuery } from '../queries/apiArticle.query';
import { placeType } from '@/src/types/Place';

type State = {};

const initialState: State = {};

export const placeSlice = createSlice({
    name: 'dataPlace',
    initialState,
    reducers: {},
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
export default placeSlice.reducer;
