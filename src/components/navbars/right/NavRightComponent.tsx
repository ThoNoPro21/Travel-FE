'use client';
import { useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';
import { Avatar, Badge, Dropdown, Flex, MenuProps, Modal, Space } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IconCartShopping, IconExclamation, IconUser } from '../../IconComponent';
import { useRouter } from 'next/navigation';
import { truncateDescription } from '../../validate/String';
import { useGetCartQuery } from '@/src/store/queries/apiProduct.query';
import { useGetMeQuery, useLogoutQuery } from '@/src/store/queries/apiAuth.query';
import { skip } from 'node:test';
const { confirm } = Modal;

type Props = {};

const NavRightComponent = (props: Props) => {
    const router = useRouter();
    const [openLogin, setOpenLogin] = useState(false);
    const [logout, setLogout] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [componentLoad, setComponentLoad] = useState(false);

    const isLogin = useAppSelector((state: RootState) => state.dataAuth.isLogin);
    const user = useAppSelector((state: RootState) => state.dataAuth.user);
    const isStatus = useAppSelector((state: RootState) => state.dataAuth.isStatus);
    const onChangeCart = useAppSelector((state: RootState) => state.dataProduct.isSuccess);
    const { data: response_getCart, refetch: refetch_getCart } = useGetCartQuery('', { skip: !isLogin });
    const { data: response_logout, refetch: refetch_logout } = useLogoutQuery('', { skip: !logout });
    const { refetch: refetch_getMe } = useGetMeQuery('', { skip: !logout });

    useEffect(() => {
        setComponentLoad(true);
    }, [isStatus]);

    useEffect(() => {
        if (onChangeCart) {
            refetch_getCart();
        }
    }, [onChangeCart]);

    const items: MenuProps['items'] = [
        {
            label: (
                <Link href={'/profile'}>
                    <Space>
                        <Avatar size={52} src={user?.avatar}>
                            {user?.avatar ? null : <IconUser />}
                        </Avatar>
                        <Flex gap={'small'} vertical>
                            <p className="tw-font-bold tw-text-base ">{user?.name}</p>
                            <p className="tw-font-light tw-text-sm">{truncateDescription(user?.story || '', 25)}</p>
                        </Flex>
                    </Space>
                </Link>
            ),
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Link href={'/profile'}>
                    <p className=" tw-text-base tw-font-normal tw-font-lora">Trang cá nhân</p>
                </Link>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Link href={'/post'}>
                    <p className="tw-hidden lg:tw-block tw-text-base tw-font-normal tw-font-lora">Viết blog</p>
                </Link>
            ),
            key: '2',
        },
        {
            label: <p className=" tw-text-base tw-font-normal tw-font-lora">Bài viết của tôi</p>,
            key: '3',
        },
        {
            type: 'divider',
        },
        {
            label: <p className=" tw-text-base tw-font-normal tw-font-lora">Bài viết đã lưu</p>,
            key: '4',
        },
        {
            type: 'divider',
        },
        {
            label: <p className=" tw-text-base tw-font-normal tw-font-lora">Đăng xuất</p>,
            key: '5',
            onClick: () => {
                confirm({
                    title: <p className="tw-mx-2">Bạn có chắc muốn đăng xuất !</p>,
                    icon: <IconExclamation />,
                    content: 'Nhấn OK mọi thứ sẽ đăng xuất ....',
                    cancelText: 'Hủy',
                    onOk() {
                        setLogout(true);
                        localStorage.removeItem('token');
                    },
                    onCancel() {},
                });
            },
        },
    ];

    useEffect(() => {
        const performLogout = async () => {
            if (logout) {
                await refetch_logout(); // Đợi refetch_logout hoàn thành
                await refetch_getMe(); // Sau đó gọi refetch_getMe
            }
        };

        performLogout();
    }, [logout]);

    const handleOnClickProfile = (e: any) => {
        e.preventDefault();
    };

    const handleOnClickLogin = () => {
        router.push('/login');
        setOpenLogin(true);
    };

    const handleOnClickRegister = () => {
        router.push('/register');
        setOpenRegister(true);
    };

    return (
        componentLoad && (
            <Flex
                gap="middle"
                align="center"
                className=" tw-text-white tw-font-bold tw-cursor-pointer tw-mr-6 tw-h-full  "
            >
                {isLogin ? (
                    <>
                        <Link href="/product/cart">
                            <Badge count={response_getCart?.data?.length || 0} size="small">
                                <div className="tw-p-2">
                                    <IconCartShopping />
                                </div>
                            </Badge>
                        </Link>
                        <Dropdown menu={{ items }} trigger={['click']} overlayStyle={{ minWidth: 220 }}>
                            <Avatar size="large" src={user?.avatar} onClick={(e: any) => handleOnClickProfile(e)}>
                                {user?.avatar ? null : <IconUser />}
                            </Avatar>
                        </Dropdown>
                    </>
                ) : (
                    <Space size={'large'}>
                        <h1 onClick={handleOnClickLogin} className='tw-hidden md:tw-block'>Đăng nhập</h1>
                        <button
                            className="tw-rounded-3xl tw-text-base tw-bg-orange-500 tw-px-5 tw-py-2 tw-font-bold tw-text-white"
                            onClick={handleOnClickRegister}
                        >
                            Đăng ký
                        </button>
                    </Space>
                )}
            </Flex>
        )
    );
};

export default NavRightComponent;
