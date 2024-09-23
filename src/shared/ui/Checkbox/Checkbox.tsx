import clsx from 'clsx';
import React, {ChangeEvent, FC, PropsWithChildren, useId} from 'react';

type Props = {
  className?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  onChange?: (isChecked: boolean) => void;
};

const Checkbox: FC<Props & PropsWithChildren> = ({
  className = '',
  isSelected = false,
  isDisabled = false,
  onChange = () => undefined,
  children,
}) => {
  const id = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label
      htmlFor={id}
      className='flex items-center gap-4 group cursor-pointer'>
      <input
        id={id}
        type='checkbox'
        checked={isSelected}
        disabled={isDisabled}
        className={clsx(
          'cursor-pointer text-base rounded-sm bg-white border border-gray-300 hover:bg-gray-200 group-hover:bg-gray-200',
          'peer relative h-5 w-5 shrink-0 appearance-none checked:bg-white focus:outline-none',
          'after:absolute after:left-[35%] after:top-[10%] after:border-gray-700 after:rem:checked:border-b-[1.5px]',
          "after:checked:rem:border-r-[1.5px] after:h-3 after:w-1.5 after:rotate-45 after:content-['']",
          className,
        )}
        onChange={handleChange}
      />
      {children}
    </label>
  );
};

export default Checkbox;
