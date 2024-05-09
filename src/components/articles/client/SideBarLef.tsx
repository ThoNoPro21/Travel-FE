'use client';
import { Avatar, Button, Card, Divider, Drawer, Flex, Input, Pagination, Rate, Space, Spin } from 'antd';
import React, { useState } from 'react';
import { IconComment, IconHeart, IconUser } from '../../IconComponent';
import TextArea from 'antd/es/input/TextArea';
import { useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';
import { useGetCommentArticleQuery, usePostCommentArticleMutation } from '@/src/store/queries/apiArticle.query';
import { commentType } from '@/src/types/Article';
import { truncateDescription } from '../../validate/String';
import CommentComponent from '../../common/comment/CommentComponent';

type Props = {
    name?: string;
    story?: string;
    avatar?: string;
    article_id: number;
};

const SideBarLef = (props: Props) => {
    const isLogin = useAppSelector((state: RootState) => state.dataAuth.isLogin);
    const user = useAppSelector((state: RootState) => state.dataAuth.user);
    const [pageComment, setPageComment] = useState(1);

    const {
        data: response_getCommentArticle,
        isSuccess: isSuccess_getCommentArticle,
        isLoading: isLoading_getCommentArticle,
        refetch: refetch_getCommentArticle,
    } = useGetCommentArticleQuery([props?.article_id, pageComment]);
    const [addComment, { isLoading: isLoading_postComment }] = usePostCommentArticleMutation();
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onChangeNewPage = (newPage: number) => {
        setPageComment(newPage);
    };

    const handleSubmitComment = () => {
        let formData = new FormData();
        formData.append('article_id', String(props.article_id)), formData.append('content', comment);
        addComment(formData).then((res) => {
            if ('data' in res) {
                {
                    setComment('');
                    refetch_getCommentArticle();
                }
            }
        });
    };

    let countTotalComment: string | null = null;
    if (isSuccess_getCommentArticle) {
        let url = response_getCommentArticle?.data?.links?.[1].url;

        var urlParams = new URLSearchParams(new URL(url).search);

        countTotalComment = urlParams.get('countTotalComment');
    }
    if (isLoading_postComment) {
        return <Spin fullscreen tip="Chờ xíu..." />;
    }
    return (
        <>
            <main className="tw-flex tw-w-full tw-font-mono ">
                <Flex vertical>
                    <Space direction="vertical" className="tw-hidden lg:tw-block">
                        <Space>
                            <Avatar size={'large'} src={props.avatar}>
                                {props.avatar ? null : <IconUser />}
                            </Avatar>
                            <p className="tw-font-black tw-text-lg">{props.name}</p>
                        </Space>
                        <p className="tw-text-sm">{truncateDescription(props.story || '', 25)}</p>
                    </Space>
                    <Divider></Divider>
                    <Space size={'large'} direction="vertical" className="tw-cursor-pointer">
                        <Space>
                            <IconHeart />
                            <p>104</p>
                        </Space>
                        <Space onClick={showDrawer}>
                            <IconComment />
                            <p>{countTotalComment}</p>
                        </Space>
                    </Space>
                    <Divider></Divider>
                    <div className="">
                        <Rate allowHalf defaultValue={3.5} />
                    </div>
                </Flex>
            </main>
            <Drawer
                title={
                    response_getCommentArticle?.data.data?.length === 0 ? (
                        <p className="tw-font-bold">Chưa có bình luận</p>
                    ) : (
                        <p className="tw-font-bold">Bình luận ({countTotalComment})</p>
                    )
                }
                size="large"
                onClose={onClose}
                open={open}
                styles={{ body: { background: '#f0f2f5' } }}
            >
                <Flex gap={24}>
                    <div className=" tw-w-14 tw-h-14">
                        <Avatar size={52} src={user?.avatar}>
                            {user?.avatar ? null : <IconUser />}
                        </Avatar>
                    </div>

                    <Flex vertical className="tw-w-full">
                        {isLogin ? (
                            <TextArea
                                className="tw-text-base tw-font-semibold tw-font-mono"
                                allowClear
                                maxLength={255}
                                value={comment}
                                showCount
                                placeholder="Hãy viết bình luận của bạn ..."
                                variant="borderless"
                                onChange={(e) => setComment(e.target.value)}
                            />
                        ) : (
                            <p className="tw-text-base tw-font-lora tw-font-bold">
                                Vui lòng đăng nhập trước khi bình luận !
                            </p>
                        )}
                        <Button
                            disabled={!isLogin || comment.trim().length === 0}
                            className="tw-rounded-3xl tw-w-fit tw-text-sm tw-bg-orange-500 w-font-bold tw-text-white"
                            onClick={handleSubmitComment}
                        >
                            BÌNH LUẬN
                        </Button>
                        <Divider></Divider>
                        {response_getCommentArticle?.success &&
                            response_getCommentArticle?.data.data?.map((item, index) => (
                                <div key={index}>
                                    <CommentComponent
                                        content={item.content}
                                        username={item.user?.name}
                                        avatar={item.user?.avatar}
                                        create_at={item.create_at}
                                    />
                                    <Divider style={{ margin: 4 }}></Divider>
                                </div>
                            ))}
                        <Divider></Divider>
                        <Pagination
                            className="tw-flex-initial tw-m-auto"
                            onChange={onChangeNewPage}
                            defaultCurrent={1}
                            total={response_getCommentArticle?.data.total || 0}
                            pageSize={response_getCommentArticle?.data.per_page || 10}
                            current={response_getCommentArticle?.data.current_page || 1}
                        />
                    </Flex>
                </Flex>
            </Drawer>
        </>
    );
};

export default SideBarLef;
