import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {FC} from 'react';

import {useHeaderActions} from '@base/store';

import {StrapiCategoryType} from '@shared/types';

type Props = {
  className?: string;
  activeCategory: StrapiCategoryType | null;
};

const CategoryPanel: FC<Props> = ({className = '', activeCategory}) => {
  const {closeAllProducts} = useHeaderActions();

  const handleClose = () => {
    closeAllProducts();
  };

  return (
    <div
      className={clsx(
        'absolute top-0 left-0 w-full h-full overflow-y-auto',
        'transition-all duration-300',
        {'translate-x-full': !activeCategory},
        className,
      )}>
      {activeCategory ? (
        <div className='w-full h-fit pb-10 ios-menu-padding'>
          {activeCategory.attributes.Href ? (
            <Link
              href={activeCategory.attributes.Href}
              className='w-full h-16 flex items-center gap-3 px-5'>
              <div className='relative w-10 h-10'>
                {activeCategory.attributes.ThumbImage.data ? (
                  <Image
                    className='object-contain object-top'
                    src={
                      activeCategory.attributes.ThumbImage.data.attributes.url
                    }
                    width={
                      activeCategory.attributes.ThumbImage.data.attributes.width
                    }
                    height={
                      activeCategory.attributes.ThumbImage.data.attributes
                        .height
                    }
                    alt={activeCategory.attributes.Title || ''}
                  />
                ) : null}
              </div>
              <p className='text-m font-medium'>
                {activeCategory.attributes.Title}
              </p>
            </Link>
          ) : (
            <div className='w-full h-16 flex items-center gap-3 px-5'>
              <div className='relative w-10 h-10'>
                {activeCategory.attributes.ThumbImage.data ? (
                  <Image
                    className='object-contain object-top'
                    src={
                      activeCategory.attributes.ThumbImage.data.attributes.url
                    }
                    width={
                      activeCategory.attributes.ThumbImage.data.attributes.width
                    }
                    height={
                      activeCategory.attributes.ThumbImage.data.attributes
                        .height
                    }
                    alt={activeCategory.attributes.Title || ''}
                  />
                ) : null}
              </div>
              <p className='text-m font-medium'>
                {activeCategory.attributes.Title}
              </p>
            </div>
          )}
          <div className='flex flex-col gap-1 px-2'>
            {activeCategory.attributes.Categories.data.map((item) => (
              <div key={item.id}>
                <Link
                  className='w-full h-8 px-3 font-medium flex items-center text-m'
                  href={item.attributes.Href}
                  onClick={handleClose}>
                  {item.attributes.Name}
                </Link>
                <ul>
                  {item.attributes.Links.data.map((link) => (
                    <li key={link.id}>
                      <Link
                        className='w-full h-8 px-3 flex items-center text-s'
                        href={link.attributes.Href}
                        onClick={handleClose}>
                        {link.attributes.Title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className='mt-4'>
              <Link
                className='w-full font-medium h-8 px-3 flex items-center text-m'
                href={activeCategory.attributes.Href}>
                {activeCategory.attributes.Name}
              </Link>
              <ul>
                {activeCategory.attributes.Links.data.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.attributes.Href}
                      className='w-full h-8 px-3 flex items-center text-s'
                      onClick={handleClose}>
                      {item.attributes.Title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CategoryPanel;
