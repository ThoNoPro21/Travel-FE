'use client';
import SearchComponent from '@/src/components/products/client/sidebar/SearchComponent';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { useGetLocationQuery } from '@/src/store/queries/apiLocation.query.';
import { setMenuId } from '@/src/store/slices/common.slice';
import { RootState } from '@/src/store/store';
import { Badge, Card, Flex, List, Menu, MenuProps, Select, SelectProps, Skeleton, Space } from 'antd';
import React, { useState } from 'react';

type Props = {};

const SideBarComponent = (props: Props) => {
    const dispatch = useAppDispatch();
    const selectedKeys = useAppSelector((state: RootState) => state.dataCommon.MenuId);
    const {
        data: response_getLocation,
        isLoading: isLoading_getLocation,
        isSuccess: isSuccess_getLocation,
    } = useGetLocationQuery('');
    const placeItems: MenuProps['items'] = [
        {
            key: '0',
            label: 'Tất cả',
        },
    ];
    const placeMobileItems: SelectProps['options'] = [
        {
            value: '0',
            label: 'Tất cả',
        },
    ];
    if (isSuccess_getLocation) {
        response_getLocation.data.map(
            (item, index) => (
                placeItems.push({ key: item.locations_id + '', label: item.name }),
                placeMobileItems.push({ value: item.locations_id + '', label: item.name })
            )
        );
    }
    const handleMenuBarOnClick: MenuProps['onClick'] = (e) => {
        dispatch(setMenuId(parseInt(e.key)));
    };
    return (
        <>
            <List
                header={<h1 className="tw-text-base tw-font-black tw-text-center">Danh mục địa điểm</h1>}
                className="tw-hidden lg:tw-block tw-bg-white tw-rounded-lg tw-min-h-fit "
            >
                <Menu
                    onClick={handleMenuBarOnClick}
                    selectedKeys={[String(selectedKeys)]}
                    items={placeItems}
                    className="tw-text-sm tw-font-bold tw-rounded-lg "
                />
                <div className="tw-space-y-4">
                    <Skeleton active loading={isLoading_getLocation}></Skeleton>
                    <Skeleton active loading={isLoading_getLocation}></Skeleton>
                </div>
            </List>
            <Flex gap='middle' className='lg:tw-hidden'>
                <Select
                    allowClear
                    defaultValue={'0'}
                    options={placeMobileItems}
                    placeholder="Danh mục địa điểm"
                    onChange={(e) => dispatch(setMenuId(parseInt(e)))}
                    className="tw-flex-1 tw-w-full lg:tw-hidden"
                />
                <div className="tw-flex-1 tw-flex-grow">
                    <SearchComponent />
                </div>
            </Flex>
        </>
    );
};

export default SideBarComponent;
