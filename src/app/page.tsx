'use client';
import React from 'react';
import { Layout, Flex, Spin } from 'antd';

import FestivalPoint from './components/FestivalPoint';
import ArticleNew from './components/ArticleNew';
import { useGetFestivalQuery } from '../store/queries/apiFestival.query';
import HomeBanner from './components/HomeBanner';
import PlaceHot from './components/PlaceHot';
import Discover from './components/common/Discover';

const { Content } = Layout;

export default function HomeTravel() {
    const {
        data: response_festival,
        isLoading: isLoading_festival,
        isSuccess: isSuccess_festival,
    } = useGetFestivalQuery('');
    if (isLoading_festival) {
        return <Spin fullscreen />;
    }
    return (
        <Layout className="tw-relative tw-container2xl tw-p-0 tw-m-0 tw-font-lora">
            {isSuccess_festival && <HomeBanner items={response_festival?.data} />}
            <Content className="xl:tw-px-13 lg:tw-px-4 lg:tw-my-4 tw-p-2 tw-overflow-hidden tw-font-lora">
                <Flex vertical gap="middle">
                    <FestivalPoint />
                    <Discover />
                    <PlaceHot />
                    <ArticleNew />
                </Flex>
            </Content>
        </Layout>
    );
}
