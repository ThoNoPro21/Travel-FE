'use client';
import { Button, Card, Col, Flex, Form, Input, Row, Select, SelectProps, Spin, Upload, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { IconCheck, IconExclamation } from '../../IconComponent';
import { postArticleType } from '@/src/types/Article';
import { useAddPostMutation, useGetTopicQuery } from '@/src/store/queries/apiArticle.query';
import dynamic from 'next/dynamic';
import { useGetLocationQuery } from '@/src/store/queries/apiLocation.query.';
const CustomEditor = dynamic(
    () => {
        return import('../../TextEditor');
    },
    { ssr: false }
);

type Props = {
    setContent: (value: string) => void;
};
type Error = {
    content: string;
    selectTopic: string;
    selectLocation: string;
};

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const FormUpload = (props: Props) => {
    const [form] = Form.useForm();
    const [content, setContent] = useState('');
    const [selectTopic, setSelectTopic] = useState([]);
    const [selectLocation, setSelectLocation] = useState([]);

    useEffect(()=>{
        props.setContent(content)
    },[content])
    const [error, setError] = useState<Error>({
        content: '',
        selectTopic: '',
        selectLocation: '',
    });

    const {
        data: response_topic,
        isLoading: isLoading_topic,
        isSuccess: isSuccess_topic,
        refetch: refetch_topic,
    } = useGetTopicQuery('');

    const optionSelectTopics: SelectProps['options'] = [];
    if (isSuccess_topic) {
        response_topic.data.map((item) =>
            optionSelectTopics.push({
                value: item.topics_id + '',
                label: item.name,
            })
        );
    }
    const { data: response_location, isLoading: isLoading_location } = useGetLocationQuery('');
    const optionSelectLocation: any[] = [];
    if (response_location?.success) {
        response_location.data.map((item) =>
            optionSelectLocation.push({
                value: item.locations_id + '',
                label: item.name,
            })
        );
    }

    const [addPost,{isLoading:isLoading_addPost}] = useAddPostMutation();

    const handleFormFinish = async (value: postArticleType) => {
        let formData = new FormData();
        formData.append('title', value.title);
        formData.append('avatar', value.avatar?.[0]?.originFileObj);
        formData.append('content', content);
        formData.append('topic', String(selectTopic[0]));
        formData.append('location', String(selectLocation[0]));

        await addPost(formData).then((res) => {
            if (!content.trim()) {
                setError((prev) => ({ ...prev, content: 'Không được để trống!' }));
                return;
            } else {
                setError((prev) => ({ ...prev, content: '' }));
            }
            if (selectTopic.length === 0) {
                setError((prev) => ({ ...prev, selectTopic: 'Không được để trống!' }));
                return;
            } else {
                setError((prev) => ({ ...prev, selectTopic: '' }));
            }if (selectLocation.length === 0) {
                setError((prev) => ({ ...prev, selectLocation: 'Không được để trống!' }));
                return;
            } else {
                setError((prev) => ({ ...prev, selectLocation: '' }));
            }
            if ('data' in res) {
                notification.success({
                    message: <p className="tw-text-base tw-font-bold">Đăng bài viết thành công!</p>,
                    description: (
                        <p className="  tw-text-sm  tw-font-normal">Bài viết của bạn đang được chờ phê duyệt !</p>
                    ),
                    duration: 3,
                    icon: <IconCheck />,
                    placement: 'bottomRight',
                    key: 'addPost',
                    style: {
                        borderRadius: '4px',
                        cursor: 'pointer',
                    },
                });
                refetch_topic();
                form.resetFields();
                setContent('');
                setSelectTopic([]);
                setSelectLocation([]);
            }
            if ('error' in res) {
                console.log(res.error);
                notification.error({
                    message: <p className="tw-text-base tw-font-bold">Đăng bài viết thất bại!</p>,
                    description: <p className="  tw-text-sm  tw-font-normal">Đã có lỗi trong khi đăng tải ... !</p>,
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
    if(isLoading_addPost){
        return <Spin fullscreen />
    }
    return (
        <Card hoverable bordered={false}>
            <Flex vertical className="tw-w-ful font">
                <Form layout="vertical" form={form} onFinish={handleFormFinish}>
                    <Form.Item<postArticleType>
                        name="title"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <TextArea
                            placeholder="Tiêu đề"
                            allowClear
                            autoComplete="on"
                            className="tw-font-bold tw-text-xl"
                            variant="borderless"
                            showCount
                            maxLength={100}
                        />
                    </Form.Item>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Chủ đề</p>}
                            >
                                <Spin spinning={isLoading_topic}>
                                    <Select
                                        maxCount={1}
                                        allowClear
                                        mode="tags"
                                        style={{ width: '100%' }}
                                        placeholder="Nhập chủ đề"
                                        options={optionSelectTopics}
                                        value={selectTopic}
                                        onChange={(e) => setSelectTopic(e)}
                                        filterOption={(input, option) =>
                                            typeof option?.label === 'string' &&
                                            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    />
                                    {error.selectTopic && (
                                        <p className="tw-text-red-400 tw-font-normal">{error.selectTopic}</p>
                                    )}
                                </Spin>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<postArticleType>
                                label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Địa điểm</p>}
                            >
                                <Spin spinning={isLoading_location}>
                                    <Select
                                        maxCount={1}
                                        allowClear
                                        mode="tags"
                                        style={{ width: '100%' }}
                                        placeholder="Địa điểm"
                                        options={optionSelectLocation}
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

                    <Form.Item
                        label={<p className="tw-font-semibold tw-text-sm tw-text-emerald-700">Bài viết</p>}
                        name="content"
                    >
                        <CustomEditor initialData="" setContent={setContent} />
                    </Form.Item>
                    {error.content && <p className="tw-text-red-400 tw-font-normal">{error.content}</p>}
                    <Form.Item
                        label={
                            <p className="tw-font-semibold tw-text-sm tw-text-emerald-700 tw-font-lora ">
                                Ảnh đại diện
                            </p>
                        }
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        name="avatar"
                        rules={[
                            { required: true, message: 'Vui lòng nhập ảnh đại diện!' },
                            {
                                validator(_, fileList: any) {
                                    return new Promise((resolve, reject) => {
                                        if (fileList && fileList[0].size > 5000000) {
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
                            action="https://travel-be-deploy-production.up.railway.app/api/v1/uploadPreview"
                            listType="picture-card"
                            maxCount={1}
                            accept=".png,.jpg,.jpeg"
                        >
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <div style={{ marginTop: 8 }}>Tải lên</div>
                            </button>
                        </Upload>
                    </Form.Item>
                    <button
                        className="tw-bg-orange-500 tw-text-white tw-font-semibold  tw-font-lora tw-text-sm tw-w-25 tw-p-2 tw-rounded-lg"
                        type="submit"
                    >
                        Đăng
                    </button>
                </Form>
            </Flex>
        </Card>
    );
};

export default FormUpload;
