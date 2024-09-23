export const SEARCH_QUERY = `#graphql
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
  }

  fragment MoneyProductItem on MoneyV2 {
      amount
      currencyCode
  }

  query search(
    $country: CountryCode
    $language: LanguageCode
    $query: String!
    $first: Int
    $after: String
  ) @inContext(country: $country, language: $language) {
    search(query: $query, first: $first, types: PRODUCT, after: $after) {
      nodes {
        ... on Product {
          id
          title
          vendor
          publishedAt
          handle
          tags
          availableForSale
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
            key
            value
          }
          collections(first: 1) {
            edges {
              node {
                title
              }
            }
          }
          images(first: 5) {
            edges {
              node {
                id
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 10) {
            nodes {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
              compareAtPrice {
                currencyCode
                amount
              }
              price {
                currencyCode
                amount
              }
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;
