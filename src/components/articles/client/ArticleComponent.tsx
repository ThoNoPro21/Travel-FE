import { Avatar, Button, Card, Col, Flex, Grid, Row, Space, Tag } from 'antd';
import Image from 'next/image';
import React from 'react';
import { IconBookMark, IconDot, IconEllipsis, IconHeart, IconLocation, IconStar } from '../../IconComponent';
import { imagesJson, topicType } from '@/src/types/Article';
import { calculateReadingTime, formatElapsedTime } from '../../validate/String';

type Props = {
    avatar_user?: string;
    username: string;
    title: string;
    location?: string;
    content: string | TrustedHTML;
    src: string;
    topic: topicType;
    created_at:Date;
};

const ArticleComponent = (props: Props) => {
    const images: imagesJson = JSON.parse(props.src);

    return (
        <Card hoverable styles={{ body: { padding: 10, height: 220, boxSizing: 'border-box' } }} className='tw-shadow-2xl'>
            <Flex vertical className="tw-h-full tw-w-full tw-gap-x-4 tw-font-lora">
                <Flex className="tw-flex-none lg:tw-pb-2" justify="space-between" align="center ">
                    <Space>
                        <Avatar src={props.avatar_user} />
                        <span className="tw-text-xs lg:tw-text-sm tw-font-bold">{props.username}</span>
                    </Space>
                    <Space size={'small'}>
                        <IconBookMark />
                        <IconEllipsis />
                    </Space>
                </Flex>
                <Flex className="tw-flex-1 tw-gap-1 md:tw-gap-x-4 tw-overflow-hidden" align="start">
                    <Flex vertical align="flex-start" className="tw-flex-grow">
                        <h1 className="tw-font-bold md:tw-text-2xl tw-text-ellipsis tw-text-base tw-flex-none tw-mb-4">
                            {props.title}
                        </h1>
                        <span className="tw-flex-1 tw-text-xs md:tw-text-sm  tw-grow tw-max-h-15 tw-overflow-hidden tw-text-ellipsis">
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
                        className="tw-max-w-30 md:tw-max-w-55 tw-h-full tw-flex-shrink-0 tw-rounded-lg tw-bg-cover tw-bg-center"
                    ></Image>
                </Flex>
                <Flex className="tw-flex-none tw-items-center tw-py-1 md:tw-py-4 tw-space-x-2 tw-max-h-8 ">
                    {props.topic.topics_id===1 && <Tag color='volcano'>{props.topic.name}</Tag>}
                    {props.topic.topics_id===2 && <Tag color='green'>{props.topic.name}</Tag>}
                    {props.topic.topics_id===3 && <Tag color='cyan'>{props.topic.name}</Tag>}
                    {props.topic.topics_id===4 && <Tag color='purple'>{props.topic.name}</Tag>}
                    {props.topic.topics_id > 4 && <Tag color="blue">{props.topic.name}</Tag>}
                    <span className="tw-font-bold tw-text-xs md:tw-text-sm ">{formatElapsedTime(props.created_at)}</span>
                    <IconDot />
                    <span className='tw-text-xs md:tw-text-sm'>{calculateReadingTime(String(props.content))} phút đọc</span>
                </Flex>
            </Flex>
        </Card>
    );
};

export default ArticleComponent;
