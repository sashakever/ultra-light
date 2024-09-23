import {Product} from '@shopify/hydrogen-react/storefront-api-types';
import React, {FC} from 'react';

import {MaybeInterestedSlider} from '../MaybeInterestedSlider';

type Props = {
  className?: string;
  title: string | null;
  products?: Product[];
};

const MaybeInterested: FC<Props> = ({className = '', title, products}) => (
  <div className={className}>
    {products?.length ? (
      <div className='p-4 pl-0 md:pl-4 text-s font-medium rtl:text-right'>
        {title}
      </div>
    ) : null}
    <MaybeInterestedSlider products={products} />
  </div>
);

export default MaybeInterested;
