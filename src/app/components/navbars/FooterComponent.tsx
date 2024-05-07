import { Flex } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React from 'react';

type Props = {};

const FooterComponent = (props: Props) => {
    return (
        <Footer className="tw-relative tw-p-0 tw-z-0">
            <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-black tw-opacity-70 tw-z-10"></div>
            <div className="tw-relative tw-w-full tw-h-100 tw-bg-[url('/images/bg.jpg')] tw-bg-cover tw-bg-center -tw-z-100 ">
            </div>
            <Flex className="tw-absolute tw-top-0 tw-w-full tw-h-100 ">
                <h1 className='tw-m-auto tw-font-black tw-text-4xl  tw-text-emerald-300 tw-z-20'>QuanTum</h1>
            </Flex>
        </Footer>
    );
};

export default FooterComponent;
