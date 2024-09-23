import React, {FC} from 'react';

type Props = {
  className?: string;
};

export const PlusIcon: FC<Props> = ({className}) => (
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
      d='M15 10H5m5 5V5'
    />
  </svg>
);
