'use client';

import clsx from 'clsx';
import React, {FC, useRef} from 'react';

import useAnimation from './useAnimation';

type Props = {
  className?: string;
  textBefore: string | null;
  textAfter: string | null;
  advantages: string | null;
  position?: 'left' | 'middle' | 'right';
};

const CategoriesTextAnimation: FC<Props> = ({
  className = '',
  textBefore = '',
  textAfter = '',
  advantages = '',
  position = 'middle',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useAnimation(containerRef);
  const dataLeft = position !== 'left' ? 1 : 0;
  const dataRight = position !== 'right' ? 1 : 0;
  const advantagesArray = advantages ? advantages.split('\n') : [];

  return (
    <div
      ref={containerRef}
      className={clsx('flex items-center justify-center gap-4', className)}>
      <p data-left={dataLeft} className='text-s shrink-0'>
        {textBefore}
      </p>
      <div className='relative w-full text-l text-tone-700 font-medium overflow-hidden'>
        <p className='opacity-0 text-l font-medium'>Affordable</p>
        <div
          data-panel=''
          className='absolute bottom-0 left-1/2 -translate-x-1/2 w-fit'>
          {advantagesArray.map((text, index) => (
            <p key={index} className='text-center'>
              {text}
            </p>
          ))}
        </div>
      </div>
      <p data-right={dataRight} className='text-s shrink-0'>
        {textAfter}
      </p>
    </div>
  );
};

export default CategoriesTextAnimation;
