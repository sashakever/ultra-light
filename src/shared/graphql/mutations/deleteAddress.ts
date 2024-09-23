export const CUSTOMER_ADDRESS_DELETE_MUTATION = `#graphql
mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
        customerUserErrors {
            code
            field
            message
        }
        deletedCustomerAddressId
    }
}
`;
