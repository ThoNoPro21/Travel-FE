import { Col, Empty, Flex, Pagination, Row, Space } from 'antd';
import React, { useState } from 'react';
import DacSanComponent from '../DacSanComponent';
import { useGetRelatedProductQuery } from '@/src/store/queries/apiProduct.query';
import { useRouter } from 'next/navigation';

type Props = {
    product_id: number;
};

const RelatedProductComponent = (props: Props) => {
    const router = useRouter();
    const [pageProduct, setPageProduct] = useState(1);

    const { data: response_getProduct, isLoading: isLoading_getProduct } = useGetRelatedProductQuery([
        props.product_id,
        pageProduct,
    ]);

    const onChangeNewPageProduct = (newPage: number) => {
        setPageProduct(newPage);
    };
    return (
        <Row gutter={[16, 16]}>
            <Col className="gutter-row" span={24}>
                <Flex align="flex-start" className="tw-w-full tw-font-lora">
                    <Space direction="vertical">
                        <h1 className="tw-font-bold tw-text-xl lg:tw-text-2xl">Sản phẩm liên quan </h1>
                        <p className="lg:tw-text-xl tw-text-base tw-font-medium ">Có thể bạn sẽ thích ?</p>
                    </Space>
                </Flex>
            </Col>
            <Col span={24}>
                <div className="tw-grid tw-grid-cols-12 tw-grid-flow-row tw-gap-1 md:tw-gap-4 tw-auto-rows-max tw-w-full ">
                    {response_getProduct?.success ? (
                        response_getProduct?.data.data.map((item, index) => (
                            <div
                                className='tw-cursor-pointer tw-col-span-6 md:tw-col-span-4 lg:tw-col-span-2  '
                                key={index}
                                onClick={() => router.push(`/product/${item.products_id}`)}
                            >
                                <DacSanComponent
                                    price={item.price}
                                    name={item.name}
                                    product_id={item.products_id}
                                    src={item.images.avatar}
                                />
                            </div>
                        ))
                    ) : (
                        <Empty className="tw-col-span-12" description="Không có dữ liệu !" />
                    )}
                    {response_getProduct?.success && (
                        <Flex className=" tw-col-span-12">
                            <Pagination
                                className="tw-flex-initial tw-m-auto"
                                onChange={onChangeNewPageProduct}
                                defaultCurrent={1}
                                total={response_getProduct?.data.total || 0}
                                pageSize={response_getProduct?.data.per_page || 10}
                                current={response_getProduct?.data.current_page || 1}
                            />
                        </Flex>
                    )}
                </div>
            </Col>
        </Row>
    );
};

export default RelatedProductComponent;
