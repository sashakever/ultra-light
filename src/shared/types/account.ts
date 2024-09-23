import {Customer} from '@shopify/hydrogen-react/storefront-api-types';

export type ShopifyErrorType = {
  code: string;
  field: string[] | string | null;
  message: string;
};

export type RegisterApiResponseDataType = {
  customer: object | null;
  errors: ShopifyErrorType[] | null;
};
export type RegisterResponseDataType = {
  customerCreate: {
    customer: {
      id: string;
    } | null;
    customerUserErrors: ShopifyErrorType[] | null;
  };
};

export type LoginResponseDataType = {
  customer?: Customer | null;
  status?: number;
  data: {errors: ShopifyErrorType[] | null};
};

export type LoginApiResponseDataType = {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken: {
        accessToken: string;
      };
      customerUserErrors: ShopifyErrorType[];
    };
  };
};

export type AddressType = {
  id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  company?: string | null;
  address1?: string | null;
  address2?: string | null;
  country?: string | null;
  province?: string | null;
  city?: string | null;
  zip?: string | null;
  phone?: string | null;
  isDefaultAddress?: boolean | null;
};

export type AddressResponseDataType = {
  errors: ShopifyErrorType[] | null;
};

export type AddressCreateApiResponseDataType = {
  customerAddressCreate: {
    customerAddress: {
      id: string;
    } | null;
    customerUserErrors: ShopifyErrorType | null;
  };
};

export type AddressDeleteApiResponseDataType = {
  customerAddressDelete: {
    customerUserErrors: ShopifyErrorType | null;
  };
};

export type AddressUpdateApiResponseDataType = {
  customerAddressUpdate: {
    customerUserErrors: ShopifyErrorType[] | null;
  };
};

export type DefaultAddressUpdateApiResponseDataType = {
  customerDefaultAddressUpdate: {
    customerUserErrors: ShopifyErrorType[] | null;
  };
};

export type RecoverFormValuesType = {
  email: string;
};

export type ResetFormValuesType = {
  password: string;
  passwordConfirm: string;
};
