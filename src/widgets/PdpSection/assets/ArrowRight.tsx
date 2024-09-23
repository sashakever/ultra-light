import React, {FC} from 'react';

type Props = {
  className?: string;
};

export const ArrowRight: FC<Props> = ({className}) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    fill='none'
    viewBox='0 0 20 20'>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M3.125 10h13.75M11.25 4.375 16.875 10l-5.625 5.625'
    />
  </svg>
);
