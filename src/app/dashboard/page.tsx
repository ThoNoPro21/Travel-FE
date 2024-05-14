'use client';

import ReviewComponent from '@/src/components/common/ReviewComponent';
import { useAppDispatch } from '@/src/store/hooks';
import { useGetPostQuery } from '@/src/store/queries/apiArticle.query';
import { useGetReviewByRatingQuery, useGetReviewQuery } from '@/src/store/queries/apiCommon.query';
import { setCountPostPending } from '@/src/store/slices/article.slice';
import { setSelectedKeys } from '@/src/store/slices/common.slice';
import { Card } from 'antd';
import { useEffect, useState } from 'react';

type Props = {};
const Page = (props: Props) => {
    const dispatch = useAppDispatch();
    const [pageReview,setPageReview] = useState(1)
    const [ratingActive,setRatingActive] = useState(5)

    const getRatingActive = (value:number) => {
        setRatingActive(value)
    }
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
    } = useGetReviewQuery('');

    const {
        data: response_getReviewByRating,
        isLoading: isLoading_getReviewByRating,
        isSuccess: isSuccess_getReviewByRating,
    } = useGetReviewByRatingQuery([ratingActive, pageReview]);

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
            <ReviewComponent getRatingActive={getRatingActive} data={response_getReview?.data} reviewData = {response_getReviewByRating?.data}/>
        </Card>
    );
};

export default Page;
