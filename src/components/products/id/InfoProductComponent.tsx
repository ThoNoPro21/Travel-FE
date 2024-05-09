import { Badge, Card, Flex } from 'antd';
import React, { useState } from 'react';
import TabsComponent from '../../common/tab/TabsComponent';
import { PostContent } from '../../articles/client/SideMain';
import ReviewComponent from './ReviewComponent';
import { useGetCommentByProductQuery } from '@/src/store/queries/apiProduct.query';

type Props = {
    content?: string;
    product_id: number;
};

const InfoProductComponent = (props: Props) => {
    const [tabInfoActive, setTabInfoActive] = useState(0);
    const [pageComment, setPageComment] = useState(1);

    const {
        data: response_getCommentByProduct,
        isSuccess: isSuccess_getCommentByProduct,
        isLoading: isLoading_getCommentByProduct,
        refetch: refetch_getCommentByProduct,
    } = useGetCommentByProductQuery([props.product_id, pageComment]);

    const tabInfoOptions = [
        {
            label: <p className="tw-p-2">Mô tả</p>,
            value: '0',
        },
        {
            label: (
                <p className="tw-p-2">
                    Đánh giá <span className="tw-text-black">({response_getCommentByProduct?.data?.total || 0})</span>{' '}
                </p>
            ),
            value: '1',
        },
    ];

    const getTabInfoActive = (value: number) => {
        setTabInfoActive(value);
    };

    const getPageComment = (value: number) => {
        setPageComment(value);
    };
    return (
        <Card bordered={false} hoverable styles={{ body: { padding: 0 } }}>
            <Flex vertical>
                <TabsComponent options={tabInfoOptions} getTab={getTabInfoActive} />
                <Flex vertical className="tw-gap-2 tw-px-4 tw-pb-4">
                    {tabInfoActive === 0 && <PostContent content={props.content || ''} />}
                    {tabInfoActive === 1 && (
                        <ReviewComponent
                            setPageComment={getPageComment}
                            product_id={props.product_id}
                            refetch_getCommentByProduct={refetch_getCommentByProduct}
                            response_getCommentByProduct={response_getCommentByProduct?.data}
                        />
                    )}
                </Flex>
            </Flex>
        </Card>
    );
};

export default InfoProductComponent;
