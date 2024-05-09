'use client';
import { IconCheck } from '@/src/components/IconComponent';
import { formatVND, validatePhoneNumber } from '@/src/components/validate/String';
import ResultComponent from '@/src/components/result/ResultComponent';
import { useAppSelector } from '@/src/store/hooks';
import {
    useAddOrdersMutation,
    useGetCityQuery,
    useGetDistrictQuery,
    useGetWardQuery,
} from '@/src/store/queries/apiProduct.query';
import { RootState } from '@/src/store/store';
import {
    Button,
    Card,
    Col,
    Divider,
    Flex,
    Form,
    Input,
    Modal,
    Radio,
    Row,
    Select,
    Space,
    Spin,
    Steps,
    notification,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Props = {};
type FieldType = {
    address: string;
    email: string;
    city: string;
    district: string;
    ward: string;
    phoneNumber: string;
    note: string;
};

const items = [
    {
        title: 'Điền thông tin',
    },
    {
        title: 'OTP qua Email',
    },
    {
        title: 'Hoàn thành',
    },
];

const page = (props: Props) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const isLogin = useAppSelector((state: RootState) => state.dataAuth.isLogin);
    const status = useAppSelector((state: RootState) => state.dataAuth.isStatus);
    const [isCheckLogin, setIsCheckLogin] = useState(true);

    const [selectedCity, setSelectedCity] = useState();
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const [selectedNameCity, setSelectedNameCity] = useState();
    const [selectedNameDistrict, setSelectedNameDistrict] = useState('');
    const [selectedNameWard, setSelectedNameWard] = useState('');

    const [valueInput, setValueInput] = useState({
        address: '',
        phoneNumber: '',
        note: '',
    });

    const [valueError, setValueError] = useState({
        address: '',
        phoneNumber: '',
        city: '',
        district: '',
        ward: '',
    });

    const productSelected = useAppSelector((state: RootState) => state.dataProduct.productSelected);
    const totalAmount = productSelected?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

    const {
        data: response_getCity,
        isLoading: isLoading_getCity,
        isSuccess: isSuccess_getCity,
        isError: isError_getCity,
    } = useGetCityQuery('',{skip:!isLogin});
    const {
        data: response_getDistrict,
        isLoading: isLoading_getDistrict,
        isSuccess: isSuccess_getDistrict,
    } = useGetDistrictQuery(selectedCity, { skip: !selectedCity });
    const {
        data: response_getWard,
        isLoading: isLoading_getWard,
        isSuccess: isSuccess_getWard,
    } = useGetWardQuery(selectedDistrict, { skip: !selectedDistrict || !selectedCity });

    const optionCity: any[] = [];
    const optionDistrict: any[] = [];
    const optionWard: any[] = [];

    if (isSuccess_getCity) {
        response_getCity.data.map((item: any) =>
            optionCity.push({
                value: item.id + '',
                label: item.name,
            })
        );
    }

    if (isSuccess_getDistrict) {
        response_getDistrict.data.map((item: any) =>
            optionDistrict.push({
                value: item.id + '',
                label: item.name,
            })
        );
    }

    if (isSuccess_getWard) {
        response_getWard.data.map((item: any) =>
            optionWard.push({
                value: item.id + '',
                label: item.name,
            })
        );
    }

    useEffect(() => {
        setSelectedDistrict('');
        setSelectedWard('');
    }, [selectedCity]);

    useEffect(() => {
        setSelectedWard('');
    }, [setSelectedDistrict]);

    const handleOnChangeInput = (e: any) => {
        const { name, value } = e.target;
        setValueInput((prev) => ({ ...prev, [name]: value }));
    };

    const [addOrder, { isLoading: isLoading_addOrder }] = useAddOrdersMutation();

    const handleOnSubmit = () => {
        if (!valueInput.address) {
            setValueError((prev) => ({ ...prev, address: 'Không được để trống!' }));
            return;
        } else {
            setValueError((prev) => ({ ...prev, address: '' }));
        }
        if (!valueInput.phoneNumber) {
            setValueError((prev) => ({ ...prev, phoneNumber: 'Không được để trống!' }));
            return;
        } else {
            setValueError((prev) => ({ ...prev, phoneNumber: '' }));
        }
        if (!validatePhoneNumber(valueInput.phoneNumber)) {
            setValueError((prev) => ({ ...prev, phoneNumber: 'Đây không phải là 1 số điện thoại!' }));
            return;
        } else {
            setValueError((prev) => ({ ...prev, phoneNumber: '' }));
        }
        if (!selectedCity) {
            setValueError((prev) => ({ ...prev, city: 'Không được để trống!' }));
            return;
        } else {
            setValueError((prev) => ({ ...prev, city: '' }));
        }
        if (!selectedDistrict) {
            setValueError((prev) => ({ ...prev, district: 'Không được để trống!' }));
            return;
        } else {
            setValueError((prev) => ({ ...prev, district: '' }));
        }
        if (!selectedWard) {
            setValueError((prev) => ({ ...prev, ward: 'Không được để trống!' }));
            return;
        } else {
            setValueError((prev) => ({ ...prev, ward: '' }));
        }

        let formData = new FormData();
        formData.append('address', valueInput.address);
        formData.append('phoneNumber', valueInput.phoneNumber);
        formData.append('city', String(selectedNameCity));
        formData.append('district', String(selectedNameDistrict));
        formData.append('ward', String(selectedNameWard));
        formData.append('note', valueInput.note);
        formData.append('totalAmount', String(totalAmount));
        productSelected?.map(
            (item, index) => (
                formData.append(`listProducts[${index}][id]`, String(item.product_id)),
                formData.append(`listProducts[${index}][carts_id]`, String(item.key)),
                formData.append(`listProducts[${index}][quantity]`, String(item.quantity)),
                formData.append(`listProducts[${index}][total_amount]`, String(item.quantity * item.price))
            )
        );

        addOrder(formData).then((res) => {
            if ('data' in res) {
                setValueInput({
                    address: '',
                    phoneNumber: '',
                    note: '',
                });
                setSelectedCity(undefined);
                Modal.success({
                    title: 'Đặt hàng thành công!',
                    content: (
                        <div>
                            <p>Giờ đây bạn có thể theo dõi đơn hàng của mình !</p>
                        </div>
                    ),
                    onOk() {
                        router.push('/product');
                    },
                });
            } else {
                notification.error({
                    message: <p className="tw-text-base tw-font-bold">Đặt hàng thất bại!</p>,
                    description: <p className="  tw-text-sm  tw-font-normal"> Có lỗi trong quá trình đặt hàng !</p>,
                    icon: <IconCheck />,
                    duration: 3,
                    placement: 'bottomRight',
                    key: 'addToCart',
                    style: {
                        borderRadius: '4px',
                        cursor: 'pointer',
                    },
                    onClick: () => {
                        // router.push('/product/cart', { scroll: false });
                    },
                });
            }
        });
    };

    useEffect(() => {
        if (status) {
            if (!isLogin) {
                setIsCheckLogin(false);
            }
        }
    }, [status, isLogin]);

    if (!isCheckLogin) {
        return (
            <ResultComponent
                status="403"
                title="Bạn chưa đăng nhập !"
                subTitle="Vui lòng đăng nhập !"
                textButtonCancel="Quay lại"
                textButtonOk="Đăng nhập"
                linkOk="./login"
                linkCancel="/"
            />
        );
    }
    return (
        isLogin &&
        <Spin spinning={isLoading_addOrder} tip="Đang xử lý..." >
            <main className="lg:tw-pt-20 lg:tw-px-13 tw-bg-gradient-to-r tw-from-violet-200 tw-to-pink-200">
                <Flex vertical gap={16}>
                    <Card>
                        <Steps current={0} items={items} />
                    </Card>
                    <div className="tw-grid tw-grid-cols-3 tw-grid-flow-row tw-gap-4 tw-pb-4">
                        <Card hoverable bordered={false} className="tw-col-span-2 ">
                            <Divider orientation="center">
                                <h1 className="tw-text-xl tw-font-black">Thông tin thanh toán</h1>
                            </Divider>
                            <Form layout="vertical" form={form} autoComplete='off'>
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Form.Item<FieldType>
                                            label={
                                                <p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Địa chỉ</p>
                                            }
                                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                                        >
                                            <>
                                                <Input
                                                    name="address"
                                                    placeholder="Nhập địa chỉ.."
                                                    allowClear
                                                    onChange={(e) => {
                                                        handleOnChangeInput(e);
                                                        setValueError((prev) => ({ ...prev, address: '' }));
                                                    }}
                                                />
                                                {valueError.address && (
                                                    <p className="tw-text-red-400 tw-font-normal">{valueError.address}</p>
                                                )}
                                            </>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item<FieldType>
                                            label={
                                                <p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Tỉnh/ Tp</p>
                                            }
                                            name="city"
                                            rules={[{ required: true, message: 'Vui lòng nhập tên thành phố!' }]}
                                        >
                                            <Spin spinning={isLoading_getCity}>
                                                <Select
                                                    allowClear
                                                    style={{ width: '100%' }}
                                                    placeholder="Tỉnh"
                                                    options={optionCity}
                                                    value={selectedCity}
                                                    optionLabelProp="label"
                                                    onChange={(e, option) => {
                                                        setSelectedCity(e);
                                                        setSelectedNameCity(option.label);
                                                    }}
                                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                />
                                                {valueError.city && (
                                                    <p className="tw-text-red-400 tw-font-normal">{valueError.city}</p>
                                                )}
                                            </Spin>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Form.Item<FieldType>
                                            label={
                                                <p className="tw-font-semibold tw-text-sm tw-text-emerald-700">
                                                    Quận/ Huyện
                                                </p>
                                            }
                                            name="district"
                                            rules={[{ required: true, message: 'Vui lòng nhập tên huyện!' }]}
                                        >
                                            <Spin spinning={isLoading_getDistrict}>
                                                <Select
                                                    style={{ width: '100%' }}
                                                    placeholder="Huyện"
                                                    options={optionDistrict}
                                                    value={selectedDistrict}
                                                    optionLabelProp="label"
                                                    onChange={(e, option) => {
                                                        setSelectedDistrict(e);
                                                        setSelectedNameDistrict(option.label);
                                                    }}
                                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                />
                                                {valueError.district && (
                                                    <p className="tw-text-red-400 tw-font-normal">{valueError.district}</p>
                                                )}
                                            </Spin>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item<FieldType>
                                            label={
                                                <p className="tw-font-semibold tw-text-sm tw-text-emerald-700">
                                                    Phường/ Xã
                                                </p>
                                            }
                                            name="ward"
                                            rules={[{ required: true, message: 'Vui lòng nhập tên xã!' }]}
                                        >
                                            <Spin spinning={isLoading_getWard}>
                                                <Select
                                                    style={{ width: '100%' }}
                                                    placeholder="Huyện"
                                                    options={optionWard}
                                                    value={selectedWard}
                                                    optionLabelProp="label"
                                                    onChange={(e, option) => {
                                                        setSelectedWard(e);
                                                        setSelectedNameWard(option.label);
                                                    }}
                                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                />
                                                {valueError.ward && (
                                                    <p className="tw-text-red-400 tw-font-normal">{valueError.ward}</p>
                                                )}
                                            </Spin>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Form.Item<FieldType>
                                            label={
                                                <p className="tw-font-semibold tw-text-sm tw-text-emerald-700">
                                                    Số điện thoại
                                                </p>
                                            }
                                            validateDebounce={2000}
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                                {
                                                    pattern: /^(?:\+?84|0)(?:3[2-9]|5[6-9]|7[0|6-9]|8[1-6]|9\d)\d{7}$/,
                                                    message: 'Số điện thoại không hợp lệ!',
                                                },
                                            ]}
                                        >
                                            <>
                                                <Input
                                                    name="phoneNumber"
                                                    placeholder="Số điện thoại..."
                                                    allowClear
                                                    onChange={(e) => {
                                                        handleOnChangeInput(e);
                                                        setValueError((prev:any) => ({ ...prev, phoneNumber: '' }));
                                                    }}
                                                />
                                                {valueError.phoneNumber && (
                                                    <p className="tw-text-red-400 tw-font-normal">
                                                        {valueError.phoneNumber}
                                                    </p>
                                                )}
                                            </>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item<FieldType>
                                            label={
                                                <p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Ghi chú</p>
                                            }
                                        >
                                            <TextArea
                                                onChange={handleOnChangeInput}
                                                name="note"
                                                showCount
                                                maxLength={100}
                                                placeholder="Ghi chú ..."
                                                style={{ height: 120, resize: 'none' }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                        <Card hoverable bordered={false}>
                            <Flex vertical>
                                <Divider orientation="center">
                                    <h1 className="tw-text-xl tw-font-black">Đơn hàng của bạn</h1>
                                </Divider>
                                <Flex align="center" justify="space-between">
                                    <p className="tw-text-base tw-font-bold">Sản phẩm</p>
                                    <p className="tw-text-base tw-font-bold">Tạm tính</p>
                                </Flex>
                                <Divider style={{ marginBlock: 10, borderWidth: 2, borderColor: 'orange' }}></Divider>
                                {productSelected?.map((item, index) => (
                                    <Flex key={index} align="center" justify="space-between" className="tw-flex-1">
                                        <Space>
                                            <p className="tw-font-semibold tw-text-base">{item.name}</p>
                                            <p className="tw-text-cyan-500"> x </p>
                                            <p className="tw-font-semibold tw-text-base">{item.quantity}</p>
                                        </Space>
                                        <p>{formatVND(item.quantity * item.price)}</p>
                                    </Flex>
                                ))}
                                <Divider style={{ marginBlock: 10, borderWidth: 2, borderColor: 'orange' }}></Divider>

                                <Flex align="center" justify="space-between">
                                    <p className="tw-font-semibold tw-text-base">Phí ship</p>
                                    <p>Miễn phí</p>
                                </Flex>
                                <Divider style={{ marginBlock: 10 }}></Divider>
                                <Flex align="center" justify="space-between">
                                    <p className="tw-font-semibold tw-text-base">Tổng</p>
                                    <p>{formatVND(totalAmount || 0)}</p>
                                </Flex>
                                <Divider style={{ marginBlock: 10, borderWidth: 2, borderColor: 'orange' }}></Divider>
                                <Divider orientation="center">
                                    <h1 className="tw-text-base tw-font-black">Phương thức thanh toán</h1>
                                </Divider>
                                <Radio.Group value={1}>
                                    <Space direction="vertical">
                                        <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                                        <Radio value={2}>Ví điện tử</Radio>
                                    </Space>
                                </Radio.Group>
                                <Divider style={{ marginBlock: 10 }}></Divider>
                                <Button
                                    disabled={!productSelected || productSelected?.length === 0}
                                    className="tw-bg-orange-400 tw-font-bold tw-text-base"
                                    onClick={handleOnSubmit}
                                >
                                    Đặt hàng
                                </Button>
                            </Flex>
                        </Card>
                    </div>
                </Flex>
            </main>
        </Spin>
    );
};

export default page;
