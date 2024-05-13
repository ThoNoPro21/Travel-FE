// Import the RTK Query methods from the React-specific entry point
import { ApiResponse, PaginationApiResponseData } from '@/src/types/ApiRespone';
import { ResponsePlaceById } from '@/src/types/Place';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from '../slices/auth.slice';
import { RootState } from '../store';
import { festivalType } from '@/src/types/Festival';

export const apiFestivalQuery = createApi({
    reducerPath: 'apiFestival',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://travel-be-deploy-production.up.railway.app/api/v1',
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
        getFestival: builder.query<ApiResponse<PaginationApiResponseData<festivalType>>, number[]>({
            query: ([type, page]) => `festival/show?page=${page}&type=${type}`,
        }),
        addFestival: builder.mutation({
            query: (data) => ({
                url: 'festival/add',
                method: 'POST',
                body: data,
            }),
        }),
        getFestivalById: builder.query<ApiResponse<festivalType>, number>({
            query: (id) => ({
                url: `festival/show/${id}`,
            }),
        }),
        getFestivalByMonth: builder.query<ApiResponse<PaginationApiResponseData<festivalType>>, number[]>({
            query: ([id, page]) => `festival/show/month/${id}?page=${page}`,
        }),

        updateStatusFestival: builder.mutation({
            query: ([id, data]) => ({
                url: `festival/updateStatus/${id}`,
                method: 'POST',
                body: data,
                headers: {
                    'X-HTTP-Method-Override': 'PUT',
                },
            }),
        }),
        deleteFestival: builder.mutation({
            query: (id) => ({
                url: `festival/delete/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetFestivalQuery,
    useGetFestivalByIdQuery,
    useAddFestivalMutation,
    useGetFestivalByMonthQuery,
    useUpdateStatusFestivalMutation,
    useDeleteFestivalMutation,
} = apiFestivalQuery;
