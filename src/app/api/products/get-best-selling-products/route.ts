import {shopifyClient} from '@base/services';

import {DEFAULT_COUNTRY, DEFAULT_LOCALE} from '@shared/constants';
import {BEST_SELLING_PRODUCTS_QUERY} from '@shared/graphql';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const language =
    url.searchParams.get('lang')?.toUpperCase() || DEFAULT_LOCALE.toUpperCase();
  const count = parseInt(url.searchParams.get('count') || '', 10) || 8;

  try {
    const response = await fetch(shopifyClient.getStorefrontApiUrl(), {
      body: JSON.stringify({
        query: BEST_SELLING_PRODUCTS_QUERY,
        variables: {count, country: DEFAULT_COUNTRY.toUpperCase(), language},
      }),
      headers: shopifyClient.getPrivateTokenHeaders(),
      method: 'POST',
    });
    const data = await response.json();

    return Response.json(data, {status: response.status});
  } catch (error) {
    console.error('Error:', error);
    return Response.json({
      error: 'Error receiving data',
    }, {status: 500,});
  }
}
