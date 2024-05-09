import { Flex, Pagination, Popconfirm, Spin, Switch, Table, TableColumnsType, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { PaginationApiResponseData } from '@/src/types/ApiRespone';
import { useDeleteCarouselMutation, useUpdateStatusCarouselMutation } from '@/src/store/queries/apiCommon.query';
import { carouselType } from '@/src/types/Carousel';
import Image from 'next/image';
import { IconDelete } from '@/src/components/IconComponent';

type Props = {
data:PaginationApiResponseData<any>;
refetch_getCarousel:()=>void;
onChangeNewPage:(page:number)=>void;
}

const Overview = (props: Props) => {
    const [deleteCarousel, { isLoading: isLoading_deleteCarousel }] = useDeleteCarouselMutation();
    const [updateStatus,{isLoading:isLoading_updateStatus}] = useUpdateStatusCarouselMutation();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (props.data) {
            setIsLoading(false); // Dữ liệu đã có sẵn, tắt Spin
        }
    }, [props.data]);

    const columnCarousel: TableColumnsType<carouselType> = [
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
            key: 'image',
            title: 'Ảnh',
            dataIndex: 'image',
            ellipsis: true,
            render(value, record, index) {
                return (
                    <div>
                        <Image src={value} alt="avatar..." height={1000} width={1000} priority />
                    </div>
                );
            },
        },
        {
            key: 'status',
            title: 'Trạng thái',
            dataIndex: 'status',
            sorter: (a, b) => b.status - a.status,
            render(value, record, index) {
                return value === 0 ? (
                    <p className="tw-text-red-500 tw-font-semibold">Ẩn</p>
                ) : (
                    <p className="tw-text-blue-500 tw-font-semibold">Hiển thị</p>
                );
            },
        },
        {
            key: 'edit',
            title: 'Sửa',
            render(value, record, index) {
                return (
                    <Switch
                        checkedChildren="off"
                        unCheckedChildren="on"
                        value={record.status === 0 ? false : true}
                        onChange={(e) => handleOnChangeStatus(e,record.carousels_id)}
                    />
                );
            },
        },
        {
            key: 'action',
            title: 'Hành Động',
            dataIndex: 'status',
            render(value, record, index) {
                return (
                    <Popconfirm
                        placement="left"
                        title="Bạn chắc chắn muốn xóa ?"
                        description="Nhấn OK mọi thứ sẽ bị xóa vĩnh viễn..."
                        onCancel={() => console.log('Hủy')}
                        onConfirm={() => {
                            deleteCarousel(record.carousels_id).then((res) => {
                                if ('data' in res) {
                                    message.success({ content: 'Xóa thành công !' });
                                    props.refetch_getCarousel();
                                } else {
                                    message.error({ content: 'Xóa thất bại !' });
                                }
                            });
                        }}
                        okButtonProps={{ loading: isLoading_deleteCarousel }}
                        cancelText="Hủy"
                        okText="Xóa"
                    >
                        <div className="tw-cursor-pointer">
                            <IconDelete />
                        </div>
                    </Popconfirm>
                );
            },
        },
    ];

    const handleOnChangeStatus = (value: boolean, id: number) => {
        let formData = new FormData();
        if (value) {
            formData.append('status', String(1));
            updateStatus([id, formData]).then((res)=>{
                if('data' in res){
                    props.refetch_getCarousel()
                }
            })
        } else {
            formData.append('status', String(0));
            updateStatus([id, formData]).then((res)=>{
                if('data' in res){
                    props.refetch_getCarousel()
                }
            })
        }
    };

    const onChangeNewPage = (newPage: number) => {
        props.onChangeNewPage(newPage);
    };

    return (
        <Flex vertical gap='small'>
            <Table
                columns={columnCarousel}
                dataSource={props.data?.data.map((item, index) => ({
                    ...item,
                    key: index,
                }))}
                pagination={false}
                scroll={{ x: 768, y: 480 }}
                loading={isLoading || isLoading_updateStatus || isLoading_deleteCarousel}
            />
            <Pagination
                className="tw-m-auto"
                onChange={onChangeNewPage}
                defaultCurrent={1}
                total={props.data?.total || 0}
                pageSize={props.data?.per_page || 10}
                current={props.data?.current_page || 1}
            />
        </Flex>
    );
}

export default Overview