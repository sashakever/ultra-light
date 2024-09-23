import {z} from 'zod';

import {metafieldScheme} from './common';

export const optionScheme = z.object({
  name: z.string(),
  value: z.string(),
});

export const moneyScheme = z.object({
  amount: z.string(),
  currencyCode: z.string(),
});

export const priceRangeScheme = z.object({
  minVariantPrice: moneyScheme,
  maxVariantPrice: moneyScheme,
});

export const variantScheme = z.object({
  id: z.string(),
  title: z.string(),
  availableForSale: z.boolean(),
  image: z.union([
    z.null(),
    z.object({
      id: z.string(),
      url: z.string(),
      width: z.number(),
      height: z.number(),
      altText: z.union([z.null(), z.string()]),
    }),
  ]),
  selectedOptions: z.array(optionScheme),
});
export const variantForPDPScheme = z.object({
  id: z.string(),
  title: z.string(),
  availableForSale: z.boolean(),
  selectedOptions: z.array(optionScheme),
  image: z.object({
    id: z.string(),
    url: z.string(),
    width: z.number(),
    height: z.number(),
    altText: z.union([z.null(), z.string()]),
  }),
  price: moneyScheme,
  compareAtPrice: z.union([z.null(), moneyScheme]),
  sku: z.union([z.null(), z.string()]),
  product: z.object({
    title: z.string(),
    handle: z.string(),
  }),
});

export const imageScheme = z.object({
  mediaContentType: z.literal('IMAGE'),
  id: z.string(),
  image: z.object({
    url: z.string(),
    width: z.number(),
    height: z.number(),
  }),
  alt: z.string(),
  previewImage: z
    .object({
      url: z.string(),
    })
    .nullable(),
});

export const videoScheme = z.object({
  mediaContentType: z.literal('VIDEO'),
  id: z.string(),
  sources: z.array(
    z.object({
      url: z.string(),
    }),
  ),
});

export const mediaScheme = z.union([imageScheme, videoScheme]);

export const optionProductScheme = z.object({
  id: z.string(),
  name: z.string(),
  values: z.array(z.string()),
});

export const productCollectionsScheme = z.object({
  edges: z.array(
    z.object({
      node: z.object({
        title: z.string(),
        handle: z.string(),
      }),
    }),
  ),
});

export const productScheme = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  availableForSale: z.boolean(),
  media: z.object({nodes: z.array(mediaScheme)}),
  metafields: z.array(z.union([metafieldScheme, z.null()])),
  priceRange: priceRangeScheme,
  compareAtPriceRange: z.union([z.null(), priceRangeScheme]),
  variants: z.object({
    nodes: z.array(variantScheme),
  }),
  collections: productCollectionsScheme,
});

export const productForCollectionScheme = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  availableForSale: z.boolean(),
  options: z.array(optionProductScheme),
  media: z.object({nodes: z.array(mediaScheme)}),
  metafields: z.array(z.union([metafieldScheme, z.null()])),
  priceRange: priceRangeScheme,
  compareAtPriceRange: z.union([z.null(), priceRangeScheme]),
  variants: z.object({
    nodes: z.array(variantScheme),
  }),
});

export const productPDPScheme = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  vendor: z.string(),
  availableForSale: z.boolean(),
  media: z.object({nodes: z.array(mediaScheme)}),
  metafields: z.array(z.union([metafieldScheme, z.null()])),
  priceRange: priceRangeScheme,
  compareAtPriceRange: z.union([z.null(), priceRangeScheme]),
  variants: z.object({
    nodes: z.array(variantForPDPScheme),
  }),
  options: z.array(optionProductScheme),
  tags: z.array(z.string()),
  collections: productCollectionsScheme,
  variantBySelectedOptions: z.union([
    z.null(),
    z.undefined(),
    variantForPDPScheme,
  ]),
});

export const productMinimalScheme = z.object({
  id: z.string(),
  metafields: z.array(z.union([metafieldScheme, z.null()])),
});
