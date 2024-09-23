import clsx from 'clsx';
import React, {FC} from 'react';

import {CategorySlider} from '../CategorySlider';
import {RecentSearches} from '../RecentSearches';

import {useGetProductsByIdsQuery} from '@base/api';
import {useAppSelector} from '@base/store';

import {DEFAULT_LOCALE} from '@shared/constants';
import {StrapiProductType} from '@shared/types';
import {getShopifyId} from '@shared/utils';

type Props = {
  searchQuery: string;
  searchNoResultsTitle: string | null | undefined;
  searchNoResultsSubTitle: string | null | undefined;
  recentSearchesTitle: string | null | undefined;
  recentSearchesKeys: string | null | undefined;
  searchRecommendationTitle?: string | null;
  searchRecommendationSubTitle?: string | null;
  searchRecommendedProducts?: {
    data: {attributes: StrapiProductType}[];
  };
};

const EmptySearch: FC<Props> = ({
  searchQuery,
  searchNoResultsTitle,
  searchNoResultsSubTitle,
  recentSearchesTitle,
  recentSearchesKeys,
  searchRecommendationTitle,
  searchRecommendationSubTitle,
  searchRecommendedProducts,
}) => {
  const {lang} = useAppSelector((state) => state.header);
  const idsFromStrapi = searchRecommendedProducts?.data
    .map((product) =>
      product.attributes.ShopifyId
        ? getShopifyId(product.attributes.ShopifyId, 'Product')
        : null,
    )
    .filter(Boolean) as string[];

  const {data: products} = useGetProductsByIdsQuery({
    ids: idsFromStrapi || [],
    lang: lang?.locale || DEFAULT_LOCALE,
  });

  return (
    <div className='flex flex-col gap-4 justify-between h-full'>
      <div className='flex gap-4 justify-between'>
        <div className='flex flex-col gap-6 md:gap-2 px-6 py-10 md:p-0'>
          <h2 className='text-m rem:max-w-[185px] md:max-w-none md:text-3xl font-medium'>
            {searchNoResultsTitle} &ldquo;{searchQuery}&rdquo;
          </h2>
          <h2 className='text-s'>{searchNoResultsSubTitle}</h2>
        </div>
      </div>
      <RecentSearches
        className='md:hidden bg-white pt-4 pb-6'
        recentSearchesTitle={recentSearchesTitle}
        recentSearchesKeys={recentSearchesKeys}
      />
      <div className={clsx('w-full px-6 pb-15 md:p-0 md:pt-6 mt-auto')}>
        <CategorySlider
          searchRecommendationTitle={searchRecommendationTitle}
          searchRecommendationSubTitle={searchRecommendationSubTitle}
          products={products}
        />
      </div>
    </div>
  );
};

export default EmptySearch;
