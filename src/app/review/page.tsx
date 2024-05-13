'use client';
import { IconCheck, IconClose } from '@/src/components/IconComponent';
import ResultComponent from '@/src/components/result/ResultComponent';
import { useAppSelector } from '@/src/store/hooks';
import { useAddReviewMutation } from '@/src/store/queries/apiCommon.query';
import { reviewType } from '@/src/types/Review';
import { Button, Form, Modal, Rate, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Props = { open: boolean };

const page = (props: Props) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [open, setOpen] = useState(props.open);
    const [valueInput, setValueInput] = useState('');
    const isLogin = useAppSelector((state) => state.dataAuth.isLogin);
    const status = useAppSelector((state) => state.dataAuth.isStatus);
    const [isCheckLogin, setIsCheckLogin] = useState(true);
    const [valueErr, setValueError] = useState('');

    const [addReview] = useAddReviewMutation();
    useEffect(() => {
        setOpen(true); // Update the open state when the props change
    }, []);

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
                linkOk="login"
                linkCancel="/"
            />
        );
    }
    const handleFormFinish = (value: reviewType) => {
        if (value.rating === 0) {
            setValueError('Vui lòng đánh giá !');
            return;
        } else {
            setValueError('');
        }
        let formData = new FormData();

        formData.append('content', value.content);
        formData.append('rating', String(value.rating));
        addReview(formData)
            .then((res) => {
                if ('data' in res) {
                    notification.success({
                        message: <p className="tw-text-base tw-font-bold">Cảm ơn bạn rất nhiều!</p>,
                        description: (
                            <p className="  tw-text-sm  tw-font-normal"> Chúng tôi đã ghi nhận ý kiến của bạn !</p>
                        ),
                        icon: <IconCheck />,
                        duration: 4,
                        placement: 'bottomRight',
                        key: 'addToCart',
                        style: {
                            borderRadius: '4px',
                            cursor: 'pointer',
                        },
                    });
                }
            })
            .then(() => router.push('/'));
    };
    return (
        <Modal
            title={
                <h1 className="tw-text-center tw-font-bold tw-text-xl tw-font-mono tw-text-orange-500">
                    Đánh giá chung
                </h1>
            }
            open={open}
            footer={null}
            closeIcon={null}
        >
            <Form layout="vertical" form={form} onFinish={handleFormFinish}>
                <Form.Item>
                    <h1 className="tw-font-bold tw-text-sm tw-text-center">
                        Đánh giá trải nghiệm của bạn chúng tôi sẽ hoàn thiện hơn!
                    </h1>
                </Form.Item>

                <Form.Item name="rating" rules={[{ required: true, message: 'Vui lòng đánh giá !' }]}>
                    <Rate defaultValue={0} allowClear style={{ fontSize: 24 }} />
                </Form.Item>
                {valueErr && <p className="tw-text-red-400 tw-font-normal">{valueErr}</p>}
                <Form.Item
                    name="content"
                    label="Ý kiến"
                    rules={[{ required: true, message: 'Vui lòng không để trống !' }]}
                >
                    <TextArea
                        onChange={(e) => setValueInput(e.target.value)}
                        name="content"
                        showCount
                        maxLength={100}
                        placeholder="Ý kiến..."
                        style={{ height: 120, resize: 'none' }}
                    />
                </Form.Item>
                <Button
                    htmlType="submit"
                    disabled={valueInput?.trim().length === 0}
                    className="tw-text-white tw-font-bold tw-text-base"
                >
                    ĐÁNH GIÁ
                </Button>
            </Form>
        </Modal>
    );
};

export default page;
