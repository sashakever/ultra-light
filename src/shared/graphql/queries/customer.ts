export const CUSTOMER_QUERY = `#graphql
query CustomerDetails($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        phone
        email
        #tags
        acceptsMarketing
        defaultAddress {
            id
            formatted
        }
        metafields(
            identifiers: [{namespace: "custom", key: "favourite_products_ids"}]
        ) {
            id
            key
            value
        }
        addresses(first: 10) {
            edges {
                node {
                    id
                    formatted
                    firstName
                    lastName
                    company
                    address1
                    address2
                    country
                    province
                    city
                    zip
                    phone
                }
            }
        }
        orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
            edges {
                node {
                    id
                    orderNumber
                    processedAt
                    financialStatus
                    fulfillmentStatus
                    currentTotalPrice {
                        amount
                        currencyCode
                    }
                    lineItems(first: 2) {
                        edges {
                            node {
                                variant {
                                    image {
                                        url
                                        altText
                                        height
                                        width
                                    }
                                }
                                title
                            }
                        }
                    }
                }
            }
        }
    }
    featuredCollections: collections(first: 3, sortKey: UPDATED_AT) {
        nodes {
            id
            title
            handle
            image {
                altText
                width
                height
                url
            }
        }
    }
}
`;
