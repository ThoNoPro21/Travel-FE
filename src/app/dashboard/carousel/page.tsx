'use client'
import NavBarTabComponent from '@/src/components/common/nav/NavBarTabComponent';
import { setSelectedKeys } from '@/src/store/slices/common.slice';
import { Card, Flex, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import CreateForm from './CreateForm';
import { useAppDispatch } from '@/src/store/hooks';

type Props = {};

const items: MenuProps['items'] = [
    {
        key: '0',
        label: 'Slide',
    },
    { key: '1', label: 'Thêm' },
];

const page = (props: Props) => {
    const dispatch = useAppDispatch();
    const [tabActive,setTabActive] = useState(0)

    useEffect(()=>{
        dispatch(setSelectedKeys('/dashboard/carousel'))
    },[])

    const getTabActive = (value:number) => {
        setTabActive(value)
    }

    return (
        <Flex vertical gap='small'>
            <NavBarTabComponent items={items} selectedTab={getTabActive}/>
            <Card className='tw-h-screen'>
            {tabActive ===1 && <CreateForm  />}
            </Card>
        </Flex>
    )
};

export default page;
