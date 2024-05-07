import { Card, Flex } from 'antd';
import Image from 'next/image';
import React from 'react';
import { IconLocation } from '../IconComponent';

type Props = {
    src: string;
};

const CardPreviewComponent = (props: Props) => {
    return (
        <Card bordered={false} hoverable size="small" styles={{ body: { padding: 10 } }}>
            <div className="tw-relative tw-bg-cover tw-bg-center  ">
                <Image
                    src={props.src}
                    height={500}
                    width={500}
                    style={{
                        objectFit: 'cover',
                    }}
                    quality={100}
                    priority
                    alt="Picture..."
                    className="tw-relative tw-min-h-45 tw-w-full tw-bg-cover tw-rounded-lg tw-bg-center  "
                />
                <div className="tw-absolute tw-bottom-0 tw-left-0 tw-h-1/2 tw-w-full tw-bg-black tw-opacity-70 tw-blur-sm"></div>
                <Flex vertical className="tw-absolute tw-bottom-0 tw-text-white tw-px-4 tw-rounded-lg  ">
                    <p className=" lg:tw-text-sm tw-font-bold tw-my-2">Hãy sống hết mình cùng đam mê</p>
                    <Flex className="tw-flex-initial tw-items-center tw-space-x-2 tw-hidden sm:tw-flex ">
                        <div className="tw-text-orange-500">
                            <IconLocation />
                        </div>
                        <span className="tw-font-medium tw-text-xs ">Kon Tum</span>
                    </Flex>
                </Flex>
            </div>
        </Card>
    );
};

export default CardPreviewComponent;
