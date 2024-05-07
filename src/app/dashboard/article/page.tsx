'use client';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { useGetPostQuery, useUpdateStatusMutation } from '@/src/store/queries/apiArticle.query';
import { setSelectedKeys } from '@/src/store/slices/common.slice';
import { getArticleType } from '@/src/types/Article';
import { Badge, Card, Drawer, Flex, Input, Menu, MenuProps, Pagination, Popconfirm, Space, Spin, Table, TableColumnsType, Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { IconCheck, IconClose, IconDelete, IconEye, IconSearch } from '../../components/IconComponent';
import { isValidJsonString } from '../../components/common/validate/String';
import Image from 'next/image';
import PostTable from './components/PostTable';
import { RootState } from '@/src/store/store';
import { setCountPostPending } from '@/src/store/slices/article.slice';
import DrawPreviewPost from './components/DrawPreviewPost';

type Props = {};
type contentDraw = {
    content:string|TrustedHTML;
    articles_id:number;
};


const page = (props: Props) => {
    let dataSource: getArticleType[] = [];
    const dispatch = useAppDispatch();
    const countPost_Pending = useAppSelector((state:RootState)=>state.dataArticle.countPostPending)
    const [page, setPage] = useState(1);
    const [navBarCurrent, setNavBarCurrent] = useState(0);

    const [openDrawPostPreview, setOpenDrawPostPreview] = useState(false);
    const [contentPreview, setContentPreview] = useState<contentDraw>({
        content:'',
        articles_id:0,
    });

    const { data: response_getPost, isLoading: isLoadingGetPost, isSuccess: isSuccessGetPost,refetch:refetch_getPost } = useGetPostQuery([page,navBarCurrent]);
    const [updateStatus,{isLoading:isLoading_updateStatus,isSuccess:isSuccess_updateStatus}] = useUpdateStatusMutation();

    const columnPostFulfilled: TableColumnsType<getArticleType> = [
        {
            key: 'stt',
            title: 'STT',
            dataIndex: 'index',
            render: (_v, _r, index) => (
                <div className="tw-text-red-500" key={index}>
                    #{index + 1}
                </div>
            ),
            width: 60,
        },
        {
            key: 'title',
            title: 'Tiêu đề',
            dataIndex: 'title',
            ellipsis: true,
            width: 250,
            fixed: 'left',
            render(value, record, index) {
                return <p className="tw-text-sm tw-font-semibold">{value}</p>;
            },
        },
        {
            key: 'topic',
            title: 'Chủ đề',
            dataIndex: 'topic',
            width: 100,
            render(value, record, index) {
                switch (parseInt(value.topics_id)) {
                    case 1:
                        return <Tag color="volcano">{value.name}</Tag>;
                    case 2:
                        return <Tag color="green">{value.name}</Tag>;
                    case 3:
                        return <Tag color="cyan">{value.name}</Tag>;
                    case 4:
                        return <Tag color="purple">{value.name}</Tag>;
                    default:
                        return <Tag color="geekblue">{value.name}</Tag>;
                }
            },
        },
        {
            key: 'images',
            title: 'Ảnh đại diện',
            dataIndex: 'images',
            ellipsis: true,
            width: 100,
            render(value, record, index) {
                if (isValidJsonString(value)) {
                    const { avatar } = JSON.parse(value);
                    return (
                        <div>
                            <Image src={avatar} alt="avatar..." height={1000} width={1000} priority />
                        </div>
                    );
                }
            },
        },
        {
            key: 'location',
            title: 'Địa điểm',
            width: 150,
            dataIndex: 'location',
            ellipsis: true,
            render(value, record, index) {
                return <p className="tw-text-sm tw-text-black">{value.name}</p>;
            },
        },
        {
            key: 'user',
            title: 'Tác giả',
            dataIndex: 'user',
            width: 100,
            render(value, record, index) {
                return <p className="tw-text-sm tw-font-bold">{value.name}</p>;
            },
        },
        {
            key: 'created_at',
            title: 'Ngày tạo',
            width: 100,
            dataIndex: 'created_at',
            render(value, record, index) {
                const createdDate = new Date(value);
                const formattedStartDate =
                    createdDate.getDate() + '/' + (createdDate.getMonth() + 1) + '/' + createdDate.getFullYear();

                return <p>{formattedStartDate}</p>;
            },
        },
        {
            key: 'status',
            title: 'Trạng thái',
            width: 80,
            dataIndex: 'status',
            render: (value, record, index) => {
                switch (value) {
                    case 0:
                        return (
                            <p className="tw-text-sm tw-font-semibold tw-font-mono tw-text-yellow-500">Chờ xét duyệt</p>
                        );
                    case 1:
                        return <p className="tw-text-sm tw-font-semibold tw-font-mono tw-text-cyan-700">Đã xuất bản</p>;

                    case 2:
                        return <p className="tw-text-sm tw-font-semibold tw-font-mono tw-text-red-700">Từ chối</p>;

                    default:
                        return null;
                }
            },
            fixed: 'right',
        },
        {
            key: 'action1',
            title: 'Hành động',
            width: 80,
            render: () => <IconDelete />,
            fixed: 'right',
        },
        {
            key: 'action2',
            title: 'Hành động',
            width: 100,
            render: (_v, record) => (
                <Flex align="center" gap="small">
                    <Popconfirm
                        placement="left"
                        title="Bạn chắc chắn muốn xét duyệt ?"
                        description="Nhấn OK bài viết sẽ ở chế độ công khai..."
                        onCancel={() => console.log('Hủy')}
                        onConfirm={() => {
                            let formData = new FormData();
                            formData.append('status', '1');
                            updateStatus([record.articles_id, formData]).then((res) => {
                                if ('data' in res) {
                                    message.success({ content: 'Xét duyệt thành công !' });
                                    refetch_getPost();
                                } else {
                                    message.error({ content: 'Xét duyệt thất bại !' });
                                }
                            });
                        }}
                        okButtonProps={{ loading: isLoading_updateStatus }}
                        cancelText="Hủy"
                        okText="Duyệt"
                    >
                        <div className="tw-cursor-pointer">
                            <IconCheck />
                        </div>
                    </Popconfirm>
                    <div className="tw-cursor-pointer">
                        <IconClose color="red" />
                    </div>
                    <div className="tw-cursor-pointer" onClick={() => handlePreviewClick(record)}>
                        <IconEye />
                    </div>
                </Flex>
            ),
            fixed: 'right',
        },
    ];

    const handlePreviewClick = (record:getArticleType) => {
        setOpenDrawPostPreview(true);
        setContentPreview({content:record.content,articles_id:record.articles_id});
    };

    const handleCloseDrawer = (value:boolean) => {
        setOpenDrawPostPreview(value);
        refetch_getPost();
    };

    const navBarItems: MenuProps['items'] = [
        {
            label: <div>Đang chờ <Badge count={countPost_Pending ? countPost_Pending : 0} /></div>,
            key: '0',
        },
        {
            label: 'Đã xuất bản',
            key: '1',
        },
        {
            label: 'Từ chối',
            key: '2',
        },
    ];

    let countPostPending: string | null=null;
    if (isSuccessGetPost) {
        response_getPost?.data?.data?.map((item, index) => dataSource.push({ ...item, key: index }));
        let url = response_getPost?.data?.links?.[1].url;

        var urlParams = new URLSearchParams(new URL(url).search);

        countPostPending = urlParams.get('countPostPending');
    }
    useEffect(() => {
        if (countPostPending !== null) {
            dispatch(setCountPostPending(parseInt(countPostPending)));
        }
    },[countPostPending]);

    useEffect(() => {
        dispatch(setSelectedKeys('/dashboard/article'));
    }, []);

    useEffect(() => {
       refetch_getPost();
    }, [navBarCurrent]);

    const onChangeNewPage = (newPage: number) => {
        setPage(newPage);
    };

    const handleNavBarOnClick: MenuProps['onClick'] = (e) => {
        setNavBarCurrent(parseInt(e.key));
    };


    return (
        <Flex vertical gap="small" className=" tw-h-screen ">
            <Card hoverable bordered={false} styles={{ body: { padding: 0 } }}>
                <Flex align="center" className="tw-p-4">
                    <Menu
                        className="tw-flex-1"
                        mode="horizontal"
                        onClick={handleNavBarOnClick}
                        selectedKeys={[String(navBarCurrent)]}
                        items={navBarItems}
                    />
                    <div className="tw-max-w-80 tw-flex-grow">
                        <Input
                            allowClear
                            placeholder="Search"
                            className="tw-rounded-4xl tw-cursor-pointer"
                            suffix={<IconSearch />}
                        />
                    </div>
                </Flex>
            </Card>
            <Card styles={{ body: { padding: 0 } }} className="tw-h-full tw-w-full">
                <Flex gap="middle" vertical className="tw-h-full tw-w-full">
                    {isSuccessGetPost && (
                        <PostTable
                            columns={columnPostFulfilled.filter((column) => {
                                if (navBarCurrent === 0) {
                                    return column.key !== 'action1';
                                } else if (navBarCurrent === 1) {
                                    return column.key !== 'action2';
                                } else {
                                    return column.key !== 'action2';
                                }
                            })}
                            loading={isLoadingGetPost}
                            data={dataSource}
                        />
                    )}
                    <Pagination
                        className="tw-flex-initial tw-m-auto"
                        onChange={onChangeNewPage}
                        defaultCurrent={1}
                        total={response_getPost?.data?.total || 0}
                        pageSize={response_getPost?.data?.per_page || 10}
                        current={response_getPost?.data?.current_page || 1}
                    />
                </Flex>
            </Card>
            <DrawPreviewPost
                open={openDrawPostPreview}
                onClose={handleCloseDrawer}
                content={contentPreview.content}
                article_id={contentPreview.articles_id}
            />
        </Flex>
    );
};

export default page;
