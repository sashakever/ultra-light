import {Product} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import React, {FC, useEffect, useState} from 'react';

import {EmptySearch} from './EmptySearch';
import {RecentSearches} from './RecentSearches';
import {ResultSearch} from './ResultSearch';

import {useGetProductsByIdsQuery} from '@base/api';
import {useSearch} from '@base/hooks';
import {useAppSelector, useHeaderActions} from '@base/store';

import {CloseIcon} from '@shared/assets';
import {DEFAULT_LOCALE} from '@shared/constants';
import {StrapiHeaderType} from '@shared/types';
import {Button, ButtonVariantEnum} from '@shared/ui';
import {filterNullProducts, getShopifyId} from '@shared/utils';

type Props = {
  className?: string;
  header?: StrapiHeaderType;
};

const SearchContainer: FC<Props> = ({className = '', header}) => {
  const {lang, searchQuery} = useAppSelector((state) => state.header);
  const {closeSearch} = useHeaderActions();
  const idsFromStrapi = header?.data?.attributes?.SuggestionsProducts?.data
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

  const [mainProducts, setMainProducts] = useState<Product[] | undefined>([]);

  useEffect(() => {
    if (products) {
      setMainProducts(products);
    }
  }, [products]);

  const {data: searchData, isFetching} = useSearch({
    lang: lang?.locale || DEFAULT_LOCALE,
    query: searchQuery,
    first: 50,
  });

  useEffect(() => {
    if (!isFetching) {
      if (searchQuery) {
        setMainProducts(searchData?.nodes ?? []);
      } else {
        setMainProducts(products);
      }
    }
  }, [searchData, searchQuery, isFetching]);

  return (
    <div
      className={clsx(
        'w-full h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden',
        'md:h-full md:max-h-[calc(min(40rem,80vh))]',
        '2xl:max-h-[calc(min(43rem,80vh))] ',
        'border-t gap-5 flex flex-col md:flex-row md:p-3',
        className,
      )}>
      <Button
        variant={ButtonVariantEnum.INVISIBLE}
        onClick={() => closeSearch()}
        className='px-2 absolute ltr:right-6 rtl:left-6 top-2.5 rem:md:top-[42]'>
        <div className='flex gap-3 items-center text-gray-700 rtl:flex-row-reverse'>
          <CloseIcon className='w-2.5 h-2.5 mb-0.5' />
          <span>{header?.data?.attributes?.SearchCloseText}</span>
        </div>
      </Button>
      <RecentSearches
        className={clsx('mt-1', {
          'hidden md:flex': !mainProducts?.length,
        })}
        recentSearchesTitle={header?.data?.attributes?.RecentSearchesTitle}
        recentSearchesKeys={header?.data?.attributes?.RecentSearchesKeys}
      />
      <div className='flex-1 w-full md:h-full md:max-w-[80%] 2xl:max-w-[70%]'>
        <div
          className={clsx('h-full bg-tone-100 md:p-3 md:pt-8', {
            'p-6 md:p-3 md:pt-8': mainProducts?.length,
          })}>
          {!mainProducts?.length ? (
            <EmptySearch
              searchNoResultsTitle={
                header?.data?.attributes?.SearchNoResultsTitle
              }
              searchNoResultsSubTitle={
                header?.data?.attributes?.SearchNoResultsSubtitle
              }
              recentSearchesTitle={
                header?.data?.attributes?.RecentSearchesTitle
              }
              recentSearchesKeys={header?.data?.attributes?.RecentSearchesKeys}
              searchRecommendationTitle={
                header?.data?.attributes?.SearchRecommendationTitle
              }
              searchRecommendationSubTitle={
                header?.data?.attributes?.SearchRecommendationSubtitle
              }
              searchRecommendedProducts={
                header?.data?.attributes?.SearchRecommendedProducts
              }
              searchQuery={searchQuery}
            />
          ) : (
            <ResultSearch
              products={filterNullProducts(mainProducts)}
              title={
                searchQuery
                  ? header?.data?.attributes?.SearchResultsTitle
                  : header?.data?.attributes?.SearchSuggestionsTitle
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
