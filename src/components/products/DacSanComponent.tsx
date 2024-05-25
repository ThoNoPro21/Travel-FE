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
        <Card hoverable styles={{ body: { padding: 0, width: '100%' } }} className='tw-shadow-lg '>
            <Flex
                vertical
                gap={16}
                align='center'
                justify="space-between"
                className="tw-p-2 tw-h-50 md:tw-h-60"
                onClick={() => handleOnClick(props.product_id)}
            >
                <Flex justify='center' className=" tw-flex-1 tw-w-auto tw-overflow-hidden">
                    <Image
                        src={props.src}
                        alt="Picture ..."
                        quality={100}
                        width={1000}
                        height={1000}
                        priority={true}
                        className="tw-bg-cover tw-w-auto tw-h-auto tw-bg-center tw-rounded-lg "
                    />
                </Flex>
                <Flex vertical  align="center" className="tw-h-12 md:tw-h-16 tw-flex-none">
                    <p className="tw-text-base tw-font-black">{props.name}</p>
                    <p className="tw-text-base tw-font-semibold">{formatVND(props.price)}</p>
                </Flex>
            </Flex>
        </Card>
    );
};

export default DacSanComponent;
