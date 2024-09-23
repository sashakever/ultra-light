'use client';

import React, {FC} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {match} from 'ts-pattern';
import {useWindowSize} from 'usehooks-ts';

import ServiceCard from './ServiceCard';

import {
  BREAKPOINT_DEFAULT,
  BREAKPOINT_LARGE,
  BREAKPOINT_MEDIUM,
  BREAKPOINT_SMALL,
} from '@shared';
import {StrapiSlideType} from '@shared/types';

type Props = {
  slides: StrapiSlideType[];
};
const ServicesInfo: FC<Props> = ({slides}) => {
  const {width} = useWindowSize();

  const isSliderVisible = width < BREAKPOINT_DEFAULT;

  const sliderParams = {
    spaceBetween: 12,
    slidesPerView: 1.4,
    breakpoints: {
      [BREAKPOINT_SMALL]: {
        slidesPerView: 2.4,
      },
      [BREAKPOINT_MEDIUM]: {
        slidesPerView: 3.5,
      },
      [BREAKPOINT_LARGE]: {
        slidesPerView: 4.6,
      },
    },
  };

  return (
    <div className='w-full pt-3'>
      {match(isSliderVisible)
        .with(true, () => (
          <Swiper {...sliderParams}>
            {slides.map((service) => (
              <SwiperSlide key={service.id}>
                <ServiceCard service={service} />
              </SwiperSlide>
            ))}
          </Swiper>
        ))
        .with(false, () => (
          <div className='w-full flex gap-3'>
            {slides.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ))
        .otherwise(() => null)}
    </div>
  );
};

export default ServicesInfo;
