'use client';

import clsx from 'clsx';
import React, {FC} from 'react';

import {ProductsSlider} from './ProductsSlider';

import {useGetProductsByIdsQuery} from '@base/api';
import {useAppSelector} from '@base/store';

import {DEFAULT_LOCALE} from '@shared';
import {StrapiSectionMightBeInterestedType} from '@shared/types';
import {getShopifyId} from '@shared/utils';

type Props = {
  className?: string;
  section: StrapiSectionMightBeInterestedType;
  ids?: string[];
};

const MaybeInterestedSection: FC<Props> = ({className = '', section, ids}) => {
  const {lang} = useAppSelector((state) => state.header);
  const idsFromStrapi = section?.Products?.data
    .map((product) =>
      product.attributes.ShopifyId
        ? getShopifyId(product.attributes.ShopifyId, 'Product')
        : null,
    )
    .filter(Boolean) as string[];

  const {data: products} = useGetProductsByIdsQuery({
    ids: ids || idsFromStrapi || [],
    lang: lang?.locale || DEFAULT_LOCALE,
  });

  if (!products || (products && !products.length)) return null;

  return (
    <section className={clsx('mx-2 flex flex-col bg-white', className)}>
      <div
        className={clsx(
          'text-s md:text-l font-medium px-4 py-3 md:px-6 md:py-5',
        )}>
        {section.Title}
      </div>
      <ProductsSlider
        products={products.filter(Boolean)}
        className='py-4 rem:pb-[22px] md:py-13'
      />
    </section>
  );
};

export default MaybeInterestedSection;
