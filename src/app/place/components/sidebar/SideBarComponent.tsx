'use client';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { useGetLocationQuery } from '@/src/store/queries/apiLocation.query.';
import { setMenuId } from '@/src/store/slices/common.slice';
import { RootState } from '@/src/store/store';
import { Badge, Card, List, Menu, MenuProps, Skeleton, Space } from 'antd';
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
    if (isSuccess_getLocation) {
        response_getLocation.data.map((item, index) =>
            placeItems.push({ key: item.locations_id + '', label: item.name })
        );
    }
    const handleMenuBarOnClick: MenuProps['onClick'] = (e) => {
        dispatch(setMenuId(parseInt(e.key)));
    };
    return (
        <List
            header={<h1 className="tw-text-base tw-font-black tw-text-center">Danh mục địa điểm</h1>}
            className="tw-bg-white tw-rounded-lg tw-min-h-fit"
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
    );
};

export default SideBarComponent;
