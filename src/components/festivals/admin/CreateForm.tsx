'use client';
import React, { useEffect, useState } from 'react';
import {
    Card,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Spin,
    Upload,
    notification,
} from 'antd';
import { useAppDispatch } from '@/src/store/hooks';
import { IconCheck, IconExclamation } from '../../IconComponent';
import dynamic from 'next/dynamic';
import { setSelectedKeys } from '@/src/store/slices/common.slice';
import { festivalType } from '@/src/types/Festival';
import dayjs from 'dayjs';
import { RangePickerProps } from 'antd/es/date-picker';
import { useGetLocationQuery } from '@/src/store/queries/apiLocation.query.';
import { useAddFestivalMutation } from '@/src/store/queries/apiFestival.query';
const CustomEditor = dynamic(
    () => {
        return import('../../TextEditor');
    },
    { ssr: false }
);
type Props = {};

type Error = {
    content: string;
    selectLocation: string;
};

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const CreateForm = (props: Props) => {
    const disPatch = useAppDispatch();

    useEffect(() => {
        disPatch(setSelectedKeys('/dashboard/festival'));
    }, []);
    const [error, setError] = useState<Error>({
        content: '',
        selectLocation: '',
    });
    const [content, setContent] = useState('');
    const [selectLocation, setSelectLocation] = useState([]);

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
    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        return current && current < dayjs().endOf('day');
    };

    const [addFestival, { isLoading: isLoading_addFestival }] = useAddFestivalMutation();

    const [form] = Form.useForm();
    const handleFormFinish = async (value: festivalType) => {
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
        formData.append('start_date', String(dayjs(value.start_date).format('YYYY-MM-DD HH:mm:ss')));
        formData.append('end_date', String(dayjs(value.end_date).format('YYYY-MM-DD HH:mm:ss')));
        formData.append('description', content);
        formData.append('location', selectLocation[0]);
        formData.append('price', String(value.price));
        formData.append('avatar', value.avatar?.[0]?.originFileObj);
        if (value.listImg) {
            for (let i = 0; i < value.listImg.length; i++) {
                formData.append('images[]', value.listImg?.[i]?.originFileObj);
            }
        }

        await addFestival(formData).then((res) => {
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
                    // onClick: () => {
                    //     router.push('/travel/cart', { scroll: false });
                    // },
                });
                form.resetFields();
                setContent('');
                setSelectLocation([])
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
                    // onClick: () => {
                    //     router.push('/travel/cart', { scroll: false });
                    // },
                });
            }
        });
    };

    if (isLoading_addFestival) {
        return <Spin fullscreen tip="Đang gửi dữ liệu..."></Spin>;
    }

    return (
        <Card hoverable bordered={false} className="tw-flex tw-flex-col">
            <Divider orientation="center">
                <h1 className="tw-text-base tw-font-black">Thêm sự kiện , lễ hội</h1>
            </Divider>
            <Form layout="vertical" form={form} onFinish={handleFormFinish} initialValues={{ price: 0 }}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item<festivalType>
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Tiêu đề</p>}
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                        >
                            <Input placeholder="Nhập tiêu đề ..." allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<festivalType>
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Địa chỉ</p>}
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                            <Input placeholder="Nhập địa chỉ..." allowClear />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item<festivalType>
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Ngày bắt đầu</p>}
                            name="start_date"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu!' }]}
                        >
                            <DatePicker
                                format="YYYY-MM-DD HH:mm:ss"
                                disabledDate={disabledDate}
                                showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                                className="tw-w-full"
                                placeholder="Ngày bắt đầu"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<festivalType>
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Ngày kết thúc</p>}
                            name="end_date"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày kết thúc!' }]}
                        >
                            <DatePicker
                                format="YYYY-MM-DD HH:mm:ss"
                                disabledDate={disabledDate}
                                showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                                className="tw-w-full"
                                placeholder="Ngày kết thúc"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item<festivalType>
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
                    <Col span={12}>
                        <Form.Item<festivalType>
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Giá</p>}
                            name="price"
                        >
                            <InputNumber className="tw-w-full" />
                        </Form.Item>
                        <Form.Item<festivalType>
                            label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Địa điểm</p>}
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
                                    onChange={(e) => setSelectLocation(e)}
                                    filterOption={(input, option) =>
                                        typeof option?.label === 'string' &&
                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                />
                                {error.selectLocation && (
                                    <p className="tw-text-red-400 tw-font-normal">{error.selectLocation}</p>
                                )}
                            </Spin>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Mô tả</p>}>
                    <CustomEditor initialData={content} setContent={setContent} />
                    {error.content && <p className="tw-text-red-400 tw-font-normal">{error.content}</p>}
                </Form.Item>
                <Row>
                    <Col span={24}>
                        <Form.Item<festivalType>
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

export default CreateForm;
