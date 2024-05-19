import { Button, Card, Col, Flex, Grid, Row, Space, Spin } from 'antd';
import React from 'react';
import CardArticle from './client/CardArticle';
import { useGetArticleNewQuery } from '@/src/store/queries/apiArticle.query';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

type Props = {};

const ArticleNew: React.FC<Props> = () => {
    const {
        data: response_Article,
        isLoading: isLoading_Article,
        isSuccess: isSuccess_Article,
        isError: isError_Article,
    } = useGetArticleNewQuery('');

    return (
        <Flex vertical gap={16}>
            <Flex align="flex-start">
                <Space direction="vertical" className="tw-flex-auto">
                    <h1 className="sm:tw-font-bold tw-font-black tw-text-xl lg:tw-text-2xl">Bài viết nổi bật</h1>
                    <p className="tw-text-base tw-font-medium">Nay có gì hót</p>
                </Space>

                <Link href={'/blog'}>
                    <Button
                        type="text"
                        className="tw-rounded-3xl tw-bg-transparent tw-border-solid tw-border-orange-500 tw-border-1 tw-text-emerald-700"
                    >
                        Xem tất cả
                    </Button>
                </Link>
            </Flex>

            {isLoading_Article && <Spin fullscreen />}
            {isError_Article && <p>Error loading articles</p>}

            {isSuccess_Article && (
                <>
                    <Flex className='lg:tw-hidden'>
                        <Swiper
                            modules={[Navigation, Pagination]}
                            slidesPerView={'auto'}
                            spaceBetween={10}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                        >
                            {response_Article?.data.map((item) => (
                                <SwiperSlide key={item.articles_id} className="tw-max-w-min">
                                    <Link href={`/blog/${item.articles_id}`}>
                                        <CardArticle
                                            image={item.images}
                                            title={item.title}
                                            username={item.user.name}
                                            user_avatar={item.user.avatar}
                                        />
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Flex>
                    <div className="tw-hidden lg:tw-grid tw-grid-cols-4 tw-grid-flow-row tw-gap-4">
                    {isSuccess_Article && response_Article?.data.map((item) => (
                                    <Link key={item.articles_id} href={`/blog/${item.articles_id}`}>
                                        <CardArticle
                                            image={item.images}
                                            title={item.title}
                                            username={item.user.name}
                                            user_avatar={item.user.avatar}
                                        />
                                    </Link>
                            ))}
                    </div>
                </>
            )}
        </Flex>
    );
};

export default ArticleNew;
