'use client';
import React, { useEffect, useState } from 'react';
import { Card, Empty, Flex, Pagination, Skeleton, Spin } from 'antd';
import { useGetPostByTopicQuery, useGetPostFavouriteQuery, useGetPostQuery, useGetTopicQuery } from '@/src/store/queries/apiArticle.query';
import TabsComponent from '../../../components/common/tab/TabsComponent';
import ArticleComponent from '../../../components/articles/client/ArticleComponent';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setSelectedMenuHeader } from '@/src/store/slices/common.slice';

type Props = {};

const Page = (props: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [savedArticleIds, setSavedArticleIds] = useState<number[]>([]);
    const [postData, setPostData] = useState<any[]>([]);

    const isStatus = useAppSelector((state) => state.dataAuth.isStatus)

    useEffect(() => {
        dispatch(setSelectedMenuHeader('/blog'))
    },[])

    const tabOptions: any[] = [{ value: '0' + '', label: <div style={{ padding: 4 }}>Tất cả</div> }];
    const [tabActive, setTabActive] = useState(0);
    const [page, setPage] = useState(1);

    const {
        data: response_getTopic,
        isLoading: isLoading_getTopic,
        isSuccess:isSuccess_getTopic,
    } = useGetTopicQuery('');

    if (isSuccess_getTopic) {
        response_getTopic?.data.map((item) =>
            tabOptions.push({ value: item.topics_id + '', label: <div style={{ padding: 4 }}>{item.name}</div> })
        );
    }
    const {
        data: response_postByTopic,
        isLoading: isLoading_postByTopic,
        isFetching: isFetching_postByTopic,
        isSuccess: isSuccess_postByTopic,
        error: error_postByTopic,
    } = useGetPostByTopicQuery([tabActive, page]);

    const {
        data: response_getPostFavourite,
        isLoading: isLoading_getPostFavourite,
        isSuccess: isSuccess_getPostFavourite,
        isFetching:isFetching_getPostFavourite,
        refetch: refetch_getPostFavourite,
    } = useGetPostFavouriteQuery('',{skip:!isStatus});

    useEffect(() => {
        let id = response_getPostFavourite?.data?.map((article)=>article.article_id)||[]
        const combinedArticles = response_postByTopic?.data?.data?.map(article => ({
            ...article,
            isSaved: id.includes(article.articles_id),
        })) || [];
        setPostData(combinedArticles);
    },[response_postByTopic])
    const getTabActive = (value: number) => {
        setTabActive(value);
    };

    const handleOnClickPost = (value: number) => {
        router.push(`/blog/${value}`);
    };

    const onChangeNewPage = (newPage: number) => {
        setPage(newPage);
    };
    return (
        <main className="tw-pt-20 tw-p-2 xl:tw-px-13 tw-bg-[#f5f5f5] tw-min-h-screen">
            <Flex justify="flex-end">
                {isLoading_getTopic ? (
                    <Spin fullscreen />
                ) : (
                    <TabsComponent options={tabOptions} getTab={getTabActive} />
                )}
            </Flex>
            <div className="tw-grid tw-gap-4 tw-min-h-screen lg:tw-grid-cols-2 tw-grid-flow-row tw-auto-rows-max">
                <Skeleton loading={isLoading_postByTopic || isFetching_postByTopic} active avatar>
                    {!response_postByTopic?.success ? (
                        <Empty className="tw-col-span-4" description="Không có dữ liệu !" />
                    ) : (
                        postData.map((item, index) => (
                            <div key={index} onClick={() => handleOnClickPost(item.articles_id)}>
                                <ArticleComponent
                                    isFavourite={item.isSaved}
                                    article_id={item.articles_id}
                                    created_at={item.created_at}
                                    src={item.images}
                                    content={item.content}
                                    title={item.title}
                                    topic={item.topic}
                                    username={item.user.name}
                                    location={item.location.name}
                                    avatar_user={item.user.avatar}
                                    refetchData={refetch_getPostFavourite}
                                />
                            </div>
                        ))
                    )}
                </Skeleton>
                <Skeleton loading={isLoading_postByTopic || isFetching_postByTopic} active avatar />
            </div>
            <Flex>
                <Pagination
                    className="tw-m-auto tw-py-4"
                    onChange={onChangeNewPage}
                    defaultCurrent={1}
                    total={response_postByTopic?.data?.total || 0}
                    pageSize={response_postByTopic?.data?.per_page || 10}
                    current={response_postByTopic?.data?.current_page || 1}
                />
            </Flex>
        </main>
    );
};

export default Page;
