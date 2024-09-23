import clsx from 'clsx';
import React, {FC} from 'react';

import {useAppSelector} from '@base/store';

import {useOptions} from '@widgets/PdpSection/hooks';

import {ProductOptionValueType} from '@shared/types';

type Props = {
  className?: string;
  optionKey: string;
  values: ProductOptionValueType[];
  shouldRightBoldLine?: boolean;
};

const TilesBlock: FC<Props> = ({
  className = '',
  optionKey,
  values,
  shouldRightBoldLine = false,
}) => {
  const {isLoading} = useAppSelector((state) => state.product);
  const {applyOption} = useOptions();
  const handleSelect = (value: ProductOptionValueType) => () => {
    applyOption(optionKey, value);
  };

  return (
    <div className={clsx('w-full flex flex-wrap gap-2', className)}>
      {values.map((item, index) => (
        <button
          key={index}
          className={clsx(
            'h-10 md:h-12 px-3 md:rem:min-w-[48px] shrink-0 flex items-center justify-center',
            'relative border group',
            {
              'border-tone-700': item.isSelected,
              'border-gray-200': !item.isSelected,
            },
          )}
          disabled={item.isDisabled || isLoading}
          onClick={handleSelect(item)}>
          {shouldRightBoldLine ? (
            <div className='absolute right-0 h-full rem:p-[1px]'>
              <div className='rem:w-[5px] h-full bg-tone-700 group-disabled:opacity-40' />
            </div>
          ) : null}
          <span className='text-xs sm:text-s font-medium group-disabled:opacity-40'>
            {item.value}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TilesBlock;
