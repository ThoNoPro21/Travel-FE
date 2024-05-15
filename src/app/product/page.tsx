'use client';
import { Flex, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import MainComponent from '../../components/products/client/main/MainComponent';
import SideBarComponent from '../../components/products/client/sidebar/SideBarComponent';
import NavBarTabComponent from '@/src/components/common/nav/NavBarTabComponent';
import { useAppDispatch } from '@/src/store/hooks';
import { setSelectedMenuHeader } from '@/src/store/slices/common.slice';

type Props = {};
const filterItems: MenuProps['items'] = [
    {
        label: 'Mới nhất',
        key: '0',
    },
    {
        label: 'Bán chạy nhất',
        key: '1',
    },
    {
        label: 'Giá rẻ đến cao',
        key: '2',
    },
    {
        label: 'Giá cao đến rẻ',
        key: '3',
    },
];
const Page = (props: Props) => {
    const dispatch = useAppDispatch();
    const [filterCurrent, setFilterCurrent] = useState(0);

    const getTab = (value: number) => {
        setFilterCurrent(value);
    };

    useEffect(() => {
        dispatch(setSelectedMenuHeader('/product'));
    }, []);

    return (
        <main className="md:tw-pt-20 md:tw-px-13 tw-min-h-screen tw-bg-gradient-to-r tw-from-violet-200 tw-to-pink-200">
            <div className="tw-grid tw-grid-cols-12 tw-grid-flow-row tw-gap-4 tw-py-4">
                <div className="tw-hidden lg:tw-block lg:tw-col-span-4  tw-rounded-lg tw-h-fit">
                    <SideBarComponent mode={'vertical '} />
                </div>
                <div className="tw-col-span-12  sm:tw-hidden  tw-rounded-lg tw-h-fit">
                    <SideBarComponent mode={'vertical '} />
                </div>
                <div className="tw-col-span-12 lg:tw-col-span-8 tw-min-h-screen">
                    <Flex gap={16} vertical className="tw-grid-cols-12">
                        <div className="tw-hidden lg:tw-block">
                            <NavBarTabComponent items={filterItems} selectedTab={getTab} />
                        </div>
                        <div>
                            <MainComponent />
                        </div>
                    </Flex>
                </div>
            </div>
        </main>
    );
};

export default Page;
