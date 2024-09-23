import React, {FC} from 'react';

type Props = {
  className?: string;
};

export const HeartIcon: FC<Props> = ({className}) => (
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
      d='m10.445 16.555 6.328-6.329c1.555-1.562 1.782-4.117.313-5.75a4.062 4.062 0 0 0-5.899-.164L10 5.508 8.976 4.477c-1.562-1.555-4.117-1.782-5.75-.313a4.063 4.063 0 0 0-.164 5.899l6.493 6.492a.633.633 0 0 0 .89 0v0Z'
    />
  </svg>
);
