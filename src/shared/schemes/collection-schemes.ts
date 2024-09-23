import {z} from 'zod';

import {metafieldScheme} from './common';

import {
  productForCollectionScheme,
  productMinimalScheme,
} from '@shared/schemes/product-schemes';

export const filterValueScheme = z.object({
  id: z.string(),
  label: z.string(),
  count: z.number(),
  input: z.string(),
});

export const filterScheme = z.object({
  id: z.string(),
  label: z.string(),
  type: z.string(),
  values: z.array(filterValueScheme),
});

export const pageInfoScheme = z.object({
  startCursor: z.union([z.string(), z.null()]),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
  endCursor: z.union([z.string(), z.null()]),
});

export const collectionScheme = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  description: z.string(),
  metafields: z.array(z.union([metafieldScheme, z.null()])),
  products: z.object({
    nodes: z.array(productForCollectionScheme),
    filters: z.array(filterScheme),
    pageInfo: pageInfoScheme,
  }),
});

export const collectionMinimalProductsScheme = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  description: z.string(),
  products: z.object({
    nodes: z.array(productMinimalScheme),
    filters: z.array(filterScheme),
    pageInfo: pageInfoScheme,
  }),
});
