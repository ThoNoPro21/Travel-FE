import { Card, Flex, Space } from 'antd';
import Image from 'next/image';
import React from 'react';
import { isValidJsonString } from '../validate/String';
import { imagesJson } from '@/src/types/Article';
import { IconLocation } from '../IconComponent';

type Props = {
    title: string;
    images: imagesJson;
    address: string;
    location: string;
    start_date: Date;
    end_date: Date;
};
const CardComponent = (props: Props) => {
    const startDate = new Date(props.start_date);
    const endDate = new Date(props.end_date);
    const formattedStartDate = startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear();
    const formattedEndDate = endDate.getDate() + '/' + (endDate.getMonth() + 1) + '/' + endDate.getFullYear();

    let imageJson: imagesJson | undefined;
    if (isValidJsonString(String(props.images))) {
        imageJson = JSON.parse(String(props.images));
    }

    return (
        <Card
            hoverable
            styles={{ body: { padding: 10, boxSizing: 'border-box' } }}
            className="tw-shadow-2xl"
        >
            <div className="tw-grid tw-grid-rows-3 tw-grid-flow-col tw-w-full tw-gap-2 lg:tw-gap-4 tw-font-lora">
                <div className="tw-row-span-2 tw-col-span-2">
                    <h1 className="tw-font-bold md:tw-text-2xl tw-text-ellipsis tw-overflow-hidden tw-text-base tw-flex-none tw-mb-4">
                        {props.title}
                    </h1>
                    <span className=" tw-grow tw-overflow-hidden tw-text-ellipsis">
                        <Space>
                            <IconLocation />
                            <p className="tw-font-bold tw-font-nunito-sans tw-text-base">{props.location}</p>
                        </Space>
                    </span>
                </div>

                <Flex className="tw-col-span-2">
                    <Flex gap="small" justify="space-between">
                        <Space direction="vertical">
                            <span>Ngày bắt đầu:</span>
                            <span className="tw-font-bold">{formattedStartDate}</span>
                        </Space>
                        <Space direction="vertical">
                            <span>Ngày kết thúc:</span>
                            <span className="tw-font-bold">{formattedEndDate}</span>
                        </Space>
                    </Flex>
                </Flex>
                <div className="tw-row-span-3">
                    <Image
                        src={imageJson?.avatar}
                        priority
                        quality={100}
                        height={1000}
                        width={1000}
                        alt="Picture ..."
                        className="tw-w-full tw-h-full tw-rounded-lg tw-bg-cover tw-bg-center"
                    ></Image>
                </div>
            </div>
        </Card>
    );
};

export default CardComponent;
