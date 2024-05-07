import React, { useState } from 'react';
import { Carousel } from 'antd';

import FestivalHot from './FestivalHot';
import SwiperComponent from './SwiperComponent';
import { festivalType } from '@/src/types/Festival';
import { imagesJson } from '@/src/types/Article';

type Props = {
    items: festivalType[];
};
const HomeBanner = (props: Props) => {
    let listImage: any[] | undefined = [];
    let image: imagesJson | undefined;
    props.items.map((item, index) => ((image = JSON.parse(String(item.images))), listImage?.push(image?.avatar)));
    return (
        <Carousel autoplay infinite={true} autoplaySpeed={5000} draggable className="tw-relative">
            {props.items.map((item, index) => (
                <FestivalHot
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
