// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from '../slices/auth.slice';
import { RootState } from '../store';
import { ApiResponse, PaginationApiResponseData } from '@/src/types/ApiRespone';
import { carouselType } from '@/src/types/Carousel';

export const apiCommonQuery = createApi({
    reducerPath: 'apiCommon ',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://travel-be-deploy-production.up.railway.app/api/v1/',
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
        addCarousel: builder.mutation({
            query: (data) => ({
                url: 'carousel/add',
                method: 'POST',
                body: data,
            }),
        }),
        getCarousel: builder.query<ApiResponse<PaginationApiResponseData<carouselType>>, number>({
            query: (page) => `carousel/show?page=${page}`,
        }),
        deleteCarousel: builder.mutation({
            query: (id) => ({
                url: `carousel/delete/${id}`,
                method: 'DELETE',
            }),
        }),
        updateStatusCarousel: builder.mutation({
            query: ([id, data]) => ({
                url: `carousel/updateStatus/${id}`,
                method: 'POST',
                body: data,
                headers: {
                    'X-HTTP-Method-Override': 'PUT',
                },
            }),
        }),

        getCarouselForHomePage: builder.query<ApiResponse<carouselType[]>, any>({
            query: () => 'carousel/showAll',
        }),

        //----------Reviews-----------
        addReview: builder.mutation({
            query: (body) => ({
                url: 'review/add',
                method: 'POST',
                body
            }),
        }),

        getReview: builder.query<ApiResponse<any>,any>({
            query: () => 'review/getAverageRating',
        }),
    }),
});

export const {
    useAddCarouselMutation,
    useGetCarouselQuery,
    useDeleteCarouselMutation,
    useUpdateStatusCarouselMutation,
    useGetCarouselForHomePageQuery,
    useAddReviewMutation,
    useGetReviewQuery
} = apiCommonQuery;
