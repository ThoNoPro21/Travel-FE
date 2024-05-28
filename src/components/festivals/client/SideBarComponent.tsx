import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';
import { Badge, Card, Flex, List, Menu, MenuProps, Select, SelectProps, Skeleton, Space } from 'antd';
import React from 'react';
import { setMenuId } from '@/src/store/slices/festival.slice';

type Props = {};

const SideBarComponent = (props: Props) => {
    const dispatch = useAppDispatch();
    const selectedKeys = useAppSelector((state: RootState) => state.dataFestival.MenuId);
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

    const festivalMobileItems: SelectProps['options'] = [
        {
            value: '1',
            label: 'Tháng 1',
        },
        {
            value: '2',
            label: 'Tháng 2',
        },
        {
            value: '3',
            label: 'Tháng 3',
        },
        {
            value: '4',
            label: 'Tháng 4',
        },
        {
            value: '5',
            label: 'Tháng 5',
        },
        {
            value: '6',
            label: 'Tháng 6',
        },
        {
            value: '7',
            label: 'Tháng 7',
        },
        {
            value: '8',
            label: 'Tháng 8',
        },
        {
            value: '9',
            label: 'Tháng 9',
        },
        {
            value: '10',
            label: 'Tháng 10',
        },
        {
            value: '11',
            label: 'Tháng 11',
        },
        {
            value: '12',
            label: 'Tháng 12',
        },
    ];
    const handleMenuBarOnClick: MenuProps['onClick'] = (e) => {
        dispatch(setMenuId(parseInt(e.key)));
    };

    return (
        <>
        <List
            header={<h1 className="tw-text-base tw-font-black tw-text-center">Danh mục sự kiện, lễ hội</h1>}
            className="tw-bg-white tw-rounded-lg tw-min-h-fit tw-hidden lg:tw-block"
        >
            <Menu
                onClick={handleMenuBarOnClick}
                selectedKeys={selectedKeys === 0 ? [String(new Date().getMonth() + 1)] : [String(selectedKeys)]}
                items={festivalItems}
                className="tw-text-sm tw-font-bold tw-rounded-lg "
            />
        </List>
        <Flex gap='middle' className='lg:tw-hidden'>
        <Select
            allowClear
            value={selectedKeys === 0 ? String(new Date().getMonth() + 1) : String(selectedKeys)}
            options={festivalMobileItems}
            placeholder="Sự kiện theo tháng"
            onChange={(e) => dispatch(setMenuId(parseInt(e)))}
            className="tw-flex-1 tw-w-full lg:tw-hidden tw-px-2"
        />
    </Flex>
    </>
    );
};

export default SideBarComponent;
