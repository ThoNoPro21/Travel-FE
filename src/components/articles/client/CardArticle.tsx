import { Avatar, Card, Flex, Space } from 'antd';
import Image from 'next/image';
import React from 'react';
import { IconDot, IconLocation, IconUser } from '../../IconComponent';
import { calculateReadingTime, isValidJsonString } from '../../validate/String';
import { imagesJson } from '@/src/types/Article';

type Props = {
    title: string;
    username: string;
    user_avatar?: string;
    image: string;
    content:string | TrustedHTML;
};

const CardArticle = (props: Props) => {
    let imageJson:imagesJson|undefined;
    if(isValidJsonString(props.image)){
        imageJson=JSON.parse(props.image)
    }
    return (
        <Card bordered={false} hoverable size="small" styles={{ body: { padding: 10 } }} className="tw-shrink-0">
            <Flex vertical className='tw-h-70'>
                <div className="tw-flex-none tw-h-40">
                    <Image
                        src={imageJson?.avatar}
                        height={500}
                        width={500}
                        quality={100}
                        priority
                        alt="Picture..."
                        className="tw-h-full tw-w-full tw-bg-cover tw-rounded-lg tw-bg-center "
                    />
                </div>
                <p className="tw-flex-1 lg:tw-text-base tw-font-bold md:tw-my-2 tw-text-ellipsis tw-overflow-hidden">{props.title}</p>
                <Flex className="tw-flex-initial tw-items-center tw-space-x-2 ">
                    <Avatar size="small" src={props.user_avatar}>
                        {props.user_avatar ? null : <IconUser />}
                    </Avatar>
                    <span className="tw-font-medium tw-text-xs md:tw-text-sm ">{props.username}</span>
                    <IconDot />
                    <span className='tw-text-xs md:tw-text-sm'>{calculateReadingTime(String(props.content))} phút đọc</span>
                </Flex>
            </Flex>
        </Card>
    );
};

export default CardArticle;
