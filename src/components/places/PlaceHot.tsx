import { Button, Card, Col, Flex, Row, Skeleton, Space } from 'antd';
import React from 'react';
import { IconLeft, IconRight } from '../IconComponent';

import { useGetAll_PlaceQuery } from '@/src/store/queries/apiPlace.query';
import { useRouter } from 'next/navigation';
import CardPlaceHot from './CardPlaceHot';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
type Props = {};

const PlaceHot = (props: Props) => {
    const router = useRouter();
    const { data: response_place, isLoading: isLoading_place, isSuccess: isSuccess_place } = useGetAll_PlaceQuery('');

    return (
        <Row>
            <Col className="gutter-row" span={24}>
                <Flex justify="space-between" align="flex-start" className="tw-w-full tw-font-lora">
                    <Space direction="vertical">
                        <h1 className="tw-font-bold tw-text-xl lg:tw-text-2xl">Điểm đến nổi bật</h1>
                        <p className="lg:tw-text-xl tw-text-base tw-font-medium font-lo">Có thể bạn sẽ thích ?</p>
                    </Space>
                    <Flex align="flex-end" className="tw-cursor-pointer tw-hidden sm:tw-block ">
                        <div className="tw-cursor-pointer ">
                            <Link href={'place'}>
                                <Button
                                    type="text"
                                    className="tw-rounded-3xl tw-bg-transparent tw-border-solid tw-border-orange-500 tw-border-1 tw-text-emerald-700 "
                                >
                                    Xem tất cả
                                </Button>
                            </Link>
                        </div>
                    </Flex>
                </Flex>
            </Col>
            <Col className="gutter-row" span={24}>
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination]}
                    slidesPerView={'auto'}
                    spaceBetween={10}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {!isLoading_place ? (
                        response_place?.data.map((item, index) => (
                            <div key={index} className="tw-max-w-min" >
                                <SwiperSlide key={index} className="tw-max-w-min tw-py-8" onClick={()=>router.push(`place/${item.places_id}`)}>
                                    <CardPlaceHot
                                        src={item.images}
                                        heart="11K"
                                        star="5.0"
                                        location={item.location_name}
                                        title={item.name}
                                    />
                                </SwiperSlide>
                            </div>
                        ))
                    ) : (
                        <div className="tw-grid tw-grid-cols-4 tw-place-content-center tw-w-full tw-gap-8">
                            <Space direction="vertical">
                                <Skeleton.Image active style={{ width: 220, height: 220 }} />
                                <Skeleton.Input active />
                                <Skeleton.Input active />
                            </Space>
                            <Space direction="vertical">
                                <Skeleton.Image active style={{ width: 220, height: 220 }} />
                                <Skeleton.Input active />
                                <Skeleton.Input active />
                            </Space>
                            <Space direction="vertical">
                                <Skeleton.Image active style={{ width: 220, height: 220 }} />
                                <Skeleton.Input active />
                                <Skeleton.Input active />
                            </Space>
                            <Space direction="vertical">
                                <Skeleton.Image active style={{ width: 220, height: 220 }} />
                                <Skeleton.Input active />
                                <Skeleton.Input active />
                            </Space>
                        </div>
                    )}
                </Swiper>
            </Col>
        </Row>
    );
};

export default PlaceHot;
