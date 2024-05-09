import { useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';
import { Avatar, Button, Card, Col, Divider, Flex, Pagination, Row, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { IconUser } from '../../IconComponent';
import { useAddCommentPlaceMutation, useGetCommentByPlaceQuery } from '@/src/store/queries/apiPlace.query';
import { PaginationApiResponseData } from '@/src/types/ApiRespone';
import { commentType } from '@/src/types/Article';
import CommentComponent from '../../common/comment/CommentComponent';

type Props = {
    place_id: number;
};

const CommentPlace = (props: Props) => {
    const [comment, setComment] = useState('');
    const [pageComment, setPageComment] = useState(1);
    const isLogin = useAppSelector((state: RootState) => state.dataAuth.isLogin);
    const user = useAppSelector((state: RootState) => state.dataAuth.user);

    const {
        data: response_getCommentByPlace,
        isSuccess: isSuccess_getCommentByPlace,
        isLoading: isLoading_getCommentByPlace,
        refetch: refetch_getCommentByPlace,
    } = useGetCommentByPlaceQuery([props.place_id, pageComment]);
    const [addComment] = useAddCommentPlaceMutation();
    const handleSubmitComment = async () => {
        let formData = new FormData();
        formData.append('place_id', String(props.place_id)), formData.append('content', comment);
        await addComment(formData).then((res) => {
            if ('data' in res) {
                {
                    setComment('');
                    refetch_getCommentByPlace();
                }
            }
        });
    };

    const onChangeNewPage = (newPage: number) => {
        setPageComment(newPage);
    };
    return (
        <Row gutter={[16, 16]}>
            <Col className="gutter-row  tw-font-lora" span={24}>
                <h1 className="tw-font-bold tw-text-xl lg:tw-text-2xl">Bình luận</h1>
            </Col>
            <Col className="gutter-row tw-font-lora" span={24}>
                <main className="tw-max-h-screen">
                    <Card className="tw-shadow-lg">
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
                                        showCount
                                        value={comment}
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
                                    className="tw-rounded-3xl tw-w-fit tw-text-sm tw-bg-orange-500 w-font-bold tw-text-white tw-self-end tw-mt-6"
                                    onClick={handleSubmitComment}
                                >
                                    BÌNH LUẬN
                                </Button>
                                <Divider></Divider>
                                {response_getCommentByPlace?.success &&
                                    response_getCommentByPlace?.data?.data?.map((item, index) => (
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
                                {response_getCommentByPlace?.success && (
                                    <Pagination
                                        className="tw-flex-initial tw-m-auto"
                                        onChange={onChangeNewPage}
                                        defaultCurrent={1}
                                        total={response_getCommentByPlace?.data.total || 0}
                                        pageSize={response_getCommentByPlace?.data.per_page || 10}
                                        current={response_getCommentByPlace?.data.current_page || 1}
                                    />
                                )}
                            </Flex>
                        </Flex>
                    </Card>
                </main>
            </Col>
        </Row>
    );
};

export default CommentPlace;
