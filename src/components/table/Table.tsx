import React, { useEffect, useState } from 'react';
import { Button, Divider, Input, Select, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { User, getCounts, getRoles, getUsers } from './type';
import { useAppSelector } from '@/src/store/hooks';
export type TableFilters = {
    role?: string;
    name?: string;
    count?: number;
};
export default function TableComponent() {
    const [users, setUsers] = useState<User[]>([]);
    const [filters, setFilters] = useState<TableFilters>({count:5});
    const totalCount=useAppSelector(state=>state.count.totalCount)
    const {count,name,role}=filters

    useEffect(() => {
        const listUsers = getUsers(filters);
        setUsers(listUsers);
    }, [count,name,role]);

    const columns: TableColumnsType<User> = [
        {
            title: 'No.',
            dataIndex:'index',
            render:(_v,_r,index)=><div className='tw-text-red-500'>#{index + 1}</div>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
        },
        {
            title: 'Action',
            render: () => (
                <Space size="small">
                    <Button type="primary">Edit</Button>
                    <Button type="primary">Del</Button>
                </Space>
            ),
        },
    ];
    const defaultRoles = getRoles().map((x) => ({ value: x, label: x }));
    const roleOptions = [{ value: '', label: 'All' }, ...defaultRoles];
    const handleOnChangeRole = (value: string) => {
        const currentFilters = { ...filters };
        currentFilters.role = value;
        setFilters(currentFilters);
    };

    const defaultCounts = getCounts().map(x=>({ value: x, label: `${x}/page` }))
    const countOptions = [...defaultCounts]

    const handleOnChangeCount=(value:number)=>{
        const currentCount={...filters}
        currentCount.count=value
        setFilters(currentCount)
    }

    const handleOnchangeInput=(e:any)=>{
        const currentSearch = { ...filters };
        currentSearch.name = e.target.value;
        setFilters(currentSearch);
    }
    return (
        <>
            <Divider style={{ color: 'red' }}>Thông tin SV</Divider>
            <Space style={{ marginBottom: 16 }}>
                <Select
                    style={{ width: 150 }}
                    onChange={handleOnChangeRole}
                    defaultValue=''
                    placeholder={"Filter Role"}
                    options={roleOptions}
                ></Select>
                <Input placeholder="Search..." size='middle' allowClear onChange={handleOnchangeInput}  />
                <Select
                    style={{ width: 100 }}
                    onChange={handleOnChangeCount}
                    defaultValue={filters.count}
                    options={countOptions}
                ></Select>
            </Space>
            <Table
                columns={columns}
                dataSource={users.map((item) => {
                    return {
                        ...item,
                        key: item.username,
                    };
                })}
                size="middle"
                scroll={{ x: 100, y: 300 }}
                pagination={{ pageSize:5,total:totalCount}}
            />
        </>
    );
}

