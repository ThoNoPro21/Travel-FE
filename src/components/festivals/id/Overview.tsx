'use client';
import { Card, Col, Flex, Row, Steps } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { isValidJsonString } from '../../validate/String';
import { imagesJson } from '@/src/types/Article';

type Props = {
    listJson: imagesJson;
    address: string;
    end_date: Date;
    start_date: Date;
    name: string;
    price: number;
};
const Overview = (props: Props) => {
    const startDate = new Date(props.start_date);
    const endDate = new Date(props.end_date);
    const formattedStartDate = startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear();
    const formattedEndDate = endDate.getDate() + '/' + (endDate.getMonth() + 1) + '/' + endDate.getFullYear();
    const startHour = startDate.getHours();
    const endHour = endDate.getHours();
    const itemSteps = [
        {
            title: 'Địa điểm ',
            description: `${props.address}`,
        },
        {
            title: 'Thời gian diễn ra',
            description: `${formattedStartDate} - ${formattedEndDate} `,
        },
        {
            title: 'Khoảng thời gian',
            description: `${startHour} - ${endHour}h`,
        },
        {
            title: 'Mở cửa',
            description: '24/24',
        },
        {
            title: 'Vé',
            description: `${props.price == 0 ? 'Free' : props.price}`,
        },
    ];
    let image: imagesJson | undefined;
    if (isValidJsonString(String(props.listJson))) {
        image = JSON.parse(String(props.listJson));
    }

    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Card
            hoverable
            bordered={false}
            className="tw-relative lg:tw-max-h-screen tw-mb-30 tw-px-4 tw-drop-shadow-lg  "
            styles={{ body: { padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' } }}
        >
            <Row gutter={[16, 16]} className="tw-flex tw-justify-center tw-items-center tw-h-auto lg:tw-max-h-90 tw-w-full tw-mb-30 tw-py-4">
                <Col xs={{ span: 24 }} lg={{ span: 12 }} className='tw-flex tw-justify-center tw-items-center'>
                    <Image
                        src={image?.avatar}
                        alt="Picture..."
                        height={1000}
                        width={1000}
                        className=" tw-rounded-xl tw-bg-center tw-bg-cover tw-w-auto tw-h-auto  "
                    ></Image>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <Steps
                        progressDot
                        direction={`${windowSize.width <= 1024 ? 'horizontal' : 'vertical'}`}
                        current={6}
                        items={itemSteps}
                        className='tw-w-full'
                        responsive={true}
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default Overview;
