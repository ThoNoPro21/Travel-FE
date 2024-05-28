import { IconSearch } from '@/src/components/IconComponent';
import {  Input } from 'antd';
import React from 'react'
import { useDebounce } from '@react-hooks-hub/use-debounce';
type Props = {
    getValueSearch:(value:string)=>void
}

const SearchComponent = (props: Props) => {
    const handleSearch = (query: string) => {
        props.getValueSearch(query);
    }

    const debouncedSearch = useDebounce(handleSearch, 1000);

    return (

        <Input
            allowClear
            placeholder="Tìm kiếm..."
            className="tw-rounded-4xl tw-cursor-pointer"
            onChange={((e) => debouncedSearch(e.target.value))}
            suffix={<IconSearch />}
        />
    );
}

export default SearchComponent