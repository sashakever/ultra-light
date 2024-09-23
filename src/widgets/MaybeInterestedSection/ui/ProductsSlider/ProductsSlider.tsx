import {Product} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import React, {FC, useState} from 'react';
import 'swiper/css';
import {Swiper, SwiperClass, SwiperSlide} from 'swiper/react';
import {SwiperOptions} from 'swiper/types';
import {match} from 'ts-pattern';
import {useWindowSize} from 'usehooks-ts';

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
};

const ProductsSlider: FC<Props> = ({products, className = ''}) => {
  const {width} = useWindowSize();

  const [swiper, updateSwiper] = useState<SwiperClass | null>(null);

  const sliderParams: SwiperOptions = {
    slidesPerView: 1.5,
    loop: true,
    breakpoints: {
      [BREAKPOINT_XSMALL]: {
        spaceBetween: '8',
        slidesPerView: 1.5,
        centeredSlides: false,
      },
      [BREAKPOINT_SMALL]: {
        spaceBetween: '8',
        slidesPerView: 2.8,
        centeredSlides: false,
      },
      [BREAKPOINT_MEDIUM]: {
        spaceBetween: '8',
        slidesPerView: 3.2,
        centeredSlides: false,
      },
      [BREAKPOINT_LARGE]: {
        spaceBetween: '6',
        slidesPerView: 4.2,
        centeredSlides: false,
      },
      [BREAKPOINT_DEFAULT]: {
        spaceBetween: '12',
        slidesPerView: 5.2,
        centeredSlides: false,
      },
    },
  };

  const shouldShowNavButtons =
    (width >= BREAKPOINT_LARGE && products && products?.length > 5) ||
    width < BREAKPOINT_LARGE;

  return (
    <div className={clsx('relative w-full h-fit', className)}>
      {shouldShowNavButtons ? (
        <>
          <button
            aria-label='Prev'
            type='button'
            className={clsx(
              'w-8 h-8 absolute -bottom-14 md:top-64 md:bottom-auto',
              'ltr:left-1/2 ltr:md:left-9 rtl:right-1/2 rtl:md:right-9',
              '-translate-x-[130%] md:translate-x-0 z-10 hidden md:block',
            )}
            onClick={goPrev(swiper)}>
            <ArrowCircleLeftIcon className='ltr:rotate-0 rtl:rotate-180' />
          </button>
          <button
            aria-label='Next'
            type='button'
            className={clsx(
              'w-8 h-8 absolute -bottom-14 md:top-64 md:bottom-auto',
              'ltr:right-1/2 ltr:md:right-9 rtl:left-1/2 rtl:md:left-9',
              'translate-x-[130%] md:translate-x-0 z-10 hidden md:block',
            )}
            onClick={goNext(swiper)}>
            <ArrowCircleLeftIcon className='ltr:rotate-180 rtl:rotate-0' />
          </button>
        </>
      ) : null}

      <Swiper
        className='w-full gap-3 md:!pl-13'
        {...sliderParams}
        onSwiper={(swiperVar) => updateSwiper(swiperVar)}>
        {products?.map((product) => (
          <SwiperSlide key={product.id} className='border border-gray-200'>
            {match(width)
              .when(
                (value) => value < BREAKPOINT_MEDIUM,
                () => (
                  <ProductCard
                    product={product}
                    type={ProductCardAdaptiveEnum.MOBILE}
                  />
                ),
              )
              .when(
                (value) =>
                  BREAKPOINT_MEDIUM < value && value < BREAKPOINT_DEFAULT,
                () => <ProductCard product={product} />,
              )
              .when(
                (value) => value > BREAKPOINT_DEFAULT,
                () => (
                  <ProductCard
                    product={product}
                    size={ProductCardSizesEnum.LARGE}
                  />
                ),
              )
              .otherwise(() => null)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
