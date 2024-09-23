'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React, {FC, useEffect} from 'react';

import AllProductsDrawer from './AllProductsDrawer';
import BurgerButton from './BurgerButton';
import MenuDrawer from './MenuDrawer';
import NavAndSearch from './NavAndSearch';

import {useHeader} from '@base/hooks';
import {useAppSelector, useHeaderActions} from '@base/store';

import MenuContainer from '@widgets/header/ui/MenuContainer';

import {
  AccountIcon,
  CartIcon,
  FavoriteIcon,
  LogoBlackHorizontal,
} from '@shared/assets';
import {useCustomCart} from '@shared/hooks';
import {StrapiHeaderType} from '@shared/types';
import {Badge, Button, ButtonVariantEnum, LangListBox} from '@shared/ui';

type Props = {
  className?: string;
  lang: string;
  header?: StrapiHeaderType;
};

const Header: FC<Props> = ({className = '', lang, header}) => {
  const {isMenuOpen, isSearchOpen, isAllProductsOpen} = useAppSelector(
    (state) => state.header,
  );
  const {customer} = useAppSelector((state) => state.auth);

  const {products: favouriteProducts} = useAppSelector(
    (state) => state.favourites,
  );
  const {countProducts} = useCustomCart();
  const {handleClose, handleAccount, handleOpenFavourites, handleOpenCart} =
    useHeader();
  const {setLang} = useHeaderActions();
  useEffect(() => {
    setLang(lang);
  }, [lang]);

  return (
    <>
      <MenuDrawer header={header} />
      <AllProductsDrawer
        categories={header?.data.attributes?.Categories.data || []}
      />

      <header
        className={clsx(
          'flex flex-col w-full rem:h-[165px] md:h-20 md:rem:px-[52px] pb-2 md:pb-0',
          'fixed top-0 left-0 bg-white z-[120]',
          className,
        )}>
        <button
          aria-label='Close search'
          className={clsx(
            'md:absolute opacity-100 top-0 left-0 w-0 h-0 md:w-screen md:h-screen bg-transparent cursor-auto z-0',
            {
              'hidden opacity-0': !isSearchOpen && !isAllProductsOpen,
            },
          )}
          onClick={handleClose}
        />
        <div
          className={clsx(
            'relative z-10 flex items-center md:gap-10 w-full rem:h-[65px] md:h-20 px-5 md:px-0 bg-white',
            'border-b border-gray-800 border-opacity-20 md:border-0 shrink-0',
          )}>
          <div className='w-full h-full md:w-[14%] flex gap-2 md:gap-4 items-center sm:justify-between md:shrink-0'>
            <div className='relative w-fit h-full shrink-0 flex items-center group'>
              <BurgerButton />
              <MenuContainer
                className={clsx(
                  'fixed top-20 left-0 w-screen translate-y-[-130%] opacity-0 bg-white -z-10',
                  'transition-all duration-300',
                  'delay-300 md:rem:h-[440px]',
                  {'md:delay-0 md:opacity-100 md:translate-y-0': isMenuOpen},
                )}
                header={header}
              />
            </div>
            <Link
              href='/'
              className='relative w-28 md:w-auto flex justify-start'>
              <LogoBlackHorizontal className='scale-[0.8] md:scale-100 -ml-2 md:ml-0' />
            </Link>
          </div>
          <NavAndSearch className='hidden md:flex h-full' header={header} />
          <div className='flex flex-row-reverse md:flex-row gap-0 md:gap-2.5 items-center'>
            <div className='flex gap-0 md:gap-2.5'>
              <Button
                className='relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 shrink-0'
                variant={ButtonVariantEnum.INVISIBLE}
                onClick={handleAccount}>
                {customer ? (
                  <div
                    className={clsx(
                      'absolute rem:bottom-[9px] rem:right-[9px] w-2.5 h-2.5 rem:border-[1.5px] border-white',
                      'bg-tone-700 rounded-full z-10',
                    )}
                  />
                ) : null}
                <AccountIcon className='relative h-5 z-0' />
              </Button>
              <Button
                variant={ButtonVariantEnum.INVISIBLE}
                onClick={handleOpenFavourites}>
                <Badge
                  className='w-8 h-8 md:w-10 md:h-10 shrink-0'
                  count={favouriteProducts.length ?? 0}>
                  <FavoriteIcon className='h-5' />
                </Badge>
              </Button>
              <Button
                variant={ButtonVariantEnum.INVISIBLE}
                onClick={handleOpenCart}>
                <Badge
                  className='w-8 h-8 md:w-10 md:h-10 shrink-0'
                  count={countProducts()}>
                  <CartIcon className='h-5' />
                </Badge>
              </Button>
            </div>
            <LangListBox />
          </div>
        </div>
        <NavAndSearch className='md:hidden' header={header} />
      </header>
    </>
  );
};

export default Header;
