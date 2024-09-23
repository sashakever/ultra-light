import React, {FC} from 'react';

type Props = {
  className?: string;
};

export const ShareIcon: FC<Props> = ({className}) => (
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
      d='M6.719 4.531 10 1.25l3.281 3.281M10 10V1.25m3.75 6.563h1.875a.625.625 0 0 1 .625.625v7.812a.624.624 0 0 1-.625.625H4.375a.625.625 0 0 1-.625-.625V8.437a.625.625 0 0 1 .625-.624H6.25'
    />
  </svg>
);
