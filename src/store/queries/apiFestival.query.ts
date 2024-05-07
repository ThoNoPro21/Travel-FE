// Import the RTK Query methods from the React-specific entry point
import { ApiResponse, PaginationApiResponseData } from '@/src/types/ApiRespone';
import { ResponsePlaceById } from '@/src/types/Place';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from '../slices/auth.slice';
import { RootState } from '../store';
import { festivalType } from '@/src/types/Festival';

export const apiFestivalQuery =createApi({
    reducerPath: 'apiFestival',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api/v1',
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
        getFestival: builder.query<ApiResponse<festivalType[]>, string>({
            query: () => 'festival/show',
        }),
        addFestival: builder.mutation({
            query: (data) => ({
                url: 'festival/add',
                method: 'POST',
                body: data,
            }),
        }),
        getFestivalById: builder.query<ApiResponse<festivalType>,number>({
            query: (id) => ({
                url: `festival/show/${id}`,
            }),
        }),
        getFestivalPagination: builder.query<ApiResponse<PaginationApiResponseData<festivalType>>, number[]>({
            query: ([id,page]) => `festival/show/month/${id}?page=${page}`,
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

export const {useGetFestivalQuery ,useGetFestivalByIdQuery, useAddFestivalMutation ,useGetFestivalPaginationQuery} = apiFestivalQuery;