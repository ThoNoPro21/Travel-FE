'use client';
import { useGetFestivalByIdQuery } from '@/src/store/queries/apiFestival.query';
import { Button, Card, Flex, Spin, Steps } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import TabsComponent from '../../components/common/TabsComponent';
import Overview from './Overview';

type Props = {};

const tabOptions = [
    {
        label: <p className="tw-p-2">Tổng quan</p>,
        value: '0',
    },
    {
        label: <p className="tw-p-2">Đánh giá</p>,
        value: '1',
    },
    {
        label: <p className="tw-p-2">Ảnh (145)</p>,
        value: '2',
    },
];
const page = ({ params }: { params: { id: string } }) => {
    const [tabActive, setTabActive] = useState(0);
    const getTabActive = (value: number) => {
        setTabActive(value);
    };
    const {
        data: response_festival,
        isLoading: isLoading_festival,
        isSuccess: isSuccess_festival,
    } = useGetFestivalByIdQuery(parseInt(params.id));
    if (isLoading_festival) {
        return <Spin fullscreen />;
    }
    return (
        isSuccess_festival && (
            <main className="tw-pt-20 md:tw-px-13 tw-bg-gray-200">
                    <Overview
                        key={response_festival.data.festivals_id}
                        listJson={response_festival.data.images}
                        address={response_festival.data.address}
                        end_date={response_festival.data.end_date}
                        start_date={response_festival.data.start_date}
                        name={response_festival.data.name}
                        price={response_festival.data.price}
                    />
                <TabsComponent options={tabOptions} getTab={getTabActive} />
            </main>
        )
    );
};

export default page;
