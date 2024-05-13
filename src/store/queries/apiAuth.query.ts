// Import the RTK Query methods from the React-specific entry point
import { loginType, registerType } from '@/src/types/Auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userType } from '@/src/types/User';
import { selectToken } from '../slices/auth.slice';
import { RootState } from '../store';
import { ApiResponse } from '@/src/types/ApiRespone';

export const apiAuthQuery = createApi({
    reducerPath: 'apiAuth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://travel-be-deploy-production.up.railway.app/',
        prepareHeaders: (headers, { getState }) => {
            headers.set('Accept', 'application/json');
            const token = selectToken(getState() as RootState);
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getToken: builder.query({
            query: () => 'sanctum/csrf-cookie',
        }),
        register: builder.mutation({
            query: (data: registerType) => ({
                url: 'api/v1/register',
                method: 'POST',
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data: loginType) => ({
                url: 'api/v1/login',
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.query<ApiResponse<any>, any>({
            query: () => 'api/v1/logout',
        }),
        getMe: builder.query<ApiResponse<userType>, any>({
            query: () => ({
                url: 'api/v1/me',
                headers: {
                    Accept: `application/json`,
                    Authorization: `Bearer ${localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || '') : ''} `,
                },
            }),
        }),
        updateProfile: builder.mutation({
            query: ([id, data]) => ({
                url: `api/v1/user/updateProfile/${id}`,
                method: 'POST',
                body: data,
                headers: {
                    'X-HTTP-Method-Override': 'PUT',
                },
            }),
        }),

        // deleteMonHoc: builder.mutation({
        //     query: (maMonHoc) => ({
        //         url: `monhoc/delete/${maMonHoc}`,
        //         method: 'DELETE',
        //     }),
        // }),
    }),
});

export const {
    useGetTokenQuery,
    useRegisterMutation,
    useGetMeQuery,
    useLoginMutation,
    useUpdateProfileMutation,
    useLogoutQuery,
} = apiAuthQuery;
