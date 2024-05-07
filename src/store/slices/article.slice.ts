
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { apiArticleQuery } from '../queries/apiArticle.query';
import { getArticleType } from '@/src/types/Article';

type State = {
    countPostPending: number;
};

const initialState: State = {
    countPostPending:0
};

export const articleSlice = createSlice({
    name: 'dataArticle',
    initialState,
    reducers: {
        setCountPostPending: (state,action:PayloadAction<number>)=>{
            state.countPostPending=action.payload
        }
    },
    extraReducers: (builder) => {
    },
});
export const {setCountPostPending} = articleSlice.actions;
export default articleSlice.reducer;
