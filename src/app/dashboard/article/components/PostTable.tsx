import { Table, TableColumnsType } from 'antd';
import React from 'react';

type Props = {
    key?: React.Key;
    columns?: TableColumnsType<any>;
    data?: any[];
    loading: boolean;
};

const PostTable = (props: Props) => {
    return (
        <>
            <Table
                columns={props.columns}
                loading={props.loading}
                dataSource={props.data}
                pagination={false}
                scroll={{ x: 768 }}
            />
        </>
    );
};

export default PostTable;
