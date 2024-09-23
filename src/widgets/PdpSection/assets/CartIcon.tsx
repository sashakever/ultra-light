import React, {FC} from 'react';

type Props = {
  className?: string;
};

export const CartIcon: FC<Props> = ({className}) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    width='21'
    height='20'
    fill='none'
    viewBox='0 0 21 20'>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M16.813 5.625H4.188a.633.633 0 0 0-.625.555l-1.11 10a.625.625 0 0 0 .617.695h14.86a.624.624 0 0 0 .617-.695l-1.11-10a.633.633 0 0 0-.624-.555v0Zm-9.438 0a3.125 3.125 0 0 1 6.25 0'
    />
  </svg>
);
