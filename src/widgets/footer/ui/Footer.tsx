'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React, {FC} from 'react';

import Nav from './Nav';
import PayMethods from './PayMethods';
import Slider from './Slider';
import Socials from './Socials';

import {decor} from '@widgets/footer/assets';

import {StrapiFooterType} from '@shared/types';
import {Logo} from '@shared/ui';

type Props = {
  className?: string;
  footer?: StrapiFooterType;
};

const Footer: FC<Props> = ({className = '', footer}) => (
  <footer className={clsx('w-full pt-10', className)}>
    <div className='flex flex-col items-center gap-4 mb-8'>
      <Logo direction='vertical' />
      <p className='text-tone-700 text-xs'>Join UltraLight Family</p>
    </div>
    <Slider />
    <div className='relative lg:rem:px-[52px] bg-tone-700 pt-4 lg:pt-16 pb-10 lg:pb-5'>
      <Nav
        contactUsBlock={footer?.data.attributes.ContactUsBlock}
        navBlocks={footer?.data.attributes.NavigationBlocks.data}
      />
      <Socials joinUsBlock={footer?.data.attributes.JoinUsBlock} />
      <PayMethods
        className='md:relative md:z-10'
        bottomLinks={footer?.data.attributes.BottomLinks?.data || []}
      />
      <Image
        className='hidden lg:block absolute bottom-0 right-[10%] w-auto h-40 z-0'
        src={decor}
        alt='decor'
      />
    </div>
  </footer>
);

export default Footer;
