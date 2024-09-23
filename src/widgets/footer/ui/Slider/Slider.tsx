import clsx from 'clsx';
import Image from 'next/image';
import React, {FC, useState} from 'react';
import 'swiper/css';
import {Swiper, SwiperClass, SwiperSlide} from 'swiper/react';

import {slide1, slide2, slide3} from '@widgets/footer/assets';

import {BREAKPOINT_MEDIUM} from '@shared';
import {ArrowCircleLeftIcon} from '@shared/assets';
import {goNext, goPrev} from '@shared/utils';

type Props = {
  className?: string;
};

const Slider: FC<Props> = ({className = ''}) => {
  const [swiper, updateSwiper] = useState<SwiperClass | null>(null);

  const sliderParams = {
    slidesPerView: 1,
    loop: true,
    breakpoints: {
      [BREAKPOINT_MEDIUM]: {
        slidesPerView: 3,
      },
    },
  };

  return (
    <div className={clsx('relative w-full h-fit bg-tone-700', className)}>
      <button
        aria-label='Prev'
        type='button'
        className='lg:hidden absolute top-[35%] ltr:left-2 rtl:right-2 z-10 w-8 h-8'
        onClick={goPrev(swiper)}>
        <ArrowCircleLeftIcon className='ltr:rotate-0 rtl:rotate-180' />
      </button>
      <button
        aria-label='Next'
        type='button'
        className='lg:hidden absolute top-[35%] ltr:right-2 rtl:left-2 z-10 w-8 h-8'
        onClick={goNext(swiper)}>
        <ArrowCircleLeftIcon className='ltr:rotate-180 rtl:rotate-0' />
      </button>

      <Swiper
        dir='ltr'
        className='w-full h-fit'
        {...sliderParams}
        onSwiper={(sw) => updateSwiper(sw)}>
        <SwiperSlide className='h-fit border-0'>
          <div className='relative w-full aspect-[2.3] bg-white'>
            <Image
              className='absolute top-0 left-0 w-full h-full object-cover object-bottom pointer-events-none'
              src={slide1.src}
              sizes='(max-width: 1024px) 100vw, 33vw'
              fill
              alt='slide'
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative w-full aspect-[2.3] bg-white'>
            <Image
              className='absolute top-0 left-0 w-full h-full object-cover object-bottom pointer-events-none'
              src={slide2.src}
              sizes='(max-width: 1024px) 100vw, 33vw'
              fill
              alt='slide'
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative w-full aspect-[2.3] bg-white'>
            <Image
              className='absolute top-0 left-0 w-full h-full object-cover object-bottom pointer-events-none'
              src={slide3.src}
              sizes='(max-width: 1024px) 100vw, 33vw'
              fill
              alt='slide'
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
