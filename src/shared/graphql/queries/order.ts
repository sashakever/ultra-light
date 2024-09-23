export const ORDER_QUERY = `#graphql
  query order($id: ID!) {
    order(id: $id) {
      id
      currencyCode
      shippingAddress {
        city
        country
        latitude
        longitude
      }
      ... on Order {
        lineItems(first: 100) {
          nodes {
            id
            quantity
            image {
              id
              url
              altText
              width
              height
            }
            name
            product {
              id
              title
              metafield(namespace: "custom", key: "categories") {
                id
                key
                value
              }
            }
            variant {
              id
              compareAtPrice
              price
              displayName
              image {
                id
                url
                altText
                width
                height
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;
