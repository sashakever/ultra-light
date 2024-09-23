'use client';

import {clsx} from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {FC, useState} from 'react';
import {Swiper, SwiperClass, SwiperSlide} from 'swiper/react';
import {useWindowSize} from 'usehooks-ts';

import {InstafeedDataType} from '@base/api/instafeed/types';

// import {LikeIcon} from '@widgets/InstafeedSection/assets';
import {
  BREAKPOINT_DEFAULT,
  BREAKPOINT_LARGE,
  BREAKPOINT_MEDIUM,
  BREAKPOINT_SMALL,
  BREAKPOINT_XSMALL,
  BREAKPOINT_X_LARGE,
} from '@shared';
import {
  BlueArrowCircleLeftIcon,
  BlueArrowCircleRightIcon,
} from '@shared/assets';
import {goNext, goPrev} from '@shared/utils';

type Props = {
  posts: InstafeedDataType[] | undefined;
};

const InstaFeedSlider: FC<Props> = ({posts}) => {
  const [selectedSlide, setSelectedSlide] = useState<SwiperClass | null>(null);

  const {width} = useWindowSize();

  const postWidth = width > BREAKPOINT_SMALL ? 266 : 201;
  const postHeight = width > BREAKPOINT_SMALL ? 402 : 307;

  const sliderParams = {
    spaceBetween: 12,
    loop: true,
    slidesPerView: 1.4,
    breakpoints: {
      [BREAKPOINT_XSMALL]: {
        slidesPerView: 2.5,
      },
      [BREAKPOINT_SMALL]: {
        slidesPerView: 3.4,
      },
      [BREAKPOINT_MEDIUM]: {
        slidesPerView: 4.6,
      },
      [BREAKPOINT_LARGE]: {
        slidesPerView: 5.1,
      },
      [BREAKPOINT_DEFAULT]: {
        slidesPerView: 7,
      },
      [BREAKPOINT_X_LARGE]: {
        slidesPerView: 8,
      },
    },
  };

  return (
    <div className='relative w-full pl-4 pb-4 sm:pl-13 sm:py-12'>
      <button
        aria-label='Prev'
        type='button'
        className={clsx(
          'w-8 h-8 absolute ltr:left-9 rtl:right-9 top-1/2 transform -translate-y-1/2',
          'z-10 hidden md:block',
        )}
        onClick={goPrev(selectedSlide)}>
        <BlueArrowCircleLeftIcon className='ltr:rotate-0 rtl:rotate-180' />
      </button>
      <button
        aria-label='Next'
        type='button'
        className={clsx(
          'w-8 h-8 absolute ltr:right-9 rtl:left-9 top-1/2 transform -translate-y-1/2',
          'z-10 hidden md:block',
        )}
        onClick={goNext(selectedSlide)}>
        <BlueArrowCircleRightIcon className='ltr:rotate-0 rtl:rotate-180' />
      </button>
      <Swiper {...sliderParams} onSwiper={(swiper) => setSelectedSlide(swiper)}>
        {(posts || []).map((post, index) => (
          <SwiperSlide key={post.id}>
            <Link href={post?.permalink || ''} target='_blank'>
              <div className='relative w-full aspect-[0.6]'>
                <Image
                  src={
                    post.media_type === 'IMAGE' ||
                    post.media_type === 'CAROUSEL_ALBUM'
                      ? post.media_url
                      : post.thumbnail_url
                  }
                  alt={`ultralight instagram post-${index + 1}`}
                  width={postWidth}
                  height={postHeight}
                  className='absolute top-0 left-0 h-full  object-cover object-top'
                  priority
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InstaFeedSlider;
