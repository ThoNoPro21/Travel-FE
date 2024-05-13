'use client';
import { useAppDispatch } from '@/src/store/hooks';
import { useRegisterMutation } from '@/src/store/queries/apiAuth.query';
import { setSelectedMenuHeader } from '@/src/store/slices/common.slice';
import { registerType } from '@/src/types/Auth';
import { Flex, Form, Input, Spin, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {};

const Page = (props: Props) => {
    const dispatch = useAppDispatch()
    const [form] = Form.useForm();
    const router = useRouter();

    const [register, { isLoading: isLoading_register }] = useRegisterMutation();

    const handleFormFinish = async (value: registerType) => {
        await register(value).then((res) => {
            if ('data' in res) {
                message.success('Đăng ký thành công!', 4);
                router.push('/login');
                form.resetFields();
            }
            if ('error' in res) {
                console.error(res.error);
                message.error('Đăng ký thất bại!', 4);
            }
        });
    };

    useEffect(() => {
        dispatch(setSelectedMenuHeader('/'))
    },[])

    return (
        <Spin spinning={isLoading_register} tip="Chờ xíu...">
            <main className="tw-relative md:tw-pt-20 md:tw-px-13 tw-min-h-screen tw-bg-[url('/bg/image2.png')] tw-bg-center tw-bg-cover  tw-font-lora">
                <Flex justify="center" align="center">
                    <Flex
                        vertical
                        className="tw-w-130 tw-backdrop-blur-md tw-bg-white/10 tw-text-white tw-p-4 tw-rounded-lg tw-z-10"
                    >
                        <h1 className="tw-text-2xl tw-py-10 tw-font-black">ĐĂNG KÝ</h1>
                        <Form layout="vertical" form={form} onFinish={handleFormFinish}>
                            <Form.Item
                                hasFeedback
                                validateTrigger="onBlur"
                                label={<span className="tw-text-white">Tên tài khoản</span>}
                                name="name"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên tài khoản!' },
                                    { min: 3, message: 'Tên tối thiểu 3 kí tự' },
                                    { max: 20, message: 'Tên quá dài !' },
                                ]}
                            >
                                <Input placeholder="Nhập tên tài khoản..." allowClear autoComplete="on"></Input>
                            </Form.Item>
                            <Form.Item
                                label={<span className="tw-text-white">Email</span>}
                                hasFeedback
                                validateDebounce={2000}
                                name="email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email chính chủ!' },
                                    {
                                        type: 'email',
                                        message: 'Đây không phải là 1 email!',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập email..." allowClear autoComplete="on"></Input>
                            </Form.Item>
                            <Form.Item
                                hasFeedback
                                label={<span className="tw-text-white">Mật khẩu</span>}
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                            >
                                <Input.Password allowClear />
                            </Form.Item>
                            <Form.Item
                                dependencies={['password']}
                                hasFeedback
                                validateTrigger="onBlur"
                                label={<span className="tw-text-white">Nhập lại mật khẩu</span>}
                                name="password_confirmation "
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                    { max: 20, message: 'Tối đa 20 ký tự' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password allowClear />
                            </Form.Item>
                           <p className='tw-text-cyan-600 tw-mb-4'>Nên dùng email chính chủ để verify !</p>
                            <button
                                type="submit"
                                className="tw-bg-orange-500 tw-p-2 tw-rounded-lg tw-font-bold tw-font-mono tw-text-lg tw-text-white"
                            >
                                Đăng ký
                            </button>
                        </Form>
                        <p className=" tw-font-mono tw-text-center">
                            Bạn đã có tài khoản!{' '}
                            <Link href={'/login'}>
                                <span className="tw-text-blue-400 tw-italic">Đăng nhập </span>
                            </Link>
                        </p>
                    </Flex>
                </Flex>
            </main>
            <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-black tw-opacity-50"></div>
        </Spin>
    );
};

export default Page;
