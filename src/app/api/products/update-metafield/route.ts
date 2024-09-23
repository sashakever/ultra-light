import {graphqlAdminClient} from '@base/serverServices';

import {SET_METAFIELD_MUTATION} from '@shared/graphql';

export async function POST(request: Request) {
  const variables = await request.json();
  const {data, errors} = await graphqlAdminClient.request(
    SET_METAFIELD_MUTATION,
    {
      variables: {
        metafields: [
          {
            ...variables,
          },
        ],
      },
    },
  );

  if (errors) {
    return Response.json(errors, {status: 500});
  }

  return Response.json(data, {status: 200});
}
