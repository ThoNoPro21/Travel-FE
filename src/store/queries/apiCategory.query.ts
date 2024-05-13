// Import the RTK Query methods from the React-specific entry point
import { ApiResponse } from '@/src/types/ApiRespone';
import { categoryType } from '@/src/types/Product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from '../slices/auth.slice';
import { RootState } from '../store';

export const apiCategoryQuery = createApi({
    reducerPath: 'apiCategory',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://travel-be-deploy-production.up.railway.app/api/v1',
        prepareHeaders: (headers,{getState}) => {
            headers.set('Accept', 'application/json');
            const token = selectToken(getState() as RootState);
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCategory: builder.query<ApiResponse<categoryType[]>, string>({
            query: () => 'category/show',
        }),
        addCategory: builder.mutation({
            query: (data) => ({
                url: 'category/add',
                method: 'POST',
                body: data,
            }),
        }),


        // updateMonHoc: builder.mutation({
        //     query: ({ maMonHoc, ...body }) => ({
        //         url: `monhoc/update/${maMonHoc}`,
        //         method: 'PUT',
        //         body,
        //     }),
        // }),

        // deleteMonHoc: builder.mutation({
        //     query: (maMonHoc) => ({
        //         url: `monhoc/delete/${maMonHoc}`,
        //         method: 'DELETE',
        //     }),
        // }),
    }),
});

export const {useAddCategoryMutation,useGetCategoryQuery } = apiCategoryQuery;
