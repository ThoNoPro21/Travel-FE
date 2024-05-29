import { Avatar, Button, Card, Col, Flex, Grid, Modal, Row, Space, Tag, notification } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
    IconBookMark,
    IconCheck,
    IconClose,
    IconDot,
    IconEllipsis,
} from '../../IconComponent';
import { imagesJson, topicType } from '@/src/types/Article';
import { calculateReadingTime, formatElapsedTime } from '../../validate/String';
import { useAddFavouriteMutation, useRemoveFavouriteMutation } from '@/src/store/queries/apiArticle.query';
import { useAppSelector } from '@/src/store/hooks';
import { useRouter } from 'next/navigation';

type Props = {
    article_id: number;
    avatar_user?: string;
    username: string;
    title: string;
    location?: string;
    content: string | TrustedHTML;
    src: string;
    topic: topicType;
    isFavourite: boolean;
    created_at: Date;
    refetchData:()=>void;
};

const ArticleComponent = (props: Props) => {
    const router = useRouter();
    const images: imagesJson = JSON.parse(props.src);
    const [isFavourite, setFavourite] = useState(props.isFavourite);
    const [isToggleFavourite, setIsToggleFavourite] = useState(false);
    const [isCheckLogin, setIsCheckLogin] = useState(false);

    const [isModalOpen,setIsModalOpen] = useState(false)

    const isLogin = useAppSelector((state) => state.dataAuth.isLogin)
    const isStatus = useAppSelector((state) => state.dataAuth.isStatus)

    const [addFavourite] = useAddFavouriteMutation();
    const [removeFavourite] = useRemoveFavouriteMutation();

    const handleOnChangeCLickBookMark = (e: any) => {
        e.stopPropagation();
        setFavourite(!isFavourite);
        setIsToggleFavourite(true);
    };

    const handleOpenModal = (e:any) => {
        e.stopPropagation();
        setIsModalOpen(true)
    }

    const handleModalCancel = (e:any) => {
        e.stopPropagation();
        setIsModalOpen(false)
    }

    const handleModalOk = (e:any) => {
        e.stopPropagation();
        router.push('/login');
        setIsModalOpen(false)
    }

    useEffect(() => {
        if(isLogin){
            setIsCheckLogin(true)
        }
    },[isStatus])
    useEffect(() => {
        if (isToggleFavourite) {
            if (isFavourite) {
                let formData = new FormData();
                formData.append('article_id', String(props.article_id));
                addFavourite(formData).then((res) => {
                    if ('data' in res) {
                        props.refetchData();
                        notification.success({
                            message: <p className="tw-text-base tw-font-bold">Thêm vào mục yêu thích thành công!</p>,
                            description: <p className="  tw-text-sm  tw-font-normal"> Vào mục yêu thích ngay thôi !</p>,
                            icon: <IconCheck />,
                            duration: 3,
                            placement: 'bottomRight',
                            key: 'addToBookMark',
                            style: {
                                borderRadius: '4px',
                                cursor: 'pointer',
                            },
                            onClick: () => {
                                router.push('/bookmark', { scroll: false });
                            },
                        });
                    } else {
                        notification.error({
                            message: <p className="tw-text-base tw-font-bold">Thêm vào mục yêu thích thất bại!</p>,
                            description: (
                                <p className="  tw-text-sm  tw-font-normal"> Có lỗi trong quá trình thực thi !</p>
                            ),
                            duration: 3,
                            icon: <IconClose color="red" />,
                            placement: 'bottomRight',
                            key: 'removeToCart',
                            style: {
                                borderRadius: '4px',
                                cursor: 'pointer',
                            },
                        });
                    }
                });
            } else {
                removeFavourite(props.article_id).then((res) => {
                    if ('data' in res) {
                        props.refetchData();
                    }
                });
            }
        }
    }, [isFavourite]);
    return (
        <>
        <Card
            hoverable
            styles={{ body: { padding: 10, height: 220, boxSizing: 'border-box' } }}
            className="tw-shadow-2xl"
        >
            <Flex vertical className="tw-h-full tw-w-full tw-gap-x-4 tw-font-lora">
                <Flex className="tw-flex-none lg:tw-pb-2" justify="space-between" align="center ">
                    <Space>
                        <Avatar src={props.avatar_user} />
                        <span className="tw-text-xs lg:tw-text-sm tw-font-bold">{props.username}</span>
                    </Space>
                    <Space size={'small'}>
                        <div onClick={isCheckLogin ? handleOnChangeCLickBookMark : handleOpenModal}>
                            {isFavourite ? <IconBookMark color="orange" /> : <IconBookMark />}
                        </div>
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
                    {props.topic.topics_id === 1 && <Tag color="volcano">{props.topic.name}</Tag>}
                    {props.topic.topics_id === 2 && <Tag color="green">{props.topic.name}</Tag>}
                    {props.topic.topics_id === 3 && <Tag color="cyan">{props.topic.name}</Tag>}
                    {props.topic.topics_id === 4 && <Tag color="purple">{props.topic.name}</Tag>}
                    {props.topic.topics_id > 4 && <Tag color="blue">{props.topic.name}</Tag>}
                    <span className="tw-font-bold tw-text-xs md:tw-text-sm ">
                        {formatElapsedTime(props.created_at)}
                    </span>
                    <IconDot />
                    <span className="tw-text-xs md:tw-text-sm">
                        {calculateReadingTime(String(props.content))} phút đọc
                    </span>
                </Flex>
            </Flex>
        </Card>
            <Modal title="Bạn chưa đăng nhập" open={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel} cancelText='Hủy' okText='Đăng nhập'>
            <p>Bạn có muốn đăng nhập không ?</p>
        </Modal>
      </>
    );
};

export default ArticleComponent;
