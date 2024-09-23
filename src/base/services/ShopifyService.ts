import {
  Customer,
  SelectedOptionInput,
} from '@shopify/hydrogen-react/storefront-api-types';

import shopifyClient from './shopifyClient';

import {DEFAULT_LOCALE} from '@shared/constants';
import {
  CUSTOMER_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE,
} from '@shared/graphql';
import {getCollection, getProduct, getProducts} from '@shared/utils';

export default class ShopifyService {
  static get instance() {
    return new ShopifyService();
  }

  // eslint-disable-next-line class-methods-use-this
  private async shopifyRequest(
    query: string,
    variables: Record<string, unknown>,
  ) {
    try {
      const response = await fetch(shopifyClient.getStorefrontApiUrl(), {
        body: JSON.stringify({query, variables}),
        headers: shopifyClient.getPrivateTokenHeaders(),
        method: 'POST',
      });
      // eslint-disable-next-line @typescript-eslint/return-await
      return response.json();
    } catch (error) {
      console.log('error -> ', error);
    }
    return null;
  }

  async requestProduct(
    handle: string,
    selectedOptions: SelectedOptionInput[],
    language: string,
  ) {
    const json = await this.shopifyRequest(PRODUCT_BY_HANDLE, {
      handle,
      selectedOptions,
      language: language?.toUpperCase() || DEFAULT_LOCALE.toUpperCase(),
    });

    return getProduct(json);
  }

  async getCustomer(customerAccessToken: string) {
    if (!customerAccessToken) {
      return null;
    }

    const json = (await this.shopifyRequest(CUSTOMER_QUERY, {
      customerAccessToken,
    })) as {data: {customer: Customer}};

    return json?.data?.customer || null;
  }

  async requestCollection(
    query: string,
    variables: Record<string, unknown>,
    fullProducts: boolean = false,
  ) {
    const json = await this.shopifyRequest(query, variables);

    return getCollection(json, fullProducts);
  }

  async getProductsById(ids: string[]) {
    // Create a query string by mapping over the ids array and joining the resulting strings with the OR operator
    const query = ids?.length
      ? ids
          .map((id: string) => `(id:${id.split('/').reverse()[0]})`)
          .join(' OR ')
      : '';

    if (!query) return {products: []};

    try {
      // Extract the JSON response from the API and pass it to the getProducts function to extract the product data
      const json = await this.shopifyRequest(PRODUCTS_QUERY, {query});
      const products = getProducts(json);

      // Return an object with a products property containing the extracted product data
      return {products};
    } catch (error) {
      return {
        products: [],
        status: 500,
        error: 'Error receiving data',
      };
    }
  }
}
