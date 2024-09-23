import clsx from 'clsx';
import Link from 'next/link';
import React, {FC} from 'react';

import {PayIconsBlock} from '@features';

import {StrapiLinkType} from '@shared/types';

type Props = {
  className?: string;
  bottomLinks?: StrapiLinkType[];
};

const PayMethods: FC<Props> = ({className = '', bottomLinks}) => (
  <div className={clsx('w-full lg:w-fit pt-8 lg:pt-0 px-5 lg:px-0', className)}>
    <div className='w-full lg:w-fit flex flex-col-reverse gap-8 md:gap-10 lg:gap-7 items-end'>
      <PayIconsBlock className='pb-4 lg:pb-0 mx-auto' />
      <div className='w-full lg:w-fit flex flex-wrap justify-center lg:justify-end'>
        {bottomLinks?.map((link) => (
          <Link
            key={link.id}
            className='px-1 text-xs shrink-0'
            href={link.attributes.Href || '/'}>
            {link.attributes.Title}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default PayMethods;
