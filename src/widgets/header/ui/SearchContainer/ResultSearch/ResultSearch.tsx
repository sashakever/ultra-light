import {Product} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import React, {FC} from 'react';

import {CategorySlider} from '../CategorySlider';

import {ProductCard} from '@features';

import {ProductCardAdaptiveEnum, ProductCardSizesEnum} from '@shared/types';

type Props = {
  products: Product[];
  title: string | undefined | null;
  subtitle?: string | undefined | null;
};

const ResultSearch: FC<Props> = ({products, title, subtitle}) => (
  <>
    <div className='flex gap-4 justify-between'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-m md:text-3xl font-medium'>{title}</h2>
        {subtitle ? (
          <h3 className='text-s hidden md:block'>{subtitle}</h3>
        ) : null}
      </div>
    </div>
    <div
      className={clsx(
        'hidden w-full md:grid grid-cols-2 lg:grid-cols-3 pt-6 gap-3',
        'max-h-[calc(100%-4rem)] overflow-y-auto items-start',
      )}>
      {products.map((product: Product) =>
        product ? (
          <ProductCard
            key={product.id}
            product={product}
            size={ProductCardSizesEnum.SMALL}
            type={ProductCardAdaptiveEnum.DESKTOP}
            className='border-none'
          />
        ) : null,
      )}
    </div>
    <CategorySlider
      products={products}
      className='md:hidden mt-4'
      isCaption={false}
    />
  </>
);

export default ResultSearch;
