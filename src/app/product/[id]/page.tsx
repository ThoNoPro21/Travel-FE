'use client';
import React, { useEffect, useState } from 'react';
import { useGetProductByIdQuery } from '@/src/store/queries/apiProduct.query';
import OverviewComponent from '../../../components/products/id/OverviewComponent';
import ShopComponent from '../../../components/products/id/ShopComponent';
import ResultComponent from '@/src/components/result/ResultComponent';
import { useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';
import { Skeleton, Spin } from 'antd';
import InfoProductComponent from '../../../components/products/id/InfoProductComponent';
import RelatedProductComponent from '../../../components/products/id/RelatedProductComponent';

type Props = {};

const page = ({ params }: { params: { id: string } }) => {
    const [componentLoad, setComponentLoad] = useState(false);

    const isStatus = useAppSelector((state: RootState) => state.dataAuth.isStatus);
    useEffect(() => {
        if (isStatus) {
            setComponentLoad(true);
        }
    });
    const {
        data: response_getProductById,
        isLoading: isLoading_getProductById,
        isError: isError_getProductById,
        isSuccess: isSuccess_getProductById,
    } = useGetProductByIdQuery(parseInt(params.id), { skip: !componentLoad });

    if (!isStatus) {
        return null;
    }
    if (isError_getProductById) {
        return (
            <ResultComponent
                status={404}
                title="Không tìm thấy URL !"
                subTitle="Có vẻ như đã có lỗi xảy ra :(("
                textButtonOk="Quay lại trang chủ"
                linkOk="/"
            />
        );
    }
    return isSuccess_getProductById && response_getProductById.success && (
        <main className="lg:tw-pt-20 lg:tw-px-13 tw-min-h-screen tw-space-y-4 tw-py-4 tw-bg-slate-100">
            {response_getProductById?.data.map((item, index) => (
                <OverviewComponent
                    key={index}
                    images={item.images}
                    name={item.name}
                    price={item.price}
                    product_id={item.products_id}
                />
            ))}
            <div className="tw-grid tw-grid-cols-2 tw-grid-flow-row tw-gap-4 tw-py-4">
                <InfoProductComponent product_id={response_getProductById?.data?.[0].products_id} content={response_getProductById?.data?.[0].description} />
                <ShopComponent />
            </div>
            <RelatedProductComponent product_id={response_getProductById?.data?.[0].products_id} />
        </main>
    )
};

export default page;
