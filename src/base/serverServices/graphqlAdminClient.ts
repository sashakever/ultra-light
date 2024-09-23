import {createAdminApiClient} from '@shopify/admin-api-client';

const graphqlAdminClient = createAdminApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? '',
  apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_ADMIN_API_VERSION ?? '',
  accessToken: process.env.NEXT_PRIVATE_SHOPIFY_GRAPHQL_ADMIN_API_TOKEN ?? '',
});

export default graphqlAdminClient;
