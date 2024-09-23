import clsx from 'clsx';
import React, {FC} from 'react';

import {ArrowSimpleLeftIcon} from '@shared/assets';

type Props = {
  count: number;
  currentSlide: number;
  nextLabel: string | null;
  handlePrev?: () => void;
  handleNext?: () => void;
};

const Navigation: FC<Props> = ({
  handleNext,
  handlePrev,
  nextLabel,
  count,
  currentSlide,
}) => (
  <div
    className={clsx(
      'absolute z-10 bottom-40 md:bottom-auto md:rem:top-[38px]',
      'ltr:left-6 ltr:md:left-96 rtl:right-6 rtl:md:right-96',
      'flex flex-row items-center gap-2 md:gap-3 mb-12',
    )}>
    <button
      aria-label='Prev'
      type='button'
      className={clsx(
        'w-8 h-8 md:w-11 md:h-11 flex items-center justify-center border border-gray-200',
        'rounded-full transition-color duration-300 bg-gray-100',
        'hover:bg-gray-700 hover:border-gray-700 group',
        {
          'pointer-events-none opacity-20': currentSlide === 0,
        },
      )}
      onClick={handlePrev}>
      <ArrowSimpleLeftIcon className='rotate-0 rtl:rotate-180 h-3 md:h-4.5 group-hover:stroke-gray-100 transition-all duration-300' />
    </button>
    <button
      aria-label='Next'
      type='button'
      className={clsx(
        'w-8 h-8 md:w-11 md:h-11 flex items-center justify-center border border-gray-200',
        'rounded-full transition-color duration-300 bg-gray-100',
        'hover:bg-gray-700 hover:border-gray-700 group',
        {
          'pointer-events-none opacity-20': currentSlide === count - 1,
        },
      )}
      onClick={handleNext}>
      <ArrowSimpleLeftIcon className='rotate-0 ltr:rotate-180 h-3 md:h-4.5 group-hover:stroke-gray-100 transition-all duration-300' />
    </button>
    <div className='text-xs font-normal text-gray-600 pl-2 md:pl-0 md:hidden'>
      {nextLabel}
    </div>
  </div>
);

export default Navigation;
