import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setMenuId } from '@/src/store/slices/common.slice';
import { RootState } from '@/src/store/store';
import { Badge, Card, List, Menu, MenuProps, Skeleton, Space } from 'antd';
import React from 'react';

type Props = {};

const SideBarComponent = (props: Props) => {
    const dispatch = useAppDispatch();
    const selectedKeys = useAppSelector((state: RootState) => state.dataCommon.MenuId);
    const festivalItems: MenuProps['items'] = [
        {
            key: '1',
            label: 'Tháng 1',
        },
        {
            key: '2',
            label: 'Tháng 2',
        },
        {
            key: '3',
            label: 'Tháng 3',
        },
        {
            key: '4',
            label: 'Tháng 4',
        },
        {
            key: '5',
            label: 'Tháng 5',
        },
        {
            key: '6',
            label: 'Tháng 6',
        },
        {
            key: '7',
            label: 'Tháng 7',
        },
        {
            key: '8',
            label: 'Tháng 8',
        },
        {
            key: '9',
            label: 'Tháng 9',
        },
        {
            key: '10',
            label: 'Tháng 10',
        },
        {
            key: '11',
            label: 'Tháng 11',
        },
        {
            key: '12',
            label: 'Tháng 12',
        },
    ];

    const handleMenuBarOnClick: MenuProps['onClick'] = (e) => {
        dispatch(setMenuId(parseInt(e.key)));
    };

    return (
        <List
            header={<h1 className="tw-text-base tw-font-black tw-text-center">Danh mục sự kiện, lễ hội</h1>}
            className="tw-bg-white tw-rounded-lg tw-min-h-fit"
        >
            <Menu
                onClick={handleMenuBarOnClick}
                selectedKeys={[String(selectedKeys)==='0' ? String(new Date().getMonth() + 1)  : String(selectedKeys)]}
                items={festivalItems}
                className="tw-text-sm tw-font-bold tw-rounded-lg "
            />
        </List>
    );
};

export default SideBarComponent;
