import { Avatar, Divider, Flex, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { IconBookMark, IconDot, IconEllipsis, IconUser } from '../IconComponent';
import ReactPlayer from 'react-player';
import parse from 'html-react-parser';
import '@/src/styles/app.scss';
type Props = {
    avatar_user?: string;
    content?: string | TrustedHTML;
    created_at: any;
    username?: string;
    title?: string;
};

const SideMain = (props: Props) => {
    const date = new Date(props.created_at);
    const formattedDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    return (
        <Flex vertical gap={16}>
            <h1 className="md:tw-text-7xl tw-font-bold tw-text-center ">{props.title}</h1>
            <Divider />
            <Flex className="tw-flex-none lg:tw-pb-2" justify="space-between" align="center ">
                <Space>
                    <Avatar size={64} src={props.avatar_user}>
                        {props.avatar_user ? null : <IconUser />}
                    </Avatar>
                    <Flex vertical>
                        <span className="lg:tw-text-lg tw-font-bold">{props.username}</span>
                        <Space className="tw-text-sm">
                            <p>{formattedDate}</p>
                            <IconDot />
                            <p>5 phút đọc</p>
                        </Space>
                    </Flex>
                </Space>
                <Space size={'large'}>
                    <IconBookMark />
                    <IconEllipsis />
                </Space>
            </Flex>
            <PostContent content={props.content as string} />
        </Flex>
    );
};

export default SideMain;

export const PostContent = ({ content }: { content: string }) => {
    const handleVideoEmbed = (node: any) => {
        if (node.type === 'tag' && node.name === 'oembed' && node.attribs && node.attribs.url) {
            const videoUrl = node.attribs.url;
            return <ReactPlayer url={videoUrl} controls />;
        }
        return null;
    };

    const options = {
        replace: (node: any) => handleVideoEmbed(node),
    };

    const processedContent = parse(content, options);

    return <div className="ck-content tw-w-full tw-mb-4">{processedContent}</div>;
};
