import { Table, TableColumnsType } from 'antd';
import React from 'react';

type Props = {
    key?: React.Key;
    columns?: TableColumnsType<any>;
    data?: any[];
};

const TableComponent = (props: Props) => {
    return <Table columns={props.columns} dataSource={props.data} pagination={false} />;
};

export default TableComponent;
