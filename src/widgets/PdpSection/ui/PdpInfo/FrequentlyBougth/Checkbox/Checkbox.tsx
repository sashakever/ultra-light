import clsx from 'clsx';
import React, {FC, PropsWithChildren} from 'react';

type Props = {
  checkboxPosition?: string;
  checked?: boolean;
  className?: string;
  htmlFor: string;
  label?: string;
  onChange: () => void;
};

const Checkbox: FC<Props & PropsWithChildren> = ({
  checkboxPosition,
  checked,
  className,
  htmlFor,
  label,
  onChange,
  children,
}) => (
  <label
    className={clsx('checkbox relative cursor-pointer', className)}
    htmlFor={htmlFor}>
    {label}
    <input
      className={clsx(
        'absolute top-0 left-0 h-5 w-5 rounded accent-tone-700 hover:accent-tone-700 cursor-pointer',
        checkboxPosition,
      )}
      id={htmlFor}
      type='checkbox'
      checked={checked}
      onChange={onChange}
    />
    {children}
  </label>
);

export default Checkbox;
