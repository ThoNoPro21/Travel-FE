'use client';
import { useGetFestivalByIdQuery } from '@/src/store/queries/apiFestival.query';
import { Button, Card, Flex, Spin, Steps } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TabsComponent from '../../../components/common/tab/TabsComponent';
import Overview from '../../../components/festivals/id/Overview';
import ResultComponent from '@/src/components/result/ResultComponent';
import { useAppSelector } from '@/src/store/hooks';

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
const Page = ({ params }: { params: { id: string } }) => {
    const [tabActive, setTabActive] = useState(0);
    const isStatus = useAppSelector((state) => state.dataAuth.isStatus);
    const [componentLoad, setComponentLoad] = useState(false);

    useEffect(() => {
        if (isStatus) {
            setComponentLoad(true);
        }
    }, [isStatus]);


    const getTabActive = (value: number) => {
        setTabActive(value);
    };
    const {
        data: response_getFestival,
        isLoading: isLoading_getFestival,
        isSuccess: isSuccess_getFestival,
        isError:isError_getFestival
    } = useGetFestivalByIdQuery(parseInt(params.id));
    if (isLoading_getFestival) {
        return <Spin fullscreen />;
    }

    if (!isStatus) {
        return null;
    }
    if (isError_getFestival) {
        return (
            <ResultComponent
                status={404}
                title="Không tìm thấy URL !"
                subTitle="Có vẻ như đã có lỗi xảy ra :(("
                textButtonOk="Quay lại trang chủ"
                linkOk="/"
            />
        );
    }
    return (
        isSuccess_getFestival && componentLoad && (
            <main className="tw-pt-20 md:tw-px-13 tw-bg-gray-200">
                    <Overview
                        key={response_getFestival.data.festivals_id}
                        listJson={response_getFestival.data.images}
                        address={response_getFestival.data.address}
                        end_date={response_getFestival.data.end_date}
                        start_date={response_getFestival.data.start_date}
                        name={response_getFestival.data.name}
                        price={response_getFestival.data.price}
                    />
                <TabsComponent options={tabOptions} getTab={getTabActive} />
            </main>
        )
    );
};

export default Page;
