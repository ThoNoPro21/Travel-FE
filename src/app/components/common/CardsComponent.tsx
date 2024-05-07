import React from 'react';
import { IconHeart, IconLeft, IconLocation, IconStar } from '../IconComponent';
import Image from 'next/image';
import { Card, Flex, Space } from 'antd';
import { imagesJson } from '@/src/types/Article';
import { isValidJsonString } from './validate/String';

type Props = {
    src: imagesJson;
    location?: string;
    star: string;
    heart: string;
    title: string;
};

const CardComponent = (props: Props) => {
    let images: imagesJson | null = null;

    if (isValidJsonString(String(props.src))) {
        images = JSON.parse(String(props.src));
    }

    return (
        <Card bordered={false} hoverable size="small" styles={{ body: { padding: 10 } }}>
            <Flex vertical align="flex-start" gap="middle" className="tw-min-w-55 tw-h-90 tw-font-lora tw-shrink-0">
                <div className="tw-h-60 tw-w-full tw-bg-cover tw-bg-center ">
                    <Image
                        src={images?.avatar}
                        height={1000}
                        width={1000}
                        style={{
                            objectFit: 'cover',
                        }}
                        quality={100}
                        priority
                        alt="Picture..."
                        className="tw-h-full tw-w-full tw-bg-cover tw-rounded-lg  tw-bg-center "
                    />
                </div>
                <div className="tw-flex tw-flex-1 tw-flex-col tw-items-start tw-gap-3 tw-self-stretch">
                    <div className="tw-flex tw-h-7 tw-w-full tw-justify-between tw-items-center tw-gap-2 ">
                        <div className="tw-space-x-1 tw-text-sm tw-font-thin tw-min-w-fit">
                            <span className='tw-text-xs'>
                                <IconLocation />
                            </span>
                            <span className='tw-text-xs'>{props.location}</span>
                        </div>
                        <div className="tw-flex tw-min-w-fit tw-justify-between tw-space-x-2 tw-items-center tw-text-sm tw-font-thin">
                            <div className="tw-flex tw-items-center tw-space-x-1">
                                <p className='tw-text-xs'><IconStar /></p>
                                <p className='tw-text-xs'>{props.star}</p>
                            </div>
                            <div className="tw-flex tw-items-center tw-space-x-1">
                                <p className='tw-text-xs'><IconHeart /></p>
                                <p className='tw-text-xs'>{props.heart}</p>
                            </div>
                        </div>
                    </div>
                    <h1 className="lg:tw-text-xl tw-text-base tw-font-bold">{props.title}</h1>
                </div>
            </Flex>
        </Card>
    );
};

export default CardComponent;
