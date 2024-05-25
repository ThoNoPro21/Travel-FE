import { Card, Col, Flex, Row, Space } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const Discover = (props: Props) => {
    const router = useRouter();
    return (
        <Row gutter={[16, 16]}>
            <Col className="gutter-row" span={24}>
                <Flex align="flex-start" className="tw-w-full tw-font-lora">
                    <Space direction="vertical">
                        <h1 className="tw-font-bold tw-text-xl lg:tw-text-2xl">Khám phá </h1>
                        <p className="lg:tw-text-xl tw-text-base tw-font-medium ">Có thể bạn sẽ thích ?</p>
                    </Space>
                </Flex>
            </Col>
            <Col span={24} className='tw-flex tw-justify-center tw-items-center'>
                <div className="tw-grid tw-grid-cols-2 tw-grid-rows-2 lg:tw-grid-cols-4 lg:tw-grid-rows-1 tw-gap-4 tw-cursor-pointer tw-w-fit ">
                    <Flex
                        vertical
                        className="tw-relative tw-h-40 lg:tw-h-60 tw-max-w-64 tw-overflow-hidden"
                        onClick={() => router.push('place')}
                    >
                        <Image
                            src="https://res.cloudinary.com/thodo2001/image/upload/v1715793236/travel/place/btigp580m2taqfl9cf2t.jpg"
                            height={1000}
                            width={1000}
                            quality={100}
                            priority
                            alt="Picture..."
                            className=" tw-bg-center tw-rounded-lg tw-bg-cover tw-w-full tw-h-full tw-transition tw-duration-700 tw-ease-in-out hover:tw-scale-110 "
                        />
                        <Flex
                            className="tw-absolute tw-bottom-0 tw-h-1/3 tw-text-center tw-w-full tw-text-white 
                            tw-bg-black tw-opacity-70 "
                        >
                            <h1 className="tw-text-xl tw-m-auto tw-font-mono tw-font-bold tw-text-center ">ĐỊA DANH</h1>
                        </Flex>
                    </Flex>
                    <Flex
                        vertical
                        className="tw-relative tw-h-40 lg:tw-h-60 tw-max-w-64 tw-overflow-hidden"
                        onClick={() => router.push('festival')}
                    >
                        <Image
                            src="https://res.cloudinary.com/thodo2001/image/upload/v1714020433/travel/festival/z1dplr4wbqglgxtrp1du.jpg"
                            height={1000}
                            width={1000}
                            quality={100}
                            priority
                            alt="Picture..."
                            className="tw-relative tw-bg-center tw-rounded-lg tw-bg-cover tw-w-full tw-h-full tw-transition tw-duration-700 tw-ease-in-out hover:tw-scale-110"
                        />
                        <Flex
                            vertical
                            className="tw-absolute tw-bottom-0 tw-h-1/3 tw-text-center tw-w-full tw-text-white 
                            tw-bg-black tw-opacity-70 "
                        >
                            <h1 className="tw-text-xl tw-m-auto tw-font-mono tw-font-bold tw-text-center ">SỰ KIỆN</h1>
                        </Flex>
                    </Flex>
                    <Flex
                        vertical
                        className="tw-relative tw-h-40 lg:tw-h-60 tw-max-w-64  tw-overflow-hidden"
                        onClick={() => router.push('product')}
                    >
                        <Image
                            src="https://res.cloudinary.com/thodo2001/image/upload/v1713950226/travel/upload/xs2uhkbykmjbpyexqaru.jpg"
                            height={1000}
                            width={1000}
                            quality={100}
                            priority
                            alt="Picture..."
                            className="tw-relative tw-bg-center tw-rounded-lg tw-bg-cover tw-w-full tw-h-full tw-transition tw-duration-700 tw-ease-in-out hover:tw-scale-110 "
                        />
                        <Flex
                            vertical
                            className="tw-absolute tw-bottom-0 tw-h-1/3 tw-text-center tw-w-full tw-text-white 
                            tw-bg-black tw-opacity-70 "
                        >
                            <h1 className="tw-text-xl tw-m-auto tw-font-mono tw-font-bold tw-text-center ">ĐẶC SẢN</h1>
                        </Flex>
                    </Flex>
                    <Flex
                        vertical
                        className="tw-relative tw-h-40 lg:tw-h-60 tw-max-w-64  tw-overflow-hidden"
                        onClick={() => router.push('blog')}
                    >
                        <Image
                            src="https://res.cloudinary.com/thodo2001/image/upload/v1714018049/travel/upload/lldhvgscmf9kwrdn4qon.jpg"
                            height={1000}
                            width={1000}
                            quality={100}
                            priority
                            alt="Picture..."
                            className="tw-relative tw-bg-center tw-rounded-lg tw-bg-cover tw-w-full tw-h-full tw-transition tw-duration-700 tw-ease-in-out hover:tw-scale-110"
                        />
                        <Flex
                            vertical
                            className="tw-absolute tw-bottom-0 tw-h-1/3 tw-text-center tw-w-full tw-text-white 
                            tw-bg-black tw-opacity-70 "
                        >
                            <h1 className="tw-text-xl tw-m-auto tw-font-mono tw-font-bold tw-text-center ">BÀI VIẾT</h1>
                        </Flex>
                    </Flex>
                </div>
            </Col>
        </Row>
    );
};

export default Discover;
