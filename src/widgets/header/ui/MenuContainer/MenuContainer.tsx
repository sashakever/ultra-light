import clsx from 'clsx';
import React, {FC} from 'react';

import Nav from './Nav';
import PayMethods from './PayMethods';
import SocialsBlock from './SocialsBlock';

import {StrapiHeaderType} from '@shared/types';
import {getYear} from '@shared/utils';

type Props = {
  className?: string;
  header?: StrapiHeaderType;
};

const MenuContainer: FC<Props> = ({className = '', header}) => (
  <div
    className={clsx(
      'w-full h-full border-t border-black border-opacity-20 overflow-y-auto',
      'md:rem:px-[60px] pt-6 md:pt-8 pb-10 md:rem:h-[440px]',
      className,
    )}>
    <div className='w-full h-fit md:h-full'>
      <div className='w-full md:h-full flex flex-col-reverse md:flex-row md:rem:gap-[60px]'>
        <div className='md:rem:w-[310px] md:px-6 md:py-12 flex items-center justify-center md:bg-tone-100'>
          <SocialsBlock joinUsBlock={header?.data.attributes?.JoinUsBlock} />
        </div>
        <div className='w-full h-full flex flex-col justify-between items-center'>
          <Nav
            contactUsBlock={header?.data.attributes?.ContactUsBlock}
            navBlocks={header?.data.attributes?.NavigationBlocks.data}
          />
          <PayMethods
            className='hidden md:flex'
            bottomLinks={header?.data.attributes?.BottomLinks.data}
          />
        </div>
      </div>
      <PayMethods
        className='md:hidden'
        bottomLinks={header?.data.attributes?.BottomLinks.data}
      />
      <p className='md:hidden text-xs text-center opacity-40 mt-6'>
        {`Copyright © ${getYear()} Ultralight Store`}
      </p>
    </div>
  </div>
);

export default MenuContainer;
