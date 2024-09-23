'use client';

import clsx from 'clsx';
import React, {FC} from 'react';

import BannerBlock from './BannerBlock';
import VideoBlock from './VideoBlock';

import {useStrapiSlides} from '@shared/hooks';
import {StrapiCollectionBannersType, StrapiPointType} from '@shared/types';

type Props = {
  className?: string;
  section: StrapiCollectionBannersType;
};

const BannersSection: FC<Props> = ({className = '', section}) => {
  const data = section?.attributes;
  console.log('data', data);
  const {slides} = useStrapiSlides(data.Points);
  const countPoints = 2 - (data?.Videos?.length || 0);
  const points = countPoints > 0 ? slides.slice(0, countPoints) : [];

  return (
    <div
      className={clsx(
        'relative w-full px-2 md:px-3 flex flex-col md:flex-row gap-3',
        className,
      )}>
      {points.length === 2 ? (
        <div
          className={clsx(
            'absolute top-1/2 left-[13%] md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full',
            'rem:w-[53px] rem:h-[30px] md:rem:w-[34px] md:rem:h-[68px] bg-white',
            'flex items-center justify-center',
          )}>
          <span className='text-xs md:text-s font-medium'>
            {data.DividerText}
          </span>
        </div>
      ) : null}
      {(data?.Videos || []).map((video) => (
        <VideoBlock key={video.id} video={video} />
      ))}
      {points.map((point) => (
        <BannerBlock
          key={point.id}
          point={point as StrapiPointType}
          title={point.Title}
        />
      ))}
    </div>
  );
};

export default BannersSection;
