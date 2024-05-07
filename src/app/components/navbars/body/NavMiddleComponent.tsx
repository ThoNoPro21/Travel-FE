import { Menu, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Props = {};
const menuItems = [
    {
        key: '/',
        label: 'Trang chủ',
    },
    {
        key: '/blog',
        label: 'Blog',
    },
    {
        key: '/product',
        label: 'Đặc sản',
    },
    {
        key: '/dashboard/festival',
        label: 'Sự kiện',
    },
];
const NavMiddleComponent = (props: Props) => {
    const router = useRouter();
    const [selectedKeys, setSelectedKeys] = useState('/');
    const handleMenuBarOnClick: MenuProps['onClick'] = (e) => {
        router.push(e.key);
        setSelectedKeys(e.key);
    };
    return (
        <Menu
            mode='horizontal'
            onClick={handleMenuBarOnClick}
            selectedKeys={[selectedKeys ?? '/']}
            items={menuItems}
            className="tw-text-lg tw-text-white tw-font-bold tw-bg-transparent tw-w-full"
        />
    );
};

export default NavMiddleComponent;
