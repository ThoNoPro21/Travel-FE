'use client';
import ArticleComponent from '@/src/components/articles/client/ArticleComponent';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { useGetPostByUserQuery, useGetPostFavouriteQuery } from '@/src/store/queries/apiArticle.query';
import { setSelectedMenuHeader } from '@/src/store/slices/common.slice';
import { Card, Empty, Flex, Skeleton } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {};

const Page = (props: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isStatus = useAppSelector((state) => state.dataAuth.isStatus);
    const isLogin = useAppSelector((state) => state.dataAuth.isLogin);

    useEffect(()=>{
        if(!isLogin&& isStatus){
            router.push('/blog')
        }
    },[isStatus,isLogin])

    useEffect(() => {
        dispatch(setSelectedMenuHeader('/blog'));
    }, []);

    const {
        data: response_postByUser,
        isLoading: isLoading_postByUser,
        isSuccess: isSuccess_postByUser,
        refetch: refetch_postByUser,
    } = useGetPostByUserQuery('', { skip: !isStatus });

    const handleOnClickPost = (id: number) => {
        router.push(`/blog/${id}`);
    };
    return (
        <main className="tw-pt-20 tw-p-2 xl:tw-px-13 tw-bg-[#f5f5f5] tw-min-h-screen">
            <h1 className='tw-text-lg lg:tw-text-2xl tw-py-2 tw-font-bold'>Bài viết của tôi</h1>
            <div className="tw-grid tw-gap-4  tw-min-h-screen lg:tw-grid-cols-2 tw-grid-flow-row tw-auto-rows-max">
                {isLoading_postByUser ? (
                    <>
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                    </>
                ) : !response_postByUser?.success && isStatus ?  (
                    <Empty className="tw-col-span-4" description="Bạn chưa có bài viết nào!" />
                ) : (
                    response_postByUser?.data?.map((item, index) => (
                        <Card styles={{body:{padding:0}}} className='tw-p-3 lg:tw-p-4 ' key={index}>
                            <Flex vertical>
                                <h1 className='tw-text-base lg:tw-text-lg tw-font-bold'>{item.title}</h1>
                                {item.status === 0 && (
                                    <Flex align="center" gap="small">
                                        <span className="tw-relative tw-flex tw-h-3 tw-w-3">
                                            <span className="tw-animate-ping tw-absolute tw-inline-flex tw-h-full tw-w-full tw-rounded-full tw-bg-orange-400 tw-opacity-75"></span>
                                            <span className="tw-relative tw-inline-flex tw-rounded-full tw-h-3 tw-w-3 tw-bg-orange-500"></span>
                                        </span>
                                        <p className=" tw-text-orange-500">Đang xét duyệt</p>
                                    </Flex>
                                )}
                                {item.status === 1 && (
                                    <Flex align="center" gap="small">
                                        <span className="tw-relative tw-flex tw-h-3 tw-w-3">
                                            <span className="tw-animate-ping tw-absolute tw-inline-flex tw-h-full tw-w-full tw-rounded-full tw-bg-sky-400 tw-opacity-75"></span>
                                            <span className="tw-relative tw-inline-flex tw-rounded-full tw-h-3 tw-w-3 tw-bg-sky-500"></span>
                                        </span>
                                        <p className=" tw-text-sky-500">Đã xuất bản</p>
                                    </Flex>
                                )}
                                {item.status === 2 && (
                                    <Flex align="center" gap="small">
                                        <span className="tw-relative tw-flex tw-h-3 tw-w-3">
                                            <span className="tw-animate-ping tw-absolute tw-inline-flex tw-h-full tw-w-full tw-rounded-full tw-bg-red-400 tw-opacity-75"></span>
                                            <span className="tw-relative tw-inline-flex tw-rounded-full tw-h-3 tw-w-3 tw-bg-red-500"></span>
                                        </span>
                                        <p className=" tw-text-red-500">Đã từ chối</p>
                                    </Flex>
                                )}
                            </Flex>
                        </Card>
                    ))
                )}
            </div>
        </main>
    );
};

export default Page;
