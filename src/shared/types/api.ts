import {
  CurrencyCode,
  Customer,
  Image,
  Product,
  SelectedOption,
} from '@shopify/hydrogen-react/storefront-api-types';
import {StaticImageData} from 'next/image';

import {ShopifyErrorType} from './account';

import {StrapiMediaType} from '@shared/types/strapi';

export type UpdateMetafieldDataType = {
  ownerId: string;
  key: string;
  namespace: string;
  type: string;
  value: string;
};

export type RawResponseMetafieldDataType = {
  metafieldsSet: ResponseMetafieldDataType;
};

export type ResetApiResponseDataType = {
  customerReset: {
    customerAccessToken: {accessToken: string};
    customerUserErrors: ShopifyErrorType[] | null;
    customer: Customer | null;
  };
};

export type ResponseMetafieldDataType = {
  metafields: {
    key: string;
    namespace: string;
    value: string;
    createdAt: string;
    updatedAt: string;
  }[];
  userErrors: {
    field: string;
    message: string;
    code: string;
  }[];
};

export type SearchRequestType = {
  lang: string;
  query: string;
  after?: string | null;
  first?: number;
};

export type SearchRawResponseType = {
  data: {
    search: SearchResponseType;
  };
};

export type SearchResponseType = {
  nodes: Product[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
};

export type BlogIntroType = {
  id?: number;
  createdDate: string;
  title: string;
  description: string;
  image?: StaticImageData;
};

export type RelatedArticleType = {
  createdDate: string;
  title: string | null;
  description: string | null;
  slug: string;
  timeToRead?: string | null;
  titleCategory?: string | null;
  authorAvatar?: StrapiMediaType;
};

export type BlogQuestionType = {
  id: number;
  question: string;
  answer: string;
};

export type BlogDataType = {
  relatedPosts: BlogIntroType[];
  questions: BlogQuestionType[];
};

export type ReviewDataType = {
  id: string;
  comment: {
    id: string;
    content: string;
    created_at: string;
    display_name: string;
  };
  content: string;
  created_at: string;
  score: number;
  user: {
    display_name: string;
  };
};

export type ReviewTotalType = {
  total_review: number;
  average_score: number;
};

export type ReviewsResponseType = {
  reviews: ReviewDataType[];
  bottomline: ReviewTotalType;
};

export type ReviewsRawResponseType = {
  response: ReviewsResponseType;
};

export type SubscriptionRequestType = {
  email: string;
  variantId: string;
};

export type SubscriptionResponseType = {
  status: number;
  error?: string;
};

export type OrderLineItemType = {
  id: string;
  image: Image;
  quantity: number;
  product: Product;
  variant: {
    compareAtPrice: string | null;
    price: string | null;
    id: string;
    image: Image;
    selectedOptions: SelectedOption[];
  };
};

export type OrderApiResponseType = {
  order: {
    id: string;
    shippingAddress: {
      city: string;
      country: string;
      latitude: number;
      longitude: number;
    };
    currencyCode: CurrencyCode;
    lineItems: {
      nodes: OrderLineItemType[];
    };
  };
};
