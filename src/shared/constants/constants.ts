import {Libraries} from '@react-google-maps/api';
import {Metadata} from 'next';

import {
  ColorType,
  FilterMapType,
  LangItemType,
  SortOptionsType,
} from '@shared/types';

export const BREAKPOINT_XSMALL = 300;
export const BREAKPOINT_SMALL = 600;
export const BREAKPOINT_MEDIUM = 1024;
export const BREAKPOINT_LARGE = 1280;
export const BREAKPOINT_DEFAULT = 1512;
export const BREAKPOINT_X_LARGE = 1921;

export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const PRODUCT_COLOR_OPTION_NAME = 'product color';

export const SORT_OPTIONS: SortOptionsType[] = [
  {id: '1', type: 'newest', title: 'Newest', selected: false},
  {id: '2', type: 'best-selling', title: 'Bestselling', selected: true},
  {
    id: '3',
    type: 'price-low-high',
    title: 'Price low to high',
    selected: false,
  },
  {
    id: '4',
    type: 'price-high-low',
    title: 'Price high to low',
    selected: false,
  },
];

export const DEFAULT_COUNTRY = 'sa';
export const DEFAULT_LOCALE = 'en';
export const LANG_LIST: LangItemType[] = [
  {
    id: '1',
    locale: 'en',
    label: 'Eng',
  },
  {
    id: '2',
    locale: 'ar',
    label: 'عربي',
  },
];

export const COMMON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const PRODUCT_METAFIELDS_KEY = [
  // {name: 'Product color', key: 'product_color'},
  {name: 'Light color', key: 'light_color'},
  {name: 'Bulb base', key: 'bulb_base'},
  {name: 'Size cut out', key: 'size_cut_out_mm'},
];

export const PRODUCTS_PER_PAGE_MOBILE = 8;
export const PRODUCTS_PER_PAGE_DESKTOP = 20;

export const DEFAULT_COUNT_PRODUCTS = 10;

export const COLORS: ColorType[] = [
  {
    id: '1',
    type: 'white',
    label: 'White',
    colorHex: '#FBF8F8',
  },
  {
    id: '2',
    type: 'gray',
    label: 'Gray',
    colorHex: '#929292',
  },
  {
    id: '3',
    type: 'brown',
    label: 'Brown',
    colorHex: '#5C4033',
  },
  {
    id: '4',
    type: 'black',
    label: 'Black',
    colorHex: '#111111',
  },
  {
    id: '5',
    type: 'beige',
    label: 'Beige',
    colorHex: '#F4F3D7',
  },
  {
    id: '6',
    type: 'yellow',
    label: 'Yellow',
    colorHex: '#FFDB00',
  },
  {
    id: '7',
    type: 'orange',
    label: 'Orange',
    colorHex: '#FF9A02',
  },
  {
    id: '8',
    type: 'green',
    label: 'Green',
    colorHex: '#3B7D22',
  },
  {
    id: '9',
    type: 'blue',
    label: 'Blue',
    colorHex: '#0058A3',
  },
  {
    id: '10',
    type: 'pink',
    label: 'Pink',
    colorHex: '#FFB8C3',
  },
  {
    id: '11',
    type: 'purple',
    label: 'Purple',
    colorHex: '#A96ECC',
  },
  {
    id: '12',
    type: 'red',
    label: 'Red',
    colorHex: '#F00000',
  },
  {
    id: '13',
    type: 'chrome',
    label: 'Chrome',
    colorHex: '#929292',
  },
  {
    id: '14',
    type: 'silver',
    label: 'silver',
    colorHex: '#929292',
  },
  {
    id: '15',
    type: 'multicolored',
    label: 'Multicolored',
    colorHex: '',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0811/2668/6999/files/multicolor.webp?v=1702888124',
  },
  {
    id: '16',
    type: 'gold',
    label: 'Gold',
    colorHex: '#FFD700',
  },
  {
    id: '17',
    type: 'satin nickel',
    label: 'Satin Nickel',
    colorHex: '#A3A19B',
  },
  {
    id: '18',
    type: 'grey',
    label: 'Grey',
    colorHex: '#808080',
  },
  {
    id: '19',
    type: 'copper',
    label: 'Copper',
    colorHex: '#b87333',
  },
  {
    id: '20',
    type: 'dark grey',
    label: 'Dark Grey',
    colorHex: '#5A5A5A',
  },
  {
    id: '21',
    type: 'graphite',
    label: 'Graphite',
    colorHex: '#251607',
  },
  {
    id: '22',
    type: 'clear',
    label: 'Clear',
    colorHex: '#FFFFFF',
  },
  {
    id: '23',
    type: 'stainless steel',
    label: 'Stainless Steel',
    colorHex: '#caccce',
  },
  {
    id: '24',
    type: 'amber',
    label: 'Amber',
    colorHex: '#FFBF00',
  },
];

export const MATCH_VARIANTS_TO_METAFIELDS_ARRAY: FilterMapType[] = [
  {
    id: '',
    type: 'productCategory',
    variantId: '',
    metafieldId: 'filter.p.m.custom.categories',
  },
  {
    id: '',
    type: 'sale',
    variantId: '',
    metafieldId: 'filter.p.m.custom.sale',
  },
  {
    id: 'filter.v.price',
    type: 'price',
    variantId: '',
    metafieldId: '',
  },
  {
    id: 'filter.p.product_type',
    type: 'productType',
    variantId: '',
    metafieldId: '',
  },
  {
    id: '',
    type: 'wattage',
    variantId: 'filter.v.option.wattage',
    metafieldId: 'filter.p.m.custom.wattage',
  },
  {
    id: '',
    type: 'lightColor',
    title: 'Color temperature',
    variantId: 'filter.v.option.light color',
    metafieldId: 'filter.p.m.custom.light_color',
  },
  {
    id: '',
    type: 'productColor',
    variantId: 'filter.v.option.product color',
    // metafieldId: 'filter.p.m.custom.product_color',
    metafieldId: '',
  },
  {
    id: '',
    type: 'sizeCutOut',
    variantId: 'filter.v.option.size cut out',
    metafieldId: 'filter.p.m.custom.size_cut_out_mm',
  },
  {
    id: '',
    type: 'size',
    variantId: 'filter.v.option.size',
    metafieldId: 'filter.p.m.custom.size',
  },
  {
    id: '',
    type: 'bulbBase',
    variantId: 'filter.v.option.bulb base',
    metafieldId: 'filter.p.m.custom.bulb_base',
  },
];

export const ADD_TO_CART_EN_TITLE = 'Add to cart';
export const ADD_TO_CART_AR_TITLE = 'أضف إلى السلة';
export const NOTIFY_ME_EN_TITLE = 'Notify me';
export const NOTIFY_ME_AR_TITLE = 'أشعرني، أعلمني، بلغني';
export const GOOGLE_MAPS_LIBRARIES: Libraries = ['places'];

export const DEFAULT_METADATA: Metadata = {
  title: 'Ultralight',
  description: 'Ultralight',
};
