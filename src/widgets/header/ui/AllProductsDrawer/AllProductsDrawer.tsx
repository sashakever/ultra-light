import clsx from 'clsx';
import React, {FC} from 'react';

import CategoriesDesktop from '../CategoriesDesktop';
import CategoriesMobile from './CategoriesMobile';

import {useAppSelector, useHeaderActions} from '@base/store';

import {StrapiCategoryType} from '@shared/types';
import {Drawer} from '@shared/ui';

type Props = {
  className?: string;
  categories: StrapiCategoryType[];
};

const AllProductsDrawer: FC<Props> = ({className = '', categories}) => {
  const isAllProductsOpen = useAppSelector(
    (state) => state.header.isAllProductsOpen,
  );
  const {closeAllProducts} = useHeaderActions();

  const handleClose = () => {
    closeAllProducts();
  };

  return (
    <Drawer
      className='w-screen'
      isFreeMenu
      isCloseButton={false}
      isOpen={isAllProductsOpen}
      onClose={handleClose}>
      <div
        className={clsx(
          'w-full h-full border-t border-black border-opacity-20',
          className,
        )}>
        <CategoriesMobile categories={categories} />
        <CategoriesDesktop categories={categories} />
      </div>
    </Drawer>
  );
};

export default AllProductsDrawer;
