'use client';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y, EffectFade, EffectCards } from 'swiper/modules';
import { easeIn, easeInOut, motion, transform } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type Props = {
    onChange: (newIndex: string) => void;
    listImg: any[];
    perview: number | 'auto';
    spaceBetween: number;
    loop: boolean;
    autoPlay: boolean;
    speed?: number;
    navigation?: boolean;
};

const SwiperComponent = (props: Props) => {
    const handleSlideChange = (swiper: any) => {
        const currentIndex = swiper.realIndex;
        const currentSlide = swiper.slides[currentIndex];
        const currentUrl = currentSlide?.children[0].currentSrc;
        console.log(currentUrl)
        handleSlideActive(currentUrl);
    };

    const handleSlideActive = (newIndex: string) => {
        props.onChange(newIndex);
    };
    const handleOnClick = (swiper: any) => {
        handleSlideActive(swiper);
    };
    return (
        <Swiper
            grabCursor={true}
            modules={[Autoplay, EffectCards, Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={props.spaceBetween}
            slidesPerView={props.perview}
            pagination={{
                clickable: true,
            }}
            loop={props.loop}
            autoplay={props.autoPlay ? { delay: 2500, disableOnInteraction: false } : false}
            onRealIndexChange={(e) => handleSlideChange(e)}
            className="tw-w-full tw-h-full "
            // breakpoints={{
            //     '330': {
            //         slidesPerView: 1,
            //         spaceBetween: 10,
            //     },
            //     768: {
            //         slidesPerView: 2,
            //         spaceBetween: 3,
            //     },
            //     1024: {
            //         slidesPerView: props.perview,
            //         spaceBetween: 5,
            //     },
            // }}
        >
            {props.listImg?.map((item: any, index: number) => (
                <SwiperSlide key={index} onClick={() => handleOnClick(item)} className="tw-max-w-fit">
                    {({ isActive }) => {
                        return (
                            <motion.img
                                src={item}
                                className={`tw-w-55 tw-h-9/10 tw-rounded-lg tw-bg-center tw-bg-cover`}
                                animate={
                                    props.autoPlay
                                        ? isActive
                                            ? {
                                                  scale: 1,
                                              }
                                            : {
                                                  scale: 0.8,
                                              }
                                        : ''
                                }
                                transition={{ duration: 0.8, ease: 'easeOut', loop: Infinity }}
                            />
                        );
                    }}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperComponent;
