import clsx from 'clsx';
import Link from 'next/link';
import React, {FC} from 'react';

import {StrapiCategoryType} from '@shared';

type Props = {
  className?: string;
  category: StrapiCategoryType;
  handleClose: () => void;
};

const CategoryBlock: FC<Props> = ({className = '', category, handleClose}) => (
  <div className={clsx('rem:w-[266px] flex flex-col gap-2', className)}>
    <Link
      href={category.attributes.Href}
      className='text-l font-medium hover:text-gray-400 transition-all duration-300'
      onClick={handleClose}>
      {category.attributes.Title}
    </Link>
    {category.attributes.Links.data.map((link) => (
      <Link
        key={link.id}
        href={link.attributes.Href}
        className='text-s font-normal hover:text-gray-400 transition-all duration-300'
        onClick={handleClose}>
        {link.attributes.Title}
      </Link>
    ))}
  </div>
);

export default CategoryBlock;
