'use client'
import { IconSearch } from '@/src/components/IconComponent';
import { Card, Flex, Input, Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import SearchComponent from '../SearchComponent';

type Props = {
    items:MenuProps['items'];
    selectedTab:(key:number)=>void;
    getValueSearch:(value:string) => void;
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
                    <SearchComponent getValueSearch={props.getValueSearch} />
                </div>
            </Flex>
        </Card>
    );
};

export default NavBarTabComponent;
