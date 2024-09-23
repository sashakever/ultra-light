export const LOGIN_MUTATION = `#graphql
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
        customerUserErrors {
            code
            field
            message
        }
        customerAccessToken {
            accessToken
            expiresAt
        }
    }
}
`;
