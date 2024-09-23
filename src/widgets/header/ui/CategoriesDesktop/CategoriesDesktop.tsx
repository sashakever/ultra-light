import {Tab} from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';
import React, {FC, useState} from 'react';

import CategoryBlock from './CategoryBlock';

import {useHeaderActions} from '@base/store';

import {ArrowSmallDownIcon} from '@shared/assets';
import {StrapiCategoryType} from '@shared/types';

type Props = {
  className?: string;
  categories: StrapiCategoryType[];
};

const CategoriesDesktop: FC<Props> = ({className = '', categories}) => {
  const {closeAllProducts} = useHeaderActions();
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const handleClose = () => {
    closeAllProducts();
  };

  const handleTabChange = (index: number) => {
    setActiveCategory(categories[index]);
  };

  return (
    <div
      className={clsx('w-full h-full hidden md:block p-3 relative', className)}>
      <Tab.Group onChange={handleTabChange}>
        <div className='w-full h-full grid [grid-template-columns:18rem_1fr] gap-5'>
          <Tab.List className='flex flex-col gap-1'>
            {categories.map((category) => (
              <Tab
                key={category.id}
                className={clsx(
                  'w-full rem:h-[68px] pr-4 hover:bg-gray-800 rounded-md bg-blur-[25px] overflow-hidden',
                  'flex items-center justify-between transition-all duration-300',
                  {
                    'bg-gray-800': activeCategory.id === category.id,
                    'bg-tone-100': activeCategory.id !== category.id,
                  },
                )}>
                <div className='w-full flex items-center gap-2'>
                  <div className='relative rem:w-[72px] rem:h-[72px]'>
                    {category.attributes.ThumbImage.data ? (
                      <Image
                        className='object-contain object-top'
                        src={category.attributes.ThumbImage.data.attributes.url}
                        width={
                          category.attributes.ThumbImage.data.attributes.width
                        }
                        height={
                          category.attributes.ThumbImage.data.attributes.height
                        }
                        alt={category.attributes.Title || ''}
                      />
                    ) : null}
                  </div>
                  <p className='text-m font-medium transition-all duration-300'>
                    {category.attributes.Title}
                  </p>
                </div>
                <ArrowSmallDownIcon
                  className={clsx(
                    'w-5 h-5 shrink-0 transition-all duration-300',
                    'ltr:rotate-[-90deg] rtl:rotate-90',
                  )}
                />
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='w-full h-full bg-tone-100 rounded-md'>
            {categories.map((category) => (
              <Tab.Panel
                key={category.id}
                className='w-full h-full overflow-y-auto p-6 flex flex-wrap gap-7'>
                {category.attributes.Categories.data.map((categoryInner) => (
                  <CategoryBlock
                    key={categoryInner.id}
                    category={categoryInner}
                    handleClose={handleClose}
                  />
                ))}
                {category.attributes.Links.data.length > 0 ? (
                  <CategoryBlock
                    category={category}
                    handleClose={handleClose}
                  />
                ) : null}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};

export default CategoriesDesktop;
