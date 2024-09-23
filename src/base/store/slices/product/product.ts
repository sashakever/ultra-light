'use client';

import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Product} from '@shopify/hydrogen-react/storefront-api-types';

import {ProductOptionType, ProductOptionValueType} from '@shared/types';
import {setDisabledValueInOptions} from '@shared/utils';

export type ProductStateType = {
  product: Product | null;
  options: ProductOptionType[];
  isLoading: boolean;
};

const initialState: ProductStateType = {
  product: null,
  options: [],
  isLoading: false,
};

export const product = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setInitData: (
      state,
      action: PayloadAction<{
        product: Product | null;
        options: ProductOptionType[];
      }>,
    ) => {
      state.product = action.payload.product;
      state.options = action.payload.options;
    },
    setOptions: (state, action: PayloadAction<ProductOptionType[]>) => {
      state.options = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSelectedValue: (
      state,
      action: PayloadAction<{
        key: string;
        value: ProductOptionValueType;
      }>,
    ) => {
      let newOptions = state.options.map((option) => ({
        ...option,
        values:
          option.optionRawName === action.payload.key
            ? option.values.map((item) => ({
                ...item,
                isSelected:
                  action.payload.value.id === item.id
                    ? !item.isSelected
                    : false,
              }))
            : option.values,
      }));
      newOptions = setDisabledValueInOptions(state.product, newOptions);
      state.options = newOptions;
    },
  },
});

export const productActions = product.actions;

export default product.reducer;
