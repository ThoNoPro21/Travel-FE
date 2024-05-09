import { Card, Drawer, Flex } from 'antd';
import React, { useState } from 'react';
import { IconDot, IconLocation, IconStar } from '../IconComponent';
import Image from 'next/image';

type Props = {
    name: string;
    src: string;
    item: number;
};

const ListPlaceProduct = (props: Props) => {
    const [open, setOpen] = useState(false);
    const handleOnClick = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const DrawComponent = () => {
        return (
            <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        );
    };
    return (
        <>
            <Card
                hoverable
                styles={{ body: { padding: 10, maxHeight: 160, boxSizing: 'border-box' } }}
                onClick={handleOnClick}
            >
                <Flex className="tw-w-full tw-h-max md:tw-gap-x-4" align="start">
                    <Flex vertical align="flex-start" className="tw-flex-1">
                        <h1 className="tw-font-bold md:tw-text-lg tw-max-h-20  tw-overflow-hidden tw-text-base tw-flex-none">
                            {props.name}
                        </h1>
                        <Flex align="center" gap={8}>
                            <IconStar />
                            <p>4.8</p>
                            <IconDot />
                            <p>Đánh giá (160)</p>
                        </Flex>
                        <Flex align="center" gap={8}>
                            <p className="tw-text-cyan-500">Mở cửa </p>
                            <IconDot />
                            <p>22:00</p>
                            <IconDot />
                            <p>Cả ngày</p>
                        </Flex>
                        <Flex align="center" gap={8}>
                            <IconLocation />
                            <span>Quy Nhơn</span>
                            <IconDot />
                            <p className="tw-text-orange-500">700 m</p>
                        </Flex>
                        <Flex align="center" gap={8}>
                            <p>Ăn tại chỗ</p>
                            <IconDot />
                            <p>Mang đi</p>
                            <IconDot />
                            <p>Giao hàng</p>
                        </Flex>
                    </Flex>
                    <Image
                        src={`/images/${props.src}/${props.item}.jpg`}
                        quality={100}
                        height={1000}
                        width={1000}
                        alt="Picture ..."
                        className=" tw-h-30 tw-w-30 tw-flex-shrink-0 tw-rounded-lg tw-bg-cover tw-bg-center"
                    ></Image>
                </Flex>
            </Card>
            {open && <DrawComponent />}
        </>
    );
};

export default ListPlaceProduct;
