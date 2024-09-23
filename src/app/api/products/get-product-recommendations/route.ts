import {shopifyClient} from '@base/services';

import {DEFAULT_COUNTRY, DEFAULT_LOCALE} from '@shared/constants';
import {PRODUCT_RECOMMENDATIONS} from '@shared/graphql';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const language =
    url.searchParams.get('lang')?.toUpperCase() || DEFAULT_LOCALE.toUpperCase();
  const idParam = url.searchParams.get('id');

  try {
    const response = await fetch(shopifyClient.getStorefrontApiUrl(), {
      body: JSON.stringify({
        query: PRODUCT_RECOMMENDATIONS,
        variables: {
          productId: idParam,
          country: DEFAULT_COUNTRY.toUpperCase(),
          language,
        },
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
