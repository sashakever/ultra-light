import clsx from 'clsx';
import Image from 'next/image';
import React, {FC} from 'react';

import {StrapiSlideType} from '@shared/types';

type Props = {
  service: StrapiSlideType;
};

const ServiceCard: FC<Props> = ({service: {Title, Text, Icon}}) => (
  <div
    className={clsx(
      'flex flex-col flex-1 sm:justify-between rem:border-[1.5px] border-gray-800',
      'h-56 sm:rem:h-[280px] pt-6 pr-2 pb-2 pl-4 sm:p-6 sm:pr-12 rem:rounded-[20px]',
    )}>
    {Icon.data ? (
      <Image
        className='w-8 h-8 sm:w-11 sm:h-11'
        src={Icon.data.attributes.url}
        width={Icon.data.attributes.width}
        height={Icon.data.attributes.height}
        alt={Title || ''}
      />
    ) : null}
    <div>
      <h3 className='text-m sm:text-xl font-medium text-gray-700 pb-3 pt-11 sm:pb-4'>
        {Title}
      </h3>
      <p className='text-s text-gray-600'>{Text}</p>
    </div>
  </div>
);

export default ServiceCard;
