import { configureStore } from '@reduxjs/toolkit';
import { apiMonHocQuery } from './queries/apiMonHoc.query';
import monHocSlice from './slices/monHoc.slice';
import { apiProductQuery, apiProvinceQuery } from './queries/apiProduct.query';
import { apiPlaceQuery } from './queries/apiPlace.query';
import { setupListeners } from '@reduxjs/toolkit/query';
import productSlide from './slices/product.slice';
import { apiAuthQuery } from './queries/apiAuth.query';
import authSlice from './slices/auth.slice';
import { apiArticleQuery } from './queries/apiArticle.query';
import articleSlice from './slices/article.slice';
import placeSlice from './slices/place.slice';
import commonSlice from './slices/common.slice';
import { apiLocationQuery } from './queries/apiLocation.query.';
import { apiCategoryQuery } from './queries/apiCategory.query';
import { apiFestivalQuery } from './queries/apiFestival.query';
import { apiCommonQuery } from './queries/apiCommon.query';

export const store = configureStore({
    reducer: {
        MonHoc: monHocSlice,
        dataProduct: productSlide,
        dataAuth:authSlice,
        dataArticle:articleSlice,
        dataPlace:placeSlice,
        dataCommon:commonSlice,
        [apiMonHocQuery.reducerPath]: apiMonHocQuery.reducer,
        [apiProductQuery.reducerPath]: apiProductQuery.reducer,
        [apiPlaceQuery.reducerPath]: apiPlaceQuery.reducer,
        [apiAuthQuery.reducerPath]: apiAuthQuery.reducer,
        [apiArticleQuery.reducerPath]: apiArticleQuery.reducer,
        [apiLocationQuery.reducerPath]: apiLocationQuery.reducer,
        [apiCategoryQuery.reducerPath]: apiCategoryQuery.reducer,
        [apiFestivalQuery.reducerPath]: apiFestivalQuery.reducer,
        [apiProvinceQuery.reducerPath]: apiProvinceQuery.reducer,
        [apiCommonQuery.reducerPath]: apiCommonQuery.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiMonHocQuery.middleware,
            apiProductQuery.middleware,
            apiPlaceQuery.middleware,
            apiAuthQuery.middleware,
            apiArticleQuery.middleware,
            apiLocationQuery.middleware,
            apiCategoryQuery.middleware,
            apiFestivalQuery.middleware,
            apiProvinceQuery.middleware,
            apiCommonQuery.middleware,
        ),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
