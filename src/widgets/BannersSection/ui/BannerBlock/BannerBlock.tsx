import clsx from 'clsx';
import Image from 'next/image';
import React, {FC} from 'react';
import {useWindowSize} from 'usehooks-ts';

import {ProductPointMarker} from '@features';

import {StrapiPointType} from '@shared/types';

type Props = {
  className?: string;
  title: string | null;
  point: StrapiPointType;
};

const BannerBlock: FC<Props> = ({className = '', title, point}) => {
  const {width} = useWindowSize();

  return (
    <div
      className={clsx(
        'relative w-full p-4 md:p-9 aspect-[2.68] md:aspect-[2.84]',
        'flex rtl:justify-end ltr:justify-start',
        className,
      )}>
      {point.ImageMobile.data ? (
        <Image
          className='md:hidden absolute w-full h-full top-0 left-0 object-cover object-top z-0'
          src={point.ImageMobile.data.attributes.url}
          width={point.ImageMobile.data.attributes.width}
          height={point.ImageMobile.data.attributes.height}
          alt={title || ''}
        />
      ) : null}
      {point.ImageDesktop.data ? (
        <Image
          className='hidden md:block absolute w-full h-full top-0 left-0 object-cover object-top z-0'
          src={point.ImageDesktop.data.attributes.url}
          width={point.ImageDesktop.data.attributes.width}
          height={point.ImageDesktop.data.attributes.height}
          alt={title || ''}
        />
      ) : null}
      <ProductPointMarker point={point} width={width} />
      <div className='relative w-1/3 h-full flex flex-col md:justify-center gap-0.5 text-white z-10'>
        <h2 className='text-l md:text-4xl font-medium'>{title}</h2>
        <p className='text-2xs md:text-s'>{point.Subtitle}</p>
      </div>
    </div>
  );
};

export default BannerBlock;
