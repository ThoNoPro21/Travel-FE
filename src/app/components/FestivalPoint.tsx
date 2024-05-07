import { Card, Col, Divider, Flex, Row, Space } from 'antd';
import Image from 'next/image';
import React from 'react';
import { IconEdit } from './IconComponent';

type Props = {};

const FestivalPoint = (props: Props) => {
    return (
        <Card hoverable styles={{ body: { padding: 10 } }} className="tw-shadow-xl">
            <div className="tw-max-h-120 sm:tw-h-full  tw-grid md:tw-grid-cols-2 tw-gap-4 lg:tw-p-2">
                <Image
                    src={'/images/3.jpg'}
                    height={1000}
                    width={1000}
                    quality={100}
                    alt="picture ..."
                    className="tw-min-h-45 tw-max-h-full lg:tw-min-w-full tw-bg-cover tw-bg-center tw-rounded-lg"
                />
                <Flex vertical align="flex-start">
                    <Space className="tw-hidden lg:tw-block tw-flex-auto">
                        <h1 className="tw-font-bold lg:tw-text-2xl ">Bạn biết gì về người Xơ Đăng ?</h1>
                        <p className="tw-text-sm tw-font-semibold tw-text-blue-400 tw-italic">
                            Tìm hiểu <IconEdit />
                        </p>
                        <div className="tw-text-base tw-font-semibold tw-font-lora tw-py-2">
                            <p>
                                <span className="tw-font-semibold tw-text-lg tw-text-emerald-700 tw-me-2">
                                    Bao gồm:
                                </span>
                                Xơ Teng (Hđang, Xđang, Xđeng), Tơ Ðrá (Xđrá, Hđrá), Mnâm, Ca Dong, Ha Lăng (Xlang), Tà
                                Trĩ (Tà Trê), Châu.
                            </p>
                            <Divider style={{ margin: 2, background: 'orange' }} />
                            <p>
                                <span className="tw-font-semibold tw-text-lg tw-text-emerald-700 tw-me-2">
                                    Địa phương:
                                </span>
                                Người Xơ Đăng sống chủ yếu ở tỉnh Kon Tum. Trên thực tế, họ còn sống ở vùng núi các tỉnh
                                Quảng Ngãi, Quảng Nam.
                            </p>
                            <Divider style={{ margin: 2, background: 'orange' }} />
                        </div>
                    </Space>
                    <div className="tw-flex-initial tw-w-full tw-grid tw-grid-cols-2 tw-grid-rows-1 tw-gap-x-4 ">
                        <Card className="tw-flex tw-items-center tw-justify-center tw-bg-orange-500  tw-shadow-2xl tw-w-full tw-h-full ">
                            <Flex vertical align="center">
                                <div className="tw-text-2xl tw-font-bold">100+</div>
                                <div className="tw-text-base tw-text-white tw-font-bold">ĐỊA DANH</div>
                            </Flex>
                        </Card>
                        <Card className="tw-flex tw-items-center tw-justify-center tw-bg-orange-500 tw-shadow-2xl tw-w-full tw-h-full">
                            <Flex vertical align="center">
                                <div className="tw-text-2xl tw-font-bold">172</div>
                                <div className="tw-text-base tw-text-white tw-font-bold">ĐẶC SẢN</div>
                            </Flex>
                        </Card>
                    </div>
                </Flex>
            </div>
        </Card>
    );
};
export default FestivalPoint;
