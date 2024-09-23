'use client';

import {Disclosure, Transition} from '@headlessui/react';
import clsx from 'clsx';
import React, {FC, ReactNode} from 'react';

import {MinusIcon, PlusIcon} from '@shared/assets';

type Props = {
  className?: string;
  title?: string;
  description?: string | ReactNode;
};

const DisclosureComponent: FC<Props> = ({
  title,
  description,
  className = '',
}) => (
  <Disclosure
    as='div'
    className={clsx(
      'bg-tone-100 px-6 py-4',
      'flex flex-col gap-6 md:gap-2',
      className,
    )}>
    {({open}) => (
      <>
        <Disclosure.Button
          className={clsx(
            'text-s md:text-l font-medium',
            'tone-70 flex gap-4 justify-between w-full',
            'ltr:text-left rtl:text-right',
          )}>
          <span className='sm:mt-1.5 flex-1'>{title}</span>
          <div
            className={clsx(
              'h-8 w-8 rounded-full bg-white',
              'flex items-center justify-center',
            )}>
            {open ? <MinusIcon /> : <PlusIcon />}
          </div>
        </Disclosure.Button>
        <Transition
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'>
          <Disclosure.Panel
            className={clsx(
              'text-gray-700 rem:max-w-[1028px] w-full',
              'text-s',
            )}>
            {description}
          </Disclosure.Panel>
        </Transition>
      </>
    )}
  </Disclosure>
);

export default DisclosureComponent;
