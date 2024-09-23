import React, {FC} from 'react';

type Props = {
  className?: string;
};

export const ClockIcon: FC<Props> = ({className}) => (
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
      d='M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z'
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M10 5.625V10h4.375'
    />
  </svg>
);
