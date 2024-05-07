import { Drawer, Popconfirm, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { PostContent } from '@/src/app/components/article/SideMain';
import { useUpdateStatusMutation } from '@/src/store/queries/apiArticle.query';

type Props = {
    open: boolean;
    content: string | TrustedHTML;
    onClose: (value: boolean) => void;
    article_id: number;
};

const DrawPreviewPost = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [updateStatus, { isLoading: isLoading_updateStatus, isSuccess: isSuccess_updateStatus }] =
        useUpdateStatusMutation();

    useEffect(() => {
        setIsOpen(props.open);
    }, [props.open]);

    const onClose = () => {
        props.onClose(false);
        setIsOpen(false);
    };

    const handleOnClickApprove = async () => {
        let formData = new FormData();
        formData.append('status', '1');
        await updateStatus([props.article_id, formData]).then((res) => {
            if ('data' in res) {
                message.success({ content: 'Xét duyệt thành công !' });
                onClose();
            } else {
                message.error({ content: 'Xét duyệt thất bại !' });
            }
        });
    };

    const handleOnClickDeny = async() => {
        let formData = new FormData();
        formData.append('status', '2');
        await  updateStatus([props.article_id, formData]).then((res) => {
            if ('data' in res) {
                message.success({ content: 'Từ chối thành công !' });
                setIsOpen(false);
            } else {
                message.error({ content: 'Từ chối thất bại !' });
            }
        });
    };
    return (
        <Drawer
            title={<p className="tw-font-bold tw-font-mono tw-text-base">Chi tiết bài viết</p>}
            placement="left"
            size={'large'}
            onClose={onClose}
            open={isOpen}
            extra={
                <Space>
                    <Popconfirm
                        placement="left"
                        title="Bạn chắc chắn muốn từ chối ?"
                        description="Bài viết sẽ bị ẩn..."
                        onCancel={() => console.log('Hủy')}
                        onConfirm={handleOnClickDeny}
                        okButtonProps={{ loading: isLoading_updateStatus }}
                        cancelText="Hủy"
                        okText="Duyệt"
                    >
                        <button className=" tw-font-bold tw-font-mono tw-text-base">Từ chối</button>
                    </Popconfirm>
                    <Popconfirm
                        className="tw-z-9999"
                        placement="left"
                        title="Bạn chắc chắn muốn xét duyệt ?"
                        description="Nhấn OK bài viết sẽ ở chế độ công khai..."
                        onCancel={() => console.log('Hủy')}
                        okButtonProps={{ loading: isLoading_updateStatus }}
                        onConfirm={handleOnClickApprove}
                        cancelText="Hủy"
                        okText="Duyệt"
                    >
                        <button className="tw-bg-orange-500 tw-p-2 tw-rounded-lg tw-font-bold tw-font-mono tw-text-base tw-text-white">
                            Duyệt
                        </button>
                    </Popconfirm>
                </Space>
            }
        >
            {isOpen && <PostContent content={props.content as string} />}
        </Drawer>
    );
};

export default DrawPreviewPost;
