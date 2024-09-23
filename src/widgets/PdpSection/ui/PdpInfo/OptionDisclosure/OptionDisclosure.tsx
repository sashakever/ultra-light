import {Transition} from '@headlessui/react';
import clsx from 'clsx';
import React, {FC, PropsWithChildren, useEffect, useState} from 'react';

import {ProductOptionType} from '@shared/types';

type Props = {
  className?: string;
  shouldOpen?: boolean;
  title: string;
  text?: string | null;
  plusPrice?: string;
  option?: ProductOptionType;
};

const OptionDisclosure: FC<Props & PropsWithChildren> = ({
  className = '',
  title,
  text = '',
  shouldOpen = false,
  plusPrice = '',
  option,
  children,
}) => {
  const selectedValue = option?.values.find((item) => item.isSelected);
  const selectedTitle = selectedValue?.value || text;

  const [isActive, setIsActive] = useState<boolean>(shouldOpen);

  useEffect(() => {
    setIsActive(shouldOpen);
  }, [shouldOpen, selectedValue]);

  return (
    <div className={clsx(className)}>
      <div>
        <div
          className={clsx(
            'border hover:border-tone-700 transition-all duration-300',
            {'border-gray-200': !isActive, 'border-tone-700': isActive},
          )}>
          <button
            className='w-full flex items-end justify-between py-3 px-4 sm:p-6'
            onClick={() => setIsActive(!isActive)}>
            <div className='flex flex-col items-start'>
              <span className='text-s sm:text-l font-medium'>{title}</span>
              <span className='text-xs sm:text-s text-gray-400 font-normal'>
                {selectedTitle}
              </span>
            </div>
            {plusPrice ? (
              <span className='text-s text-tone-700 font-medium'>{`+ ${plusPrice}`}</span>
            ) : null}
          </button>
          <div className='px-4 sm:px-6'>
            <Transition
              show={isActive}
              className='overflow-hidden transition-all duration-300'
              enter='transition transition-[max-height] duration-300 ease-in'
              enterFrom='transform max-h-0'
              enterTo='transform max-h-screen'
              leave='transition transition-[max-height] duration-300 ease-out'
              leaveFrom='transform max-h-screen'
              leaveTo='transform max-h-0'>
              <div>
                <div className='pb-3 sm:pb-6'>{children}</div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionDisclosure;
