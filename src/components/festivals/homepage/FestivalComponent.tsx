import { imagesJson } from '@/src/types/Article';
import { Divider, Flex, Space } from 'antd';
import Image from 'next/image';
import React from 'react';
import { isValidJsonString, truncateDescription } from '../../validate/String';
import Link from 'next/link';
import { IconLocation } from '../../IconComponent';

type Props = {
    festival_id: number;
    listJson: imagesJson;
    name: string;
    address: string;
    description: string;
    start_date: Date;
    end_date: Date;
    location: string;
};

const FestivalComponent = (props: Props) => {
    const startDate = new Date(props.start_date);
    const endDate = new Date(props.end_date);
    const formattedStartDate = startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear();
    const formattedEndDate = endDate.getDate() + '/' + (endDate.getMonth() + 1) + '/' + endDate.getFullYear();

    let image: imagesJson | undefined;
    if (isValidJsonString(String(props.listJson))) {
        image = JSON.parse(String(props.listJson));
    }
    return (
        <div className=" tw-relative tw-container-banner tw-w-full sm:tw-h-screen tw-h-screen-50 tw-bg-cover tw-bg-center">
            <div className="tw-absolute tw-w-full sm:tw-h-screen tw-h-screen-50 tw-t-0 tw-bg-gradient-to-r tw-from-slate-950 tw-shadow-md">
                <Flex className="tw-pt-20 tw-w-full tw-h-full lg:tw-px-4 xl:tw-px-13 tw-px-2 tw-overflow-hidden">
                    <div className="tw-grid tw-grid-cols-2 tw-w-full tw-h-full lg:tw-gap-4 tw-box-border tw-pb-2 tw-text-white">
                        <Flex vertical>
                            <Flex
                                align="center"
                                justify="center"
                                className="tw-flex-1 tw-text-xl lg:tw-text-6xl tw-font-lora tw-text-yellow-300 tw-font-bold"
                            >
                                {props.name}
                            </Flex>
                            <Flex
                                vertical
                                className=" lg:tw-text-4xl tw-text-lg tw-text-center tw-font-lora tw-font-bold tw-overflow-hidden tw-text-orange-500"
                            >
                                {formattedStartDate} - {formattedEndDate}
                                <Divider className="tw-bg-white tw-m-2 lg:tw-m-8" />
                                <Flex align="center" gap="middle" className="tw-text-sm lg:tw-text-base tw-text-white tw-font-bold ">
                                    <IconLocation />
                                    {props.location}
                                </Flex>
                            </Flex>
                            <Flex vertical justify="space-evenly" className="md:tw-flex-1 tw-py-2 ">
                                <p
                                    className="tw-font-lora tw-hidden md:tw-block"
                                    dangerouslySetInnerHTML={{
                                        __html: truncateDescription(JSON.parse(props.description),300),
                                    }}
                                ></p>
                                <Link href={`festival/${props.festival_id}`}>
                                    <button className=" tw-bg-yellow-500 hover:tw-bg-cyan-300 tw-px-1 lg:tw-px-4 tw-py-1 lg:tw-py-2 tw-w-20 lg:tw-w-30 tw-font-lora tw-text-sm lg:tw-text-base tw-rounded-lg tw-text-black tw-font-bold tw-cursor-pointer">
                                        Chi tiết
                                    </button>
                                </Link>
                            </Flex>
                        </Flex>
                    </div>
                </Flex>
            </div>
            <Image
                src={image?.avatar}
                height={1000}
                width={1000}
                alt="banner"
                quality={100}
                priority={true}
                className="tw-w-full tw-h-full tw-bg-center tw-bg-cover"
            ></Image>
        </div>
    );
};

export default FestivalComponent;
