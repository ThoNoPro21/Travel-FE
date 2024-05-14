import { Card, Flex, Progress, Space } from 'antd';
import React from 'react';
import { IconStar } from '../IconComponent';
import CommentComponent from './comment/CommentComponent';
import { PaginationApiResponseData } from '@/src/types/ApiRespone';
import { commentType } from '@/src/types/Article';

type Props = {
    data: any;
    reviewData?: PaginationApiResponseData<commentType>;
};

const ReviewComponent = (props: Props) => {
    return (
        <Card hoverable className=" tw-bg-gradient-to-r tw-from-purple-500 tw-to-pink-500">
            <Flex vertical gap="middle" className="tw-w-full">
                <Card hoverable bordered={false} className="tw-h-fit tw-font-mono">
                    <Flex className="tw-min-w-120 tw-h-fit" gap="middle">
                        <Flex vertical>
                            <p className="tw-text-7xl tw-text-orange-600 tw-font-black">
                                {props.data?.average || 0}
                                <span className="tw-text-2xl tw-font-light">/5</span>
                            </p>
                            <h1 className="tw-text-lg tw-font-bold ">Đánh giá tốt</h1>
                            <p className="tw-text-sm tw-font-thin">
                                Dựa trên :
                                <span className="tw-text-red-400 tw-font-medium tw-ms-2 tw-text-sm">Đánh giá số</span>
                            </p>
                        </Flex>
                        <Flex gap="small" vertical className="tw-flex-1">
                            <Progress
                                percent={props.data?.fiveStar}
                                strokeColor="orange"
                                format={(percent) => `${percent} %`}
                            />
                            <Progress
                                percent={props.data?.fourStar}
                                status="active"
                                strokeColor="orange"
                                format={(percent) => `${percent} %`}
                            />
                            <Progress
                                percent={props.data?.threeStar}
                                strokeColor="orange"
                                format={(percent) => `${percent} %`}
                            />
                            <Progress percent={props.data?.twoStar} strokeColor="orange" />
                            <Progress
                                percent={props.data?.oneStar}
                                showInfo={true}
                                strokeColor="orange"
                                format={(percent) => `${percent} %`}
                            />
                        </Flex>
                    </Flex>
                </Card>
                {props.reviewData?.data.map((item) => (
                    <CommentComponent
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
