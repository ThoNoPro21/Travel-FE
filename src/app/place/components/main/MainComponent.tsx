'use client';
import { useAppSelector } from '@/src/store/hooks';
import { useGetPlaceByLocationQuery } from '@/src/store/queries/apiPlace.query';
import { RootState } from '@/src/store/store';
import React, { useEffect, useState } from 'react';
import CardPlaceComponent from '../CardPlaceComponent';
import { Empty, Flex, Pagination, Skeleton } from 'antd';
import { useRouter } from 'next/navigation';

type Props = {};

const MainComponent = (props: Props) => {
    const router = useRouter()
    const [pagePlace, setPagePlace] = useState(1);
    const location_id = useAppSelector((state: RootState) => state.dataCommon.MenuId);
    useEffect(() => {
        setPagePlace(1);
    }, [location_id]);
    const {
        data: response_getPlaceByLocation,
        isLoading: isLoading_getPlaceByLocation,
        isSuccess: isSuccess_getPlaceByLocation,
        refetch: refetch_getPlaceByLocation,
    } = useGetPlaceByLocationQuery([location_id, pagePlace]);
    if (isLoading_getPlaceByLocation) {
        return <Skeleton active />;
    }

    const onChangeNewPagePlace = (newPage: number) => {
        setPagePlace(newPage);
    };

    return (
        <main className="tw-grid tw-grid-cols-1 tw-grid-flow-row tw-gap-y-2 ">
            {isLoading_getPlaceByLocation ? (
                <Skeleton active />
            ) : isSuccess_getPlaceByLocation && response_getPlaceByLocation.success ? (
                response_getPlaceByLocation?.data.data.map((item, index) => (
                    <div
                        className=""
                        key={index}
                        onClick={() => router.push(`http://localhost:3355/place/${item.places_id}`)}
                    >
                        <CardPlaceComponent
                            address={item.address}
                            images={item.images}
                            location={item.location.name}
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
                    total={response_getPlaceByLocation?.data.total || 0}
                    pageSize={response_getPlaceByLocation?.data.per_page || 10}
                    current={response_getPlaceByLocation?.data.current_page || 1}
                />
            </Flex>
        </main>
    );
};
export default MainComponent;
