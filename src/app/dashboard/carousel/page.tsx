'use client';
import NavBarTabComponent from '@/src/components/common/nav/NavBarTabComponent';
import { setSelectedKeys } from '@/src/store/slices/common.slice';
import { Card, Flex, MenuProps, Popconfirm, Skeleton, Spin, Switch, TableColumnsType, message } from 'antd';
import React, { useEffect, useState } from 'react';
import CreateForm from '../../../components/carousels/admin/CreateForm';
import { useAppDispatch } from '@/src/store/hooks';
import Overview from '@/src/components/carousels/admin/Overview';
import { useGetCarouselQuery } from '@/src/store/queries/apiCommon.query';

type Props = {};

const items: MenuProps['items'] = [
    {
        key: '0',
        label: 'Slide',
    },
    { key: '1', label: 'Thêm' },
];

const page = (props: Props) => {
    const dispatch = useAppDispatch();
    const [tabActive, setTabActive] = useState(0);
    const [pageCarousel, setPageCarousel] = useState(1);

    useEffect(() => {
        dispatch(setSelectedKeys('/dashboard/carousel'));
    }, []);

    const {
        data: response_getCarousel,
        isLoading: isLoading_getCarousel,
        isSuccess: isSuccess_getCarousel,
        refetch: refetch_getCarousel,
    } = useGetCarouselQuery(pageCarousel);

    const getTabActive = (value: number) => {
        setTabActive(value);
    };

    const getPageCarousel = (page:number) => {
        setPageCarousel(page)
    }

    return (
        <Flex vertical gap="small">
            <NavBarTabComponent items={items} selectedTab={getTabActive} />
            <Card className="tw-h-screen tw-overflow-hidden">
                {tabActive === 0 && isSuccess_getCarousel && (
                    <Overview
                        data={response_getCarousel.data}
                        refetch_getCarousel={refetch_getCarousel}
                        onChangeNewPage={getPageCarousel}
                    />
                )}
                {tabActive === 1 && <CreateForm refetch={refetch_getCarousel}/>}
            </Card>
        </Flex>
    );
};

export default page;
