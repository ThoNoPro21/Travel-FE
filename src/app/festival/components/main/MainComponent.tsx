'use client';
import { useAppSelector } from '@/src/store/hooks';
import { useGetPlaceByLocationQuery } from '@/src/store/queries/apiPlace.query';
import { RootState } from '@/src/store/store';
import React, { useEffect, useState } from 'react';
import { Empty, Flex, Pagination, Skeleton } from 'antd';
import { useRouter } from 'next/navigation';
import CardPlaceComponent from '@/src/app/place/components/CardPlaceComponent';
import { useGetFestivalPaginationQuery } from '@/src/store/queries/apiFestival.query';
import CardFestivalComponent from '../CardFestivalComponent';

type Props = {};

const MainComponent = (props: Props) => {
    const router = useRouter()
    const [pagePlace, setPagePlace] = useState(1);
    const month = useAppSelector((state: RootState) => state.dataCommon.MenuId);
    useEffect(() => {
        setPagePlace(1);
    }, [month]);
    const {
        data: response_getFestivalByMonth,
        isLoading: isLoading_getFestivalByMonth,
        isSuccess: isSuccess_getFestivalByMonth,
        refetch: refetch_getFestivalByMonth,
    } = useGetFestivalPaginationQuery([month===0 ? 1 : month, pagePlace]);
    if (isLoading_getFestivalByMonth) {
        return <Skeleton active />;
    }

    const onChangeNewPagePlace = (newPage: number) => {
        setPagePlace(newPage);
    };

    return (
        <main className="tw-grid tw-grid-cols-1 tw-grid-flow-row tw-gap-y-2 ">
            {isLoading_getFestivalByMonth ? (
                <Skeleton active />
            ) : isSuccess_getFestivalByMonth && response_getFestivalByMonth.success ? (
                response_getFestivalByMonth?.data.data.map((item, index) => (
                    <div
                        className=""
                        key={index}
                        onClick={() => router.push(`http://localhost:3355/festival/${item.festivals_id}`)}
                    >
                        <CardFestivalComponent
                            address={item.address}
                            images={item.images}
                            location={item.location.name}
                            start_date={item.start_date}
                            end_date={item.end_date}
                            title={item.name}
                        />
                    </div>
                ))
            ) : (
                <Empty className="tw-col-span-6" description="Không có dữ liệu!" />
            )}
            <Flex>
                <Pagination
                    className="tw-flex-initial tw-m-auto"
                    onChange={onChangeNewPagePlace}
                    defaultCurrent={1}
                    total={response_getFestivalByMonth?.data.total || 0}
                    pageSize={response_getFestivalByMonth?.data.per_page || 10}
                    current={response_getFestivalByMonth?.data.current_page || 1}
                />
            </Flex>
        </main>
    );
};
export default MainComponent;
