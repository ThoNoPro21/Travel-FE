'use client';
import TabsComponent from '@/src/components/common/tab/TabsComponent';
import { formatVND } from '@/src/components/validate/String';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { useGetOrderByUserQuery } from '@/src/store/queries/apiProduct.query';
import { selectOrderByStatus } from '@/src/store/selectors/article.selector';
import { setSelectedMenuHeader } from '@/src/store/slices/common.slice';
import { Card, Empty, Flex, Skeleton, Space } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Props = {};

const tabOptions: any[] = [
    { value: '0', label:'Chờ vận chuyển' },
    { value: '1', label: 'Đang vận chuyển' },
    { value: '2', label: 'Đã hủy' },
    { value: '3', label: 'Trả hàng' },
    { value: '4', label: 'Đã nhận hàng' },
];

const Page = (props: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [tabActive,setTabActive] = useState(0)
    const isStatus = useAppSelector((state) => state.dataAuth.isStatus);
    const isLogin = useAppSelector((state) => state.dataAuth.isLogin);

    const orderByStatus = useAppSelector((state) => selectOrderByStatus(state,tabActive))
    useEffect(() => {
        if (!isLogin && isStatus) {
            router.push('/product');
        }
    }, [isStatus]);

    useEffect(() => {
        dispatch(setSelectedMenuHeader('/product'));
    }, []);
    const getTabActive = (value: number) => {
        setTabActive(value);
    };
    const {
        data: response_GetOrderByUser,
        isLoading: isLoading_GetOrderByUser,
        isSuccess: isSuccess_GetOrderByUser,
        refetch: refetch_GetOrderByUser,
    } = useGetOrderByUserQuery('', { skip: !isStatus });

    const handleOnClickPost = (id: number) => {
        router.push(`/blog/${id}`);
    };
    return (
        <main className="tw-pt-20 tw-p-2 xl:tw-px-13 tw-bg-[#f5f5f5] tw-min-h-screen">
            <Flex justify="flex-end">
                <TabsComponent options={tabOptions} getTab={getTabActive} block={true} />
            </Flex>
            <div className="tw-grid tw-gap-4  tw-min-h-screen lg:tw-grid-cols-2 tw-grid-flow-row tw-auto-rows-max">
                {isLoading_GetOrderByUser ? (
                    <>
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                    </>
                ) : orderByStatus?.length === 0 ||  !orderByStatus? (
                    <Empty className="tw-col-span-4" description="Chưa có đơn hàng nào !" />
                ) : 
                    orderByStatus?.map((item, index) => (
                        <Card styles={{ body: { padding: 0 } }} key={index} className="tw-max-h-55 tw-p-2 lg:tw-p-4 ">
                            <Flex gap="large" className="">
                                <Flex gap="small" wrap="wrap" className="tw-w-1/3">
                                    {item.order_details.map((item, index) => (
                                        <div key={index} className="tw-flex-1 tw-max-h-50 tw-overflow-hidden">
                                            <Image
                                                src={item.product.images.avatar}
                                                alt="avatar"
                                                height={500}
                                                width={500}
                                                className="tw-min-w-10 tw-h-fit "
                                            />
                                        </div>
                                    ))}
                                </Flex>
                                <Flex vertical className="tw-flex-1">
                                    <div className="tw-flex-1">
                                        <p className="tw-font-bold tw-text-sm lg:tw-text-lg">
                                            Địa chỉ: <span className="tw-font-normal">{item.address}</span>
                                        </p>
                                        <p className="tw-font-bold tw-text-sm lg:tw-text-lg">
                                            Tổng: <span className="tw-font-normal">{formatVND(item.total_amount)}</span>
                                        </p>
                                    </div>
                                    {item.status === 0 && (
                                        <Flex align="center" gap="small">
                                            <span className="tw-relative tw-flex tw-h-3 tw-w-3">
                                                <span className="tw-animate-ping tw-absolute tw-inline-flex tw-h-full tw-w-full tw-rounded-full tw-bg-orange-400 tw-opacity-75"></span>
                                                <span className="tw-relative tw-inline-flex tw-rounded-full tw-h-3 tw-w-3 tw-bg-orange-500"></span>
                                            </span>
                                            <p className=" tw-text-orange-500">Đang chờ vận chuyển</p>
                                        </Flex>
                                    )}
                                    {item.status === 1 && (
                                        <Flex align="center" gap="small">
                                            <span className="tw-relative tw-flex tw-h-3 tw-w-3">
                                                <span className="tw-animate-ping tw-absolute tw-inline-flex tw-h-full tw-w-full tw-rounded-full tw-bg-sky-400 tw-opacity-75"></span>
                                                <span className="tw-relative tw-inline-flex tw-rounded-full tw-h-3 tw-w-3 tw-bg-sky-500"></span>
                                            </span>
                                            <p className=" tw-text-sky-500">Đã vận chuyển</p>
                                        </Flex>
                                    )}
                                    {item.status === 2 && (
                                        <Flex align="center" gap="small">
                                            <span className="tw-relative tw-flex tw-h-3 tw-w-3">
                                                <span className="tw-animate-ping tw-absolute tw-inline-flex tw-h-full tw-w-full tw-rounded-full tw-bg-red-400 tw-opacity-75"></span>
                                                <span className="tw-relative tw-inline-flex tw-rounded-full tw-h-3 tw-w-3 tw-bg-red-500"></span>
                                            </span>
                                            <p className=" tw-text-red-500">Đã hủy</p>
                                        </Flex>
                                    )}
                                    {item.status === 3 && (
                                        <Flex align="center" gap="small">
                                            <span className="tw-relative tw-flex tw-h-3 tw-w-3">
                                                <span className="tw-animate-ping tw-absolute tw-inline-flex tw-h-full tw-w-full tw-rounded-full tw-bg-fuchsia-400 tw-opacity-75"></span>
                                                <span className="tw-relative tw-inline-flex tw-rounded-full tw-h-3 tw-w-3 tw-bg-fuchsia-500"></span>
                                            </span>
                                            <p className=" tw-text-fuchsia-600">Trả hàng</p>
                                        </Flex>
                                    )}
                                    {item.status === 4 && (
                                        <Flex align="center" gap="small">
                                            <span className="tw-relative tw-flex tw-h-3 tw-w-3">
                                                <span className="tw-animate-ping tw-absolute tw-inline-flex tw-h-full tw-w-full tw-rounded-full tw-bg-lime-400 tw-opacity-75"></span>
                                                <span className="tw-relative tw-inline-flex tw-rounded-full tw-h-3 tw-w-3 tw-bg-lime-500"></span>
                                            </span>
                                            <p className=" tw-text-lime-600">Đã nhận hàng</p>
                                        </Flex>
                                    )}
                                </Flex>
                            </Flex>
                        </Card>
                    ))
                }
            </div>
        </main>
    );
};

export default Page;
