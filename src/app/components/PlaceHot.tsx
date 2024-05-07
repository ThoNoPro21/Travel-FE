import { Card, Col, Flex, Row, Skeleton, Space } from 'antd';
import React from 'react';
import { IconLeft, IconRight } from './IconComponent';
import CardComponent from './common/CardsComponent';
import { useGetAll_PlaceQuery } from '@/src/store/queries/apiPlace.query';
import { useRouter } from 'next/navigation';

type Props = {};

const PlaceHot = (props: Props) => {
    const router = useRouter();
    const { data: response_place, isLoading: isLoading_place, isSuccess: isSuccess_place } = useGetAll_PlaceQuery('');
    const handleOnClickCard = (value: number) => {
        router.push(`/place/${value}`);
    };
    return (
        <Row>
            <Col className="gutter-row" span={24}>
                <Flex justify="space-between" align="flex-start" className="tw-w-full tw-font-lora">
                    <Space direction="vertical">
                        <h1 className="tw-font-bold tw-text-xl lg:tw-text-2xl">Điểm đến nổi bật</h1>
                        <p className="lg:tw-text-xl tw-text-base tw-font-medium font-lo">Có thể bạn sẽ thích ?</p>
                    </Space>
                    <Flex align="flex-end" className="tw-cursor-pointer tw-hidden sm:tw-block ">
                        <Space size={'large'}>
                            <IconLeft />
                            <IconRight />
                        </Space>
                    </Flex>
                </Flex>
            </Col>
            <Col className="gutter-row" span={24}>
                <Flex gap="middle">
                    {!isLoading_place ? (
                        response_place?.data.map((item) => (
                            <div
                                className="tw-max-w-min"
                                key={item.places_id}
                                onClick={() => handleOnClickCard(item.places_id)}
                            >
                                <CardComponent
                                    src={item.images}
                                    heart="11K"
                                    star="5.0"
                                    location={item.location_name}
                                    title={item.name}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="tw-grid tw-grid-cols-4 tw-place-content-center tw-w-full tw-gap-8">
                            <Space direction="vertical">
                                <Skeleton.Image active style={{ width: 220, height: 220 }} />
                                <Skeleton.Input active  />
                                <Skeleton.Input active  />
                            </Space>
                            <Space direction="vertical">
                                <Skeleton.Image active style={{ width: 220, height: 220 }} />
                                <Skeleton.Input active  />
                                <Skeleton.Input active  />
                            </Space>
                            <Space direction="vertical">
                                <Skeleton.Image active style={{ width: 220, height: 220 }} />
                                <Skeleton.Input active  />
                                <Skeleton.Input active  />
                            </Space>
                            <Space direction="vertical">
                                <Skeleton.Image active style={{ width: 220, height: 220 }} />
                                <Skeleton.Input active  />
                                <Skeleton.Input active  />
                            </Space>
                        </div>
                    )}
                </Flex>
            </Col>
        </Row>
    );
};

export default PlaceHot;
