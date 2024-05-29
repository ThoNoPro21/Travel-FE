// Import the RTK Query methods from the React-specific entry point
import { ApiResponse, PaginationApiResponseData } from '@/src/types/ApiRespone';
import { articleFavourite, commentType, getArticleByIdType, getArticleType, topicType } from '@/src/types/Article';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from '../slices/auth.slice';
import { RootState } from '../store';

export const apiArticleQuery = createApi({
    reducerPath: 'apiArticle ',
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
        addPost: builder.mutation({
            query: (data) => ({
                url: 'post/add',
                method: 'POST',
                body: data,
            }),
        }),
        getPost: builder.query<ApiResponse<PaginationApiResponseData<getArticleType>>, number[]>({
            query: ([page,status]) => `post/show?page=${page}&status=${status}`,
        }),
        getPostById: builder.query<ApiResponse<getArticleType>, number>({
            query: (id) => `post/show/${id}`,
        }),
        getPostByTopic: builder.query<ApiResponse<PaginationApiResponseData<getArticleType>>, number[]>({
            query: ([id,page]) => `post/topic/${id}?page=${page}`,
        }),
        getTopic: builder.query<ApiResponse<topicType[]>, any>({
            query: () => 'topic/show',
        }),
        getArticleNew: builder.query<ApiResponse<getArticleType[]>, any>({
            query: () => 'post/show/article/new',
        }),
        addFavourite:builder.mutation({
            query: (data) => ({
                url: 'post/addFavourite',
                method: 'POST',
                body: data,
            }),
        }),
        removeFavourite:builder.mutation({
            query: (id) => ({
                url: `post/removeFavourite/${id}`,
                method: 'DELETE',
            }),
        }),
        getPostFavourite:builder.query<ApiResponse<articleFavourite[]>, any>({
            query: () => 'post/showFavourite',
        }),
        getPostByUser:builder.query<ApiResponse<getArticleType[]>, any>({
            query: () => 'post/me/show',
        }),
        // -------------------------Update---------------
        updateStatus: builder.mutation({
            query: ([id,data]) => ({
                url: `post/updateStatus/${id}`,
                method: 'POST',
                body:data,
                headers: {
                    'X-HTTP-Method-Override': 'PUT'
                }
            }),
        }),
        // -------------------------Comment---------------
        postCommentArticle: builder.mutation({
            query: (data) => ({
                url: 'post/comment/add',
                method: 'POST',
                body: data,
            }),
        }),

        getCommentArticle: builder.query<ApiResponse<PaginationApiResponseData<commentType>>,number[]>({
            query: ([id,page]) => ({
                url: `post/show/comments/${id}?page=${page}`,
            }),
        }),
    
        // updateMonHoc: builder.mutation({
        //     query: ({ maMonHoc, ...body }) => ({
        //         url: `monhoc/update/${maMnHoc}`,
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
    useAddPostMutation,
    useGetPostByIdQuery,
    useGetPostByTopicQuery,
    useGetTopicQuery,
    useGetPostQuery,
    usePostCommentArticleMutation,
    useUpdateStatusMutation,
    useGetCommentArticleQuery,
    useGetArticleNewQuery,
    useAddFavouriteMutation,
    useRemoveFavouriteMutation,
    useGetPostFavouriteQuery,
    useGetPostByUserQuery,
} = apiArticleQuery;
