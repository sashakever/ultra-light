'use client';

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  productApi,
} from '@base/api';
import {
  productSlice,
} from '@base/store/slices';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'favourites'],
  timeout: 1,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    product: productSlice,
    [productApi.reducerPath]: productApi.reducer,
  }),
);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(productApi.middleware)
  });

// export type RootStateType = ReturnType<typeof store.getState>;
// export type AppDispatchType = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatchType>();
// export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
// export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
// Infer the type of makeStore
export type AppStoreType = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<AppStoreType['getState']>;
export type AppDispatchType = AppStoreType['dispatch'];
