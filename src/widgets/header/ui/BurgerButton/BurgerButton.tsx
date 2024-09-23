import clsx from 'clsx';
import React, {FC} from 'react';

import {useHeader} from '@base/hooks';
import {useAppSelector} from '@base/store';

type Props = {
  className?: string;
};

const BurgerButton: FC<Props> = ({className = ''}) => {
  const isMenuOpen = useAppSelector((state) => state.header.isMenuOpen);
  const {handleToggleMenu} = useHeader();

  return (
    <button
      type='button'
      aria-label='Burger'
      className={clsx(
        'group flex h-10 w-10 items-center justify-center',
        className,
      )}
      onClick={handleToggleMenu}>
      <div className='flex h-5 w-5 flex-col items-center justify-center'>
        <div
          className={clsx(
            'ease rem:mb-[3px] h-0.5 w-5 transform rounded-full bg-gray-900 transition duration-300',
            {'rotate-45 rem:translate-y-[2.5px]': isMenuOpen},
          )}
        />
        <div
          className={clsx(
            'ease h-0.5 w-5 transform rounded-full bg-gray-900 transition duration-300',
            {'-rotate-45 rem:-translate-y-[2.5px]': isMenuOpen},
          )}
        />
      </div>
    </button>
  );
};

export default BurgerButton;
