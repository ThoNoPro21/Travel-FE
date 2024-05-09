import { Avatar, Button, Card, Col, Flex, Grid, Row, Space, Tag } from 'antd';
import Image from 'next/image';
import React from 'react';
import { IconBookMark, IconDot, IconEllipsis, IconHeart, IconLocation, IconStar } from '../../IconComponent';
import { imagesJson, topicType } from '@/src/types/Article';

type Props = {
    avatar_user?: string;
    username: string;
    title: string;
    location?: string;
    content: string | TrustedHTML;
    src: string;
    topic: topicType;
};

const ArticleComponent = (props: Props) => {
    const images: imagesJson = JSON.parse(props.src);

    return (
        <Card hoverable styles={{ body: { padding: 10, height: 260, boxSizing: 'border-box' } }} className='tw-shadow-2xl'>
            <Flex vertical className="tw-max-h-full tw-w-full tw-gap-x-4 tw-font-lora">
                <Flex className="tw-flex-none lg:tw-pb-2" justify="space-between" align="center ">
                    <Space>
                        <Avatar src={props.avatar_user} />
                        <span className="lg:tw-text-base tw-font-normal">{props.username}</span>
                    </Space>
                    <Space size={'small'}>
                        <IconBookMark />
                        <IconEllipsis />
                    </Space>
                </Flex>
                <Flex className="tw-flex-grow md:tw-gap-x-4 tw-overflow-hidden" align="start">
                    <Flex vertical align="flex-start" className="tw-flex-grow">
                        <h1 className="tw-font-bold md:tw-text-2xl tw-text-ellipsis tw-text-base tw-flex-none tw-mb-4">
                            {props.title}
                        </h1>
                        <span className=" tw-grow tw-max-h-15 tw-overflow-hidden tw-text-ellipsis">
                            <p className="" dangerouslySetInnerHTML={{ __html: props.content }}></p>
                        </span>
                    </Flex>
                    <Image
                        src={images.avatar}
                        priority
                        quality={100}
                        height={1000}
                        width={1000}
                        alt="Picture ..."
                        className="tw-max-w-55 tw-h-full tw-flex-shrink-0 tw-rounded-lg tw-bg-cover tw-bg-center"
                    ></Image>
                </Flex>
                <Flex className="tw-flex-none tw-items-center tw-space-x-2 tw-h-15 ">
                    {props.topic.topics_id===1 && <Tag color='volcano'>{props.topic.name}</Tag>}
                    {props.topic.topics_id===2 && <Tag color='green'>{props.topic.name}</Tag>}
                    {props.topic.topics_id===3 && <Tag color='cyan'>{props.topic.name}</Tag>}
                    {props.topic.topics_id===4 && <Tag color='purple'>{props.topic.name}</Tag>}
                    {props.topic.topics_id > 4 && <Tag color="blue">{props.topic.name}</Tag>}
                    <span className="tw-font-medium tw-text-sm ">1 tuần trước</span>
                    <IconDot />
                    <span>8 phút đọc</span>
                </Flex>
            </Flex>
        </Card>
    );
};

export default ArticleComponent;
