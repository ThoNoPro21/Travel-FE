'use client'
import React, { useEffect } from 'react'
import SideBarComponent from '../../components/festivals/client/SideBarComponent';
import { Card } from 'antd';
import MainComponent from '../../components/festivals/client/MainComponent';
import { useAppDispatch } from '@/src/store/hooks';
import { setSelectedKeys } from '@/src/store/slices/common.slice';

type Props = {}

const page = (props: Props) => {
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(setSelectedKeys('/festival'))
    },[])

  return (
    <main className="md:tw-pt-20 md:tw-px-13 tw-min-h-screen tw-bg-gradient-to-r tw-from-violet-200 tw-to-pink-200">
        <div className="tw-grid tw-grid-cols-4 tw-grid-flow-row tw-gap-4 tw-py-4">
            <div className="tw-col-span-1 tw-h-fit">
                <SideBarComponent />
            </div>
            <div className="tw-col-span-3 tw-min-h-screen">
                <Card className="tw-h-full tw-bg-gray-200">
                    <MainComponent />
                </Card>
            </div>
        </div>
    </main>
);
}

export default page