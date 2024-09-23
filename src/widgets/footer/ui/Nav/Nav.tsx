import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {FC} from 'react';

import {
  StrapiContactUsBlockType,
  StrapiNavigationBlockType,
} from '@shared/types';
import {Logo} from '@shared/ui';

type Props = {
  className?: string;
  contactUsBlock?: StrapiContactUsBlockType;
  navBlocks?: StrapiNavigationBlockType[];
};

const Nav: FC<Props> = ({className = '', contactUsBlock, navBlocks}) => (
  <div className={clsx('flex flex-col lg:flex-row justify-between', className)}>
    <div
      className={clsx(
        'flex lg:flex-col justify-between lg:justify-normal gap-10 lg:gap-0 px-5 lg:px-0',
        'pb-8 lg:pb-0 border-b border-white border-opacity-20 lg:border-0',
      )}>
      <Logo className='lg:rem:mb-[38px]' color='white' />
      <div className='pt-8 lg:pt-0'>
        <p className='text-xs text-white uppercase mb-6'>
          {contactUsBlock?.data?.attributes.Title}
        </p>
        <div className='flex flex-col gap-1 mb-4'>
          {contactUsBlock?.data?.attributes?.Links?.data?.map((link) => (
            <Link
              key={link.id}
              className='shrink-0 flex items-center gap-2 hover:opacity-80'
              rel='noopener noreferrer'
              href={link.attributes.Href}
              target={link.attributes.Target}>
              {link.attributes.Icon.data ? (
                <Image
                  className='w-5 h-5 object-contain'
                  src={link.attributes.Icon.data.attributes.url}
                  width={link.attributes.Icon.data.attributes.width}
                  height={link.attributes.Icon.data.attributes.height}
                  alt={link.attributes.Title}
                />
              ) : null}
              <span className='text-xl font-medium text-white'>
                {link.attributes.Title}
              </span>
            </Link>
          ))}
        </div>
        <p className='text-xs text-white lg:rem:mb-[88px] whitespace-pre-line opacity-40 lg:opacity-100'>
          {contactUsBlock?.data?.attributes.Schedule}
        </p>
      </div>
    </div>
    <div
      className={clsx(
        'grid grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-[200px] lg:rem:pr-[128px] px-5 lg:px-0 pt-8 lg:pt-0',
        'pb-8 lg:pb-0 border-b border-white border-opacity-20 lg:border-0',
      )}>
      {navBlocks?.map((group) => (
        <div key={group.id} className='flex flex-col gap-6'>
          <p className='text-xs text-white uppercase'>
            {group.attributes.Title}
          </p>
          <nav className='flex flex-col gap-2'>
            {group.attributes.Links.data.map((item) => (
              <Link
                key={item.id}
                href={item.attributes.Href}
                className='text-s lg:text-l text-white capitalize hover:opacity-80'>
                {item.attributes.Title}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </div>
  </div>
);

export default Nav;
