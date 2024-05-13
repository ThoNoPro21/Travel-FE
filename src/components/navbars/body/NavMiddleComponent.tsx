import { useAppSelector } from '@/src/store/hooks';
import { Flex, Menu, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


type Props = {};
const menuItems = [
    {
        key: '/',
        label: 'TRANG CHỦ',
    },
    {
        key: '/blog',
        label: 'BLOG',
    },
    {
        key: '/product',
        label: 'ĐẶC SẢN',
    },
    {
        key: '/festival',
        label: 'SỰ KIỆN',
    },
    {
        key: '/place',
        label: 'ĐỊA DANH',
    },
    {
        key: '/review',
        label: 'ĐÁNH GIÁ',
    },
];
const NavMiddleComponent = (props: Props) => {
    const router = useRouter();
    const selectedKeys = useAppSelector((state) => state.dataCommon.selectedMenuHeader);
    const handleMenuBarOnClick: MenuProps['onClick'] = (e) => {
        router.push(e.key);
        e.key;
    };
    return (
        <div className="menu-header">
            <Menu
                mode="horizontal"
                onClick={handleMenuBarOnClick}
                selectedKeys={[selectedKeys ?? '/']}
                items={menuItems}
                className="tw-bg-transparent tw-w-full "
            />
        </div>
    );
};

export default NavMiddleComponent;
