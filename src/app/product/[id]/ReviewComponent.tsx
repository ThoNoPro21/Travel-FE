'use client';
import { Avatar, Button, Card, Col, Divider, Flex, Pagination, Row } from 'antd';
import React, { useState } from 'react';
import { IconUser } from '../../components/IconComponent';
import TextArea from 'antd/es/input/TextArea';
import { useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';
import { useAddCommentProductMutation } from '@/src/store/queries/apiProduct.query';
import CommentComponent from '../../components/common/CommentComponent';
import { commentType } from '@/src/types/Article';
import { PaginationApiResponseData } from '@/src/types/ApiRespone';

type Props = {
    product_id: number;
    refetch_getCommentByProduct:()=>void;
    setPageComment:(value:number)=>void;
    response_getCommentByProduct?:PaginationApiResponseData<commentType>;
};

const ReviewComponent = (props: Props) => {
    const [comment, setComment] = useState('');
    const isLogin = useAppSelector((state: RootState) => state.dataAuth.isLogin);
    const user = useAppSelector((state: RootState) => state.dataAuth.user);

    const [addComment] = useAddCommentProductMutation();
    const handleSubmitComment = async () => {
        let formData = new FormData();
        formData.append('product_id', String(props.product_id)), formData.append('content', comment);
        await addComment(formData).then((res) => {
            if ('data' in res) {
                {
                    setComment('');
                    props.refetch_getCommentByProduct();
                }
            }
        });
    };

    const onChangeNewPage = (newPage: number) => {
        props.setPageComment(newPage);
    };
    return (
        <Row gutter={[16, 16]}>
            <Col className="gutter-row  tw-font-lora" span={24}>
                <h1 className="tw-font-bold tw-text-xl lg:tw-text-2xl">Bình luận</h1>
            </Col>
            <Col className="gutter-row tw-font-lora" span={24}>
                <main className="tw-max-h-screen">
                    <Card className="tw-shadow-lg">
                        <Flex vertical gap={24}>
                            <Flex>
                                <div className=" tw-w-14 tw-h-14">
                                    <Avatar size={52} src={user?.avatar}>
                                        {user?.avatar ? null : <IconUser />}
                                    </Avatar>
                                </div>
                                <Flex vertical className="tw-w-full">
                                    {isLogin ? (
                                        <TextArea
                                            className="tw-text-base tw-font-normal tw-font-mono"
                                            allowClear
                                            maxLength={255}
                                            showCount
                                            value={comment}
                                            placeholder="Hãy viết bình luận của bạn ..."
                                            variant="borderless"
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    ) : (
                                        <p className="tw-text-base tw-font-lora tw-font-semibold tw-text-orange-400">
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
                                </Flex>
                            </Flex>
                            <Flex vertical className="tw-w-full">
                                <Divider></Divider>
                                {props.response_getCommentByProduct?.data &&props.response_getCommentByProduct?.data?.length >0 &&
                                    props.response_getCommentByProduct?.data?.map((item, index) => (
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
                                {props.response_getCommentByProduct?.data &&props.response_getCommentByProduct?.data?.length >0 && (
                                    <Pagination
                                        className="tw-flex-initial tw-m-auto"
                                        onChange={onChangeNewPage}
                                        defaultCurrent={1}
                                        total={props.response_getCommentByProduct?.total || 0}
                                        pageSize={props.response_getCommentByProduct?.per_page || 10}
                                        current={props.response_getCommentByProduct?.current_page || 1}
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

export default ReviewComponent;
