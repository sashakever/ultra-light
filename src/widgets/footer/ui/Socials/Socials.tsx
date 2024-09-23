import clsx from 'clsx';
import React, {FC} from 'react';

import {SocialsIconsBlock} from '@features';

import {BackgroundColorEnum, StrapiJoinUsBlockType} from '@shared/types';
import {getYear} from '@shared/utils';

type Props = {
  className?: string;
  joinUsBlock?: StrapiJoinUsBlockType;
};

const Socials: FC<Props> = ({className = '', joinUsBlock}) => (
  <div
    className={clsx(
      'w-full flex flex-col items-center lg:items-start pt-8 lg:pt-0 px-5 lg:px-0',
      'pb-8 lg:pb-0 border-b border-white border-opacity-20 lg:border-0',
      className,
    )}>
    <p className='text-s md:text-l text-gray-200 font-medium mb-3'>
      {joinUsBlock?.data.attributes?.Title}
    </p>
    <p
      className={clsx(
        'text-xs text-gray-300  lg:rem:w-[308px] mb-6',
        'text-center ltr:lg:text-left rtl:lg:text-right',
      )}>
      {joinUsBlock?.data.attributes?.Text}
    </p>
    <SocialsIconsBlock
      className='w-full md:w-fit lg:mb-6 rem:max-w-[240px] mx-auto md:mx-0'
      bgColor={BackgroundColorEnum.DARK}
      links={joinUsBlock?.data.attributes?.Links.data}
    />
    <p className='hidden lg:block text-xs text-white opacity-40'>
      {`Copyright © ${getYear()} Ultralight Store`}
    </p>
  </div>
);

export default Socials;
