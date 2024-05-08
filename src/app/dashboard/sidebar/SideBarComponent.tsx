import { useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';
import { Badge, Card, Menu, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};


const SideBarComponent = (props: Props) => {

    const router = useRouter();
    const countPost_Pending = useAppSelector((state:RootState)=>state.dataArticle.countPostPending)
    const selectedKeys = useAppSelector((state: RootState) => state.dataCommon.selectedKeys);
    const categoryItems = [
        {
            key: '/dashboard',
            label: 'Tổng quan',
        },
        {
            key: '/dashboard/product',
            label: 'Sản phẩm',
        },
        {
            key: '/dashboard/place',
            label: 'Địa danh',
        },
        {
            key: '/dashboard/festival',
            label: 'Sự kiện',
        },
        {
            key: '/dashboard/article',
            label: <div>Bài viết <Badge count={countPost_Pending ? countPost_Pending : 0} /></div>,
        },
        {
            key: '/dashboard/carousel',
            label: <div>Ảnh</div>,
        },
    ];

    const handleMenuBarOnClick: MenuProps['onClick'] = (e) => {
        router.push(e.key)
    };
    return (
        <Card hoverable bordered={false} className="tw-w-full tw-h-full" styles={{body:{padding:0}}}>
            <Menu
                onClick={handleMenuBarOnClick}
                selectedKeys={[selectedKeys??'/dashboard']}
                items={categoryItems}
                className="tw-text-sm tw-font-bold tw-rounded-lg "
            />
        </Card>
    );
};

export default SideBarComponent;
