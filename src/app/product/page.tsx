'use client'
import { Flex } from 'antd';
import React from 'react';
import FilterComponent from './components/sidebar/FilterComponent';
import MainComponent from './components/main/MainComponent';
import SideBarComponent from './components/sidebar/SideBarComponent';

type Props = {};

const page = (props: Props) => {
    return (
<main className="md:tw-pt-20 md:tw-px-13 tw-min-h-screen tw-bg-gradient-to-r tw-from-violet-200 tw-to-pink-200">
            <div className="tw-grid tw-grid-cols-4 tw-grid-flow-row tw-gap-4 tw-py-4">
                <div className="tw-col-span-1 tw-rounded-lg tw-h-fit">
                    <SideBarComponent />
                </div>
                <div className="tw-col-span-3 tw-min-h-screen">
                    <Flex gap={16} vertical className="tw-col-span-3">
                        <FilterComponent />
                        <MainComponent />
                    </Flex>
                </div>
            </div>
        </main>
    );
};

export default page;
