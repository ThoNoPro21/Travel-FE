import { Button, Card, Col, Flex, Grid, Pagination, Row, Space } from 'antd';
import React from 'react';
import CardArticle from './client/CardArticle';
import { useGetArticleNewQuery } from '@/src/store/queries/apiArticle.query';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination as SwiperPagination } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

type Props = {};

const ArticleNew: React.FC<Props> = () => {
    const {
        data: responseArticle,
        isLoading: isLoadingArticle,
        isSuccess: isSuccessArticle,
        isError: isErrorArticle,
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

            {isLoadingArticle && <p>Loading...</p>}
            {isErrorArticle && <p>Error loading articles</p>}

            {isSuccessArticle && (
                <Swiper
                    modules={[Navigation, SwiperPagination]}
                    slidesPerView="auto"
                    spaceBetween={10}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {responseArticle?.data.map((item) => (
                        <Link key={item.articles_id} href={`/blog/${item.articles_id}`}>
                            <SwiperSlide className="tw-max-w-min">
                                <CardArticle
                                    image={item.images}
                                    title={item.title}
                                    username={item.user.name}
                                    user_avatar={item.user.avatar}
                                />
                            </SwiperSlide>
                        </Link>
                    ))}
                </Swiper>
            )}
        </Flex>
    );
};

export default ArticleNew;
