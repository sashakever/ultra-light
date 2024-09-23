import React, {FC, ReactNode, useRef} from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import {AppStoreType, makeStore} from './store';

type ProvidersProps = {
  children: ReactNode;
};

const Providers: FC<ProvidersProps> = ({children}) => {
  const storeRef = useRef<AppStoreType>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Providers;
