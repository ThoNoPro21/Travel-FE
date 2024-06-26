'use client';
import { useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';
import React, { useEffect, useState } from 'react';
import { Card, Empty, Flex, Pagination, Skeleton } from 'antd';
import { useGetProductByCategoryQuery } from '@/src/store/queries/apiProduct.query';
import DacSanComponent from '@/src/components/products/DacSanComponent';
import { useRouter } from 'next/navigation';

type Props = {};

const MainComponent = (props: Props) => {
    const router = useRouter();
    const [pageProduct, setPageProduct] = useState(1);
    const product_id = useAppSelector((state: RootState) => state.dataProduct.MenuId);
    const search = useAppSelector((state) => state.dataProduct.search);
    const {
        data: response_ProductByCategory,
        isSuccess: isSuccess_ProductByCategory,
        isLoading: isLoading_ProductByCategory,
        isFetching:isFetching_ProductByCategory,
        refetch:refetch_ProductByCategory
    } = useGetProductByCategoryQuery([product_id, pageProduct, search ]);

    const onChangeNewPageProduct = (newPage: number) => {
        setPageProduct(newPage);
    };

    useEffect(() => {
        refetch_ProductByCategory();
    }, [search]);

    useEffect(() => {
        setPageProduct(1);
    }, [product_id]);

    return (
        <main className="tw-grid tw-grid-cols-1 tw-grid-flow-row tw-gap-y-2 ">
            <Card hoverable bordered={false} styles={{body:{padding:0}}} className="tw-bg-gray-200 tw-h-fit tw-p-2 lg:tw-p-3">
                <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-grid-flow-row tw-gap-1 lg:tw-gap-3 ">
                    {isLoading_ProductByCategory || isFetching_ProductByCategory ? (
                        <>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                        </>
                    ) : isSuccess_ProductByCategory && response_ProductByCategory.success && response_ProductByCategory?.data.data.length>0 ? (
                        response_ProductByCategory?.data.data.map((item, index) => (
                            <div key={index} onClick={()=>router.push(`product/${item.products_id}`)}>
                                <DacSanComponent
                                    src={item.images.avatar}
                                    name={item.name}
                                    price={item.price}
                                    product_id={item.products_id}
                                />
                            </div>
                        ))
                    ) : (
                        <Empty className="tw-col-span-6" description="Không có dữ liệu!" />
                    )}
                </div>
            </Card>
            <Flex>
                <Pagination
                    className="tw-flex-initial tw-m-auto"
                    onChange={onChangeNewPageProduct}
                    defaultCurrent={1}
                    total={response_ProductByCategory?.data?.total || 0}
                    pageSize={response_ProductByCategory?.data?.per_page || 10}
                    current={response_ProductByCategory?.data?.current_page || 1}
                />
            </Flex>
        </main>
    );
};
export default MainComponent;
