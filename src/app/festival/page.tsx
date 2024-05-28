'use client';
import React, { useEffect } from 'react';
import SideBarComponent from '../../components/festivals/client/SideBarComponent';
import { Card } from 'antd';
import MainComponent from '../../components/festivals/client/MainComponent';
import { useAppDispatch } from '@/src/store/hooks';
import { setSelectedMenuHeader } from '@/src/store/slices/common.slice';

type Props = {};

const Page = (props: Props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSelectedMenuHeader('/festival'));
    }, []);

    return (
        <main className="tw-pt-15 lg:tw-pt-20 md:tw-px-13 tw-min-h-screen tw-bg-gradient-to-r tw-from-violet-200 tw-to-pink-200">
            <div className="tw-grid tw-grid-cols-12 tw-grid-flow-row tw-gap-4 tw-py-4">
                <div className="tw-col-span-12 lg:tw-col-span-3 tw-h-fit">
                    <SideBarComponent />
                </div>
                <div className="tw-col-span-12 lg:tw-col-span-9 tw-min-h-screen">
                    <Card styles={{ body: { padding: 0 } }} className="tw-h-full tw-bg-gray-200 tw-p-2 lg:tw-p-4">
                        <MainComponent />
                    </Card>
                </div>
            </div>
        </main>
    );
};

export default Page;
