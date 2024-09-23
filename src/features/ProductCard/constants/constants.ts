import {
  Color1,
  Color2,
  Color3,
  Image1,
  Image2,
} from '@features/ProductCard/assets';

import {ProductType} from '@shared/types';

export const COLORS = [
  {
    id: '1',
    name: 'Color1',
    colorHex: '',
    colorImg: Color1,
  },
  {
    id: '2',
    name: 'Color2',
    colorHex: '',
    colorImg: Color2,
  },
  {
    id: '3',
    name: 'Color3',
    colorHex: '',
    colorImg: Color3,
  },
  {
    id: '4',
    name: 'Black',
    colorHex: '#000000',
    colorImg: '',
  },
  {
    id: '5',
    name: 'White',
    colorHex: '#FFFFFF',
    colorImg: '',
  },
];

export const product1: ProductType = {
  id: 'gid://shopify/Product/8464659120462',
  title: 'Track Light',
  category: 'Indoor light',
  vendor: 'Ultra Lite',
  descriptionHtml: '',
  handle: 'track-light',
  priceRange: {
    minVariantPrice: {
      amount: '97.99',
      currencyCode: 'SAR',
    },
    maxVariantPrice: {
      amount: '97.99',
      currencyCode: 'SAR',
    },
  },
  compareAtPriceRange: {
    minVariantPrice: {
      amount: '139.99',
      currencyCode: 'SAR',
    },
    maxVariantPrice: {
      amount: '139.99',
      currencyCode: 'SAR',
    },
  },
  media: {
    nodes: [
      {
        mediaContentType: 'IMAGE',
        alt: '',
        // @ts-ignore
        previewImage: {
          url: 'https://cdn.shopify.com/s/files/1/1751/7213/files/230705_DANJOHN01_0076.jpg?v=1693581669',
        },
        id: 'gid://shopify/MediaImage/44204941967694',
        // @ts-ignore
        image: {
          url: Image1.src,
          width: Image1.width,
          height: Image1.height,
        },
      },
      {
        mediaContentType: 'IMAGE',
        alt: '',
        // @ts-ignore
        previewImage: {
          url: 'https://cdn.shopify.com/s/files/1/1751/7213/files/230705_DANJOHN01_0180.jpg?v=1693581963',
        },
        id: 'gid://shopify/MediaImage/44204942229838',
        // @ts-ignore
        image: {
          url: Image2.src,
          width: Image2.width,
          height: Image2.height,
        },
      },
    ],
  },
  variants: {
    nodes: [
      {
        id: 'gid://shopify/ProductVariant/46901177745742',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Taglia',
            value: '60',
          },
        ],
        // @ts-ignore
        image: {
          id: 'gid://shopify/ProductImage/51589505352014',
          url: Image1.src,
          altText: null,
          width: Image1.width,
          height: Image1.height,
        },
        priceV2: {
          amount: '97.99',
          currencyCode: 'EUR',
        },
        compareAtPriceV2: {
          amount: '139.99',
          currencyCode: 'EUR',
        },
        sku: 'YUAB55-1711-HAIBLU',
        title: '60',
        unitPrice: null,
      },
    ],
  },
  seo: {
    description: null,
    title: null,
  },
  metafields: [],
};
