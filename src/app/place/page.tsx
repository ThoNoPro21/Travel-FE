'use client';
import React, { useEffect, useState } from 'react';
import SideBarComponent from '../../components/places/client/sidebar/SideBarComponent';
import MainComponent from '../../components/places/client/main/MainComponent';
import { Card, Flex, MenuProps } from 'antd';
import { setSelectedMenuHeader } from '@/src/store/slices/common.slice';
import { useAppDispatch } from '@/src/store/hooks';
import NavBarTabComponent from '@/src/components/common/nav/NavBarTabComponent';
import { setSearch } from '@/src/store/slices/place.slice';

type Props = {};
const filterItems: MenuProps['items'] = [
    {
        label: 'Hot nhất',
        key: '0',
    },
    {
        label: 'Miễn phí',
        key: '1',
    },
];
const Page = (props: Props) => {
    const dispatch = useAppDispatch();
    const [filterCurrent, setFilterCurrent] = useState(0);

    const getTab = (value: number) => {
        setFilterCurrent(value);
    };

    useEffect(() => {
        dispatch(setSelectedMenuHeader('/place'));
    }, []);

    const getValueSearch = (value:string) => {
        dispatch(setSearch(value))
    }

    return (
        <main className="tw-pt-20 tw-px-2 md:tw-px-13 tw-min-h-screen tw-bg-gradient-to-r tw-from-violet-200 tw-to-pink-200">
            <div className="tw-grid tw-grid-cols-12 tw-grid-flow-row tw-gap-4 tw-py-4">
                <div className="tw-col-span-12 lg:tw-col-span-3 tw-h-fit ">
                    <SideBarComponent />
                </div>
                <div className="tw-col-span-12 lg:tw-col-span-9 tw-min-h-screen">
                    <Flex gap={16} vertical className="tw-col-span-3">
                        <div className="tw-hidden lg:tw-block">
                            <NavBarTabComponent items={filterItems} selectedTab={getTab} getValueSearch={getValueSearch}/>
                        </div>
                        <Card styles={{ body: { padding: 0 } }} className="md:tw-p-4 tw-h-full tw-bg-gray-200">
                            <MainComponent />
                        </Card>
                    </Flex>
                </div>
            </div>
        </main>
    );
};

export default Page;
