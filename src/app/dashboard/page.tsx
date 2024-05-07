'use client';

import { useAppDispatch } from '@/src/store/hooks';
import { useGetPostQuery } from '@/src/store/queries/apiArticle.query';
import { setCountPostPending } from '@/src/store/slices/article.slice';
import { setSelectedKeys } from '@/src/store/slices/common.slice';
import { useEffect } from 'react';

type Props = {};
const page = (props: Props) => {
    const dispatch = useAppDispatch();
    const {
        data: response_getPost,
        isLoading: isLoadingGetPost,
        isSuccess: isSuccessGetPost,
        refetch: refetch_getPost,
    } = useGetPostQuery([1, 0]);
    let countPostPending: string | null = null;

    if (isSuccessGetPost) {
        let url = response_getPost?.data?.links?.[1].url;

        var urlParams = new URLSearchParams(new URL(url).search);

        countPostPending = urlParams.get('countPostPending');
    }

    useEffect(() => {
        if (countPostPending !== null) {
            dispatch(setCountPostPending(parseInt(countPostPending)));
        }
    }, [countPostPending]);
    useEffect(() => {
        dispatch(setSelectedKeys('/dashboard'));
    }, []);
    return <h1>Tổng quan</h1>;
};

export default page;
