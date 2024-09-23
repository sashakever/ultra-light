'use client';

import clsx from 'clsx';
import React, {FC} from 'react';

import CategoriesSlider from './CategoriesSlider';

import {StrapiSectionCategoriesType} from '@shared/types';
import {CategoriesTextAnimation} from '@shared/ui';

type Props = {
  className?: string;
  section: StrapiSectionCategoriesType;
};

const CategoriesSection: FC<Props> = ({className = '', section}) => (
  <section
    className={clsx(
      'w-full pt-5 pb-24 md:pb-9 flex flex-col items-center gap-8 md:gap-10',
      className,
    )}>
    <CategoriesTextAnimation
      textBefore={section.TextBefore}
      textAfter={section.TextAfter}
      advantages={section.Advantages}
    />
    <CategoriesSlider categories={section.Categories.data || []} />
  </section>
);

export default CategoriesSection;
