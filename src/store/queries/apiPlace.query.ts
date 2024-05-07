// Import the RTK Query methods from the React-specific entry point
import { ApiResponse, PaginationApiResponseData } from '@/src/types/ApiRespone';
import { ResponsePlaceById, placeType } from '@/src/types/Place';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from '../slices/auth.slice';
import { RootState } from '../store';
import { productType } from '@/src/types/Product';
import { festivalType } from '@/src/types/Festival';
import { commentType, getArticleType } from '@/src/types/Article';

export const apiPlaceQuery = createApi({
    reducerPath: 'apiPlace',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api/v1',
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
        getAll_Place: builder.query<ApiResponse<placeType[]>, string>({
            query: () => 'place/show',
        }),
        addPlace: builder.mutation({
            query: (place) => ({
                url: 'place/add',
                method: 'POST',
                body: place,
            }),
        }),
        getPlaceById: builder.query<ApiResponse<placeType[]>, number>({
            query: (id) => ({
                url: `place/show/${id}`,
            }),
        }),
        getProductByPlace: builder.query<ApiResponse<PaginationApiResponseData<productType>>, number[]>({
            query: ([id, page]) => ({
                url: `place/show/products/${id}?page=${page}`,
            }),
        }),
        getFestivalByPlace: builder.query<ApiResponse<PaginationApiResponseData<festivalType>>, number[]>({
            query: ([id, page]) => ({
                url: `place/show/festivals/${id}?page=${page}`,
            }),
        }),
        getArticleByPlace: builder.query<ApiResponse<PaginationApiResponseData<getArticleType>>, number[]>({
            query: ([id, page]) => ({
                url: `place/show/articles/${id}?page=${page}`,
            }),
        }),
        getPlaceByLocation: builder.query<ApiResponse<PaginationApiResponseData<placeType>>, number[]>({
            query: ([id, page]) => ({
                url: `place/show/locations/${id}?page=${page}`,
            }),
        }),

        // ------------Comment--------------
        getCommentByPlace: builder.query<ApiResponse<PaginationApiResponseData<commentType>>, number[]>({
            query: ([id, page]) => ({
                url: `place/show/comments/${id}?page=${page}`,
            }),
        }),

        addCommentPlace: builder.mutation({
            query: (data) => ({
                url: 'place/comment/add',
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

export const {
    useGetAll_PlaceQuery,
    useGetPlaceByIdQuery,
    useAddPlaceMutation,
    useAddCommentPlaceMutation,
    useGetProductByPlaceQuery,
    useGetFestivalByPlaceQuery,
    useGetArticleByPlaceQuery,
    useGetCommentByPlaceQuery,
    useGetPlaceByLocationQuery
} = apiPlaceQuery;
