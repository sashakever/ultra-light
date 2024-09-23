import React, {FC} from 'react';

type Props = {
  className?: string;
};

export const TicketIcon: FC<Props> = ({className}) => (
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
      d='M7.5 4.375v11.25m-5.625-2.562a.617.617 0 0 1 .5-.61 2.507 2.507 0 0 0 0-4.906.617.617 0 0 1-.5-.61V5a.625.625 0 0 1 .625-.625h15a.625.625 0 0 1 .625.625v1.938a.617.617 0 0 1-.5.609 2.508 2.508 0 0 0 0 4.906.618.618 0 0 1 .5.61V15a.625.625 0 0 1-.625.625h-15A.625.625 0 0 1 1.875 15v-1.938Z'
    />
  </svg>
);
