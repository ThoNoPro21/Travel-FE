import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
    MenuId:number,
};

const initialState: State = {
    MenuId:0
};

export const festivalSlice = createSlice({
    name: 'dataFestival',
    initialState,
    reducers: {
        setMenuId: (state, action: PayloadAction<number>) => {
            state.MenuId = action.payload;
        },
    },
    extraReducers: (builder) => {
      
    },
});
export const {setMenuId } = festivalSlice.actions;
export default festivalSlice.reducer;
