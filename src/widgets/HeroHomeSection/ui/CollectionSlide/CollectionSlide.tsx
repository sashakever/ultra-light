import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {FC} from 'react';
import {match} from 'ts-pattern';
import {useWindowSize} from 'usehooks-ts';

import {Video} from '../Video';
import ProductCard from './ProductCard';

import {BREAKPOINT_MEDIUM} from '@shared/constants';
import {StrapiButtonType, StrapiSlideType} from '@shared/types';

type Props = {
  slide: StrapiSlideType;
  toCollectionButton: StrapiButtonType | null;
  outletLabel: string;
  priceLabel: string;
  isPlayed?: boolean;
};

const CollectionSlide: FC<Props> = ({
  slide,
  toCollectionButton,
  priceLabel,
  outletLabel,
  isPlayed = false,
}) => {
  const {width} = useWindowSize();

  return (
    <div className='md:h-full relative px-2 md:px-0 md:rem:rounded-[20px] overflow-hidden'>
      <div
        className={clsx(
          'rem:min-h-[404px] md:rem:min-h-[420px] h-full relative px-4 pt-32 pb-22 md:pb-9 md:pt-22',
          'flex flex-col justify-between',
          'md:px-0 md:pt-44 md:pb-3 md:min-h-auto overflow-hidden',
          {
            'rem:min-h-[700px] md:min-h-[404px]': slide.Product === null,
          },
        )}>
        {match(
          !!slide?.VideoDesktop?.data?.attributes.url ||
            !!slide?.VideoMobile?.data?.attributes.url,
        )
          .with(true, () => (
            <>
              {slide.VideoDesktop?.data ? (
                <Video
                  isPlayed={isPlayed}
                  className='hidden md:block w-full h-full absolute top-0 left-0 object-top object-cover'
                  src={slide.VideoDesktop.data.attributes.url ?? ''}
                />
              ) : null}
              {slide.VideoMobile?.data ? (
                <Video
                  isPlayed={isPlayed}
                  className='md:hidden w-full h-full absolute top-0 left-0 object-top object-cover'
                  src={slide.VideoMobile.data.attributes.url ?? ''}
                />
              ) : null}
            </>
          ))
          .with(false, () => (
            <>
              {width < BREAKPOINT_MEDIUM &&
              slide.ImageMobile.data?.attributes ? (
                <Image
                  className={clsx(
                    'md:hidden w-full h-full absolute top-0 left-0 object-cover object-top',
                    'rtl:-scale-x-100',
                  )}
                  src={slide.ImageMobile.data.attributes.url}
                  quality={90}
                  fill
                  alt={slide.Title || ''}
                  priority
                />
              ) : null}
              {width >= BREAKPOINT_MEDIUM && slide.ImageDesktop.data ? (
                <Image
                  className='hidden md:block w-full h-full absolute top-0 left-0 object-cover object-top'
                  src={slide.ImageDesktop.data.attributes.url}
                  width={slide.ImageDesktop.data.attributes.width}
                  height={slide.ImageDesktop.data.attributes.height}
                  alt={slide.Title || ''}
                  priority
                />
              ) : null}
            </>
          ))
          .otherwise(() => null)}

        <div
          className={clsx(
            'md:px-17 h-full',
            'flex flex-col justify-between flex-1',
            'md:justify-start md:flex-0',
          )}>
          <div className='relative'>
            {slide.Title ? (
              <h1
                className={clsx(
                  'text-3xl font-medium rem:max-w-[510px] text-gray-700 mb-3',
                  'md:text-4xl md:mb-6',
                )}>
                {slide.Title}
              </h1>
            ) : null}
            {slide.Text ? (
              <div className='text-xs md:text-s text-gray-700 mb-0 md:mb-0 md:max-w-[442px]'>
                {slide.Text}
              </div>
            ) : null}
          </div>
        </div>
        {toCollectionButton &&
        toCollectionButton.Link &&
        toCollectionButton.Title ? (
          <Link
            className={clsx(
              'relative z-50 text-xs md:text-s text-gray-700 font-medium',
              'flex items-center justify-center group md:hover:bg-tone-600',
              'w-fit h-13 transition-all duration-200 ease-linear rounded-full',
              'px-10 md:px-8 rtl:md:mr-6 ltr:md:ml-6 md:bottom-16 bg-tone-700 text-tone-100',
            )}
            href={toCollectionButton.Link}>
            {toCollectionButton.Title}
          </Link>
        ) : null}
      </div>

      {slide.Product ? (
        <ProductCard
          product={slide.Product}
          outletLabel={outletLabel}
          priceLabel={priceLabel}
        />
      ) : null}
    </div>
  );
};
export default CollectionSlide;
