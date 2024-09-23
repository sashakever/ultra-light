import {Product} from '@shopify/hydrogen-react/storefront-api-types';

import {
  Accessories,
  Bulbs,
  IndoorLight,
  OutdoorLight,
  Switches,
} from '@widgets/header/assets';

import {Image1, Image2} from '@features/ProductCard/assets';

export const HEADER_BURGER_NAV = [
  {
    id: '1',
    title: 'menu',
    items: [
      {
        id: '1',
        title: 'All products',
        link: '/',
      },
      {
        id: '2',
        title: 'New products',
        link: '/',
      },
      {
        id: '3',
        title: 'Hot products',
        link: '/',
      },
      {
        id: '4',
        title: 'Best sellers',
        link: '/',
      },
      {
        id: '5',
        title: 'Sale',
        link: '/',
        highlighted: true,
      },
    ],
  },
  {
    id: '2',
    title: 'category',
    items: [
      {
        id: '1',
        title: 'Indoor Light',
        link: '/',
      },
      {
        id: '2',
        title: 'Outdoor Light',
        link: '/',
      },
      {
        id: '3',
        title: 'Bulbs',
        link: '/',
      },
      {
        id: '4',
        title: 'Switches',
        link: '/',
      },
      {
        id: '5',
        title: 'Accessories',
        link: '/',
      },
    ],
  },
  {
    id: '2',
    title: 'links',
    items: [
      {
        id: '1',
        title: 'Help',
        link: '/',
      },
      {
        id: '2',
        title: 'reviews',
        link: '/',
      },
      {
        id: '3',
        title: 'about',
        link: '/',
      },
      {
        id: '4',
        title: 'Track order',
        link: '/',
      },
    ],
  },
];

export const MAIN_NAV = [
  {
    id: 1,
    title: 'New Products',
    link: '/',
  },
  {
    id: 2,
    title: 'Hot Products',
    link: '/',
  },
  {
    id: 3,
    title: 'Best sellers',
    link: '/',
  },
  {
    id: 4,
    title: 'Sale',
    link: '/',
    highlighted: true,
  },
];

export const CATEGORIES = [
  {
    id: '1',
    title: 'Indoor light',
    image: IndoorLight,
    items: [
      {
        id: '1',
        title: 'Down light',
        link: '/',
      },
      {
        id: '2',
        title: 'Panel light',
        link: '/',
      },
      {
        id: '3',
        title: 'Stair light',
        link: '/',
      },
      {
        id: '4',
        title: 'Indoor pendant light',
        link: '/',
      },
      {
        id: '5',
        title: 'Linear light',
        link: '/',
      },
      {
        id: '6',
        title: 'Emergency light',
        link: '/',
      },
      {
        id: '7',
        title: 'Sensor light',
        link: '/',
      },
      {
        id: '8',
        title: 'Magnetic track light',
        link: '/',
      },
      {
        id: '9',
        title: 'Indoor surface mounted lisht',
        link: '/',
      },
      {
        id: '10',
        title: 'Led strip light',
        link: '/',
      },
    ],
  },
  {
    id: '2',
    title: 'Outdoor light',
    image: OutdoorLight,
    items: [
      {
        id: '1',
        title: 'Wall light',
        link: '/',
      },
      {
        id: '2',
        title: 'Flood light',
        link: '/',
      },
      {
        id: '3',
        title: 'Outdoor pendant light',
        link: '/',
      },
      {
        id: '4',
        title: 'Outdoor surface mounted',
        link: '/',
      },
      {
        id: '5',
        title: 'Stand light',
        link: '/',
      },
      {
        id: '6',
        title: 'Pole light',
        link: '/',
      },
      {
        id: '7',
        title: 'Street light',
        link: '/',
      },
      {
        id: '8',
        title: 'Solar light',
        link: '/',
      },
      {
        id: '9',
        title: 'In-ground light',
        link: '/',
      },
      {
        id: '10',
        title: 'Wall washer light',
        link: '/',
      },
      {
        id: '11',
        title: 'Underwater light',
        link: '/',
      },
    ],
  },
  {
    id: '3',
    title: 'Bulbs',
    image: Bulbs,
    items: [
      {
        id: '1',
        title: 'Led bulbs',
        link: '/',
      },
      {
        id: '2',
        title: 'Led tube bulbs',
        link: '/',
      },
      {
        id: '3',
        title: 'Led decorative bulbs',
        link: '/',
      },
    ],
  },
  {
    id: '4',
    title: 'Switches',
    image: Switches,
    items: [
      {
        id: '1',
        title: 'Wall switches',
        link: '/',
      },
      {
        id: '2',
        title: 'Smart switches',
        link: '/',
      },
      {
        id: '3',
        title: 'Floor switches',
        link: '/',
      },
      {
        id: '4',
        title: 'Floor box switches',
        link: '/',
      },
    ],
  },
  {
    id: '5',
    title: 'Accessories',
    image: Accessories,
    items: [
      {
        id: '1',
        title: 'Led power supply',
        link: '/',
      },
      {
        id: '2',
        title: 'Profiles',
        link: '/',
      },
      {
        id: '3',
        title: 'Track rail',
        link: '/',
      },
      {
        id: '4',
        title: 'High voltage driver',
        link: '/',
      },
      {
        id: '5',
        title: 'Bulb base',
        link: '/',
      },
      {
        id: '6',
        title: 'Extension socket',
        link: '/',
      },
    ],
  },
];

export const RECENT_SEARCHES = [
  {
    id: 0,
    text: 'track',
  },
  {
    id: 1,
    text: 'track light',
  },
  {
    id: 2,
    text: 'spotlight',
  },
  {
    id: 3,
    text: 'mounted',
  },
  {
    id: 4,
    text: 'panel',
  },
  {
    id: 5,
    text: 'round panel',
  },
  {
    id: 6,
    text: 'square panel down',
  },
  {
    id: 7,
    text: '36W square panel',
  },
  {
    id: 8,
    text: 'rowley wall',
  },
  {
    id: 9,
    text: 'rowley',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'gid://shopify/Product/8464659120462',
    title: 'Track Light',
    category: 'Indoor light',
    vendor: 'Ultra Lite',
    descriptionHtml: '',
    handle: 'track-light',
    priceRange: {
      maxVariantPrice: {
        amount: '400.2',
        currencyCode: 'EUR',
      },
      minVariantPrice: {
        amount: '300.1',
        currencyCode: 'EUR',
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
  },
  {
    id: 'gid://shopify/Product/8464659120462',
    title: 'Track Light',
    category: 'Indoor light',
    vendor: 'Ultra Lite',
    descriptionHtml: '',
    handle: 'track-light',
    priceRange: {
      maxVariantPrice: {
        amount: '400.2',
        currencyCode: 'EUR',
      },
      minVariantPrice: {
        amount: '300.1',
        currencyCode: 'EUR',
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
  },
  {
    id: 'gid://shopify/Product/8464659120462',
    title: 'Track Light',
    category: 'Indoor light',
    vendor: 'Ultra Lite',
    descriptionHtml: '',
    handle: 'track-light',
    priceRange: {
      maxVariantPrice: {
        amount: '400.2',
        currencyCode: 'EUR',
      },
      minVariantPrice: {
        amount: '300.1',
        currencyCode: 'EUR',
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
  },
  {
    id: 'gid://shopify/Product/8464659120462',
    title: 'Track Light',
    category: 'Indoor light',
    vendor: 'Ultra Lite',
    descriptionHtml: '',
    handle: 'track-light',
    priceRange: {
      maxVariantPrice: {
        amount: '400.2',
        currencyCode: 'EUR',
      },
      minVariantPrice: {
        amount: '300.1',
        currencyCode: 'EUR',
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
  },
  {
    id: 'gid://shopify/Product/8464659120462',
    title: 'Track Light',
    category: 'Indoor light',
    vendor: 'Ultra Lite',
    descriptionHtml: '',
    handle: 'track-light',
    priceRange: {
      maxVariantPrice: {
        amount: '400.2',
        currencyCode: 'EUR',
      },
      minVariantPrice: {
        amount: '300.1',
        currencyCode: 'EUR',
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
  },
  {
    id: 'gid://shopify/Product/8464659120462',
    title: 'Track Light',
    category: 'Indoor light',
    vendor: 'Ultra Lite',
    descriptionHtml: '',
    handle: 'track-light',
    priceRange: {
      maxVariantPrice: {
        amount: '400.2',
        currencyCode: 'EUR',
      },
      minVariantPrice: {
        amount: '300.1',
        currencyCode: 'EUR',
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
  },
  {
    id: 'gid://shopify/Product/8464659120462',
    title: 'Track Light',
    category: 'Indoor light',
    vendor: 'Ultra Lite',
    descriptionHtml: '',
    handle: 'track-light',
    priceRange: {
      maxVariantPrice: {
        amount: '400.2',
        currencyCode: 'EUR',
      },
      minVariantPrice: {
        amount: '300.1',
        currencyCode: 'EUR',
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
  },
  {
    id: 'gid://shopify/Product/8464659120462',
    title: 'Track Light',
    category: 'Indoor light',
    vendor: 'Ultra Lite',
    descriptionHtml: '',
    handle: 'track-light',
    priceRange: {
      maxVariantPrice: {
        amount: '400.2',
        currencyCode: 'EUR',
      },
      minVariantPrice: {
        amount: '300.1',
        currencyCode: 'EUR',
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
  },
  {
    id: 'gid://shopify/Product/8464659120462',
    title: 'Track Light',
    category: 'Indoor light',
    vendor: 'Ultra Lite',
    descriptionHtml: '',
    handle: 'track-light',
    priceRange: {
      maxVariantPrice: {
        amount: '400.2',
        currencyCode: 'EUR',
      },
      minVariantPrice: {
        amount: '300.1',
        currencyCode: 'EUR',
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
  },
];
