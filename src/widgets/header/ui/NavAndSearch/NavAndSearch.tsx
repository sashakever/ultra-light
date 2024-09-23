import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React, {FC, useEffect} from 'react';
import {useDebounceValue} from 'usehooks-ts';

import CategoriesDesktop from '../CategoriesDesktop';
import SearchContainer from '../SearchContainer';

import {useHeader} from '@base/hooks';
import {useAppSelector, useHeaderActions} from '@base/store';

import {SquaresIcon} from '@shared/assets';
import {StrapiHeaderType} from '@shared/types';
import {Button, SearchInput} from '@shared/ui';

type Props = {
  className?: string;
  header?: StrapiHeaderType;
};

const NavAndSearch: FC<Props> = ({className = '', header}) => {
  const pathname = usePathname();
  const {handleToggleAllProducts, handleOpenSearch} = useHeader();

  const {setSearchQuery, closeSearch, closeAllProducts} = useHeaderActions();
  const {isSearchOpen, searchQuery, isAllProductsOpen} = useAppSelector(
    (state) => state.header,
  );

  const [debouncedSearch, setDebounceSearch] = useDebounceValue('', 1000);

  const handleChangeSearchQuery = (query: string) => {
    setDebounceSearch(query.trim());
  };

  useEffect(() => {
    setSearchQuery(debouncedSearch.toLocaleLowerCase());
  }, [debouncedSearch]);

  useEffect(() => {
    setTimeout(() => {
      closeSearch();
      closeAllProducts();
    }, 0);
  }, [pathname]);

  return (
    <div
      className={clsx(
        'w-full flex flex-col-reverse md:flex-row md:gap-10 h-full px-2 md:px-0 bg-gray-100',
        className,
      )}>
      <div className='w-full h-8 md:h-full items-center flex gap-2'>
        <div className='relative w-fit h-full shrink-0 flex items-center'>
          <Button
            className='group-hover:pointer-events-none w-28 md:w-auto h-8 md:h-10 md:rounded-5xl'
            onClick={handleToggleAllProducts}>
            <div className='flex items-center gap-1'>
              <SquaresIcon />
              <span>{header?.data.attributes?.CategoryButtonTitle}</span>
            </div>
          </Button>
          <div
            className={clsx(
              'fixed top-20 left-0 w-screen rem:h-[540px] translate-y-[-130%] bg-white -z-10',
              'transition-all duration-300',
              'delay-300 opacity-0 overflow-y-auto',
              {
                'md:translate-y-0 md:opacity-100 md:delay-0': isAllProductsOpen,
              },
            )}>
            <CategoriesDesktop
              categories={header?.data.attributes?.Categories.data || []}
            />
          </div>
        </div>
        <div className='relative w-fit h-full flex-1 flex items-center'>
          <SearchInput
            className='w-full lg:w-72 xl:rem:w-[458px] md:rounded-5xl'
            placeholder={header?.data.attributes?.SearchPlaceholder}
            onChange={handleChangeSearchQuery}
            onClick={handleOpenSearch}
            defaultValue={searchQuery}
          />
          <SearchContainer
            className={clsx(
              'fixed top-20 left-0 w-screen translate-y-[-130%] bg-white',
              'transition-all duration-300',
              'delay-300 opacity-0',
              {
                'opacity-100 rem:translate-y-[85px] md:translate-y-[0]':
                  isSearchOpen,
              },
            )}
            header={header}
          />
        </div>
      </div>
      <div
        className={clsx(
          'w-full flex md:hidden lg:flex gap-3 md:gap-5 items-center justify-between sm:justify-center',
          'h-full md:h-auto px-2',
        )}>
        {header?.data.attributes?.MainMenuLinks.data.map((item) => (
          <Link
            key={item.id}
            className='flex items-center gap-2 group shrink-0'
            href={item.attributes.Href}>
            {item.attributes.Icon.data ? (
              <Image
                src={item.attributes.Icon.data.attributes.url}
                alt={item.attributes.Title}
                width={20}
                height={20}
              />
            ) : null}
            <span
              className={clsx(
                'text-xs md:text-s md:font-medium transition-all duration-300',
                {
                  'text-tone-700 group-hover:text-tone-600':
                    item.attributes.Color === 'Blue',
                  'hover:text-gray-400': item.attributes.Color !== 'Blue',
                },
              )}>
              {item.attributes.Title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavAndSearch;
