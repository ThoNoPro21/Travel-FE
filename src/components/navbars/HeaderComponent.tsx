'use client';
import { Drawer, Flex, Input, Space } from 'antd';
import React, { useState } from 'react';
import { Header } from 'antd/es/layout/layout';
import { IconBarMenu } from '../IconComponent';
import NavRightComponent from './right/NavRightComponent';
import NavMiddleComponent from './body/NavMiddleComponent';
import Link from 'next/link';

type Props = {};

const HeaderComponent = (props: Props) => {
    const [openMenu, setOpenMenu] = useState(false);

    const handleOnClickMenuBar = () => {
        setOpenMenu(true);
    };

    const onClose = () => {
        setOpenMenu(false);
    };

    return (
        <Header className="tw-fixed tw-w-full sm:tw-h-20 tw-h-15 tw-bg-transparent tw-bg-gradient-to-b tw-from-slate-950 tw-backdrop-blur-md tw-z-1000 tw-p-0 tw-m-0 sm:tw-px-2 lg:tw-px-4 xl:tw-px-13 ">
            <nav className="tw-w-full tw-h-full tw-flex tw-items-center ">
                <button
                    className="tw-flex-auto tw-text-white tw-text-left tw-px-4 sm:tw-hidden "
                    onClick={handleOnClickMenuBar}
                >
                    <IconBarMenu />
                </button>
                <Drawer
                    title="Quan Tum"
                    placement="left"
                    onClose={onClose}
                    open={openMenu}
                    width="50%"
                    className="sm:tw-hidden"
                >
                    <NavMiddleComponent mode='vertical' />

                </Drawer>
                <div className="tw-hidden tw-text-center tw-py-3 tw-gap-3 sm:tw-flex lg:tw-items-start  ">
                    <Link href='/'>
                        <h1 className="tw-text-2xl  tw-font-bold tw-text-emerald-300 ">
                            QuanTum
                        </h1>
                    </Link>
                </div>
                <Flex className="tw-flex-1 tw-hidden md:tw-flex">
                    <div className="tw-m-auto ">
                        <NavMiddleComponent mode='horizontal' />
                    </div>
                </Flex>
                <NavRightComponent />
            </nav>
        </Header>
    );
};

export default HeaderComponent;
