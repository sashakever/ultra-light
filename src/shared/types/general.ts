import {
  MediaImage,
  Product,
} from '@shopify/hydrogen-react/storefront-api-types';
import {StaticImageData} from 'next/image';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type ArrayElementType<A> = A extends readonly (infer T)[] ? T : never;

export enum SearchParamsEnum {
  'MODAL_TYPE' = 'modalType',
}

export enum ModalParamsValueEnum {
  'SIGN_IN' = 'signIn',
  'SIGN_UP' = 'signUp',
  'FORGOT_PASSWORD' = 'forgotPassword',
  'RESET_PASSWORD' = 'resetPassword',
  'NOTIFICATION' = 'notification',
}

export enum OpenFromEnum {
  RIGHT = 'right',
  LEFT = 'left',
}

export type ImageType = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type NavItemType = {
  id: string;
  title: string;
  link: string;
  highlighted?: boolean;
};

export type NavBlockType = {
  id: string;
  title: string;
  items: NavItemType[];
};

export enum BackgroundColorEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ProductCardAdaptiveEnum {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}
export enum ProductCardSizesEnum {
  EXTRA_SMALL = 'xs',
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

export type BreadcrumbType = {
  path: string;
  label: string;
};

export enum RoundedPositionEnum {
  Left = 'left',
  Right = 'right',
  Top = 'top',
  Bottom = 'bottom',
}
export enum RoundedBackgroundEnum {
  Gray = 'gray',
  White = 'white',
}

export type LangItemType = {
  id: string;
  locale: string;
  label: string;
};

export type NotIncludedDataType = {
  title: string;
  text: string;
  products: Product[];
};

export type ProductOptionValueType = {
  id: string;
  value: string;
  isSelected: boolean;
  isDisabled: boolean;
};

export type ProductOptionType = {
  id: string;
  name: string;
  optionRawName: string;
  type: 'variant' | 'metafield';
  values: ProductOptionValueType[];
};

export type DeliveryDatesType = {
  firstDate: string;
  lastDate: string;
};

export type ColorType = {
  id: string;
  type: string;
  label: string;
  colorHex: string;
  imgUrl?: string;
};

export type ItemForFilterType = {
  id: string;
  type: string;
  isSelected: boolean;
  input: {name: string; label: string; color?: ColorType};
};

export type CustomFilterUIType =
  | 'sale'
  | 'price'
  | 'productType'
  | 'wattage'
  | 'lightColor'
  | 'productColor'
  | 'productCategory'
  | 'sizeCutOut'
  | 'size'
  | 'bulbBase';

export type CustomFilterValueType = {
  id: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  name: string;
  value: string;
  colorHex?: string;
  colorUrl?: string;
  minPrice?: number;
  maxPrice?: number;
  minAppliedPrice?: number;
  maxAppliedPrice?: number;
};

export type CustomFilterType = {
  id: string;
  label: string;
  type: CustomFilterUIType;
  key: 'productOption' | 'productType' | 'price' | 'boolean';
  values: CustomFilterValueType[];
};

export type FilterMapType = {
  id: string;
  title?: string;
  type: CustomFilterUIType;
  variantId: string;
  metafieldId: string;
};

export type VariantFilterParamType = Record<string, string | boolean>;
export type PriceFiltersQueryParamType = Record<
  'price',
  {max?: number; min?: number}
>;
export type VariantOptionFiltersQueryParamType = Record<
  'variantOption',
  {name: string; value: string}
>;
export type ProductMetafieldFiltersQueryParamType = Record<
  'productMetafield',
  {namespace: string; key: string; value: string}
>;
export type FiltersQueryParamsType = Array<
  | VariantFilterParamType
  | PriceFiltersQueryParamType
  | VariantOptionFiltersQueryParamType
  | ProductMetafieldFiltersQueryParamType
>;

export type StoreDataType = {
  id: number;
  name: string;
  address: string;
  coordinates: google.maps.LatLngLiteral;
  storeMedia: {
    image: StaticImageData;
    mobileImage: StaticImageData;
  };
};

export type ActiveMediaImageType = {item: MediaImage['image']; index: number};

export enum PageTypeEnum {
  HOME_PAGE = 'home-page',
  COLLECTION_PAGE = 'collection-page',
  ABOUT_PAGE = 'about-page',
  BLOG_PAGE = 'blog-page',
  CONTACT_PAGE = 'contact-us-page',
  PRODUCT_PAGE = 'product-page',
  ORDER_STATUS_PAGE = 'order-status-page',
  NOT_FOUND_PAGE = 'not-found-page',
}
