'use client'
import React, { useEffect } from 'react';
import { Layout, Flex, Spin } from 'antd';

import ArticleNew from '../components/articles/ArticleNew';
import HomeBanner from '../components/festivals/homepage/HomeBanner';
import PlaceHot from '../components/places/PlaceHot';
import Discover from '../components/Discover';
import CarouselIntroduce from '../components/carousels/CarouselIntroduce';
import { useAppDispatch } from '../store/hooks';
import { setSelectedMenuHeader } from '../store/slices/common.slice';

const { Content } = Layout;

export default function HomeTravel() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setSelectedMenuHeader('/'))
    },[])

    return (
        <Layout className="tw-relative tw-container2xl tw-p-0 tw-m-0 tw-font-lora">
            <HomeBanner  />
            <Content className="xl:tw-px-13 lg:tw-px-4 lg:tw-my-4 tw-p-2 tw-overflow-hidden tw-font-lora">
                <Flex vertical gap="middle">
                    <CarouselIntroduce />
                    <Discover />
                    <PlaceHot />
                    <ArticleNew />
                </Flex>
            </Content>
        </Layout>
    );
}
