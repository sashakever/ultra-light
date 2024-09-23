import clsx from 'clsx';
import React, {FC, useEffect, useState} from 'react';
import {match} from 'ts-pattern';

import OptionDisclosure from '../OptionDisclosure';
import ProductColorBlock from './ProductColorBlock';
import TilesBlock from './TilesBlock';

import {useAppSelector} from '@base/store';

import {useOptions} from '@widgets/PdpSection/hooks';

import {SliderPagination} from '@shared';

type Props = {
  className?: string;
  optionNotSelectedTitle: string | null;
  optionsCount: number;
  selectedOptionsCount: number;
};

const OptionsPanel: FC<Props> = ({
  className = '',
  optionNotSelectedTitle,
  optionsCount,
  selectedOptionsCount,
}) => {
  const [shouldKeepDisclosureOpen, setShouldKeepDisclosureOpen] =
    useState<boolean>(false);
  const [activeDisclosureIndex, setActiveDisclosureIndex] =
    useState<number>(-1);
  const {options} = useAppSelector((state) => state.product);

  const {getAppliedOptions} = useOptions();
  const appliedOptions = getAppliedOptions();

  useEffect(() => {
    if (appliedOptions.length || shouldKeepDisclosureOpen) {
      setShouldKeepDisclosureOpen(true);
      setActiveDisclosureIndex(
        options.findIndex(
          (option) => !option.values.find((item) => item.isSelected),
        ),
      );
    } else {
      setActiveDisclosureIndex(-1);
    }
  }, [appliedOptions]);

  return (
    <div className={clsx('w-full flex flex-col gap-3 relative', className)}>
      {options.map((option, currentIndex) =>
        match(option.name)
          .with('Light color', () => (
            <OptionDisclosure
              shouldOpen={activeDisclosureIndex === currentIndex}
              key={option.id}
              title='Light color'
              text={optionNotSelectedTitle}
              option={option}>
              <TilesBlock
                optionKey={option.optionRawName}
                values={option.values}
                shouldRightBoldLine
              />
            </OptionDisclosure>
          ))
          .with('Product color', () => (
            <OptionDisclosure
              shouldOpen={activeDisclosureIndex === currentIndex}
              key={option.id}
              title='Product color'
              text={optionNotSelectedTitle}
              option={option}>
              <ProductColorBlock
                optionKey={option.optionRawName}
                values={option.values}
              />
            </OptionDisclosure>
          ))
          .otherwise(() => (
            <OptionDisclosure
              shouldOpen={activeDisclosureIndex === currentIndex}
              key={option.id}
              title={option.name}
              text={optionNotSelectedTitle}
              option={option}>
              <TilesBlock
                optionKey={option.optionRawName}
                values={option.values}
              />
            </OptionDisclosure>
          )),
      )}
      <div className='hidden md:block absolute top-1/2 -translate-y-1/2 -right-5'>
        <SliderPagination
          count={optionsCount}
          slidesPerView={selectedOptionsCount}
          currentSlide={0}
          color='dark'
          layout='vertical'
        />
      </div>
    </div>
  );
};

export default OptionsPanel;
