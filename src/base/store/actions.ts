import {bindActionCreators} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

import {
  productActions,
} from './slices';

const useProductActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(productActions, dispatch);
};

export {
  useProductActions,
};
