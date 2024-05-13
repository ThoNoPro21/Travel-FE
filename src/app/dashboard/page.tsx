'use client';

import ReviewComponent from '@/src/components/common/ReviewComponent';
import { useAppDispatch } from '@/src/store/hooks';
import { useGetPostQuery } from '@/src/store/queries/apiArticle.query';
import { useGetReviewQuery } from '@/src/store/queries/apiCommon.query';
import { setCountPostPending } from '@/src/store/slices/article.slice';
import { setSelectedKeys } from '@/src/store/slices/common.slice';
import { Card } from 'antd';
import { useEffect } from 'react';

type Props = {};
const Page = (props: Props) => {
    const dispatch = useAppDispatch();
    const {
        data: response_getPost,
        isLoading: isLoadingGetPost,
        isSuccess: isSuccessGetPost,
        refetch: refetch_getPost,
    } = useGetPostQuery([1, 0]);

    const {
        data: response_getReview,
        isLoading: isLoading_getReview,
        isSuccess: isSuccess_getReview,
    } = useGetReviewQuery([1, 0]);

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
    return (
        <Card className='tw-w-full tw-h-full'>
            <ReviewComponent data={response_getReview?.data}/>
        </Card>
    );
};

export default Page;
