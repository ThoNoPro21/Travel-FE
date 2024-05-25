'use client'
import { Avatar, Flex, Space,Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { IconEllipsis, IconLike, IconUser } from '../../IconComponent';

type Props = {
    username?:string;
    create_at:string;
    content:string;
    avatar?:string;
};



const CommentComponent = (props: Props) => {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <Card hoverable styles={{body:{padding:0}}} className='tw-shadow-2xl tw-bg-white tw-p-1 md:tw-p-2 tw-max-h-34' >
            <Flex vertical>
                <Space>
                    <Avatar src={props.avatar} size={windowSize.width < 567 ? 32 : 48} >
                        {props.avatar?null:<IconUser />}
                    </Avatar>
                    <Flex vertical>
                        <span className="lg:tw-text-base tw-font-bold">{props.username}</span>
                        <p className="tw-text-xs">{props.create_at}</p>
                    </Flex>
                </Space>
                <div className="tw-px-10 md:tw-px-14">
                    <p className="lg:tw-text-base tw-font-normal tw-font-nunito-sans">
                        {props.content}
                    </p>
                    <Space size={16} className="tw-cursor-pointer tw-mb-0">
                        <p>
                            <IconLike />
                        </p>
                        <p>Trả lời</p>
                        <IconEllipsis />
                    </Space>
                </div>
            </Flex>
        </Card>
    );
};

export default CommentComponent;
