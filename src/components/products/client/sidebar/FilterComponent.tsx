import { IconSearch } from '@/src/components/IconComponent';
import { Card, Flex, Input, Menu, MenuProps } from 'antd';
import React, { useState } from 'react';

type Props = {};

const FilterComponent = (props: Props) => {
    const [filterCurrent, setFilterCurrent] = useState('0');
    const filterItems: MenuProps['items'] = [
        {
            label: 'Mới nhất',
            key: '0',
        },
        {
            label: 'Bán chạy nhất',
            key: '1',
        },
        {
            label: 'Giá rẻ đến cao',
            key: '2',
        },
        {
            label: 'Giá cao đến rẻ',
            key: '3',
        },
    ];

    const handleFilterOnClick: MenuProps['onClick'] = (e) => {
        setFilterCurrent(e.key);
    };
    return (
        <Card>
            <Flex >
                <Menu
                    className="tw-flex-1"
                    mode="horizontal"
                    onClick={handleFilterOnClick}
                    selectedKeys={[filterCurrent]}
                    items={filterItems}
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

export default FilterComponent;
