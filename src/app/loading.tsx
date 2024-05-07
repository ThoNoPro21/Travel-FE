import { Flex, Skeleton, Spin } from 'antd';
import React from 'react'

type Props = {}

const loading = (props: Props) => {
    return (
        <Spin fullscreen />
        // <main className='md:tw-pt-20 md:tw-px-13 tw-min-h-screen tw-w-full '>
        // <div className='tw-grid tw-grid-cols-2 tw-grid-rows-2 tw-gap-4 '>
        //     <Skeleton active />
        //     <Skeleton active />
        //     <Skeleton active />
        //     <Skeleton active />
        // </div>
        // </main>
    );
}

export default loading