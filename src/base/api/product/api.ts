import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Product} from '@shopify/hydrogen-react/storefront-api-types';

import {
  RawResponseMetafieldDataType,
  ResponseMetafieldDataType,
  UpdateMetafieldDataType,
} from '@shared/types';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/products',
  }),
  endpoints: (builder) => ({
    updateMetafield: builder.mutation<
      ResponseMetafieldDataType,
      UpdateMetafieldDataType
    >({
      query: (data) => ({
        url: '/update-metafield',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: RawResponseMetafieldDataType) =>
        response.metafieldsSet,
    }),
    getProductsByIds: builder.query<Product[], {lang: string; ids: string[]}>({
      query: (data) => ({
        url: '/get-products-by-ids',
        method: 'GET',
        params: data,
      }),
      transformResponse: (response: {
        data: {
          nodes?: Product[];
        };
      }): Product[] => response.data?.nodes || [],
    }),
    getBestSellingProducts: builder.query<
      Product[],
      {lang: string; count: number}
    >({
      query: (data) => ({
        url: '/get-best-selling-products',
        method: 'GET',
        params: data,
      }),
      transformResponse: (response: {
        data: {
          products?: {nodes?: Product[]};
        };
      }): Product[] => response.data?.products?.nodes || [],
    }),
    getProductRecommendations: builder.query<
      Product[],
      {lang: string; id: string}
    >({
      query: (data) => ({
        url: '/get-product-recommendations',
        method: 'GET',
        params: data,
      }),
      transformResponse: (response: {
        data: {
          productRecommendations: Product[];
        };
      }): Product[] => response.data?.productRecommendations || [],
    }),
  }),
});

export const {
  useGetProductsByIdsQuery,
  useGetBestSellingProductsQuery,
  useGetProductRecommendationsQuery,
  useUpdateMetafieldMutation,
} = productApi;
