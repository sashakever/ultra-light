import {useMemo, useState} from 'react';

import {
  useGetBestSellingProductsQuery,
  useGetProductsByIdsQuery,
} from '@base/api';
import {useAppSelector} from '@base/store';

import {DEFAULT_LOCALE} from '@shared/constants';
import {StrapiSectionBestSellingType} from '@shared/types';
import {getCategoriesFromProduct, getShopifyId} from '@shared/utils';

const useBestSellers = (section: StrapiSectionBestSellingType) => {
  const {lang} = useAppSelector((state) => state.header);
  const [isTabsMode] = useState<boolean>(!!section?.Tabs?.length);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const productsFromStrapiIds = isTabsMode
    ? Array.from(
        new Set(
          section.Tabs.map((tab) =>
            tab.products.data.map((product) =>
              getShopifyId(product.attributes.ShopifyId, 'Product'),
            ),
          ).flat(),
        ),
      )
    : section.products.data?.map((product) =>
        getShopifyId(product.attributes.ShopifyId, 'Product'),
      );

  const {data: productsFromStrapiRaw} = useGetProductsByIdsQuery(
    {
      lang: lang?.locale || DEFAULT_LOCALE,
      ids: productsFromStrapiIds || [],
    },
    {skip: !productsFromStrapiIds?.length},
  );

  const {data: productsFromShopifyRaw} = useGetBestSellingProductsQuery(
    {
      lang: lang?.locale || DEFAULT_LOCALE,
      count: 8,
    },
    {
      skip: !!productsFromStrapiIds?.length,
    },
  );

  const productsRaw = productsFromStrapiRaw?.length
    ? productsFromStrapiRaw
    : productsFromShopifyRaw;

  const categories: {id: string; title: string}[] = useMemo(() => {
    const allCategories: string[] = [];
    if (isTabsMode) {
      section.Tabs.forEach((tab) => {
        if (tab.Title) allCategories.push(tab.Title);
      });
    } else if (productsRaw) {
      productsRaw.forEach((product) => {
        const categoriesArr = getCategoriesFromProduct(product);
        allCategories.push(...categoriesArr);
      });
    }

    return (
      Array.from(new Set(allCategories)).map((category, index) => ({
        id: (index + 1).toString(),
        title: category,
      })) || []
    );
  }, [productsRaw]);

  const activeTab = isTabsMode
    ? section.Tabs.find(
        (tab) =>
          tab.Title ===
          categories.find((c) => c.id === selectedCategoryId)?.title,
      )
    : undefined;

  const products =
    productsRaw?.filter((product) => {
      if (selectedCategoryId === '') return true;

      return isTabsMode
        ? !!activeTab?.products.data.find((p) =>
            product.id.includes(p.attributes.ShopifyId),
          )
        : getCategoriesFromProduct(product).includes(
            categories.find((category) => category.id === selectedCategoryId)
              ?.title || '',
          );
    }) || [];

  return {
    products,
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
  };
};

export default useBestSellers;
