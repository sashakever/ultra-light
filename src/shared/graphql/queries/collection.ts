const COLLECTION_PRODUCT_ITEM_FRAGMENT = `#graphql
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
fragment ProductItem on Product {
    id
    handle
    title
    availableForSale
    media(first: 10) {
        nodes {
            ...Media
        }
    }
    metafields(identifiers: [
        {namespace: "custom", key: "favourites_counter"}
        {namespace: "custom", key: "pdf_file_link"}
    ]) {
        key
        value
    }
    options {
        id
        name
        values
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
    variants(first: 10) {
        nodes {
            id
            availableForSale
            title
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
`;

export const COLLECTION_PAGE_QUERY = `#graphql
${COLLECTION_PRODUCT_ITEM_FRAGMENT}
query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $filters: [ProductFilter!]
    $first: Int
#    $last: Int
#    $startCursor: String
    $endCursor: String
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean
) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
        id
        handle
        title
        description
        metafields(identifiers: [
            {namespace: "custom", key: "might_be_interested_products"}
        ]) {
            id
            key
            value
        }
        products(
            first: $first,
#            last: $last,
#            before: $startCursor,
            after: $endCursor
            sortKey: $sortKey,
            reverse: $reverse
            filters: $filters,
        ) {
            nodes {
                ...ProductItem
            }
            filters {
                id
                label
                type
                values {
                    id
                    label
                    count
                    input
                }
            }
            pageInfo {
                startCursor
                hasPreviousPage
                hasNextPage
                endCursor
            }
        }
    }
}
`;

export const COLLECTION_FOR_COUNT_PRODUCTS_QUERY = `#graphql
query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
#    $last: Int
#    $startCursor: String
#    $endCursor: String
#    $sortKey: ProductCollectionSortKeys!
#    $reverse: Boolean
) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
        id
        handle
        title
        description
        products(
            first: $first,
#            last: $last,
#            before: $startCursor,
#            after: $endCursor
#            sortKey: $sortKey,
#            reverse: $reverse
        ) {
            nodes {
                id
                metafields(
                    identifiers: [
                        {namespace: "custom", key: "sale"}
                    ]
                ) {
                    id
                    key
                    value
                }
            }
            filters {
                id
                label
                type
                values {
                    id
                    label
                    count
                    input
                }
            }
            pageInfo {
                startCursor
                hasPreviousPage
                hasNextPage
                endCursor
            }
        }
    }
}
`;
