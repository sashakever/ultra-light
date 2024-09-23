import React, {FC} from 'react';

type Props = {
  className?: string;
};

export const CloseIcon: FC<Props> = ({className}) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    viewBox='0 0 24 24'>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M16.243 16.243 7.758 7.757m-.001 8.486 8.485-8.486'
    />
  </svg>
);
