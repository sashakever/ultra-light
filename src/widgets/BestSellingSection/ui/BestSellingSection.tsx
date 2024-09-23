'use client';

import clsx from 'clsx';
import React, {FC} from 'react';

import CategoriesFilter from './CategoriesFilter';
import ProductsSlider from './ProductsSlider';

import {useBestSellers} from '@widgets/BestSellingSection/hooks';

import {StrapiSectionBestSellingType} from '@shared/types';

type Props = {
  className?: string;
  section: StrapiSectionBestSellingType;
};

const BestSellingSection: FC<Props> = ({className = '', section}) => {
  const {products, categories, selectedCategoryId, setSelectedCategoryId} =
    useBestSellers(section);

  return (
    <section
      id='best-selling-section'
      className={clsx(
        'w-full pt-12 md:pt-20 pb-6 md:pb-5 bg-tone-700 flex flex-col',
        className,
      )}>
      <h2 className='text-xl md:text-3xl font-medium text-gray-100 text-center mb-2 md:mb-3'>
        {section.Title}
      </h2>
      <p className='text-xs md:text-s font-normal text-gray-100 text-center mb-6 md:mb-10'>
        {section.Subtitle}
      </p>
      <CategoriesFilter
        className='mb-6 md:mb-12'
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <ProductsSlider products={products} priorityLoading />
    </section>
  );
};

export default BestSellingSection;
