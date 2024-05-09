import { useAddCarouselMutation } from '@/src/store/queries/apiCommon.query';
import { carouselType } from '@/src/types/Carousel';
import { Button, Flex, Form, Spin, Upload, UploadProps, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useState } from 'react';

type Props = { refetch: () => void };

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
type image = {
    listImg :any[]
}

const CreateForm = (props: Props) => {
    const [form] = useForm();

    const [addCarousel,{isLoading:isLoading_addCarousel}] = useAddCarouselMutation()
    const handleFormFinish = async (value:image) => {
        let formData = new FormData();
        if (value.listImg) {
            for (let i = 0; i < value.listImg.length; i++) {
                formData.append('images[]', value.listImg?.[i]?.originFileObj);
            }
        }
        await addCarousel(formData).then((res)=>{
            if('data' in res){
                message.success({content:'Hoàn tất !'})
                form.resetFields();
                props.refetch();
            }
        })
    }
    if(isLoading_addCarousel){
        return <Spin fullscreen tip='Đang xử lý, chờ xíu...' />
    }
    return (
        <Flex vertical gap="middle">
            <Form form={form} onFinish={handleFormFinish}>
                <Form.Item<image>
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    name="listImg"
                    rules={[{ required: true, message: 'Vui lòng nhập ảnh liên quan!' }]}
                >
                    <Upload
                        action="http://127.0.0.1:8000/api/upload"
                        listType="picture-card"
                        multiple
                        accept=".png,.jpg,.jpeg"
                        className="tw-grid tw-grid-cols-4 tw-grid-flow-row"
                    >
                        <button
                            style={{ border: 0, background: 'none'}}
                            type="button"
                            className="tw-h-30"
                        >
                            <div style={{ marginTop: 8 }}>Tải lên</div>
                        </button>
                    </Upload>
                </Form.Item>
                <button
                    type="submit"
                    className="tw-bg-orange-500 tw-text-white tw-font-semibold tw-text-sm tw-w-25 tw-p-2 tw-rounded-lg"
                >
                    Xong
                </button>
            </Form>
        </Flex>
    );
};

export default CreateForm;
