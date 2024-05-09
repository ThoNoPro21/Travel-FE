import { Card, Flex, Space } from 'antd';
import Image from 'next/image';
import React from 'react';
import { IconHeart } from '../IconComponent';
import { useRouter } from 'next/navigation';
import { formatVND } from '../validate/String';

type Props = {
    src: string;
    name: string;
    price: number;
    product_id: number;
};

const DacSanComponent = (props: Props) => {
    const router = useRouter();
    const handleOnClick = (value: number) => {
        router.push(`/product/${value}`, { scroll: false });
    };
    return (
        <Card hoverable styles={{ body: { padding: 0, width: '100%', height: 280 } }} className='tw-shadow-lg tw-h-fit'>
            <Flex
                vertical
                gap={16}
                justify="space-between"
                className="tw-p-2 tw-w-full tw-h-full"
                onClick={() => handleOnClick(props.product_id)}
            >
                <Flex justify='center' className="tw-h-60 tw-overflow-hidden">
                    <Image
                        src={props.src}
                        alt="Picture ..."
                        quality={100}
                        width={1000}
                        height={1000}
                        priority={true}
                        className="tw-bg-cover tw-w-auto tw-bg-center tw-rounded-lg"
                    />
                </Flex>
                <Flex vertical  align="center" className="tw-h-16 ">
                    <p className="tw-text-base tw-font-black">{props.name}</p>
                    <p className="tw-text-base tw-font-semibold">{formatVND(props.price)}</p>
                </Flex>
            </Flex>
        </Card>
    );
};

export default DacSanComponent;
