import { Button, Card, Col, Flex, Grid, Pagination, Row, Space } from 'antd';
import React from 'react';
import CardArticle from './article/CardArticle';
import { useGetArticleNewQuery } from '@/src/store/queries/apiArticle.query';

type Props = {};

const ArticleNew = (props: Props) => {
    const {data:response_article,isLoading:isLoading_article,isSuccess:isSuccess_article} =useGetArticleNewQuery('')
    return (
        <Flex vertical gap={16}>
            <Flex align="flex-start">
                <Space direction="vertical" className="tw-flex-auto">
                    <h1 className="sm:tw-font-bold tw-font-black tw-text-xl lg:tw-text-2xl">Bài viết nổi bật</h1>
                    <p className="tw-text-base tw-font-medium">Nay có gì hót</p>
                </Space>
                <div className="tw-cursor-pointer ">
                    <Button
                        type="text"
                        className="tw-rounded-3xl tw-bg-transparent tw-border-solid tw-border-orange-500 tw-border-1 tw-text-emerald-700 "
                    >
                        Xem tất cả
                    </Button>
                </div>
            </Flex>
            <div className="tw-grid tw-grid-flow-col md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 sm:tw-grid-flow-row tw-gap-4 ">
                {response_article?.success && (
                    response_article.data.map((item,index)=>(
                        <CardArticle key={index} image={item.images} title={item.title} username={item.user.name} user_avatar={item.user.avatar}/>
                    )
                    )
                )}
            </div>
        </Flex>
    );
};

export default ArticleNew;
