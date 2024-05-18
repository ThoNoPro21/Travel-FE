import { Button, Card, Col, Flex, Grid, Pagination, Row, Space } from 'antd';
import React from 'react';
import CardArticle from './client/CardArticle';
import { useGetArticleNewQuery } from '@/src/store/queries/apiArticle.query';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

type Props = {};

const ArticleNew = (props: Props) => {
    const {
        data: response_article,
        isLoading: isLoading_article,
        isSuccess: isSuccess_article,
    } = useGetArticleNewQuery('');
    return (
        <Flex vertical gap={16}>
            <Flex align="flex-start">
                <Space direction="vertical" className="tw-flex-auto">
                    <h1 className="sm:tw-font-bold tw-font-black tw-text-xl lg:tw-text-2xl">Bài viết nổi bật</h1>
                    <p className="tw-text-base tw-font-medium">Nay có gì hót</p>
                </Space>

                <Link href={'blog'}>
                    <Button
                        type="text"
                        className="tw-rounded-3xl tw-bg-transparent tw-border-solid tw-border-orange-500 tw-border-1 tw-text-emerald-700 "
                    >
                        Xem tất cả
                    </Button>
                </Link>
            </Flex>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={'auto'}
                spaceBetween={10}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {response_article?.data.map((item, index) => (
                    <SwiperSlide key={index} className="tw-max-w-min ">
                        <Link href={`blog/${item.articles_id}`}>
                            <CardArticle
                                key={index}
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
    );
};

export default ArticleNew;
