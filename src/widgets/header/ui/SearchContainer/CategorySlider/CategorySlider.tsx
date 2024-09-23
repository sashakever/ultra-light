import {Product} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import React, {FC, useState} from 'react';
import 'swiper/css';
import {Swiper, SwiperClass, SwiperSlide} from 'swiper/react';

import {ProductCard} from '@features';

import {
  BREAKPOINT_DEFAULT,
  BREAKPOINT_LARGE,
  BREAKPOINT_MEDIUM,
  BREAKPOINT_SMALL,
  BREAKPOINT_XSMALL,
} from '@shared';
import {ArrowCircleLeftIcon} from '@shared/assets';
import {ProductCardAdaptiveEnum, ProductCardSizesEnum} from '@shared/types';
import {goNext, goPrev} from '@shared/utils';

type Props = {
  className?: string;
  products?: Product[];
  isCaption?: boolean;
  searchRecommendationTitle?: string | null;
  searchRecommendationSubTitle?: string | null;
};

const CategorySlider: FC<Props> = ({
  isCaption = true,
  products,
  className = '',
  searchRecommendationTitle = '',
  searchRecommendationSubTitle = '',
}) => {
  const [swiper, updateSwiper] = useState<SwiperClass | null>(null);

  const sliderParams = {
    slidesPerView: 1.5,
    loop: true,
    breakpoints: {
      [BREAKPOINT_XSMALL]: {
        spaceBetween: '8',
        slidesPerView: 1,
        centeredSlides: false,
      },
      [BREAKPOINT_SMALL]: {
        spaceBetween: '8',
        slidesPerView: 1.2,
        centeredSlides: false,
      },
      [BREAKPOINT_MEDIUM]: {
        spaceBetween: '8',
        slidesPerView: 2.5,
        centeredSlides: false,
      },
      [BREAKPOINT_LARGE]: {
        spaceBetween: '6',
        slidesPerView: 3,
        centeredSlides: false,
      },
      [BREAKPOINT_DEFAULT]: {
        spaceBetween: '12',
        slidesPerView: 3,
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
          'w-8 h-8 absolute bottom-[calc(20%+.5rem)] left-4',
          'z-10 hidden md:block',
        )}
        onClick={goPrev(swiper)}>
        <ArrowCircleLeftIcon />
      </button>
      <button
        aria-label='Next'
        type='button'
        className={clsx(
          'w-8 h-8 absolute bottom-[calc(20%+.5rem)] right-4',
          'z-10 hidden md:block',
        )}
        onClick={goNext(swiper)}>
        <ArrowCircleLeftIcon className='rotate-180' />
      </button>

      {isCaption ? (
        <div className='flex flex-col gap-1 py-6'>
          <h2 className='text-l font-medium'>{searchRecommendationTitle}</h2>
          <h3 className='text-s hidden md:block'>
            {searchRecommendationSubTitle}
          </h3>
        </div>
      ) : null}

      <Swiper
        className='w-full gap-3 !overflow-visible md:!overflow-hidden'
        {...sliderParams}
        onSwiper={(swiperVar) => updateSwiper(swiperVar)}>
        {products?.map((product) =>
          product ? (
            <SwiperSlide key={product.id} className='border border-gray-200'>
              <>
                <ProductCard
                  product={product}
                  type={ProductCardAdaptiveEnum.MOBILE}
                  size={ProductCardSizesEnum.LARGE}
                  className='md:hidden'
                />
                <ProductCard
                  product={product}
                  type={ProductCardAdaptiveEnum.DESKTOP}
                  size={ProductCardSizesEnum.SMALL}
                  className='hidden md:block'
                />
              </>
            </SwiperSlide>
          ) : null,
        )}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
