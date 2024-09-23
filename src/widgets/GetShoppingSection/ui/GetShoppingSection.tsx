'use client';

import React, {FC} from 'react';

import ServicesInfo from './ServicesInfo';
import ShoppingInfo from './ShoppingInfo';

import {StrapiSectionGetShoppingType} from '@shared/types';

type Props = {
  section: StrapiSectionGetShoppingType;
};
const GetShoppingSection: FC<Props> = ({section}) => (
  <section className='px-3 md:px-15'>
    <div className='w-full py-12'>
      <h2 className='text-center text-black text-xl sm:text-3xl font-medium pb-3'>
        {section.Title}
      </h2>
      <p className='text-center text-gray-600 text-s font-normal'>
        {section.Subtitle}
      </p>
    </div>
    <ShoppingInfo slides={section.ShoppingInfo} />
    <ServicesInfo slides={section.ServicesInfo} />
  </section>
);

export default GetShoppingSection;
