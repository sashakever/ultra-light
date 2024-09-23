export const MEDIA_FRAGMENT = `#graphql
fragment Media on Media {
    mediaContentType
    alt
    previewImage {
        url
    }
    ... on MediaImage {
        id
        mediaContentType
        image {
            url
            width
            height
        }
    }
    ... on Video {
        id 
        mediaContentType
        sources {
          url
        }
    }
}`;

export const PRICE_FRAGMENT = `#graphql
fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
}
`;

export const VARIANT_FRAGMENT = `#graphql
fragment ProductVariantFragment on ProductVariant {
  id
  title
  availableForSale
  selectedOptions {
    name
    value
  }
  image {
    id
    url
    altText
    width
    height
  }
  price {
    amount
    currencyCode
  }
  compareAtPrice {
    amount
    currencyCode
  }
  sku
  unitPrice {
    amount
    currencyCode
  }
  product {
    title
    handle
  }
}
`;

export const PRODUCT_FRAGMENT = `#graphql
${MEDIA_FRAGMENT}
${PRICE_FRAGMENT}
${VARIANT_FRAGMENT}
fragment ProductFragment on Product {
  id
  title
  vendor
  publishedAt
  handle
  tags
  availableForSale
  collections (first: 6) {
    edges {
      node {
        title
        handle
      }
    }
  }
  options {
    id
    name
    values
  }
  media(first: 50) {
    nodes {
      ...Media
    }
  }
  priceRange {
    minVariantPrice {
      ...MoneyProductItem
    }
    maxVariantPrice {
      ...MoneyProductItem
    }
  }
  compareAtPriceRange {
    minVariantPrice {
      ...MoneyProductItem
    }
    maxVariantPrice {
      ...MoneyProductItem
    }
  }
  metafields(identifiers: [
    {namespace: "custom", key: "frequently_bought_together"},
    {namespace: "custom", key: "favourites_counter"}
    {namespace: "custom", key: "bulb_base"}
    {namespace: "custom", key: "not_included_title"}
    {namespace: "custom", key: "not_included_text"}
    {namespace: "custom", key: "not_included_products"}
    {namespace: "custom", key: "categories"}
    {namespace: "custom", key: "might_be_interested_products"}
    {namespace: "custom", key: "pdf_file_link"}
  ]) {
      id
    key
    value
  }
  collections(first: 1) {
    edges {
      node {
        title
        handle
      }
    }
  }
  variants(first: 99) {
    nodes {
      ...ProductVariantFragment
    }
  }
}`;

export const PRODUCT_HOME_HERO_FRAGMENT = `#graphql
${MEDIA_FRAGMENT}
${PRICE_FRAGMENT}
fragment ProductFragment on Product {
  id
  title
  handle
  availableForSale
  media(first: 1) {
    nodes {
      ...Media
    }
  }
  priceRange {
    minVariantPrice {
      ...MoneyProductItem
    }
    maxVariantPrice {
      ...MoneyProductItem
    }
  }
  compareAtPriceRange {
    minVariantPrice {
      ...MoneyProductItem
    }
    maxVariantPrice {
      ...MoneyProductItem
    }
  }
  metafields(identifiers: [
    {namespace: "custom", key: "categories"}
  ]) {
      id
    key
    value
  }
}`;

export const PRODUCT_BY_HANDLE = `#graphql
${PRODUCT_FRAGMENT}
  query(
    $country: CountryCode
    $language: LanguageCode
    $handle: String! 
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductFragment
      variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFragment
      }
    }
  }
`;

export const PRODUCTS_QUERY = `#graphql
${PRODUCT_FRAGMENT}
query ($query: String! ) {
  products(first: 10, query: $query) {
    nodes {
      ...ProductFragment
    }
  }
}
`;

export const PRODUCTS_BY_IDS_QUERY = `#graphql
  ${PRODUCT_FRAGMENT}
  query ProductsByIDs(
      $country: CountryCode
      $language: LanguageCode
      $ids: [ID!]!
  ) @inContext(country: $country, language: $language) {
    nodes(ids: $ids) {
      ... on Product {
        ...ProductFragment
      }
    }
  }
`;

export const BEST_SELLING_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_FRAGMENT}
  query topProducts(
    $country: CountryCode
    $language: LanguageCode
    $count: Int
  ) @inContext(country: $country, language: $language) {
    products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductFragment
      }
    }
  }
`;

export const PRODUCT_RECOMMENDATIONS = `#graphql
${PRODUCT_FRAGMENT}
query productRecommendations($productId: ID!) {
  productRecommendations(productId: $productId) {
    ...ProductFragment
  }
}
`;
