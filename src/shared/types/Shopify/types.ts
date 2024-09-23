import {Product} from '@shopify/hydrogen-react/storefront-api-types';
import {z} from 'zod';

import {
  collectionMinimalProductsScheme,
  collectionScheme,
  filterScheme,
} from '@shared/schemes';

export type ProductType = Product & {
  category?: string;
};

export type SortParamType =
  | 'price-low-high'
  | 'price-high-low'
  | 'best-selling'
  | 'newest'
  | 'featured';

export type SortOptionsType = {
  id: string;
  type: SortParamType;
  title: string;
  selected: boolean;
};

export type CollectionsSearchParamsType = {
  productsPerPage?: string;
  cursor?: string;
  count?: string;
  minPrice?: string;
  maxPrice?: string;
  productType?: string | string[];
  tag?: string | string[];
  productMetafield?: string | string[];
  productOption?: string | string[];
  sort?: SortParamType;
};

export type InputType = 'productType' | 'category';

export enum MetafieldKeysEnum {
  FavouritesCounter = 'favourites_counter',
  MightBeInterestedProducts = 'might_be_interested_products',
}

export type CollectionType = z.infer<typeof collectionScheme>;
export type CollectionMinimalProductsType = z.infer<
  typeof collectionMinimalProductsScheme
>;

export type FilterType = z.infer<typeof filterScheme>;
