'use client';
import ArticleComponent from '@/src/components/articles/client/ArticleComponent';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { useGetPostFavouriteQuery } from '@/src/store/queries/apiArticle.query';
import { setSelectedMenuHeader } from '@/src/store/slices/common.slice';
import { Empty, Skeleton } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {};

const Page = (props: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isStatus = useAppSelector((state) => state.dataAuth.isStatus);

    useEffect(() => {
        dispatch(setSelectedMenuHeader('/blog'))
    },[])

    const {
        data: response_postFavourite,
        isLoading: isLoading_postFavourite,
        isSuccess: isSuccess_postFavourite,
        refetch: refetch_postFavourite,
    } = useGetPostFavouriteQuery('', { skip: !isStatus });

    const handleOnClickPost = (id: number) => {
        router.push(`/blog/${id}`);
    };
    return (
        <main className="tw-pt-20 tw-p-2 xl:tw-px-13 tw-bg-[#f5f5f5] tw-min-h-screen">
            <div className="tw-grid tw-gap-4  tw-min-h-screen lg:tw-grid-cols-2 tw-grid-flow-row tw-auto-rows-max">
                {isLoading_postFavourite ? (
                    <>
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                    </>
                ) : !response_postFavourite?.success ? (
                    <Empty className="tw-col-span-4" description="Không có bài viết yêu thích !" />
                ) : (
                    response_postFavourite?.data?.map((item, index) => (
                        <div key={index} onClick={() => handleOnClickPost(item.article_id)}>
                            <ArticleComponent
                                isFavourite={true}
                                article_id={item.article_id}
                                created_at={item.article.created_at}
                                src={item.article.images}
                                content={item.article.content}
                                title={item.article.title}
                                topic={item.article.topic}
                                username={item.article.user.name}
                                location={item.article.location.name}
                                avatar_user={item.article.user.avatar}
                                refetchData={refetch_postFavourite}
                            />
                        </div>
                    ))
                )}
            </div>
        </main>
    );
};

export default Page;
