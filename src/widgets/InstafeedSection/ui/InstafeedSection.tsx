'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {FC} from 'react';
import {match} from 'ts-pattern';

import {InstafeedSlider} from './InstafeedSlider';

import {useGetInstafeedDataQuery} from '@base/api/instafeed/api';

import {StrapiSectionInstafeedType} from '@shared/types';

type Props = {
  section: StrapiSectionInstafeedType;
};

const InstafeedSection: FC<Props> = ({section}) => {
  const {data, isLoading} = useGetInstafeedDataQuery();

  return (
    <section className='flex flex-col gap-4 sm:gap-0 m-3 bg-gray-100'>
      {match({isLoading, data})
        .with({isLoading: true}, () => (
          <div className='w-full text-center p-3'>Loading...</div>
        ))
        .with({isLoading: false, data: undefined}, () => (
          // TODO fallback ui
          <div className='w-full text-center p-3'>
            Failed to fetch instagram data
          </div>
        ))
        .otherwise(() => (
          <>
            <div
              className={clsx(
                'grid grid-cols-2 sm:grid-cols-3 gap-2 items-center',
                'py-3 sm:py-5 px-4 sm:px-6',
              )}>
              <div className='flex items-center gap-2 sm:gap-6'>
                {section?.ProfileImage?.data ? (
                  <Image
                    alt='instagram profile picture'
                    src={section.ProfileImage.data.attributes.url}
                    width={28}
                    height={28}
                    className='h-7 sm:h-10 w-7 sm:w-10 object-cover rounded-full border border-gray-200'
                  />
                ) : null}
                <span className='text-s sm:text-l font-medium text-gray-700'>
                  {section?.ProfileName}
                </span>
              </div>
              <div
                className={clsx(
                  'text-right sm:text-center text-xs sm:text-s',
                  'font-medium text-gray-700',
                )}>
                {section?.FollowersCountText}
              </div>
              <div className='col-span-2 sm:col-span-1 text-center sm:text-right rtl:sm:text-left'>
                <Link
                  href='https://www.instagram.com/ultralightstores/'
                  className='text-s font-medium text-gray-700 underline'>
                  {section?.FollowText}
                </Link>
              </div>
            </div>
            {data ? <InstafeedSlider posts={data} /> : null}
          </>
        ))}
    </section>
  );
};

export default InstafeedSection;
