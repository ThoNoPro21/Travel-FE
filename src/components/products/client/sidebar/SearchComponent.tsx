import { IconSearch } from '@/src/components/IconComponent';
import { Button, Input } from 'antd';
import React, { useState } from 'react'

type Props = {}

const SearchComponent = (props: Props) => {


    return (
        <Input
            allowClear
            placeholder="Tìm kiếm..."
            className="tw-rounded-4xl tw-cursor-pointer"
            suffix={<IconSearch />}
        />
    );
}

export default SearchComponent