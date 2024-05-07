import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Table, Modal, Form, Input, Spin } from 'antd';
import type { TableColumnsType, FormInstance } from 'antd';
import {
    useAddMonHocMutation,
    useDeleteMonHocMutation,
    useGetMonHocQuery,
    useUpdateMonHocMutation,
} from '@/src/store/queries/apiMonHoc.query';
import { Pagination } from 'antd';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import ModalComponent from '../common/modal/ModalComponent';
import InputComponent from '../common/input/InputComponent';
import { selectSMonHocByMaMonHoc } from '@/src/store/selectors/monHoc.selector';
import { RootState } from '@/src/store/store';
export interface MonHocType {
    mamonhoc: number;
    tenmonhoc: string;
    trangthai: number;
}

const MonHocTable = () => {
    const [page, setPage] = useState(1);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const [subjects, setSubjects] = useState<MonHocType>({
        mamonhoc: 0,
        tenmonhoc: '',
        trangthai: 0,
    });
    const [subjectsEdit, setSubjectsEdit] = useState<MonHocType>({
        mamonhoc: 0,
        tenmonhoc: '',
        trangthai: 0,
    });

    const [maMonHoc, setMaMonHoc] = useState(0);
    const monHocByMaMonHoc = useAppSelector((state: RootState) => selectSMonHocByMaMonHoc(state, maMonHoc));

    useEffect(() => {
        if (monHocByMaMonHoc) {
            setSubjectsEdit(monHocByMaMonHoc);
        }
    }, [monHocByMaMonHoc]);

    const { data: response, isLoading, refetch } = useGetMonHocQuery(page);
    const [addMonHoc] = useAddMonHocMutation();
    const [updateMonHocByMaMonHoc] = useUpdateMonHocMutation();
    const [deleteMonHocByMaMonHoc] = useDeleteMonHocMutation();

    const columns: TableColumnsType<MonHocType> = [
        {
            title: 'Mã môn học',
            dataIndex: 'mamonhoc',
        },
        {
            title: 'Tên môn học',
            dataIndex: 'tenmonhoc',
            width: '30%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangthai',
            width: '40%',
        },
        {
            title: 'Action',
            render: (record) => (
                <Space size="small">
                    <Button type="primary" onClick={() => handleOnClickEdit(record.mamonhoc)}>
                        Edit
                    </Button>
                    <Button type="primary" danger onClick={() => handleOnClickDelete(record)}>
                        Del
                    </Button>
                </Space>
            ),
            width: '40%',
        },
    ];

    const handleOnClickEdit = (value: number) => {
        setIsModalEditOpen(true);
        setMaMonHoc(value);
    };

    const handleOnClickDelete = (value: MonHocType) => {
        Modal.confirm({
            title: (
                <>
                    Bạn có chắc muốn xóa môn <span className="tw-text-red-600 tw-font-bold">{value.tenmonhoc}</span>
                </>
            ),
            content: 'Nhấn OK mọi dữ liệu sẽ được xóa ..',
            cancelText: 'Hủy',
            onOk() {
                handleModalDeleteOk(value.mamonhoc);
            },
        });
    };

    const handleOnChangeInPutCreate = (e: any) => {
        const { name, value } = e.target;
        if (subjects) setSubjects({ ...subjects, [name]: value });
    };

    const handleOnchangeInputEdit = (e: any) => {
        const { name, value } = e.target;
        if (subjectsEdit) setSubjectsEdit({ ...subjectsEdit, [name]: value });
    };

    const onChangeNewPage = (newPage: number) => {
        setPage(newPage);
    };

    const handleModalCreateCancel = () => {
        setIsModalCreateOpen(false);
    };

    const handleModalCreateOk = async () => {
        addMonHoc(subjects)
            .then(() => {
                setIsModalCreateOpen(false);
                setSubjects({
                    mamonhoc: 0,
                    tenmonhoc: '',
                    trangthai: 0,
                });
                refetch()
            })
            .catch((error) => {
                console.error('Error adding môn học:', error);
            });
    };

    const handleModalEditOk = async () => {
        const { tenmonhoc, trangthai } = subjectsEdit;
        updateMonHocByMaMonHoc({ maMonHoc, ...subjectsEdit })
            .then(() => {
                setIsModalEditOpen(false);
                setSubjects({
                    mamonhoc: 0,
                    tenmonhoc: '',
                    trangthai: 0,
                });
                refetch();
            })
            .catch((error) => {
                console.error('Error updating môn học:', error);
            });
    };

    const handleModalDeleteOk = async (mamonhoc:number) => {
        deleteMonHocByMaMonHoc(mamonhoc)
            .then(() => {
                refetch();
            })
            .catch((error) => {
                console.error('Error deleting môn học:', error);
            });
    };

    const dataSource = response?.data?.map((item: MonHocType) => ({
        ...item,
        key: item.mamonhoc,
    }));
    return (
        <Spin spinning={isLoading} tip="Đang tải ....">
            <Space className="tw-my-5">
                <Button type="primary" htmlType="button" onClick={() => setIsModalCreateOpen(true)}>
                    Create
                </Button>
            </Space>

            <Modal
                title="Create new "
                open={isModalCreateOpen}
                onOk={handleModalCreateOk}
                onCancel={handleModalCreateCancel}
            >
                <form className=" tw-flex  tw-flex-col">
                    <label>Tên môn học</label>
                    <input
                        className="tw-form-input tw-border tw-border-black tw-px-4 tw-py-2 "
                        name="tenmonhoc"
                        value={subjects?.tenmonhoc}
                        onChange={handleOnChangeInPutCreate}
                    />
                    <label>Trạng thái</label>
                    <input
                        className="tw-form-input tw-border tw-border-black tw-px-4 tw-py-2 "
                        name="trangthai"
                        value={subjects?.trangthai}
                        onChange={handleOnChangeInPutCreate}
                    />
                </form>
            </Modal>

            {isModalEditOpen && (
                <ModalComponent
                    title="Sửa mới"
                    isOpen={isModalEditOpen}
                    handleCancel={() => setIsModalEditOpen(false)}
                    handleOk={handleModalEditOk}
                    okText="Sửa"
                    cancelText="Hủy"
                >
                    <InputComponent
                        label="Tên môn học"
                        name="tenmonhoc"
                        value={subjectsEdit.tenmonhoc}
                        onChange={(e) => handleOnchangeInputEdit(e)}
                    />

                    <InputComponent
                        label="Trạng thái"
                        name="trangthai"
                        value={subjectsEdit.trangthai}
                        onChange={(e) => handleOnchangeInputEdit(e)}
                    />
                </ModalComponent>
            )}

            <Table columns={columns} dataSource={dataSource} pagination={false} />

            <Pagination
                onChange={onChangeNewPage}
                defaultCurrent={1}
                total={response?.total || 0}
                pageSize={response?.per_page || 10}
                current={response?.current_page || 1}
            />
        </Spin>
    );
};
export default MonHocTable;
