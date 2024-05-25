import { Divider, Segmented } from 'antd';
import React, { useState } from 'react';

type Props = {
    options: any[];
    getTab: (value: number) => void;
};

const TabsComponent = (props: Props) => {
    return (
        <div className="tw-relative">
            <Divider>
                <Segmented
                    onChange={(e) => props.getTab(parseInt(e,10))}
                    size="small"
                    options={props.options}
                    className={`tw-m-auto tw-px-5 tw-py-2 tw-font-bold tw-bg-orange-500 tw-text-xs md:tw-text-base tw-font-mono tw-text-white`}
                />
            </Divider>
        </div>
    );
};

export default TabsComponent;
