import { IconDelete } from '@/src/components/IconComponent';
import { formatVND, isValidJsonString } from '@/src/components/validate/String';
import { useDeleteFestivalMutation, useGetFestivalQuery, useUpdateStatusFestivalMutation } from '@/src/store/queries/apiFestival.query';
import { festivalType } from '@/src/types/Festival';
import { Flex, Pagination, Popconfirm, Space, Switch, Table, TableColumnsType, message } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react'

type Props = {

}

const Overview = (props: Props) => {
    const [page,setPage] = useState(1)

    const {data:response_getFestival,isLoading:isLoading_getFestival,isSuccess:isSuccess_getFestival,refetch:refetch_getFestival} = useGetFestivalQuery([0,page])
    const [updateStatus,{isLoading:isLoading_updateStatus}] = useUpdateStatusFestivalMutation()
    const [deleteFestival,{isLoading:isLoading_deleteFestival}] = useDeleteFestivalMutation()
    const columnFestival: TableColumnsType<festivalType> = [
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
            responsive:['md']
        },
        {
            key: 'name',
            title: 'Tên sự kiện',
            dataIndex: 'name',
            ellipsis:true,
            fixed:'left',
            render: (value, _r, index) => (
                <div className="tw-font-bold">
                    {value}
                </div>
            ),
            width:'20%'
        },
        {
            key: 'images',
            title: 'Ảnh',
            dataIndex: 'images',
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
            key: 'address',
            title: 'Địa chỉ',
            dataIndex: 'address',
            ellipsis:true,
            render: (value, _r, index) => (
                <div className="tw-font-bold">
                    {value}
                </div>
            ),
            width:120
        },
        {
            key: 'start_date',
            title: 'Ngày bắt đầu',
            dataIndex: 'start_date',
            render: (value, _r, index) => (
                <div className="tw-font-bold">
                    {value}
                </div>
            ),
        },
        {
            key: 'end_date',
            title: 'Ngày kết thúc',
            dataIndex: 'end_date',
            render: (value, _r, index) => (
                <div className="tw-font-bold">
                    {value}
                </div>
            ),
        },
        {
            key: 'price',
            title: 'Phí',
            dataIndex: 'price',
            render: (value, _r, index) => (
                <div className="tw-font-semibold">
                    {value ===0 ? <p className='tw-text-blue-400'>Free</p>: formatVND(value)}
                </div>
            ),
            width: 60,
        },
        {
            key: 'location',
            title: 'Địa điểm',
            dataIndex: 'location',
            ellipsis:true,
            render: (value, _r, index) => (
                <div className="tw-font-bold">
                    {value.name}
                </div>
            ),
            width: 120,
        },
        {
            key: 'status',
            title: 'Slide',
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
            key: 'action',
            title: 'Hành Động',
            dataIndex: 'status',
            width:'10%',
            fixed:'right',
            render(value, record, index) {
                return (
                    <Space>
                        <Switch
                            checkedChildren="off"
                            unCheckedChildren="on"
                            value={record.status === 0 ? false : true}
                            onChange={(e) => handleOnChangeStatus(e, record.festivals_id)}
                        />
                        <Popconfirm
                            placement="left"
                            title="Bạn chắc chắn muốn xóa ?"
                            description="Nhấn OK mọi thứ sẽ bị xóa vĩnh viễn..."
                            onCancel={() => console.log('Hủy')}
                            onConfirm={() => {
                                deleteFestival(record.festivals_id).then((res) => {
                                    if ('data' in res) {
                                        message.success({ content: 'Xóa thành công !' });
                                        refetch_getFestival();
                                    } else {
                                        message.error({ content: 'Xóa thất bại !' });
                                    }
                                });
                            }}
                            okButtonProps={{ loading: isLoading_deleteFestival }}
                            cancelText="Hủy"
                            okText="Xóa"
                        >
                            <div className="tw-cursor-pointer">
                                <IconDelete />
                            </div>
                        </Popconfirm>
                    </Space>
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
                    refetch_getFestival()
                }
            })
        } else {
            formData.append('status', String(0));
            updateStatus([id, formData]).then((res)=>{
                if('data' in res){
                    refetch_getFestival()
                }
            })
        }
    };

    const onChangeNewPage = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <Flex vertical>
            <Table
                columns={columnFestival}
                dataSource={response_getFestival?.data.data.map((item, index) => ({
                    ...item,
                    key: index,
                }))}
                pagination={false}
                loading={isLoading_getFestival||isLoading_updateStatus||isLoading_deleteFestival}
                scroll={{ x: 1440 ,y:480}}
            />
            <Pagination
                className="tw-m-auto"
                onChange={onChangeNewPage}
                defaultCurrent={1}
                total={response_getFestival?.data?.total || 0}
                pageSize={response_getFestival?.data?.per_page || 10}
                current={response_getFestival?.data?.current_page || 1}
            />
        </Flex>
    );
}

export default Overview