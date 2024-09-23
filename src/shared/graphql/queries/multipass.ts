export const CUSTOMER_INFO_QUERY = `#graphql
    query CustomerInfo($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
            firstName
            lastName
            phone
            email
            acceptsMarketing
        }
    }
`;

export const CUSTOMER_ACCESS_TOKEN_FROM_TOKEN_MUTATION = `#graphql
    mutation customerAccessTokenCreateWithMultipass($multipassToken: String!) {
        result: customerAccessTokenCreateWithMultipass(
            multipassToken: $multipassToken
        ) {
            token: customerAccessToken {
                customerAccessToken: accessToken
                expiresAt
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`;
