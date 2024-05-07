'use client';
import { Avatar, Button, Card, Divider, Flex, List, Spin, Upload, message, notification } from 'antd';
import React, { use, useEffect, useRef, useState } from 'react';
import { IconCamera, IconCheck, IconExclamation, IconUser } from '../components/IconComponent';
import { useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';
import TextArea from 'antd/es/input/TextArea';
import { useGetTokenQuery, useUpdateProfileMutation } from '@/src/store/queries/apiAuth.query';
import { RcFile } from 'antd/es/upload';
import { useRouter } from 'next/navigation';

type Props = {};

const page = (props: Props) => {
    const router = useRouter();
    const status = useAppSelector((state: RootState) => state.dataAuth.isStatus);
    const user = useAppSelector((state: RootState) => state.dataAuth.user);
    const [selectedImage, setSelectedImage] = useState<RcFile>();
    const [imagePreview, setImagePreview] = useState<string>();

    const [textName, setTextName] = useState<string>();
    const [textStory, setTextStory] = useState<string>();
    const [userId, setUserId] = useState<number>();

    const [textDisable, setTextDisable] = useState({
        name: false,
        story: false,
    });

    const [updateProfile, { isLoading: isLoading_updateProfile }] = useUpdateProfileMutation();

    useEffect(() => {
        if (status) {
            if (user) {
                setTextName(user?.name || '');
                setTextStory(user?.story || '');
                setUserId(user?.users_id);
                return () => {
                    notification.destroy('addToCard');
                };
            } else {
                router.back();
            }
        }
    }, [status, user]);
    if(!status){
        return null;
    }

    const handleOnClickUpdate = async () => {
        let formData = new FormData();
        if (selectedImage) {
            formData.append('avatar', selectedImage);
        }
        if (textName) {
            formData.append('name', String(textName));
        }
        if (textStory) {
            formData.append('story', String(textStory));
        }
        await updateProfile([userId, formData]).then((res) => {
            if ('data' in res) {
                notification.success({
                    message: <p className="tw-text-base tw-font-bold">Cập nhật thành công!</p>,
                    description: <p className="  tw-text-sm  tw-font-normal"> Kiểm tra lại ngay!</p>,
                    duration: 3,
                    icon: <IconCheck />,
                    placement: 'bottomRight',
                    key: 'addToCard',
                    style: {
                        borderRadius: '4px',
                        cursor: 'pointer',
                    },
                });
            } else {
                notification.success({
                    message: <p className="tw-text-base tw-font-bold">Cập nhật thất bại!</p>,
                    description: <p className="  tw-text-sm  tw-font-normal"> Có lỗi trong quá trình cập nhật!</p>,
                    duration: 3,
                    icon: <IconExclamation />,
                    placement: 'bottomRight',
                    key: 'addToCard',
                    style: {
                        borderRadius: '4px',
                        cursor: 'pointer',
                    },
                });
            }
        });
    };

    return (
        user &&
        <main className="md:tw-pt-20 md:tw-px-13 tw-min-h-screen tw-bg-gradient-to-r tw-from-violet-200 tw-to-pink-200">
            <Spin spinning={isLoading_updateProfile} tip="Đang cập nhật...">
                <div className="tw-grid tw-grid-cols-4 tw-gap-4">
                    <Card className="tw-col-span-1">
                        <Flex align="center" gap={'small'} vertical>
                            {imagePreview ? (
                                <Avatar size={128} src={imagePreview}></Avatar>
                            ) : (
                                <Avatar size={128} src={user?.avatar}>
                                    {user?.avatar ? null : <IconUser />}
                                </Avatar>
                            )}
                            <Upload
                                maxCount={1}
                                name="file"
                                action="http://127.0.0.1:8000/api/upload"
                                showUploadList={false}
                                onChange={(info) => {
                                    if (info.file.status === 'done') {
                                        if (info.file.originFileObj) {
                                            const imageUrl = URL.createObjectURL(info.file.originFileObj);
                                            setImagePreview(imageUrl);
                                            setSelectedImage(info.file.originFileObj);
                                            message.success('Sẵn sàng cập nhật ảnh mới');
                                        } else {
                                            message.error('Không thể lấy URL của ảnh!');
                                        }
                                    } else if (info.file.status === 'error') {
                                        message.error('Tải lên thất bại!');
                                    }
                                }}
                            >
                                <Button icon={<IconCamera />} className="tw-bg-orange-500" />
                            </Upload>
                        </Flex>
                    </Card>
                    <Card className="tw-col-span-3">
                        <Divider orientation="center">
                            <div className="tw-text-xl tw-font-bold tw-font-mono">Thông tin cá nhân</div>
                        </Divider>
                        <Flex align="center">
                            <p className=" tw-w-40 tw-text-base tw-font-semibold tw-font-mono ">Họ tên</p>
                            <TextArea
                                disabled={!textDisable.name}
                                className="tw-flex-1 tw-font-medium"
                                allowClear
                                maxLength={20}
                                value={textName}
                                showCount
                                variant="borderless"
                                onChange={(e) => setTextName(e.target.value)}
                            />
                            <Button
                                className="tw-rounded-3xl tw-text-base tw-border-red-350 tw-text-emerald-700 "
                                onClick={() => setTextDisable((prev) => ({ ...prev, name: true }))}
                            >
                                Chỉnh sửa
                            </Button>
                        </Flex>
                        <Divider></Divider>
                        <Flex>
                            <p className="tw-w-40 tw-text-base tw-font-semibold tw-font-mono ">Tiểu sử</p>
                            <TextArea
                                disabled={!textDisable.story}
                                className="tw-flex-1 tw-font-medium"
                                allowClear
                                maxLength={50}
                                value={textStory}
                                showCount
                                variant="borderless"
                                onChange={(e) => setTextStory(e.target.value)}
                            />
                            <Button
                                className="tw-rounded-3xl tw-text-sm tw-border-red-350 tw-text-emerald-700 "
                                onClick={() => setTextDisable((prev) => ({ ...prev, story: true }))}
                            >
                                Chỉnh sửa
                            </Button>
                        </Flex>
                        <Divider></Divider>
                        <Flex>
                            <p className="tw-w-40 tw-text-sm tw-font-semibold tw-font-mono ">Email</p>
                            <p className="tw-flex-1 tw-font-medium">{user?.email}</p>
                        </Flex>
                        <Divider orientation="right">
                            <button
                                className="tw-rounded-3xl tw-text-base tw-bg-orange-500 tw-px-5 tw-py-2 tw-font-bold tw-text-white"
                                onClick={handleOnClickUpdate}
                            >
                                Cập nhật
                            </button>
                        </Divider>
                    </Card>
                </div>
            </Spin>
        </main>
    );
};

export default page;
