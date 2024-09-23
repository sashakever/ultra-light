import {createStorefrontClient} from '@shopify/hydrogen-react';

const shopifyClient = createStorefrontClient({
  publicStorefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN,
  privateStorefrontToken: process.env.NEXT_PRIVATE_SHOPIFY_STOREFRONT_API_TOKEN,
  storeDomain: `${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`,
  storefrontApiVersion: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION,
});

export default shopifyClient;
