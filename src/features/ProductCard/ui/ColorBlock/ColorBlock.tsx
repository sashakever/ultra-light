import clsx from 'clsx';
import Image from 'next/image';
import React, {FC} from 'react';

import {ColorType} from '@shared/types';

type Props = {
  className?: string;
  colors: ColorType[];
  selectedColor: ColorType | null;
  handleSelectColor: (color: ColorType) => void;
};

const ColorBlock: FC<Props> = ({
  className = '',
  colors,
  selectedColor,
  handleSelectColor,
}) => (
  <div className={clsx('w-full overflow-x-auto', className)}>
    <div className='w-fit flex gap-0.5'>
      {colors.map((color) => (
        <div
          key={color.id}
          className={clsx(
            'rem:border-[1.5px] rem:w-[42px] rem:h-[42px] rounded-full bg-white flex items-center justify-center',
            {
              'border-tone-700': selectedColor?.id === color.id,
              'border-transparent': selectedColor?.id !== color.id,
            },
          )}>
          <button
            className={clsx(
              'relative w-9 h-9 border rounded-full overflow-hidden',
              {
                'border-transparent': selectedColor?.id === color.id,
                'border-gray-300': selectedColor?.id !== color.id,
              },
            )}
            style={{
              backgroundColor: color.colorHex ? color.colorHex : '#FFFFFF',
            }}
            onClick={() => handleSelectColor(color)}>
            {color.imgUrl ? (
              <Image
                className='absolute top-0 left-0 w-full h-full object-cover'
                src={color.imgUrl}
                alt={color.label}
              />
            ) : null}
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default ColorBlock;
