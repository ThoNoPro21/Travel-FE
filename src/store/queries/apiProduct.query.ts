// Import the RTK Query methods from the React-specific entry point
import { ApiResponse, PaginationApiResponseData } from '@/src/types/ApiRespone';
import { categoryType, productInCart, productType } from '@/src/types/Product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from '../slices/auth.slice';
import { RootState } from '../store';
import { commentType } from '@/src/types/Article';

export const apiProductQuery = createApi({
    reducerPath: 'apiProduct',
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
        getProductByCategory: builder.query<ApiResponse<PaginationApiResponseData<productType>>, number[]>({
            query: ([category, page]) => `product/show/category/${category}?page=${page}`,
        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: 'product/add',
                method: 'POST',
                body: product,
            }),
        }),
        getProductById: builder.query<ApiResponse<productType[]>, number>({
            query: (id) => `product/show/${id}`,
        }),
        // showRelatedProduct
        getRelatedProduct: builder.query<ApiResponse<PaginationApiResponseData<productType>>, number[]>({
            query: ([id,page]) => `product/showRelatedProduct/${id}?page=${page}`,
        }),
        addToCart: builder.mutation({
            query: (body) => ({
                url: 'product/addToCart',
                method: 'POST',
                body,
            }),
        }),
        getCart: builder.query<ApiResponse<productInCart[]>, any>({
            query: () => 'product/showCart',
        }),
        updateCart: builder.mutation({
            query: ([id, data]) => ({
                url: `product/updateCart/${id}?action=${data}`,
                method: 'POST',
                headers: {
                    'X-HTTP-Method-Override': 'PUT',
                },
            }),
        }),
        deleteCart: builder.mutation({
            query: (id) => ({
                url: `product/deleteCart/${id}`,
                method: 'DELETE',
            }),
        }),
        addOrders: builder.mutation({
            query: (body) => ({
                url: 'order/add',
                method: 'POST',
                body
            }),
        }),
        // ---------Comment-------------
        getCommentByProduct: builder.query<ApiResponse<PaginationApiResponseData<commentType>>, number[]>({
            query: ([id, page]) => ({
                url: `product/show/comments/${id}?page=${page}`,
            }),
        }),
        addCommentProduct: builder.mutation({
            query: (data) => ({
                url: 'product/comment/add',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetProductByCategoryQuery,
    useAddProductMutation,
    useGetProductByIdQuery,
    useAddToCartMutation,
    useGetCartQuery,
    useUpdateCartMutation,
    useDeleteCartMutation,
    useAddOrdersMutation,
    useGetCommentByProductQuery,
    useAddCommentProductMutation,
    useGetRelatedProductQuery
} = apiProductQuery;


export const apiProvinceQuery = createApi({
    reducerPath: 'dataProvince',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://web-staging.ghtklab.com/api/v1/public/address/list',
        // prepareHeaders: (headers, { getState }) => {
        //     headers.set('Accept', 'application/json');
        //     const token = selectToken(getState() as RootState);
        //     if (token) {
        //         headers.set('authorization', `Bearer ${token}`);
        //     }
        //     return headers;
        // },
    }),
    endpoints: (builder) => ({
        getCity: builder.query({
            query: () => '/',
        }),
        getDistrict: builder.query({
            query: (city_id) => `https://web-staging.ghtklab.com/api/v1/public/address/list?parentId=${city_id}&type=3`,
        }),
        getWard: builder.query({
            query: (district_id) => `https://web-staging.ghtklab.com/api/v1/public/address/list?parentId=${district_id}&type=1`,
        }),
        
    }),
});

export const {
    useGetCityQuery,
    useGetDistrictQuery,
    useGetWardQuery,
} = apiProvinceQuery;
