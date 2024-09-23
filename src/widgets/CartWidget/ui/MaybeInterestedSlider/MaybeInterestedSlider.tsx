import {Product} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import React, {FC} from 'react';
import 'swiper/css';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import {match} from 'ts-pattern';
import {useWindowSize} from 'usehooks-ts';

import {useAppSelector} from '@base/store';

import {ProductCard} from '@features';

import {BREAKPOINT_MEDIUM, BREAKPOINT_SMALL} from '@shared';
import {ProductCardAdaptiveEnum, ProductCardSizesEnum} from '@shared/types';

type Props = {
  className?: string;
  products?: Product[];
};

const MaybeInterestedSlider: FC<Props> = ({products, className = ''}) => {
  const {width} = useWindowSize();
  const {currentLangCode} = useAppSelector((state) => state.layout);

  const sliderParams: SwiperProps = {
    slidesPerView: 1.05,
    spaceBetween: '12',
    dir: currentLangCode === 'ar' ? 'rtl' : 'ltr',
    breakpoints: {
      [BREAKPOINT_SMALL]: {
        spaceBetween: '12',
        slidesPerView: 2,
        centeredSlides: false,
      },
      [BREAKPOINT_MEDIUM]: {
        slidesPerView: 1.8,
        centeredSlides: false,
      },
    },
  };

  return (
    <div className={clsx('relative w-full', className)}>
      <Swiper
        className='w-full gap-3 !overflow-visible sm:!overflow-hidden'
        {...sliderParams}>
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            {match(width)
              .when(
                (value) => value < BREAKPOINT_MEDIUM,
                () => (
                  <ProductCard
                    product={product}
                    type={ProductCardAdaptiveEnum.MOBILE}
                    size={ProductCardSizesEnum.EXTRA_SMALL}
                    className='border'
                  />
                ),
              )
              .otherwise(() => (
                <ProductCard
                  product={product}
                  type={ProductCardAdaptiveEnum.DESKTOP}
                  size={ProductCardSizesEnum.SMALL}
                />
              ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MaybeInterestedSlider;
