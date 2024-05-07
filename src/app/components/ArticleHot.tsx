import { Flex } from 'antd';
import React from 'react';
import ArticleComponent from './article/ArticleComponent';

type Props = {};

const ArticleHot = (props: Props) => {
    return (
        <Flex vertical justify="center" align="flex-start" className="tw-w-full tw-min-h-fit tw-space-y-3">
            {[1, 2, 3, 4].map((item) => (
                <ArticleComponent />
            ))}
        </Flex>
    );
};

export default ArticleHot;
