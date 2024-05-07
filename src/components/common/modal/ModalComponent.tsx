'use client'
import { modalType } from '@/src/types/modalType';
import { Modal } from 'antd';
import React from 'react';

const ModalComponent = (props: modalType) => {
    return (
        <Modal
            title={<span className="tw-text-blue-600 tw-font-bold">{props.title}</span>}
            open={props.isOpen}
            onOk={props.handleOk}
            onCancel={props.handleCancel}
            okText={props.okText}
            cancelText={props.cancelText}
            footer={props.footer}
            closeIcon={false}
        >
            <form className=" tw-flex  tw-flex-col">{props.children}</form>
        </Modal>
    );
};
export default ModalComponent;
