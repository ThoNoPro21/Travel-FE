// Import the RTK Query methods from the React-specific entry point
import { ApiResponse } from '@/src/types/ApiRespone';
import { getArticleType, topicType } from '@/src/types/Article';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from '../slices/auth.slice';
import { RootState } from '../store';
import { locationType } from '@/src/types/Location';

export const apiLocationQuery = createApi({
    reducerPath: 'apiLocation ',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://travel-be-deploy-production.up.railway.app/api/v1/',
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
        addLocation: builder.mutation({
            query: (data) => ({
                url: 'location/add',
                method: 'POST',
                body: data,
            }),
        }),
        getLocation: builder.query<ApiResponse<locationType[]>, any>({
            query: () => 'location/show',
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

export const { useGetLocationQuery,  useAddLocationMutation} = apiLocationQuery;
