import { Divider, Segmented } from 'antd';
import React, { useState } from 'react';

type Props = {
    options: any[];
    getTab: (value: number) => void;
    block?:boolean;
};

const TabsComponent = (props: Props) => {
    return (
        <div className="tw-relative tw-m-auto lg:tw-m-0 tw-py-2 tw-w-full lg:tw-w-auto">
                <Segmented
                    block={props.block || false}
                    onChange={(e) => props.getTab(parseInt(e,10))}
                    size="small"
                    options={props.options}
                    className={`tw-px-2 lg:tw-px-5 tw-py-2 tw-font-bold tw-bg-orange-500 tw-text-xs md:tw-text-base tw-font-mono tw-text-white tw-w-full lg:tw-w-auto`}
                />
        </div>
    );
};

export default TabsComponent;
