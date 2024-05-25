import { Button, Card, Col, Divider, Flex, InputNumber, Rate, Row, Space, Spin, notification } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IconCartShopping, IconCheck, IconClose, IconGripLine, IconMinus, IconPlus } from '../../IconComponent';
import { imagesJson } from '@/src/types/Article';
import { formatVND } from '../../validate/String';
import SwiperComponent from '../../SwiperComponent';
import { useAddToCartMutation } from '@/src/store/queries/apiProduct.query';
import { useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';
import { useRouter } from 'next/navigation';

type Props = {
    images: imagesJson;
    name: string;
    price: number;
    product_id: number;
};

const OverviewComponent = (props: Props) => {
    const router = useRouter();
    const [activeImage, setActiveImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [notificationVisible, setNotificationVisible] = useState(false);

    const getActive = (value: string) => {
        setActiveImage(value);
    };
    const handleNotificationClose = () => {
        setNotificationVisible(true);
    };
    useEffect(() => {
        return () => {
            if (notificationVisible) {
                notification.destroy('addToCard');
                notification.destroy('removeToCard');
            }
        };
    }, [notificationVisible]);

    const isLogin = useAppSelector((state: RootState) => state.dataAuth.isLogin);
    const [addToCart, { isLoading: isLoading_addToCart, isSuccess: isSuccess_addToCart }] = useAddToCartMutation();
    const handleAddToCart = async () => {
        let formData = new FormData();
        formData.append('product_id', String(props.product_id));
        formData.append('quantity', String(quantity));
        await addToCart(formData).then((res) => {
            if ('data' in res) {
                notification.success({
                    message: <p className="tw-text-base tw-font-bold">Thêm giỏ hàng thành công!</p>,
                    description: <p className="  tw-text-sm  tw-font-normal"> Vào giỏ hàng xem ngay thôi !</p>,
                    icon: <IconCheck />,
                    duration: 3,
                    placement: 'bottomRight',
                    key: 'addToCart',
                    style: {
                        borderRadius: '4px',
                        cursor: 'pointer',
                    },
                    onClick: () => {
                        handleNotificationClose();
                        router.push('/product/cart', { scroll: false });
                    },
                });
            } else {
                notification.error({
                    message: <p className="tw-text-base tw-font-bold">Thêm giỏ hàng thất bại!</p>,
                    description: <p className="  tw-text-sm  tw-font-normal"> Có lỗi trong quá trình thực thi !</p>,
                    duration: 3,
                    icon: <IconClose color="red" />,
                    placement: 'bottomRight',
                    key: 'removeToCart',
                    style: {
                        borderRadius: '4px',
                        cursor: 'pointer',
                    },
                });
            }
        });
    };

    if (isLoading_addToCart) {
        return <Spin fullscreen />;
    }

    return (
        <Card
            hoverable
            bordered={false}
            styles={{body:{padding:0}}}
            className="tw-bg-gradient-to-t tw-from-purple-100  tw-via-white  tw-to-fuchsia-200 lg:tw-p-4"
        >
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12} className=" tw-h-auto tw-w-auto tw-overflow-hidden tw-space-y-4">
                    <Flex justify="center" className="tw-h-60 ">
                        <Image
                            src={activeImage || props.images.avatar}
                            alt="Picture...."
                            height={1000}
                            width={1000}
                            quality={100}
                            priority={true}
                            className="tw-h-auto tw-w-auto tw-bg-cover tw-bg-center tw-rounded-lg"
                        />
                    </Flex>
                    <div className="tw-h-20">
                        <SwiperComponent
                            loop={false}
                            listImg={[
                                ...(props.images.imageDetails ?? []),
                                ...(props.images?.avatar ? [props.images?.avatar] : []),
                            ]}
                            onChange={getActive}
                            perview={4}
                            spaceBetween={10}
                            autoPlay={false}
                        />
                    </div>
                </Col>
                <Col xs={24} lg={12}>
                    <Card bordered={false} className="tw-h-full">
                        <Flex vertical gap="small">
                            <h1 className="tw-text-2xl tw-font-bold">{props.name}</h1>
                            <Flex align="center" gap="small">
                                <Rate allowHalf defaultValue={3.5} style={{ fontSize: 12 }} />
                                <p>(12.5k đánh giá)</p>
                                <IconGripLine />
                                <p>5k lượt bán</p>
                            </Flex>
                            <p className="tw-font-black tw-text-xl">{formatVND(props.price)}</p>
                            <Divider />
                            <Flex gap="small">
                                <Flex
                                    align="center"
                                    justify="center"
                                    className="tw-bg-orange-400 tw-p-2"
                                    onClick={() =>
                                        quantity === 1 ? 1 : setQuantity((prevQuantity) => prevQuantity - 1)
                                    }
                                >
                                    <IconMinus />
                                </Flex>
                                <InputNumber
                                    min={1}
                                    max={100}
                                    defaultValue={1}
                                    value={quantity}
                                    onChange={(value) => setQuantity(value || 1)}
                                />
                                <Flex
                                    align="center"
                                    justify="center"
                                    className="tw-bg-blue-400 tw-p-2"
                                    onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
                                >
                                    <IconPlus />
                                </Flex>
                            </Flex>
                            <Space>
                                <Button
                                    disabled={!isLogin}
                                    size="large"
                                    type="primary"
                                    className="tw-text-base tw-text-white "
                                >
                                    Mua ngay
                                </Button>
                                <Button
                                    disabled={!isLogin}
                                    className="tw-bg-orange-500 tw-text-base tw-text-white tw-rounded-lg tw-p-2 tw-h-full"
                                    onClick={handleAddToCart}
                                >
                                    Thêm giỏ hàng
                                    <IconCartShopping />
                                </Button>
                            </Space>
                            {!isLogin && (
                                <p className="tw-font-normal tw-text-base tw-text-red-500">
                                    Vui lòng đăng nhập trước khi mua hàng!
                                </p>
                            )}
                        </Flex>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
};

export default OverviewComponent;
