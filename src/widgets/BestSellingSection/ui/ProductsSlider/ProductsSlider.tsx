import {Product} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import React, {FC, useState} from 'react';
import 'swiper/css';
import {Swiper, SwiperClass, SwiperProps, SwiperSlide} from 'swiper/react';

import {ProductCard} from '@features';

import {ArrowCircleLeftIcon} from '@shared/assets';
import {
  BREAKPOINT_LARGE,
  BREAKPOINT_MEDIUM,
  BREAKPOINT_SMALL,
} from '@shared/constants';
import {ProductCardAdaptiveEnum, ProductCardSizesEnum} from '@shared/types';
import {SliderPagination} from '@shared/ui';
import {goNext, goPrev} from '@shared/utils';

type Props = {
  className?: string;
  products: Product[];
  priorityLoading?: boolean;
};

const ProductsSlider: FC<Props> = ({
  className = '',
  products,
  priorityLoading,
}) => {
  const [swiper, updateSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const sliderParams: SwiperProps = {
    slidesPerView: 1.4,
    slidesPerGroup: 1,
    breakpoints: {
      [BREAKPOINT_SMALL]: {
        slidesPerView: 2.4,
        slidesPerGroup: 1,
      },
      [BREAKPOINT_MEDIUM]: {
        slidesPerView: 3,
        slidesPerGroup: 1,
      },
      [BREAKPOINT_LARGE]: {
        slidesPerView: 4,
        slidesPerGroup: 1,
      },
    },
  };
  const slidesPerView = Math.trunc(swiper?.slidesPerViewDynamic() || 1);

  return (
    <div className={clsx('relative w-full', className)}>
      <button
        aria-label='Prev'
        type='button'
        className='hidden md:block absolute top-[42%] ltr:left-10 rtl:right-10 z-10 w-11 h-11'
        onClick={goPrev(swiper)}>
        <ArrowCircleLeftIcon className='ltr:rotate-0 rtl:rotate-180' />
      </button>
      <button
        aria-label='Next'
        type='button'
        className='hidden md:block absolute top-[42%] ltr:right-10 rtl:left-10 z-10 w-11 h-11'
        onClick={goNext(swiper)}>
        <ArrowCircleLeftIcon className='ltr:rotate-180 rtl:rotate-0' />
      </button>
      <div>
        <Swiper
          className='w-full h-fit'
          {...sliderParams}
          onSwiper={(sw) => updateSwiper(sw)}
          onSlideChange={(sw) => setActiveIndex(sw.realIndex)}>
          {products.map((product, index) => (
            <SwiperSlide key={index} className='w-full h-fit'>
              <div className='relative w-full pl-16 md:pl-22 pr-5 md:pr-14 pt-5 md:pt-12 flex'>
                <div
                  className={clsx(
                    'absolute top-0 left-0 w-20 md:w-28 rem:text-[150px] md:rem:text-[200px] leading-[150px]',
                    'md:rem:leading-[200px] text-[rgba(255,255,255,0.1)] font-medium text-right',
                    '[-webkit-text-stroke:2px_rgba(255,255,255,0.7)] [text-stroke:2px_rgba(255,255,255,0.7)]',
                  )}>
                  {index + 1}
                </div>
                <ProductCard
                  className='w-full md:hidden'
                  product={product}
                  size={ProductCardSizesEnum.SMALL}
                  type={ProductCardAdaptiveEnum.MOBILE}
                  priorityLoading={priorityLoading}
                />
                <ProductCard
                  className='w-full hidden md:block'
                  product={product}
                  priorityLoading={priorityLoading}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <SliderPagination
        className='pt-10 md:pt-5'
        currentSlide={activeIndex}
        slidesPerView={slidesPerView}
        count={products.length}
        layout='horizontal'
        color='light'
      />
    </div>
  );
};

export default ProductsSlider;
