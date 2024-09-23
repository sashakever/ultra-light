import React, {FC} from 'react';

type Props = {
  className?: string;
};

export const CubeIcon: FC<Props> = ({className}) => (
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
      d='M17.5 13.851V6.148a.632.632 0 0 0-.32-.546l-6.875-3.868a.61.61 0 0 0-.61 0L2.82 5.602a.633.633 0 0 0-.32.546v7.704a.633.633 0 0 0 .32.546l6.875 3.868a.61.61 0 0 0 .61 0l6.875-3.868a.632.632 0 0 0 .32-.546v0Z'
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M17.414 5.828 10.07 10 2.586 5.828M10.07 10 10 18.344'
    />
  </svg>
);
