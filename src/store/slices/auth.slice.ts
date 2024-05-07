import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { apiAuthQuery } from '../queries/apiAuth.query';
import { userType } from '@/src/types/User';
import { RootState } from '../store';

type State = {
    isStatus: boolean;
    isLogin: boolean;
    token:string;
    user?:userType;
};

const initialState: State = {
    isStatus: false,
    isLogin: false,
    token:'',
    user:undefined,
};

export const authSlice = createSlice({
    name: 'dataAuth',
    initialState,
    reducers: {
        setLogin: (state) => {
            state.isLogin = true;
        },setStatus: (state) => {
            state.isStatus = true;
        },
        setToken: (state,action:PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUser: (state,action:PayloadAction<userType | undefined>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(apiAuthQuery.endpoints.login.matchFulfilled, (state, action) => {
            state.isLogin=true;
            state.token = action.payload.token;
            localStorage.setItem('token', JSON.stringify(action.payload.token));
        });

        builder.addMatcher(apiAuthQuery.endpoints.getMe.matchFulfilled, (state, action) => {
            state.isLogin = true;
            state.token =  JSON.parse(localStorage.getItem('token')||'');
            state.user=action.payload?.data
        });
        builder.addMatcher(apiAuthQuery.endpoints.getMe.matchRejected, (state, action) => {
            state.isLogin = false;
        });
    },
});
export const { setLogin,setToken,setStatus,setUser } = authSlice.actions;
export const selectToken = (state: RootState) => state.dataAuth.token;
export default authSlice.reducer;
