'use client'
import NavBarTabComponent from '@/src/components/common/nav/NavBarTabComponent'
import React, { useEffect, useState } from 'react'
import CreateForm from '../../../components/festivals/admin/CreateForm'
import { Flex, MenuProps } from 'antd'
import { useAppDispatch } from '@/src/store/hooks'
import { setSelectedKeys } from '@/src/store/slices/common.slice'
import Overview from '@/src/components/festivals/admin/Overview'

type Props = {}
const items: MenuProps['items'] = [
    {
        label: 'Tổng quan',
        key: '0',
    },
    {
        label: 'Thêm',
        key: '1',
    },
];

const page = (props: Props) => {
    const dispatch = useAppDispatch();
    const [tabActive,setTabActive] = useState(0)

    useEffect(()=>{
        dispatch(setSelectedKeys('/dashboard/festival'))
    },[])

    const getTabActive = (value:number) => {
        setTabActive(value)
    }
    return (
        <Flex vertical gap='small'>
            <NavBarTabComponent items={items} selectedTab={getTabActive}/>
            {tabActive ===0 && <Overview  />}
            {tabActive ===1 && <CreateForm  />}
        </Flex>
    );
}

export default page