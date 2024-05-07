"use client"
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { apiMonHocQuery } from '../queries/apiMonHoc.query';

interface dataMonHocState {
    dataMonHoc:any[];
}

const initialState: dataMonHocState = {
    dataMonHoc: [],
};

export const monHocSlice = createSlice({
    name: 'dataMonHoc',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(apiMonHocQuery.endpoints.getMonHoc.matchFulfilled, (state, action) => {
            state.dataMonHoc = action.payload?.data;
        });
    },
});

export default monHocSlice.reducer