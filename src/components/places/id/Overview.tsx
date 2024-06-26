    'use client';
    import { Button, Flex, Space, Steps } from 'antd';
    import Card from 'antd/es/card/Card';
    import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import SwiperComponent from '../../SwiperComponent';
    import { imagesJson } from '@/src/types/Article';
    import { IconLocation } from '../../IconComponent';

    type Props = {
        listJson?: imagesJson;
        place_name?: string;
        location?: string;
    };

    const Overview = (props: Props) => {
        const [active, setActive] = useState('');
        const getCurrent_url = (value: string) => {
            setActive(value);
        };
        return (
            <Card
                hoverable
                bordered={false}
                className="tw-relative tw-h-auto lg:tw-max-h-screen tw-mb-30 tw-bg-gradient-to-t tw-from-purple-100  tw-via-white  tw-to-fuchsia-200 tw-font-lora"
                styles={{ body: { padding: 0 } }}
            >
                <Flex gap={24} className="tw-h-80 tw-mb-5 md:tw-mb-30 tw-w-full tw-p-4">
                    <Flex justify="center" className="tw-flex-1 tw-h-auto tw-w-auto tw-overflow-hidden">
                        <motion.img
                            src={active || props.listJson?.avatar}
                            alt="Picture..."
                            height={1000}
                            width={1000}
                            className=" tw-rounded-xl tw-w-auto tw-h-full tw-bg-center tw-bg-cover "
                            initial={{
                                scale: 0.8,
                                opacity: 0,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}
                            transition={{ duration: 0.5, loop: Infinity }}
                        ></motion.img>
                    </Flex>
                    <Flex className=" tw-flex-1 tw-hidden lg:tw-block">
                        <Card
                            bordered={false}
                            styles={{ body: { padding: 0 } }}
                            className="tw-relative tw-w-full tw-h-full tw-p-4"
                        >
                            <Steps
                                progressDot
                                current={5}
                                direction="vertical"
                                size="small"
                                items={props.listJson?.subDescription}
                            />
                            <Flex vertical className="tw-absolute tw-top-0 tw-right-0 tw-p-2 tw-font-lora">
                                <Space className=" tw-self-end tw-bg-orange-500 tw-text-white tw-font-normal tw-rounded-md tw-p-2 tw-drop-shadow-md hover:tw-drop-shadow-xl">
                                    <IconLocation color="black" />
                                    <p>{props.location}</p>
                                </Space>
                                <h1 className=" tw-text-2xl tw-font-bold">{props.place_name}</h1>
                            </Flex>
                        </Card>
                    </Flex>
                </Flex>
                <Flex className="tw-absolute -tw-bottom-25 tw-w-full tw-backdrop-blur-sm">
                    <div className="tw-w-full tw-h-30 md:tw-h-55">
                        <SwiperComponent
                            listImg={[
                                ...(props.listJson?.avatar ? [props.listJson?.avatar] : []),
                                ...(props.listJson?.imageDetails ?? []),
                            ]}
                            onChange={getCurrent_url}
                            perview={props.listJson?.imageDetails?.length > 6 ? 6 : 'auto'}
                            spaceBetween={10}
                            autoPlay={false}
                            loop={props.listJson?.imageDetails?.length > 6 ? true : false}
                        />
                    </div>
                </Flex>
                <Flex vertical className="tw-absolute tw-top-0 tw-right-0 tw-p-2 tw-font-lora tw-backdrop-blur-lg lg:tw-hidden">
                    <Space className=" tw-self-end tw-bg-orange-500 tw-text-white tw-font-normal tw-rounded-md tw-p-1">
                        <IconLocation color="black" />
                        <p className='tw-text-xs'>{props.location}</p>
                    </Space>
                    <h1 className="tw-text-base tw-font-bold">{props.place_name}</h1>
                </Flex>
            </Card>
        );
    };

    export default Overview;
