export type MultipassResponseType = {
  /* the multipass-authenticated targetUrl */
  url: string | null;
  /* the multipass-authenticated token */
  token: string | null;
  /* Errors that occurred while authenticating via multipass. Includes any errors return from /multipass api route */
  error?: string | null;
};

export type MultipassCustomerType = {
  /* The customer email of the customer used during authentication */
  email: string;
  /* The `targetUrl` passed in for authentication */
  return_to: string;
  /* additional customer properties such as `acceptsMarketing`, addresses etc. */
  [key: string]: string | boolean | object | object[];
};

export type MultipassCustomerDataType = {
  customer?: MultipassCustomerType;
};

export type CustomerInfoType = {
  email: string;
  return_to: string;
  [key: string]: string | boolean | object | object[];
};
export type MultipassRequestBodyType = {
  customer?: CustomerInfoType;
  return_to?: string;
  client_ip?: string;
};

export type CustomerDataResponseType = {
  data: MultipassRequestBodyType;
  errors: string | null;
};

export type NotLoggedInResponseType = {
  url: string | null;
  error: string | null;
};

export type NotAuthResponseType = {
  url: string | null;
  error: string | null;
};

type MultipassBaseOptionsType = {
  /* required */
  isRedirect: boolean;
  shopDomain: string;
};

type MultipassCustomerOptionType = MultipassBaseOptionsType & {
  customer: MultipassCustomerType;
  return_to?: never;
};

type MultipassReturnToOptionType = MultipassBaseOptionsType & {
  return_to: string;
  customer?: never;
};

/* `redirect_to` is required with either `customer` or `return_to` */
export type MultipassOptionsType =
  | MultipassCustomerOptionType
  | MultipassReturnToOptionType;
