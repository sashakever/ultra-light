import clsx from 'clsx';
import React, {FC} from 'react';

import {SocialsIconsBlock} from '@features';

import {StrapiJoinUsBlockType} from '@shared/types';
import {getYear} from '@shared/utils';

type Props = {
  className?: string;
  joinUsBlock?: StrapiJoinUsBlockType;
};

const SocialsBlock: FC<Props> = ({className = '', joinUsBlock}) => (
  <div
    className={clsx(
      'w-full flex flex-col items-center lg:items-start pt-8 lg:pt-0 px-5 lg:px-0',
      'pb-8 lg:pb-0 border-b border-opacity-20 md:border-0 border-black',
      className,
    )}>
    <p className='w-full text-m md:text-l font-medium mb-3 text-center'>
      {joinUsBlock?.data.attributes?.Title}
    </p>
    <p className='text-xs opacity-40 mb-6 text-center text-gray-700'>
      {joinUsBlock?.data.attributes?.Text}
    </p>
    <SocialsIconsBlock
      className='w-full md:w-fit rem:max-w-[240px] mx-auto'
      links={joinUsBlock?.data.attributes?.Links.data}
    />
    <p className='hidden lg:block text-xs text-white opacity-40'>
      {`Copyright © ${getYear()} Ultralight Store`}
    </p>
  </div>
);

export default SocialsBlock;
