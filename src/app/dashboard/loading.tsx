import { Flex, Skeleton, Space, Spin } from 'antd';
import React from 'react';

type Props = {};

const loading = (props: Props) => {
    return (
        // <Spin fullscreen />
        <Flex vertical gap={16}>
            <Skeleton active />
            <Skeleton active />
        </Flex>
    );
};

export default loading;
