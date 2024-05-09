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
];
const NavMiddleComponent = (props: Props) => {
    const router = useRouter();
    const [selectedKeys, setSelectedKeys] = useState('/');
    const handleMenuBarOnClick: MenuProps['onClick'] = (e) => {
        router.push(e.key);
        setSelectedKeys(e.key);
    };
    return (
        <Flex align='center' justify='center' className='tw-w-full'>
            <Menu
                mode="horizontal"
                onClick={handleMenuBarOnClick}
                selectedKeys={[selectedKeys ?? '/']}
                items={menuItems}
                style={{width:'100%'}}
                className="tw-text-lg tw-text-white tw-font-bold tw-bg-transparent tw-align-baseline"
            />
        </Flex>
    );
};

export default NavMiddleComponent;
