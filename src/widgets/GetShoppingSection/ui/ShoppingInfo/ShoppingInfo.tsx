import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {FC} from 'react';

import {TriangleIcon, VectorIcon} from '@widgets/GetShoppingSection/assets';

import {StrapiSlideType} from '@shared/types';

type Props = {
  slides: StrapiSlideType[];
};
const ShoppingInfo: FC<Props> = ({slides}) => (
  <div className='w-full flex flex-col ltr:md:flex-row rtl:md:flex-row-reverse gap-3'>
    {slides.map((item) => (
      <div
        key={item.id}
        className={clsx(
          'relative flex flex-col grow sm:justify-between bg-tone-50/50 border border-tone-50/50 rem:rounded-[20px]',
          'w-full rem:min-h-[237px] xl:rem:min-w-[488px] sm:rem:h-[440px]',
          'p-4 pt-8 pr-8 sm:p-11 sm:pr-8 xg:pr-32',
        )}>
        <div
          className={clsx(
            'w-[calc(100%-2rem)] h-[calc(100%+0.5rem)] absolute -top-1 left-4',
            'md:rounded-5xl z-0',
          )}
        />
        <Image
          className={clsx(
            'w-auto absolute z-0 h-36 -top-1 right-0',
            'sm:rem:h-[230px] sm:top-7 sm:right-0',
          )}
          src={VectorIcon}
          alt='image'
        />
        <Image
          className={clsx(
            'w-auto absolute z-0 rem:h-[184px] top-14 right-0',
            'sm:rem:h-[294px] sm:top-30 sm:right-0',
          )}
          src={TriangleIcon}
          alt='image'
        />
        <div className='relative z-10 flex flex-col justify-between h-full'>
          <div className='w-full flex flex-col'>
            {item.Icon.data ? (
              <Image
                className='w-7 h-7 sm:w-11 sm:h-11 rtl:self-end'
                src={item.Icon.data.attributes.url}
                width={item.Icon.data.attributes.width}
                height={item.Icon.data.attributes.height}
                alt={item.Title || ''}
              />
            ) : null}
            <h2
              className={clsx(
                'text-lg sm:text-3xl font-medium text-gray-700',
                'pt-5 pb-3 sm:rem:pt-[68px] sm:pb-4',
              )}>
              {item.Title}
            </h2>
            <p className='text-s text-gray-600 pb-2'>{item.Text}</p>
          </div>
          {item.ButtonLink ? (
            <Link
              className='text-s text-tone-700 py-4 text-left'
              href={item.ButtonLink}>
              {item.ButtonTitle}
            </Link>
          ) : null}
        </div>
      </div>
    ))}
  </div>
);

export default ShoppingInfo;
