'use client';
import React, { useEffect, useState } from 'react';
import { Flex, Skeleton, Spin } from 'antd';
import SideBarLef from '@/src/components/articles/client/SideBarLef';
import SideMain from '@/src/components/articles/client/SideMain';
import { useGetPostByIdQuery } from '@/src/store/queries/apiArticle.query';
import { useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';
import ResultComponent from '@/src/components/result/ResultComponent';

type Props = {};

const Page = ({ params }: { params: { id: string } }) => {
    const [componentLoad, setComponentLoad] = useState(false);
    const isStatus = useAppSelector((state: RootState) => state.dataAuth.isStatus);
    useEffect(() => {
        if (isStatus) {
            setComponentLoad(true);
        }
    }, [isStatus]);
    const {
        data: response_postById,
        isLoading: isLoading_postById,
        isSuccess: isSuccess_postById,
        isError: isError_postById,
        refetch: refetch_postById,
    } = useGetPostByIdQuery(parseInt(params.id, 10), { skip: !componentLoad });

    if (!isStatus) {
        return <Spin fullscreen />;
    }

    if (isError_postById) {
        return (
            <ResultComponent
                status={404}
                title="Không tìm thấy URL !"
                subTitle="Có vẻ như đã có lỗi xảy ra :(("
                textButtonOk="Quay lại trang chủ"
                linkOk="/"
            />
        );
    }
    return  isSuccess_postById &&
        <main className="tw-relative tw-pt-20 tw-w-full tw-min-h-screen tw-px-2 md:tw-px-5  xl:tw-px-13 ">
            <Flex className="tw-grid tw-grid-cols-5 tw-min-h-fit tw-pt-20">
                <div className="tw-col-span-1 ">
                    <SideBarLef
                        name={response_postById?.data?.user.name}
                        avatar={response_postById?.data?.user.avatar}
                        story={response_postById?.data?.user.story}
                        article_id={parseInt(params.id)}
                    />
                </div>
                <div className="tw-col-span-4">
                    <SideMain
                        key={response_postById?.data?.articles_id}
                        avatar_user={response_postById?.data?.user.avatar}
                        content={response_postById?.data?.content}
                        created_at={response_postById?.data?.created_at}
                        title={response_postById?.data?.title}
                        username={response_postById?.data?.user.name}
                    />
                </div>
            </Flex>
        </main>
};

export default Page;
