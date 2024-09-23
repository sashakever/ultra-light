import clsx from 'clsx';
import React, {FC} from 'react';

import {useAppSelector} from '@base/store';

import {useOptions} from '@widgets/PdpSection/hooks';

import {COLORS} from '@shared/constants';
import {ProductOptionValueType} from '@shared/types';

type Props = {
  className?: string;
  optionKey: string;
  values: ProductOptionValueType[];
};

const ProductColorBlock: FC<Props> = ({className = '', optionKey, values}) => {
  const {isLoading} = useAppSelector((state) => state.product);
  const {applyOption} = useOptions();

  const handleSelect = (value: ProductOptionValueType) => () => {
    applyOption(optionKey, value);
  };

  return (
    <div className={clsx('w-full flex flex-wrap gap-2', className)}>
      {values.map((item, index) => {
        const color =
          COLORS.find((c) => c.type === item.value.toLowerCase())?.colorHex ||
          '#FFFFFF';
        return (
          <button
            key={index}
            type='button'
            aria-label='color variant'
            className={clsx(
              'w-8 h-8 sm:w-13 sm:h-13 shrink-0 flex items-center justify-center rounded-full',
              'relative rem:border-[1.5px] group',
              {
                'border-tone-700': item.isSelected,
                'border-transparent': !item.isSelected,
              },
            )}
            disabled={item.isDisabled || isLoading}
            onClick={handleSelect(item)}>
            <div
              className='w-full h-full border-2 border-gray-200 rounded-full'
              style={{backgroundColor: color}}
            />
          </button>
        );
      })}
    </div>
  );
};

export default ProductColorBlock;
