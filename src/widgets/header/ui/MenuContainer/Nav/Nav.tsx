import clsx from 'clsx';
import React, {FC} from 'react';

import {useHeaderActions} from '@base/store';

import NavBlock from '@features/NavBlock/ui';

import {
  StrapiContactUsBlockType,
  StrapiNavigationBlockType,
} from '@shared/types';

type Props = {
  className?: string;
  contactUsBlock?: StrapiContactUsBlockType;
  navBlocks?: StrapiNavigationBlockType[];
};

const Nav: FC<Props> = ({className = '', contactUsBlock, navBlocks}) => {
  const {closeMenu} = useHeaderActions();

  return (
    <div
      className={clsx(
        'w-full md:gap-10 pl-5 pr-12 md:px-0 pb-8 md:pb-0',
        'flex justify-between rtl:justify-start rtl:md:justify-between',
        'border-b border-black border-opacity-20 md:border-0 gap-3',
        className,
      )}>
      <div className={clsx('rtl:text-right')}>
        <p className='text-xs uppercase text-gray-400 mb-6'>
          {contactUsBlock?.data?.attributes.Title}
        </p>
        <p className='text-m font-medium text-tone-700 mb-4 whitespace-pre-line'>
          {contactUsBlock?.data?.attributes.Phones}
        </p>
        <p className='text-xs text-gray-400 whitespace-pre-line'>
          {contactUsBlock?.data?.attributes.Schedule}
        </p>
      </div>
      {navBlocks?.map((group) => (
        <NavBlock
          key={group.id}
          className='hidden md:flex last:flex rtl:text-right'
          group={group}
          handleClick={closeMenu}
        />
      ))}
    </div>
  );
};

export default Nav;
