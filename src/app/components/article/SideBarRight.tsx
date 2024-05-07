import React from 'react';
import { Flex } from 'antd';
import CardPreviewComponent from '../common/CardPreviewComponent';

type Props = {};

const SideBarRight = (props: Props) => {
    return (
        <main className="tw-flex tw-flex-col tw-gap-2 tw-min-w-64 md:tw-mt-4">
            <Flex justify="space-between">
                <p className="tw-text-2xl tw-font-bold lg:tw-text-sm lg:tw-font-medium ">Bài viết khác</p>
                <div className="tw-rounded-lg tw-bg-orange-400 tw-p-2 tw-border-blue-500 tw-text-xs tw-font-light">
                    Xem tất cả
                </div>
            </Flex>
            <Flex className="tw-grid tw-grid-cols-2 lg:tw-grid-cols-1 tw-grid-flow-row">
                {[0, 1, 2, 3].map((item) => (
                    <CardPreviewComponent key={item} src={`/images/${item}.jpg`} />
                ))}
            </Flex>
        </main>
    );
};

export default SideBarRight;
