'use client';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { useGetCategoryQuery } from '@/src/store/queries/apiCategory.query';
import { setMenuId } from '@/src/store/slices/common.slice';
import { RootState } from '@/src/store/store';
import { Badge, Card, List, Menu, MenuProps, Select, SelectProps, Skeleton, Space } from 'antd';
import React, { useState } from 'react';

type Props = {};

const SideBarComponent = (props: Props) => {
    const dispatch = useAppDispatch();
    const selectedKeys = useAppSelector((state: RootState) => state.dataCommon.MenuId);
    const {
        data: response_getCategory,
        isLoading: isLoading_getCategory,
        isSuccess: isSuccess_getCategory,
    } = useGetCategoryQuery('');
    const categoryItems: MenuProps['items'] = [
        {
            key: '0',
            label: 'Tất cả',
        },
    ];
    const categoryMobileItems: SelectProps['options'] = [
        {
            value: '0',
            label: 'Tất cả',
        },
    ];
    if (isSuccess_getCategory) {
        response_getCategory?.data.map(
            (item, index) => (
                categoryItems.push({ key: item.categories_id + '', label: item.name }),
                categoryMobileItems.push({ value: item.categories_id + '', label: item.name })
            )
        );
    }
    const handleMenuBarOnClick: MenuProps['onClick'] = (e) => {
        dispatch(setMenuId(parseInt(e.key)));
    };
    return (
        <>
            <List
                header={<h1 className="tw-text-base tw-font-black tw-text-center">Danh mục sản phẩm</h1>}
                className="tw-hidden lg:tw-block tw-bg-white tw-rounded-lg tw-min-h-fit"
            >
                <Menu
                    onClick={handleMenuBarOnClick}
                    selectedKeys={[String(selectedKeys)]}
                    items={categoryItems}
                    className="tw-text-base tw-font-bold tw-rounded-lg"
                />
                <div className="tw-space-y-4">
                    <Skeleton active loading={isLoading_getCategory}></Skeleton>
                    <Skeleton active loading={isLoading_getCategory}></Skeleton>
                </div>
            </List>
            <Select allowClear options={categoryMobileItems} defaultValue={0}  onChange={(e) => console.log(e)} className='tw-w-full'/>
        </>
    );
};

export default SideBarComponent;
