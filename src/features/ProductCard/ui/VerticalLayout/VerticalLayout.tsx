import {
  Collection,
  Maybe,
  MoneyV2,
  ProductVariant,
} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import React, {FC} from 'react';

import ImagesContainer from './ImagesContainer';

import {useFavouritesProducts} from '@base/hooks';
import {useAppSelector} from '@base/store';

import ActionsTile from '@features/ProductCard/ui/ActionsTile';
import ColorBlock from '@features/ProductCard/ui/ColorBlock';

import {CartBagIcon, CartPlusIcon, EnvelopeIcon} from '@shared/assets';
import {
  ADD_TO_CART_AR_TITLE,
  ADD_TO_CART_EN_TITLE,
  NOTIFY_ME_AR_TITLE,
  NOTIFY_ME_EN_TITLE,
} from '@shared/constants';
import {ColorType, ProductCardSizesEnum, ProductType} from '@shared/types';
import {Button, ButtonVariantEnum, Price, ProductInfoBlock} from '@shared/ui';
import {getImages} from '@shared/utils';

type Props = {
  className?: string;
  product: ProductType;
  discount?: number;
  price: MoneyV2;
  colors: ColorType[];
  selectedColor: ColorType | null;
  handleSelectColor: (color: ColorType) => void;
  compareAtPrice?: Maybe<MoneyV2>;
  size?: ProductCardSizesEnum;
  isStaticButton?: boolean;
  collection?: Collection;
  addToCart: () => void;
  selectedVariant: ProductVariant | null;
  productVideoUrl: string | null;
  productFileUrl: string | null;
  priorityLoading?: boolean;
};

const VerticalLayout: FC<Props> = ({
  className = '',
  product,
  size = ProductCardSizesEnum.MEDIUM,
  discount,
  price,
  colors,
  handleSelectColor,
  selectedColor,
  compareAtPrice,
  isStaticButton = false,
  collection,
  addToCart,
  selectedVariant,
  productVideoUrl,
  productFileUrl,
  priorityLoading,
}) => {
  const {lang} = useAppSelector((state) => state.header);
  const {isFavouriteProduct, countFavouriteUsers, toggleFavourite} =
    useFavouritesProducts(product);
  const isAvailableForSale = selectedVariant?.availableForSale || false;
  const images = getImages(product, selectedVariant, selectedColor);

  const priceSize = !isStaticButton ? ProductCardSizesEnum.LARGE : undefined;
  const category = product.category || '';
  const actionsTileType =
    (isStaticButton && size === ProductCardSizesEnum.MEDIUM) ||
    size === ProductCardSizesEnum.LARGE
      ? 'full'
      : 'minimize';
  const isActionTileReversed = size === ProductCardSizesEnum.LARGE;

  const addToCartTitle =
    lang?.locale === 'ar' ? ADD_TO_CART_AR_TITLE : ADD_TO_CART_EN_TITLE;
  const notifyMeTitle =
    lang?.locale === 'ar' ? NOTIFY_ME_AR_TITLE : NOTIFY_ME_EN_TITLE;

  let isDisableAddToCart =
    colors.length > 0 && size === ProductCardSizesEnum.LARGE
      ? !selectedColor
      : false;
  if (!selectedVariant) {
    isDisableAddToCart = true;
  }

  return (
    <div
      className={clsx(
        'relative w-full h-full flex rem:min-w-[120px] md:rem:min-w-[180px] lg:rem:min-w-[240px]',
        className,
      )}>
      <div
        className={clsx(
          'relative w-full bg-white overflow-hidden transition-all duration-300 group rem:rounded-[20px]',
          {
            'h-[calc(100%-4.5rem)] hover:h-full': !isStaticButton,
          },
        )}>
        <ActionsTile
          className='absolute top-1 ltr:right-1 rtl:left-1 z-10'
          type={actionsTileType}
          position='right'
          reversed={isActionTileReversed}
          countFavorite={countFavouriteUsers()}
          isFavourite={isFavouriteProduct()}
          handleToggleFavourite={toggleFavourite}
          productVideoUrl={productVideoUrl}
          productFileUrl={productFileUrl}
        />
        <div
          className={clsx('w-full flex flex-col bg-white', {
            'w-full gap-5 p-5': !isStaticButton,
            'h-full gap-4 px-3 pb-5 pt-2': isStaticButton,
          })}>
          <ImagesContainer
            images={images}
            handle={product.handle}
            collection={collection}
            priorityLoading={priorityLoading}
          />
          <div className='w-full flex flex-col gap-4 md:gap-5'>
            <div className='relative w-full h-11'>
              <ProductInfoBlock
                className={clsx(
                  'absolute top-0 left-0 w-full h-full transition-all duration-300',
                  {
                    'group-hover:opacity-0':
                      size === ProductCardSizesEnum.LARGE && colors.length,
                  },
                )}
                category={category}
                title={product.title}
                discount={discount}
                size={size}
              />
              {size === ProductCardSizesEnum.LARGE && colors.length ? (
                <ColorBlock
                  className={clsx(
                    'absolute top-0 left-0 w-full opacity-0 transition-all duration-300',
                    {
                      'group-hover:opacity-100':
                        size === ProductCardSizesEnum.LARGE,
                    },
                  )}
                  colors={colors}
                  selectedColor={selectedColor}
                  handleSelectColor={handleSelectColor}
                />
              ) : null}
            </div>
            <Price
              price={price}
              compareAtPrice={compareAtPrice}
              size={priceSize}
              isOutOfStock={!isAvailableForSale}
            />
          </div>
          {isAvailableForSale ? (
            <Button
              className={clsx(
                'w-full transition-all duration-300 rounded-5xl',
                {
                  'opacity-0 group-hover:opacity-100 h-14': !isStaticButton,
                  'h-10': isStaticButton,
                },
              )}
              icon={
                isStaticButton && size === ProductCardSizesEnum.SMALL ? (
                  <CartBagIcon className='w-5 h-5 stroke-white' />
                ) : (
                  <CartPlusIcon />
                )
              }
              disabled={isDisableAddToCart}
              variant={ButtonVariantEnum.SECONDARY}
              onClick={addToCart}>
              {addToCartTitle}
            </Button>
          ) : (
            <Button
              className={clsx(
                'w-full transition-all duration-300 rounded-5xl',
                {
                  'opacity-0 group-hover:opacity-100 h-14': !isStaticButton,
                  'h-10': isStaticButton,
                },
              )}
              icon={<EnvelopeIcon className='w-5 h-5' />}
              variant={ButtonVariantEnum.OUTLINE}
              onClick={addToCart}>
              {notifyMeTitle}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalLayout;
