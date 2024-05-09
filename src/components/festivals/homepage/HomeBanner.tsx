import React, { useState } from 'react';
import { Carousel, Spin } from 'antd';

import { imagesJson } from '@/src/types/Article';
import { useGetFestivalQuery } from '@/src/store/queries/apiFestival.query';
import FestivalComponent from './FestivalComponent';

type Props = {
};
const HomeBanner = (props: Props) => {
    const {
        data: response_festival,
        isLoading: isLoading_festival,
        isSuccess: isSuccess_festival,
    } = useGetFestivalQuery([1,1]);
    if (isLoading_festival) {
        return <Spin fullscreen />;
    }
    let listImage: any[] | undefined = [];
    let image: imagesJson | undefined;
    response_festival?.data.data.map((item, index) => ((image = JSON.parse(String(item.images))), listImage?.push(image?.avatar)));

    return (
        <Carousel autoplay infinite={true} autoplaySpeed={5000} draggable className="tw-relative">
            { response_festival?.data.data.map((item, index) => (
                <FestivalComponent
                    key={index}
                    festival_id={item.festivals_id}
                    location={item.location.name}
                    listJson={item.images}
                    name={item.name}
                    address={item.address}
                    description={item.description}
                    end_date={item.end_date}
                    start_date={item.start_date}
                />
            ))}
        </Carousel>
    );
};

export default HomeBanner;
