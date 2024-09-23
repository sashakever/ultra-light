import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {FC} from 'react';

import {ArrowCircleLeftIcon} from '@shared/assets';
import {StrapiCategoryType} from '@shared/types';

type Props = {
  className?: string;
  activeCategoryId: number;
  categories: StrapiCategoryType[];
  handleChangeCategory: (id: number) => void;
};

const AllCategoriesPanel: FC<Props> = ({
  className = '',
  activeCategoryId,
  handleChangeCategory,
  categories,
}) => {
  const changeCategory = (id: number) => () => handleChangeCategory(id);

  return (
    <div
      className={clsx(
        'absolute top-0 left-0 w-full h-full px-2 overflow-y-auto',
        'transition-all duration-300',
        {'-translate-x-full': activeCategoryId !== -1},
        className,
      )}>
      <div className='w-full h-fit flex flex-col pb-28'>
        {categories.map((category) => (
          <div
            key={category.id}
            className={clsx(
              'w-full rem:h-[100px] flex items-center justify-between pl-2.5 pr-5',
              'transition-all duration-300',
              {'bg-tone-100': activeCategoryId === category.id},
            )}>
            <Link
              href={category.attributes?.Href || ''}
              className='w-full flex items-center gap-8'>
              <div className='relative rem:w-[72px] rem:h-[72px]'>
                {category.attributes.ThumbImage.data ? (
                  <Image
                    className='object-contain object-top'
                    src={category.attributes.ThumbImage.data.attributes.url}
                    width={category.attributes.ThumbImage.data.attributes.width}
                    height={
                      category.attributes.ThumbImage.data.attributes.height
                    }
                    alt={category.attributes.Title || ''}
                  />
                ) : null}
              </div>
              <p
                className={clsx(
                  'text-s font-medium transition-all duration-300',
                  {
                    'text-tone-700': activeCategoryId === category.id,
                  },
                )}>
                {category.attributes.Title}
              </p>
            </Link>
            <ArrowCircleLeftIcon
              onClick={changeCategory(category.id)}
              className={clsx(
                'w-8 h-8 shrink-0 transition-all duration-300',
                'ltr:rotate-180 rtl:rotate-0',
                {
                  'stroke-white fill-black': activeCategoryId === category.id,
                },
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategoriesPanel;
