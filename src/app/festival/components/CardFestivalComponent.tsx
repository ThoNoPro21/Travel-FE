import { imagesJson } from '@/src/types/Article';
import { Card, Flex, Space } from 'antd';
import React from 'react';
import { IconLocation } from '../../components/IconComponent';
import Image from 'next/image';
import { isValidJsonString } from '../../components/common/validate/String';

type Props = {
    title: string;
    images: imagesJson;
    address: string;
    location: string;
    start_date:Date;
    end_date:Date;
};

const CardFestivalComponent = (props: Props) => {
    let images:imagesJson|undefined;
    if(isValidJsonString(String(props.images))){
        images = JSON.parse(String(props.images))
    }

    const startDate = new Date(props.start_date);
    const endDate = new Date(props.end_date);
    const formattedStartDate = startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear();
    const formattedEndDate = endDate.getDate() + '/' + (endDate.getMonth() + 1) + '/' + endDate.getFullYear();
    return (
        <Card
            hoverable
            styles={{ body: { padding: 10, maxHeight: 280, boxSizing: 'border-box' } }}
            className="tw-shadow-2xl tw-h-fit"
        >
            <Flex vertical className="tw-max-h-full tw-w-full tw-gap-x-4 tw-font-lora">
                <Flex className="tw-flex-grow md:tw-gap-x-4 tw-overflow-hidden" align="start">
                    <Flex vertical align="flex-start" className="tw-flex-grow">
                        <h1 className="tw-font-bold md:tw-text-2xl tw-text-ellipsis tw-text-base tw-flex-none tw-mb-4">
                            {props.title}
                        </h1>
                        <span className=" tw-grow tw-overflow-hidden tw-text-ellipsis">
                            <Space>
                                <IconLocation />
                                <p className="tw-font-bold tw-font-nunito-sans tw-text-base">{props.location}</p>
                            </Space>
                        </span>
                        <div className="tw-min-h-5 tw-w-fit">
                            <Flex className='tw-space-x-4' >
                                <Space direction="vertical">
                                    <span>Ngày bắt đầu:</span>
                                    <span className="tw-font-bold">{formattedStartDate}</span>
                                </Space>

                                <Space direction="vertical">
                                    <span>Ngày kết thúc:</span>
                                    <span className="tw-font-bold">{formattedEndDate}</span>
                                </Space>
                            </Flex>
                        </div>
                    </Flex>
                    <Image
                        src={images?.avatar}
                        priority
                        quality={100}
                        height={1000}
                        width={1000}
                        alt="Picture ..."
                        className="tw-max-w-55 tw-h-full tw-flex-shrink-0 tw-rounded-lg tw-bg-cover tw-bg-center"
                    ></Image>
                </Flex>
            </Flex>
        </Card>
    );
};

export default CardFestivalComponent;
