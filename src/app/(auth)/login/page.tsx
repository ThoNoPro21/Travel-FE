'use client';
import { Button, Flex, Form, Input, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { loginType } from '@/src/types/Auth';
import { useGetMeQuery, useLoginMutation } from '@/src/store/queries/apiAuth.query';
import { useRouter } from 'next/navigation';
import { IconEmail, IconLock } from '../../../components/IconComponent';
import Link from 'next/link';
import { useAppDispatch } from '@/src/store/hooks';
import { setHeader, setSelectedMenuHeader } from '@/src/store/slices/common.slice';
type Props = {};

const Page = (props: Props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    
    const { refetch:refetch_me} = useGetMeQuery('');
    const [form] = Form.useForm();
    const [error_Auth, setError_Auth] = useState('');
    const [login, { isLoading: isLoading_Login }] = useLoginMutation();
    const handleFormFinish = async (value: loginType) => {
        await login(value).then(async(res) => {
            if ('data' in res) {
                message.success('Đăng nhập thành công');
                setError_Auth('');
                refetch_me()
                router.push('/'); // Push to the home page
            }
            if ('error' in res) {
                setError_Auth('Đăng nhập thất bại !');
            }
        });
    };

    useEffect(() => {
        dispatch(setSelectedMenuHeader('/'))
        dispatch(setHeader())
    },[])

    return (
        <Spin spinning={isLoading_Login} tip="Chờ xíu...">
            <main className="tw-relative tw-flex md:tw-pt-20 md:tw-px-13 tw-min-h-screen tw-bg-[url('/bg/image2.png')] tw-bg-center tw-bg-cover tw-font-lora ">
                    <Flex
                        vertical
                        className="tw-w-auto tw-m-auto lg:tw-w-130 tw-backdrop-blur-sm  tw-bg-white/50 tw-text-white tw-p-4 tw-rounded-lg tw-z-10"
                    >
                        <h1 className="tw-text-4xl tw-py-10 tw-font-black tw-text-black ">Đăng nhập</h1>
                        <Form layout="vertical" form={form} onFinish={handleFormFinish}>
                            <Form.Item
                                label={<span className="tw-text-white">Emai</span>}
                                name="email"
                                validateTrigger="onBlur"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email!' },
                                    { type: 'email', message: 'Đây không phải là 1 email!' },
                                ]}
                            >
                                <Input
                                    prefix={
                                        <div className="tw-me-2">
                                            <IconEmail />
                                        </div>
                                    }
                                    placeholder="Nhập email của bạn..."
                                    allowClear
                                    autoComplete="on"
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                label={<span className="tw-text-white">Mật khẩu</span>}
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                            >
                                <Input.Password
                                    prefix={
                                        <div className="tw-me-2">
                                            <IconLock />
                                        </div>
                                    }
                                    allowClear
                                    autoComplete="on"
                                />
                            </Form.Item>
                            {!!error_Auth && (
                                <p className="tw-text-red-500 tw-pb-2 tw-text-sm tw-font-medium">
                                    {error_Auth}
                                </p>
                            )}
                            <button
                                type="submit"
                                className="tw-bg-orange-500 tw-px-4 tw-py-1 lg:tw-py-2 tw-rounded-md lg:tw-rounded-lg tw-font-bold tw-font-mono tw-text-base lg:tw-text-lg tw-text-white"
                            >
                                Đăng nhập
                            </button>
                        </Form>
                        <p className=" tw-font-mono tw-text-center">
                            Bạn chưa có tài khoản!
                            <Link href={'/register'}>
                                <span className="tw-text-blue-700 tw-italic"> Đăng ký </span>
                            </Link>
                        </p>
                    </Flex>
            </main>
            <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-black tw-opacity-70"></div>
        </Spin>
    );
};

export default Page;
