import { Card, Flex, Progress, Space } from 'antd';
import React, { useState } from 'react';
import { IconStar } from '../IconComponent';
import CommentComponent from './comment/CommentComponent';
import { PaginationApiResponseData } from '@/src/types/ApiRespone';
import { commentType } from '@/src/types/Article';
import TabsComponent from './tab/TabsComponent';

type Props = {
    data: any;
    reviewData?: PaginationApiResponseData<commentType>;
    getRatingActive:(value:number) =>void;
};

const ReviewComponent = (props: Props) => {

    const options = [
        {
            value: '5',
            label: (
                <span>
                    5 <IconStar />({props.data.totalFiveStar})
                </span>
            ),
        },
        {
            value: '4',
            label: (
                <span>
                    4 <IconStar />({props.data.totalFourStar})
                </span>
            ),
        },
        {
            value: '3',
            label: (
                <span>
                    3 <IconStar />({props.data.totalThreeStar})
                </span>
            ),
        },
        {
            value: '2',
            label: (
                <span>
                    2 <IconStar />({props.data.totalTwoStar})
                </span>
            ),
        },
        {
            value: '1',
            label: (
                <span>
                    1 <IconStar />({props.data.totalOneStar})
                </span>
            ),
        },
    ];

    const getTabActive = (value: number) => {
        props.getRatingActive(value);
    };
    return (
        <Card hoverable className=" tw-bg-gradient-to-r tw-from-purple-500 tw-to-pink-500">
            <Flex vertical gap="middle" className="tw-w-full">
                <Card hoverable bordered={false} className="tw-h-fit tw-font-lora">
                    <Flex className="tw-min-w-120 tw-h-fit" gap="middle">
                        <Flex vertical>
                            <p className="tw-text-7xl tw-text-orange-600 tw-font-black">
                                {props.data?.average.toFixed(1) || 0}
                                <span className="tw-text-2xl tw-font-light">/5</span>
                            </p>
                            {props.data?.average.toFixed(1) >= 3.5 && (
                                <h1 className="tw-text-lg tw-font-bold ">Đánh giá tốt</h1>
                            )}
                            {props.data?.average.toFixed(1) < 3.5 && props.data?.average?.toFixed(1) > 2 && (
                                <h1 className="tw-text-lg tw-font-bold ">Bình thường</h1>
                            )}
                            {props.data?.average.toFixed(1) <= 2 && <h1 className="tw-text-lg tw-font-bold ">Tệ</h1>}
                            <p className="tw-text-sm tw-font-semibold">
                                Dựa trên :
                                <span className="tw-text-red-400 tw-font-semibold tw-ms-2 tw-text-sm">Đánh giá số</span>
                            </p>
                            <p className="tw-text-sm tw-font-semibold">
                                Tổng : <span className="tw-font-bold">{props.data?.totalReview} lượt đánh giá</span>
                            </p>
                        </Flex>
                        <Flex gap="small" vertical className="tw-flex-1">
                            <Progress
                                percent={Math.round(props.data?.fiveStarPercent)}
                                strokeColor="orange"
                                format={(percent) => `${percent} %`}
                            />
                            <Progress
                                percent={Math.round(props.data?.fourStarPercent)}
                                status="active"
                                strokeColor="orange"
                                format={(percent) => `${percent} %`}
                            />
                            <Progress
                                percent={Math.round(props.data?.threeStarPercent)}
                                strokeColor="orange"
                                format={(percent) => `${percent} %`}
                            />
                            <Progress percent={Math.round(props.data?.twoStarPercent)} strokeColor="orange" />
                            <Progress
                                percent={Math.round(props.data?.oneStarPercent)}
                                showInfo={true}
                                strokeColor="orange"
                                format={(percent) => `${percent} %`}
                            />
                        </Flex>
                    </Flex>
                </Card>
                <TabsComponent getTab={getTabActive} options={options} />
                {props.reviewData?.data.map((item, index) => (
                    <CommentComponent
                        key={index}
                        content={item.content}
                        username={item.user?.name}
                        avatar={item.user?.avatar}
                        create_at={item.create_at}
                    />
                ))}
            </Flex>
        </Card>
    );
};

export default ReviewComponent;
