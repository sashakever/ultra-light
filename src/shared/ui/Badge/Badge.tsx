'use client';

import clsx from 'clsx';
import React, {FC, PropsWithChildren} from 'react';

type Props = {
  className?: string;
  count?: number;
};

const Badge: FC<Props & PropsWithChildren> = ({
  className = '',
  count,
  children,
}) => (
  <div className={clsx('relative flex items-center justify-center', className)}>
    {count ? (
      <div
        className={clsx(
          'absolute top-0 right-0 md:top-1 md:right-1 w-4 h-4 rounded-full overflow-hidden',
          'flex items-center justify-center bg-tone-700',
        )}>
        <span className='text-2xs font-medium text-white'>{count}</span>
      </div>
    ) : null}
    {children}
  </div>
);

export default Badge;
