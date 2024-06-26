'use client';
import { Button, Card, Flex, Input, InputNumber, Modal, Space, Spin, Table, TableColumnsType, message } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    IconDelete,
    IconEdit,
    IconExclamation,
    IconLeft,
    IconMinus,
    IconPlus,
} from '../../../components/IconComponent';
import '@/src/styles/app.scss';
import { DataTypeProductInCart, productInCart, productType } from '@/src/types/Product';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';
import Link from 'next/link';
import Image from 'next/image';
import { useDeleteCartMutation, useGetCartQuery, useUpdateCartMutation } from '@/src/store/queries/apiProduct.query';
import { formatVND } from '../../../components/validate/String';
import { useRouter } from 'next/navigation';
import { addProductSelected } from '@/src/store/slices/product.slice';
import ResultComponent from '@/src/components/result/ResultComponent';
import { setSelectedMenuHeader } from '@/src/store/slices/common.slice';
type Props = {};

const Page = (props: Props) => {
    const router = useRouter();

    const isLogin = useAppSelector((state: RootState) => state.dataAuth.isLogin);
    const status = useAppSelector((state: RootState) => state.dataAuth.isStatus);
    const [isCheckLogin, setIsCheckLogin] = useState(true);
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    const [productSelected, setProductSelected] = useState<DataTypeProductInCart[]>([]);

    const [updateCart, { isLoading: isLoading_updateCart }] = useUpdateCartMutation();
    const [deleteCart, { isLoading: isLoading_deleteCart }] = useDeleteCartMutation();

    const columns: TableColumnsType<DataTypeProductInCart> = [
        {
            title: 'Tên sản phẩm',
            fixed:'left',
            dataIndex: 'name',
            render: (_, record) => (
                <Flex  className='tw-flex-col lg:tw-flex-row'>
                    <h1 className="tw-w-full tw-font-bold ">{record.name}</h1>
                    <div className="tw-w-20 tw-h-20">
                        <Image src={record.avatar} alt="Avatar" height={1000} width={1000} />
                    </div>
                </Flex>
            ),
        },
        {
            title: 'Giá',
            ellipsis:true,
            width:120,
            dataIndex: 'price',
            render: (_, record) => <h1>{formatVND(record.price)}</h1>,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: (_, record) => (
                <Space className='tw-w-20'>
                    <Flex
                        align="center"
                        justify="center"
                        className="tw-bg-orange-400 md:tw-p-2 "
                        onClick={() =>
                            updateCart([parseInt(record.key.toString()), 'decrease']).then((res) => {
                                if ('data' in res) {
                                    refetch_getCart();
                                }
                            })
                        }
                    >
                        <IconMinus />
                    </Flex>
                    <InputNumber size={`${windowSize.width <=1024 ? 'small' : 'large'}`}  min={1} value={record.quantity || 1} readOnly className='tw-w-auto sm:tw-w-20'/>
                    <Flex
                        align="center"
                        justify="center"
                        className="tw-bg-blue-400 md:tw-p-2"
                        onClick={() =>
                            updateCart([parseInt(record.key.toString()), 'increase']).then((res) => {
                                if ('data' in res) {
                                    refetch_getCart();
                                }
                            })
                        }
                    >
                        <IconPlus />
                    </Flex>
                </Space>
            ),
        },
        {
            title: 'Tạm tính',
            width:120,
            render: (_, record) => formatVND(record.price * record.quantity),
            ellipsis:true,
        },
        {
            fixed:'right',
            width:40,
            render: (_, record) => (
                <Space size={'large'} onClick={() => handleOnDelete(parseInt(record.key.toString(), 10))}>
                    <IconDelete />
                </Space>
            ),
        },
    ];

    const dispatch = useAppDispatch();
    const onChangeCart = useAppSelector((state: RootState) => state.dataProduct.isSuccess);
    const handleOnDelete = (product: number) => {
        Modal.confirm({
            title: 'Bạn có chắc muốn xóa sản phẩm này?',
            icon: (
                <p className="tw-mx-2">
                    <IconExclamation />
                </p>
            ),
            content: 'Khi bạn nhấn OK mọi dữ liệu sẽ được xóa !',
            okText: 'OK',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                deleteCart(product).then((res) => {
                    if ('data' in res) {
                        refetch_getCart();
                        message.success('Xóa thành công !', 4);
                    }
                });
            },
            onCancel() {},
        });
    };

    useEffect(() => {
        if (status && !isLogin) {
            setIsCheckLogin(false);
        } else {
            setIsCheckLogin(true);
        }
    }, [status, isLogin]);

    const {
        data: response_getCart,
        isSuccess: isSuccess_getCart,
        isLoading: isLoading_getCart,
        refetch: refetch_getCart,
    } = useGetCartQuery('', { skip: !isLogin });

    useEffect(() => {
        dispatch(setSelectedMenuHeader('/product'));
    }, []);
    useEffect(() => {
        if (onChangeCart) {
            refetch_getCart();
        }
    }, [onChangeCart]);
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const dataSource = response_getCart?.data.map((item: productInCart) => ({
        name: item.products.name,
        price: item.products.price,
        quantity: item.quantity,
        avatar: item.products.images.avatar,
        key: item.carts_id.toString(),
        product_id: item.products.products_id,
    }));

    const totalAmount = productSelected?.reduce((acc, item) => {
        const subTotal = item.price * item.quantity;
        return acc + subTotal;
    }, 0);

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataTypeProductInCart[]) => {
            setProductSelected(selectedRows);
        },
    };

    if (isLoading_getCart) {
        return <Spin fullscreen />;
    }

    const handleOnClickCheckout = () => {
        router.push('cart/checkout');
        dispatch(addProductSelected(productSelected));
    };

    if (!isCheckLogin) {
        return (
            <ResultComponent
                status="403"
                title="Bạn chưa đăng nhập !"
                subTitle="Vui lòng đăng nhập !"
                textButtonCancel="Quay lại"
                textButtonOk="Đăng nhập"
                linkOk="login"
                linkCancel="/"
            />
        );
    }

    return (
        isSuccess_getCart && (
            <main className="tw-pt-20 tw-px-2 md:tw-px-13 tw-py-4 ">
                <div className="tw-grid tw-grid-cols-4 tw-grid-flow-row tw-gap-4 ">
                    <div className="tw-col-span-4 lg:tw-col-span-3">
                        <Card
                            hoverable
                            styles={{body:{padding:0}}}
                            bordered={false}
                            className="tw-p-1 lg:tw-p-5 tw-bg-gradient-to-r tw-from-violet-200 tw-to-pink-200"
                        >
                            <Flex vertical gap={16}>
                                <Flex
                                    align="center"
                                    className="tw-border tw-w-max tw-p-2 tw-bg-orange-400 tw-border-orange-500 hover:border-indigo-300 tw-rounded-lg"
                                >
                                    <IconLeft />
                                    <Link href="/product">
                                        <p className="tw-text-sm tw-font-bold tw-text-white">TIẾP TỤC MUA SẮM</p>
                                    </Link>
                                </Flex>
                                <Spin spinning={isLoading_updateCart || isLoading_deleteCart}>
                                    <Table
                                        size={`${windowSize.width <= 1024 ? 'small' : 'large'}`}
                                        bordered={false}
                                        rowSelection={{
                                            type: 'checkbox',
                                            ...rowSelection,
                                        }}
                                        columns={columns}
                                        dataSource={dataSource}
                                        scroll={{ x: 520 }}
                                    />
                                </Spin>
                            </Flex>
                        </Card>
                    </div>
                    <Card
                        hoverable
                        bordered={false}
                        styles={{ body: { padding: 0 } }}
                        className="tw-col-span-4 lg:tw-col-span-1 lg:tw-p-4 tw-bg-gradient-to-r tw-from-violet-200 tw-to-pink-200"
                    >
                        <Card>
                            <Space direction="vertical" className="tw-w-full">
                                <p className="tw-text-base tw-font-black">Mã giảm giá</p>
                                <Input placeholder="Nhập mã của bạn ..." allowClear className="tw-rounded-lg" />
                                <Flex>
                                    <Flex vertical align="flex-start" className="tw-flex-1">
                                        <h1 className="tw-text-sm tw-font-bold">Tổng thanh toán </h1>
                                        <p>{`(${productSelected.length} sản phẩm)`}</p>
                                    </Flex>
                                    <p>{formatVND(totalAmount || 0)}</p>
                                </Flex>
                                <Button
                                    disabled={productSelected.length === 0}
                                    className="tw-bg-orange-500 tw-text-base tw-font-bold tw-text-white tw-w-full tw-self-center"
                                    onClick={handleOnClickCheckout}
                                >
                                    {productSelected.length === 0 ? 'Chưa chọn sản phẩm' : 'Thanh toán'}
                                </Button>
                            </Space>
                        </Card>
                    </Card>
                </div>
            </main>
        )
    );
};

export default Page;
