import clsx from 'clsx';
import React, {FC} from 'react';

import OptionDisclosure from '../OptionDisclosure';
import NotIncludedCard from './NotIncludedCard';

import {NotIncludedDataType} from '@shared/types';

type Props = {
  className?: string;
  notIncludedData: NotIncludedDataType;
};

const NotIncludedPanel: FC<Props> = ({className = '', notIncludedData}) => {
  const title = notIncludedData.title || 'Not included';
  const {products} = notIncludedData;

  return (
    <div className={clsx('w-full', className)}>
      <OptionDisclosure title={title} text={notIncludedData.text} shouldOpen>
        <div className='w-full overflow-x-auto'>
          <div
            className={clsx('flex gap-4', {
              'w-full': notIncludedData.products.length <= 2,
              'w-fit': notIncludedData.products.length > 2,
            })}>
            {products.map((product) => (
              <NotIncludedCard
                className={clsx({
                  'w-1/2': notIncludedData.products.length <= 2,
                  'rem:min-w-[200px]': notIncludedData.products.length > 2,
                })}
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </OptionDisclosure>
    </div>
  );
};

export default NotIncludedPanel;
