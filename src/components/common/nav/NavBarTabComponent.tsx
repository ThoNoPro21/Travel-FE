'use client'
import { IconSearch } from '@/src/components/IconComponent';
import { Card, Flex, Input, Menu, MenuProps } from 'antd';
import React, { useState } from 'react';

type Props = {
    items:MenuProps['items'];
    selectedTab:(key:number)=>void;
};

const NavBarTabComponent = (props: Props) => {
    const [filterCurrent, setFilterCurrent] = useState('0');

    const handleFilterOnClick: MenuProps['onClick'] = (e) => {
        setFilterCurrent(e.key);
        props.selectedTab(parseInt(e.key));
    };
    return (
        <Card>
            <Flex >
                <Menu
                    className="tw-flex-1"
                    mode="horizontal"
                    onClick={handleFilterOnClick}
                    selectedKeys={[filterCurrent]}
                    items={props.items}
                />
                <div className="tw-max-w-80 tw-flex-grow">
                    <Input
                        allowClear
                        placeholder="Search"
                        className="tw-rounded-4xl tw-cursor-pointer"
                        suffix={<IconSearch />}
                    />
                </div>
            </Flex>
        </Card>
    );
};

export default NavBarTabComponent;
