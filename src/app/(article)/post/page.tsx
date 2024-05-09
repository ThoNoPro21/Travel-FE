'use client';
import FormUpload from '../../../components/articles/client/FormUpload';

import { Card, Spin } from 'antd';
import { useEffect, useState } from 'react';
import ResultComponent from '@/src/components/result/ResultComponent';
import { useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';

type Props = {};

const page = (props: Props) => {
    const [content, setContent] = useState('');
    const isLogin = useAppSelector((state: RootState) => state.dataAuth.isLogin);
    const status = useAppSelector((state: RootState) => state.dataAuth.isStatus);
    const [isCheckLogin,setIsCheckLogin] = useState(true)

    useEffect(() => {
        if (status) {
            if (!isLogin) {
                setIsCheckLogin(false)
            }
        }
    }, [status]);

    if(!isCheckLogin){
        return <ResultComponent
                    status="403"
                    title="Không có quyền truy cập !"
                    subTitle="Vui lòng đăng nhập !"
                    textButtonCancel="Quay lại"
                    textButtonOk="Đăng nhập"
                    linkOk='/login'
                    linkCancel='/'
                />;
    }

    return (
        <main className="md:tw-pt-20 md:tw-px-13 tw-min-h-screen tw-py-4 tw-bg-gradient-to-r tw-from-violet-200 tw-to-pink-200">
            {isLogin && (
                <div className="tw-grid tw-grid-cols-2 tw-grid-flow-row tw-gap-4">
                    <FormUpload setContent={setContent} />
                    <Card className="tw-bg-white tw-rounded-lg">
                        <div className="ck-content" dangerouslySetInnerHTML={{ __html: content }}></div>
                    </Card>
                </div>
            )}
        </main>
    );
};

export default page;
