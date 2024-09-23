import clsx from 'clsx';
import Link from 'next/link';
import React, {FC} from 'react';

import {PayIconsBlock} from '@features';

import {BackgroundColorEnum, StrapiLinkType} from '@shared/types';
import {getYear} from '@shared/utils';

type Props = {
  className?: string;
  bottomLinks: StrapiLinkType[];
};

const PayMethods: FC<Props> = ({className = '', bottomLinks}) => (
  <div
    className={clsx(
      'lg:absolute lg:bottom-5',
      'ltr:lg:rem:right-[52px] rtl:lg:rem:left-[52px]',
      'w-full lg:w-fit pt-8 lg:pt-0 px-5 lg:px-0',
      className,
    )}>
    <div className='w-full lg:w-fit flex flex-col-reverse lg:flex-col gap-10 lg:gap-7 items-end'>
      <PayIconsBlock
        className='pb-4 lg:pb-0 mx-auto md:mx-0'
        bgColor={BackgroundColorEnum.DARK}
      />
      <div className='flex flex-wrap justify-center lg:justify-end'>
        {bottomLinks.map((link) => (
          <Link
            key={link.id}
            className='px-1 text-xs text-white opacity-40 shrink-0'
            href={link.attributes.Href || '/'}>
            {link.attributes.Title}
          </Link>
        ))}
      </div>
    </div>
    <p className='lg:hidden text-xs text-white opacity-40 text-center'>
      {`Copyright © ${getYear()} Ultralight Store`}
    </p>
  </div>
);

export default PayMethods;
