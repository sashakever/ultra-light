import React, {FC} from 'react';

type Props = {
  className?: string;
};

export const ScanIcon: FC<Props> = ({className}) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    fill='none'
    viewBox='0 0 20 20'>
    <rect
      width='8'
      height='8'
      x='6'
      y='6'
      stroke='currentColor'
      strokeWidth='1.5'
      rx='1'
    />
    <path
      stroke='currentColor'
      strokeWidth='1.5'
      d='M3 13v3a1 1 0 0 0 1 1h3M3 7V4a1 1 0 0 1 1-1h3m10 10v3a1 1 0 0 1-1 1h-3m4-10V4a1 1 0 0 0-1-1h-3'
    />
  </svg>
);
