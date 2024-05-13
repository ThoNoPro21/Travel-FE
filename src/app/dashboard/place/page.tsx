'use client';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, Row, Select, Space, Spin, Upload, message, notification } from 'antd';
import { placeType } from '@/src/types/Place';
import { useAddPlaceMutation } from '@/src/store/queries/apiPlace.query';
import { useAppDispatch } from '@/src/store/hooks';
import { IconCheck, IconClose, IconExclamation } from '../../../components/IconComponent';
import dynamic from 'next/dynamic';
import { setSelectedKeys } from '@/src/store/slices/common.slice';
import { useGetLocationQuery } from '@/src/store/queries/apiLocation.query.';
const CustomEditor = dynamic(
    () => {
        return import('../../../components/TextEditor');
    },
    { ssr: false }
);
type Props = {};

type Error = {
    content: string;
    selectLocation:string;
};

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const Page = (props: Props) => {
    const [error, setError] = useState<Error>({
        content: '',
        selectLocation:'',
    });
    const [content, setContent] = useState('');

    const disPatch = useAppDispatch();
    useEffect(()=>{
        disPatch(setSelectedKeys('/dashboard/place'));
    })

    const [addPlace, { isLoading: isLoading_AddPlace }] = useAddPlaceMutation();
    const { data: response_location, isLoading: isLoading_location } = useGetLocationQuery('');
    const optionSelects: any[] = [];
    if (response_location?.success) {
        response_location.data.map((item) =>
            optionSelects.push({
                value: item.locations_id + '',
                label: item.name,
            })
        );
    }
    const [selectLocation,setSelectLocation] = useState([]);
    const [form] = Form.useForm();
    const handleFormFinish = async (value: placeType) => {

        if (!content.trim()) {
            setError((prev) => ({ ...prev, content: 'Không được để trống!' }));
            return;
        } else {
            setError((prev) => ({ ...prev, content: '' }));
        }
        if (selectLocation.length===0) {
            setError((prev) => ({ ...prev, selectLocation: 'Không được để trống!' }));
            return;
        } else {
            setError((prev) => ({ ...prev, selectLocation: '' }));
        }

        let formData = new FormData();
        formData.append('name', value.name);
        formData.append('address', value.address);
        formData.append('location', selectLocation[0]);
        formData.append('longitude', String(value.longitude));
        formData.append('latitude', String(value.latitude));
        formData.append('description', content);
        formData.append('avatar', value.avatar?.[0]?.originFileObj);
        if (value.listImg) {
            for (let i = 0; i < value.listImg.length; i++) {
                formData.append('images[]', value.listImg?.[i]?.originFileObj);
            }
        }
        const array = value.items[0].list;
        if (array?.length > 0) {
            for (let i = 0; i < array.length; i++) {
                if (array[i]?.title !== undefined && array[i]?.description !== undefined) {
                    formData.append('subDescription[]', JSON.stringify(array[i]));
                }
            }
        }
        await addPlace(formData).then((res) => {
            if ('data' in res) {
                notification.success({
                    message: <p className="tw-text-base tw-font-bold">Đăng tải thành công!</p>,
                    description: <p className="  tw-text-sm  tw-font-normal">Giờ đây bạn có thể xem lại địa danh !</p>,
                    duration: 3,
                    icon: <IconCheck />,
                    placement: 'bottomRight',
                    key: 'addPost',
                    style: {
                        borderRadius: '4px',
                        cursor: 'pointer',
                    },
                });
                form.resetFields();
                setContent('');
                setSelectLocation([]);
            }
            if ('error' in res) {
                console.error(res.error);
                notification.error({
                    message: <p className="tw-text-base tw-font-bold">Đăng tải thất bại!</p>,
                    description: <p className="  tw-text-sm  tw-font-normal">Dường như đã có trục trặc gì đó!</p>,
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

    if (isLoading_AddPlace) {
        return <Spin fullscreen tip="Đang gửi dữ liệu..."></Spin>;
    }

    return (
        <Card hoverable bordered={false} className="tw-flex tw-flex-col">
            <Divider orientation="center">
                <h1 className="tw-text-base tw-font-black">Thêm địa danh</h1>
            </Divider>
            <Form layout="vertical" form={form} onFinish={handleFormFinish} initialValues={{ items: [{}] }}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item<placeType>
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Tên địa danh</p>}
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên địa danh!' }]}
                        >
                            <Input placeholder="Nhập tên địa danh" allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<placeType>
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Địa chỉ</p>}
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                            <Input placeholder="Nhập tên địa danh" allowClear />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item<placeType>
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
                                    options={optionSelects}
                                    value={selectLocation}
                                    onChange={(e)=>setSelectLocation(e)}
                                    filterOption={(input, option) =>
                                        typeof option?.label === 'string' &&
                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                />
                                {error.selectLocation && <p className="tw-text-red-400 tw-font-normal">{error.selectLocation}</p>}
                            </Spin>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item<placeType>
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Tọa độ X</p>}
                            name="latitude"
                        >
                            <Input placeholder="Nhập tọa độ X (nếu có)" allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<placeType>
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Tọa độ Y</p>}
                            name="longitude"
                        >
                            <Input placeholder="Nhập tọa độ Y (nếu có)" allowClear />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Mô tả</p>}>
                    <CustomEditor initialData={content} setContent={setContent} />
                    {error.content && <p className="tw-text-red-400 tw-font-normal">{error.content}</p>}
                </Form.Item>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item<placeType>
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
                                action="https://travel-be-deploy-production.up.railway.app/api/v1/upload"
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
                    <Col span={12}>
                        <Form.Item<placeType>
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Thông tin khác</p>}
                        >
                            <Form.List name="items">
                                {(fields, { add, remove }) => (
                                    <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                        {fields.map((field) => (
                                            <Form.Item key={field.key}>
                                                <Form.List name={[field.name, 'list']}>
                                                    {(subFields, subOpt) => (
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                rowGap: 16,
                                                            }}
                                                        >
                                                            {subFields.map((subField) => (
                                                                <Space key={subField.key}>
                                                                    <Form.Item noStyle name={[subField.name, 'title']}>
                                                                        <Input placeholder="Tiêu đề ...(Vd: Giá...)" />
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        noStyle
                                                                        name={[subField.name, 'description']}
                                                                    >
                                                                        <Input placeholder="Mô tả...(Vd: Free..." />
                                                                    </Form.Item>
                                                                    <Space
                                                                        onClick={() => {
                                                                            subOpt.remove(subField.name);
                                                                        }}
                                                                    >
                                                                        <IconClose />
                                                                    </Space>
                                                                </Space>
                                                            ))}
                                                            <Button type="dashed" onClick={() => subOpt.add()} block>
                                                                Thêm
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Form.List>
                                            </Form.Item>
                                        ))}
                                    </div>
                                )}
                            </Form.List>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item<placeType>
                            label={<p className="tw-font-bold tw-text-sm tw-text-emerald-700">Ảnh liên quan</p>}
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
                                action="https://travel-be-deploy-production.up.railway.app/api/v1/upload"
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
                <button
                    className="tw-bg-orange-500 tw-text-white tw-font-semibold tw-text-sm tw-w-25 tw-p-2 tw-rounded-lg"
                    type="submit"
                >
                    Gửi
                </button>
            </Form>
        </Card>
    );
};

export default Page;
