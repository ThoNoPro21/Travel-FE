'use client';
import { Avatar, Button, Card, Divider, Flex, Progress, Segmented, Skeleton, Space, Spin, Steps } from 'antd';
import React, { use, useEffect, useState } from 'react';
import Overview from '../../../components/places/id/Overview';
import TabsComponent from '../../../components/common/tab/TabsComponent';
import Discover from '../../../components/places/id/Discover';
import { useGetCommentByPlaceQuery, useGetPlaceByIdQuery } from '@/src/store/queries/apiPlace.query';
import { isValidJsonString } from '../../../components/validate/String';
import CommentPlace from '../../../components/places/id/CommentPlace';
import ResultComponent from '@/src/components/result/ResultComponent';
import { useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';
type Props = {};

const tabOptions = [
    {
        label: <p className="tw-p-2">Tổng quan</p>,
        value: '0',
    },
    {
        label: <p className="tw-p-2">Ảnh (145)</p>,
        value: '1',
    },
];
const page = ({ params }: { params: { id: string } }) => {
    const [tabActive, setTabActive] = useState(0);

    const [componentLoad, setComponentLoad] = useState(false);

    const isStatus = useAppSelector((state: RootState) => state.dataAuth.isStatus);
    useEffect(() => {
        if (isStatus) {
            setComponentLoad(true);
        }
    }, [isStatus]);
    const {
        data: response_getPlaceById,
        isSuccess: isSuccess_getPlaceById,
        isLoading: isLoading_getPlaceById,
        isError: isError_getPlaceById,
        refetch: refetch_getPlaceById,
    } = useGetPlaceByIdQuery(parseInt(params.id),{skip:!componentLoad});
    const data = response_getPlaceById?.data?.[0];

    const getTabActive = (value: number) => {
        setTabActive(value);
    };

    if (!isStatus) {
        return null;
    }
    if (isError_getPlaceById) {
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
    return  isSuccess_getPlaceById && response_getPlaceById.success && (
        <main className="md:tw-pt-20 md:tw-px-13 md:tw-min-h-screen tw-space-y-10 tw-pb-4 tw-bg-gray-300 tw-font-lora">
            <Overview location={data?.location?.name} place_name={data?.name} listJson={data?.images} />
            <TabsComponent options={tabOptions} getTab={getTabActive} />
            {tabActive === 0 && <TongQuan content={data?.description} />}
            <Discover place_id={parseInt(params.id)} />
            <CommentPlace place_id={parseInt(params.id)} />
        </main>
    )
};

export default page;



const TongQuan = ({ content }: any) => {
    let text = '';
    if (isValidJsonString(String(content))) {
        text = JSON.parse(String(content));
    }
    return (
        <Card>
            <div className="ck-content tw-font-lora " dangerouslySetInnerHTML={{ __html: text }}></div>
        </Card>
    );
};
