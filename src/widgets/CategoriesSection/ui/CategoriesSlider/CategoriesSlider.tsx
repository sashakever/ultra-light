import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {FC, useState} from 'react';
import 'swiper/css';
import {Swiper, SwiperClass, SwiperSlide} from 'swiper/react';

import {BREAKPOINT_MEDIUM} from '@shared';
import {ArrowCircleLeftIcon} from '@shared/assets';
import {StrapiCategoryType} from '@shared/types';
import {goNext, goPrev} from '@shared/utils';

type Props = {
  className?: string;
  categories: StrapiCategoryType[];
};

const CategoriesSlider: FC<Props> = ({className = '', categories}) => {
  const [swiper, updateSwiper] = useState<SwiperClass | null>(null);

  const sliderParams = {
    slidesPerView: 2.3,
    loop: true,
    centeredSlides: true,
    breakpoints: {
      [BREAKPOINT_MEDIUM]: {
        slidesPerView: categories.length < 7 ? categories.length : 7,
        centeredSlides: false,
      },
    },
  };

  return (
    <div className={clsx('relative w-full h-fit', className)}>
      <button
        aria-label='Prev'
        type='button'
        className={clsx(
          'w-8 h-8 absolute -bottom-14 -translate-x-[130%] z-10',
          'md:top-[35%] md:bottom-auto md:translate-x-0',
          'ltr:left-1/2 ltr:md:left-9 rtl:right-1/2 rtl:md:right-9',
          {'md:hidden': categories.length <= 5},
        )}
        onClick={goPrev(swiper)}>
        <ArrowCircleLeftIcon className='ltr:rotate-0 rtl:rotate-180' />
      </button>
      <button
        aria-label='Next'
        type='button'
        className={clsx(
          'w-8 h-8 absolute -bottom-14 translate-x-[130%]',
          'md:top-[35%] md:bottom-auto md:translate-x-0 z-10',
          'ltr:right-1/2 ltr:md:right-9 rtl:left-1/2 rtl:md:left-9',
          {'md:hidden': categories.length <= 5},
        )}
        onClick={goNext(swiper)}>
        <ArrowCircleLeftIcon className='ltr:rotate-180 rtl:rotate-0' />
      </button>

      <Swiper
        className='w-full h-fit'
        {...sliderParams}
        onSwiper={(swiperVar) => updateSwiper(swiperVar)}>
        {categories.map((category) => (
          <SwiperSlide key={category.id} className='h-fit'>
            <Link
              href={category.attributes.Href || '/'}
              className='w-full aspect-[0.8] p-2 md:p-5 flex flex-col justify-between gap-4'>
              <div className='relative w-full h-[70%]'>
                {category.attributes.MainImage.data ? (
                  <Image
                    className='absolute top-0 left-0 w-full h-full object-cover object-top'
                    src={category.attributes.MainImage.data.attributes.url}
                    width={200}
                    height={200}
                    alt={category.attributes.Title || ''}
                  />
                ) : null}
              </div>
              <div className='w-full flex flex-col items-center gap-1'>
                <h4 className='text-s md:text-l font-medium'>
                  {category.attributes.Title}
                </h4>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriesSlider;
