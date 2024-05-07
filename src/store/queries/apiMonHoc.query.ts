// Import the RTK Query methods from the React-specific entry point
import { MonHocType } from '@/src/components/table/MonHocTable';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = '245|ojZfnP5ukXbOYUzC4p7Fjo9fzQEPjim8ewkvsUtt5fef8d36';

export type ApiResponse<T> = {
    success: boolean;
    code: number;
    message: any;
    data: T;
};
export type PaginationApiResponseData<T> = {
    current_page: number;
    data: T[];
    from: number;
    to: number;
    last_page: number;
    per_page: number;
    total: number;
    [field: string]: unknown;
};
export const apiMonHocQuery = createApi({
    reducerPath: 'apiMonHoc',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getMonHoc: builder.query<PaginationApiResponseData<MonHocType>, number>({
            query: (page = 1) => `/monhoc/show?page=${page}`,
        }),

        addMonHoc: builder.mutation({
            query: (monHoc) => ({
                url: `/monhoc/create`,
                method: 'POST',
                body: monHoc,
            }),
        }),

        updateMonHoc: builder.mutation({
            query: ({ maMonHoc, ...body }) => ({
                url: `monhoc/update/${maMonHoc}`,
                method: 'PUT',
                body,
            }),
        }),

        deleteMonHoc: builder.mutation({
            query: (maMonHoc) => ({
                url: `monhoc/delete/${maMonHoc}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetMonHocQuery, useAddMonHocMutation, useUpdateMonHocMutation, useDeleteMonHocMutation } =
    apiMonHocQuery;
