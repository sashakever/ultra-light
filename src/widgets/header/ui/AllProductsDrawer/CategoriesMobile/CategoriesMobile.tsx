import clsx from 'clsx';
import React, {FC, useState} from 'react';

import AllCategoriesPanel from './AllCategoriesPanel';
import CategoryPanel from './CategoryPanel';

import {useHeaderActions} from '@base/store';

import {ArrowSimpleLeftIcon, CloseIcon} from '@shared/assets';
import {StrapiCategoryType} from '@shared/types';
import {Button, ButtonVariantEnum} from '@shared/ui';

type Props = {
  className?: string;
  categories: StrapiCategoryType[];
};

const CategoriesMobile: FC<Props> = ({className = '', categories}) => {
  const [activeCategory, setActiveCategory] =
    useState<StrapiCategoryType | null>(null);
  const {closeAllProducts} = useHeaderActions();

  const handleChangeCategory = (id: number) => {
    setActiveCategory(
      categories.find((category) => category.id === id) || null,
    );
  };
  const activeCategoryId = activeCategory?.id || -1;

  const handleBack = () => setActiveCategory(null);
  const handleClose = () => {
    closeAllProducts();
  };

  return (
    <div className={clsx('md:hidden w-full h-full flex flex-col', className)}>
      <div
        className={clsx(
          'w-full h-14 flex items-center justify-between px-5 shrink-0',
          'border-b border-black border-opacity-20',
        )}>
        {activeCategory ? (
          <Button
            className='!px-0'
            icon={<ArrowSimpleLeftIcon className='rem:w-[7px] h-3' />}
            variant={ButtonVariantEnum.WHITE}
            onClick={handleBack}>
            Go back
          </Button>
        ) : (
          <p className='text-xs font-medium'>All Products</p>
        )}
        <Button
          className='!px-0'
          icon={<CloseIcon className='rem:w-[11px] rem:h-[11px]' />}
          variant={ButtonVariantEnum.WHITE}
          onClick={handleClose}>
          Close
        </Button>
      </div>
      <div className='relative w-full h-full'>
        <AllCategoriesPanel
          activeCategoryId={activeCategoryId}
          handleChangeCategory={handleChangeCategory}
          categories={categories}
        />
        <CategoryPanel activeCategory={activeCategory} />
      </div>
    </div>
  );
};
export default CategoriesMobile;
