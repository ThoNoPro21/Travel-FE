import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setSelectedMenuHeader } from '@/src/store/slices/common.slice';
import { Flex, Menu, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


type Props = {
    mode:any;
};
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
    const dispatch = useAppDispatch();
    const selectedKeys = useAppSelector((state) => state.dataCommon.selectedMenuHeader);
    const handleMenuBarOnClick: MenuProps['onClick'] = (e) => {
        router.push(e.key);
        dispatch(setSelectedMenuHeader(e.key));
    };
    return (
        <div className="menu-header">
            <Menu
                mode={props.mode}
                onClick={handleMenuBarOnClick}
                defaultSelectedKeys={['/']}
                selectedKeys={[selectedKeys]}
                items={menuItems}
                className="tw-bg-transparent tw-w-full "
            />
        </div>
    );
};

export default NavMiddleComponent;
