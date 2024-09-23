'use client';

import clsx from 'clsx';
import React, {FC, useState} from 'react';
import 'swiper/css';
import {EffectFade, Navigation as SwiperNavigation} from 'swiper/modules';
import {Swiper, SwiperClass, SwiperSlide} from 'swiper/react';

import CollectionSlide from './CollectionSlide';
import Navigation from './Navigation';

import {useStrapiSlides} from '@shared/hooks';
import {StrapiSectionHomeHeroType, StrapiSlideType} from '@shared/types';
import {SliderPagination} from '@shared/ui';
import {goNext, goPrev} from '@shared/utils';

type Props = {
  section: StrapiSectionHomeHeroType;
};
const HeroHomeSection: FC<Props> = ({section}) => {
  const [swiper, updateSwiper] = useState<SwiperClass | null>(null);
  const {slides} = useStrapiSlides(section.Slides);
  const [slideIndex, setSlideIndex] = useState(0);

  const isVideoSlide = () => {
    if (
      'VideoDesktop' in slides[slideIndex] &&
      'VideoMobile' in slides[slideIndex]
    ) {
      const videoSlide = slides[slideIndex];
      return (
        !!videoSlide?.VideoDesktop?.data?.attributes.url &&
        !!videoSlide?.VideoMobile?.data?.attributes.url
      );
    }
    return false;
  };

  return (
    <section className='md:h-[80vh] md:px-3'>
      <div className='relative h-full'>
        <SliderPagination
          currentSlide={slideIndex}
          slidesPerView={2}
          count={slides.length + 1}
          color='grey'
          className={clsx(
            '!w-fit !absolute z-10',
            'ltr:left-6 rtl:right-6 md:ltr:left-17 md:rtl:right-17 pt-11 md:pt-15',
          )}
        />
        <Swiper
          speed={1000}
          onSlideChange={(swiperVar) => {
            setSlideIndex(swiperVar.activeIndex);
          }}
          modules={[SwiperNavigation, EffectFade]}
          className='hero-slider h-full'
          allowTouchMove={false}
          effect='fade'
          fadeEffect={{crossFade: true}}
          slidesPerView={1}
          onSwiper={(swiperVar) => updateSwiper(swiperVar)}>
          {slides.map((slide, index) => (
            <SwiperSlide className='h-full' key={slide.id}>
              <CollectionSlide
                isPlayed={isVideoSlide() && index === slideIndex}
                slide={slide as StrapiSlideType}
                priceLabel={section.PriceLabel || ''}
                outletLabel={section.OutletLabel || ''}
                toCollectionButton={section.ToCollectionButton}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Navigation
          count={slides.length}
          currentSlide={slideIndex}
          handleNext={goNext(swiper)}
          handlePrev={goPrev(swiper)}
          nextLabel={section?.NextCollectionLabel || ''}
        />
      </div>
    </section>
  );
};

export default HeroHomeSection;
