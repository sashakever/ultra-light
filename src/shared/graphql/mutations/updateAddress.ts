export const CUSTOMER_ADDRESS_UPDATE_MUTATION = `#graphql
mutation customerAddressUpdate(
    $address: MailingAddressInput!
    $customerAccessToken: String!
    $id: ID!
) {
    customerAddressUpdate(
        address: $address
        customerAccessToken: $customerAccessToken
        id: $id
    ) {
        customerAddress {
            id
        }
        customerUserErrors {
            code
            field
            message
        }
    }
}
`;
