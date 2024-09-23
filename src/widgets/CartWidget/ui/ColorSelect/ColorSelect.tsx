import {Float} from '@headlessui-float/react';
import {Listbox} from '@headlessui/react';
import clsx from 'clsx';
import React, {FC, useState} from 'react';

import {CaretDownIcon} from '@shared/assets';

type Props = {
  currentColor: string;
  allColors: string[];
  onChangeColor?: (color: string) => void;
};

const ColorSelect: FC<Props> = ({currentColor, allColors, onChangeColor}) => {
  const [selectedColor, setSelectedColor] = useState(
    allColors?.find((color) => color === currentColor) ?? allColors?.[0],
  );

  const handleChangeColor = (value: string) => {
    onChangeColor?.(value);
    setSelectedColor(value);
  };

  return (
    <Listbox
      as='div'
      value={selectedColor}
      onChange={handleChangeColor}
      className='relative'>
      <Float flip placement='bottom' shift={40}>
        <Listbox.Button className='font-bold flex items-center'>
          <div className='md:max-w-[50px] md:truncate whitespace-nowrap'>
            {selectedColor}
          </div>
          <CaretDownIcon />
        </Listbox.Button>
        <Listbox.Options
          className={clsx(
            'bg-white',
            'flex flex-col gap-0.5 shadow select-none',
          )}>
          {allColors.map((color) => (
            <Listbox.Option key={color} value={color}>
              {({selected}) => (
                <div
                  className={clsx(
                    'px-3 py-1 cursor-pointer hover:bg-gray-200 whitespace-nowrap',
                    {
                      'bg-gray-50 !cursor-auto': selected,
                    },
                  )}>
                  {color}
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Float>
    </Listbox>
  );
};

export default ColorSelect;
