import { Card, Flex } from 'antd';
import React, { useState } from 'react';
import TabsComponent from '../../common/tab/TabsComponent';
import CuaHangComponent from '../client/store/CuaHangComponent';
import NhaHangComponent from '../client/store/NhaHangComponent';
import OtherComponent from '../client/store/OtherComponent';

type Props = {};
const tabShopOptions = [
    {
        label: <p className="tw-p-2">Cửa hàng</p>,
        value: '0',
    },
    {
        label: <p className="tw-p-2">Nhà hàng</p>,
        value: '1',
    },
    {
        label: <p className="tw-p-2">Khác</p>,
        value: '2',
    },
];

const ShopComponent = (props: Props) => {
    const [tabShopActive, setTabShopActive] = useState(0);

    const getTabShopActive = (value: number) => {
        setTabShopActive(value);
    };

    return (
        <Card bordered={false} styles={{ body: { padding: 0 } }} className="tw-w-full tw-px-4 tw-bg-gray-200">
            <Flex vertical>
                <Flex align="center">
                    <h1 className="tw-flex-1 tw-font-black tw-text-lg tw-text-black">Nơi bạn có thể tìm mua</h1>
                    <TabsComponent options={tabShopOptions} getTab={getTabShopActive} />
                </Flex>
                <Flex vertical className="tw-gap-2 tw-pb-4 ">
                    {tabShopActive === 0 && <CuaHangComponent />}
                    {tabShopActive === 1 && <NhaHangComponent />}
                    {tabShopActive === 2 && <OtherComponent />}
                </Flex>
            </Flex>
        </Card>
    );
};

export default ShopComponent;
