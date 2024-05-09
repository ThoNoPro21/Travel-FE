'use client';
import React, { useEffect, useState } from 'react';
import {
    Card,
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    SelectProps,
    Spin,
    Upload,
    message,
    notification,
} from 'antd';
import { useAddProductMutation } from '@/src/store/queries/apiProduct.query';
import { categoryType, productType } from '@/src/types/Product';
import { useAppDispatch } from '@/src/store/hooks';
import { setSelectedKeys } from '@/src/store/slices/common.slice';
import dynamic from 'next/dynamic';
import { IconCheck, IconExclamation } from '../../../components/IconComponent';
import { useGetLocationQuery } from '@/src/store/queries/apiLocation.query.';
import { locationType } from '@/src/types/Location';
import { useGetCategoryQuery } from '@/src/store/queries/apiCategory.query';
import { filterProps } from 'framer-motion';

const CustomEditor = dynamic(
    () => {
        return import('../../../components/TextEditor');
    },
    { ssr: false }
);

type Props = {};
const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const page = (props: Props) => {
    const [content, setContent] = useState('');
    const disPatch = useAppDispatch();
    useEffect(() => {
        disPatch(setSelectedKeys('/dashboard/product'));
    },[]);

    const {
        data: response_category,
        isSuccess: isSuccess_category,
        isLoading: isLoading_category,
        refetch: refetch_category,
    } = useGetCategoryQuery('');
    const {
        data: response_location,
        isSuccess: isSuccess_location,
        isLoading: isLoading_location,
        refetch: refetch_location,
    } = useGetLocationQuery('');

    const [addProduct, { isLoading: isLoading_AddProduct }] = useAddProductMutation();

    const select_Category_Options: SelectProps['options'] = [];
    const select_Location_Options: SelectProps['options'] = [];

    if (isSuccess_category) {
        response_category?.data.map((category: categoryType) =>
            select_Category_Options.push({ value: category.categories_id + '', label: category.name })
        );
    }
    if (isSuccess_location) {
        response_location?.data.map((item: locationType) =>
            select_Location_Options.push({ value: item.locations_id + '', label: item.name })
        );
    }
    const [selectLocation, setSelectLocation] = useState([]);
    const [selectCategory, setSelectCategory] = useState([]);

    const [form] = Form.useForm();
    const handleFormFinish = async (value: productType) => {
        let formData = new FormData();
        formData.append('name', value.name);
        formData.append('category', selectCategory[0]);
        formData.append('location', selectLocation[0]);
        formData.append('price', String(value.price));
        formData.append('quantity', String(value.quantity));
        formData.append('description', content);
        formData.append('avatar', value.avatar?.[0]?.originFileObj);
        if (value.listImg) {
            for (let i = 0; i < value.listImg.length; i++) {
                formData.append('images[]', value.listImg?.[i]?.originFileObj);
            }
        }
        await addProduct(formData).then((res) => {
            if ('data' in res) {
                refetch_category();
                refetch_location();
                notification.success({
                    message: <p className="tw-text-base tw-font-bold">Thêm mới sản phẩm thành công!</p>,
                    description: (
                        <p className="  tw-text-sm  tw-font-normal">Giờ đây bạn có thể xem tất cả sản phẩm !</p>
                    ),
                    duration: 3,
                    icon: <IconCheck />,
                    placement: 'bottomRight',
                    key: 'addPost',
                    style: {
                        borderRadius: '4px',
                        cursor: 'pointer',
                    },
                    // onClick: () => {
                    //     router.push('/travel/cart', { scroll: false });
                    // },
                });
                form.resetFields();
                setContent('');
                setSelectLocation([]);
                setSelectCategory([]);
            }
            if ('error' in res) {
                console.error(res.error);
                notification.error({
                    message: <p className="tw-text-base tw-font-bold">Thêm mới thất bại!</p>,
                    description: <p className="  tw-text-sm  tw-font-normal">Đã có lỗi trong quá trình tải lên !</p>,
                    duration: 3,
                    icon: <IconExclamation />,
                    placement: 'bottomRight',
                    key: 'addPost',
                    style: {
                        borderRadius: '4px',
                        cursor: 'pointer',
                    },
                });
            }
        });
    };
    if (isLoading_AddProduct) {
        return <Spin fullscreen tip="Đang tải lên..." />;
    }
    return (
        <Card hoverable bordered={false} className="tw-flex tw-flex-col">
            <Divider orientation="center">
                <h1 className="tw-text-base tw-font-black">Thêm sản phẩm</h1>
            </Divider>
            <Form layout="vertical" form={form} onFinish={handleFormFinish}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Danh mục</p>}
                            rules={[{ required: true, message: 'Vui lòng nhập danh mục!' }]}
                        >
                            <Spin spinning={isLoading_category}>
                                <Select
                                    showSearch
                                    maxCount={1}
                                    allowClear
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    placeholder="Danh mục"
                                    options={select_Category_Options}
                                    value={selectCategory}
                                    onChange={(e) => setSelectCategory(e)}
                                    filterOption={(input, option) =>
                                        typeof option?.label === 'string' &&
                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                />
                            </Spin>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Địa điểm</p>}
                            rules={[{ required: true, message: 'Vui lòng nhập đia điểm!' }]}
                        >
                            <Spin spinning={isLoading_location}>
                                <Select
                                    maxCount={1}
                                    allowClear
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    placeholder="Địa điểm"
                                    options={select_Location_Options}
                                    value={selectLocation}
                                    onChange={(e) => setSelectLocation(e)}
                                    filterOption={(input, option) =>
                                        typeof option?.label === 'string' &&
                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                />
                            </Spin>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item<productType>
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Tên sản phẩm</p>}
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                        >
                            <Input placeholder="Nhập tên sản phẩm" allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<productType>
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Giá</p>}
                            name="price"
                            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                        >
                            <InputNumber min={1} className="tw-w-full" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Ảnh đại diện</p>}
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            name="avatar"
                            rules={[
                                { required: true, message: 'Vui lòng nhập ảnh đại diện!' },
                                {
                                    validator(_, fileList: any) {
                                        return new Promise((resolve, reject) => {
                                            if (fileList && fileList[0].size > 5 * 1024 * 1024) {
                                                reject('Kích thước ảnh quá lớn');
                                            } else {
                                                resolve('Thành công');
                                            }
                                        });
                                    },
                                },
                            ]}
                        >
                            <Upload
                                action="http://127.0.0.1:8000/api/upload"
                                listType="picture-card"
                                maxCount={1}
                                accept=".png,.jpg,.jpeg"
                            >
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <div style={{ marginTop: 8 }}>Tải lên</div>
                                </button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Ảnh liên quan</p>}
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            name="listImg"
                            rules={[
                                { required: true, message: 'Vui lòng nhập ảnh liên quan!' },
                                {
                                    validator(_, fileList: any) {
                                        return new Promise((resolve, reject) => {
                                            if (fileList && fileList[0].size > 10000000) {
                                                reject('Kích thước ảnh quá lớn');
                                            } else {
                                                resolve('Thành công');
                                            }
                                        });
                                    },
                                },
                            ]}
                        >
                            <Upload
                                action="http://127.0.0.1:8000/api/upload"
                                listType="picture-card"
                                multiple
                                accept=".png,.jpg,.jpeg"
                                className="tw-grid tw-grid-cols-4 tw-grid-flow-row"
                            >
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <div style={{ marginTop: 8 }}>Tải lên</div>
                                </button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Mô tả">
                    <CustomEditor initialData="" setContent={setContent} />
                </Form.Item>
                <button
                    type="submit"
                    className="tw-bg-orange-500 tw-text-white tw-font-semibold tw-text-sm tw-w-25 tw-p-2 tw-rounded-lg"
                >
                    Gửi
                </button>
            </Form>
        </Card>
    );
};

export default page;
