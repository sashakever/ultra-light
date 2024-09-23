import {
  Collection,
  Maybe,
  MediaImage,
  MoneyV2,
  ProductVariant,
} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {FC} from 'react';

import {useFavouritesProducts} from '@base/hooks';
import {useAppSelector} from '@base/store';

import ActionsTile from '@features/ProductCard/ui/ActionsTile';

import {CartPlusIcon, EnvelopeIcon, NoImage} from '@shared/assets';
import {
  ADD_TO_CART_AR_TITLE,
  ADD_TO_CART_EN_TITLE,
  NOTIFY_ME_AR_TITLE,
  NOTIFY_ME_EN_TITLE,
} from '@shared/constants';
import {ProductCardSizesEnum, ProductType} from '@shared/types';
import {Button, ButtonVariantEnum, Price, ProductInfoBlock} from '@shared/ui';
import {getCategoriesFromProduct} from '@shared/utils';

type Props = {
  className?: string;
  product: ProductType;
  discount?: number;
  price: MoneyV2;
  compareAtPrice?: Maybe<MoneyV2>;
  size?: ProductCardSizesEnum;
  collection?: Collection;
  addToCart: () => void;
  selectedVariant: ProductVariant | null;
  productVideoUrl: string | null;
  productFileUrl: string | null;
};

const HorizontalLayout: FC<Props> = ({
  className = '',
  product,
  discount,
  price,
  compareAtPrice,
  size = ProductCardSizesEnum.SMALL,
  collection,
  addToCart,
  selectedVariant,
  productVideoUrl,
  productFileUrl,
}) => {
  const {lang} = useAppSelector((state) => state.header);
  const {isFavouriteProduct, countFavouriteUsers, toggleFavourite} =
    useFavouritesProducts(product);
  const isAvailableForSale = selectedVariant?.availableForSale || false;

  const firstMedia = product.media.nodes[0];
  const productImg: MediaImage | null =
    firstMedia && firstMedia.mediaContentType === 'IMAGE'
      ? (firstMedia as MediaImage)
      : null;
  const priceSize =
    size === ProductCardSizesEnum.SMALL
      ? ProductCardSizesEnum.MEDIUM
      : ProductCardSizesEnum.SMALL;
  const category = getCategoriesFromProduct(product)?.[0] || '';
  const imgWidth = productImg?.image?.width || 110;
  const imgHeight = productImg?.image?.height || 110;

  const productLink = collection
    ? {
        pathname: `/products/${product.handle}`,
        query: {
          'from-collection': `${collection?.handle}:::${collection?.title}`,
        },
      }
    : `/products/${product.handle}`;

  const addToCartTitle =
    lang?.locale === 'ar' ? ADD_TO_CART_AR_TITLE : ADD_TO_CART_EN_TITLE;
  const notifyMeTitle =
    lang?.locale === 'ar' ? NOTIFY_ME_AR_TITLE : NOTIFY_ME_EN_TITLE;
  const position = lang?.locale === 'ar' ? 'right' : 'left';

  return (
    <Link
      className={clsx(
        'relative py-3 bg-white hover:bg-tone-100',
        'flex flex-col gap-4 transition-all duration-300',
        {
          'px-3 aspect-[2.52] border border-gray-300':
            size === ProductCardSizesEnum.SMALL,
          'px-4 h-auto':
            size === ProductCardSizesEnum.LARGE ||
            ProductCardSizesEnum.EXTRA_SMALL,
        },
        className,
      )}
      href={productLink}>
      <div className='flex gap-3'>
        {size === ProductCardSizesEnum.SMALL ? (
          <ActionsTile
            className='absolute top-1 ltr:left-1 rem:rtl:right-22 z-10'
            type='minimize'
            position={position}
            countFavorite={countFavouriteUsers()}
            isFavourite={isFavouriteProduct()}
            handleToggleFavourite={toggleFavourite}
            productVideoUrl={productVideoUrl}
            productFileUrl={productFileUrl}
          />
        ) : null}
        <div
          className={clsx('relative h-full aspect-square shrink-0', {
            'rem:min-h-[70px]': size === ProductCardSizesEnum.EXTRA_SMALL,
            'rem:min-h-[110px]': size === ProductCardSizesEnum.SMALL,
            'rem:min-h-[125px]': size === ProductCardSizesEnum.LARGE,
          })}>
          <Image
            className='absolute top-0 left-0 w-full h-full object-cover'
            src={productImg?.image?.url || NoImage.src}
            width={imgWidth}
            height={imgHeight}
            alt={product.title}
          />
        </div>
        <div
          className={clsx('w-full flex flex-col', {
            'gap-1': size === ProductCardSizesEnum.EXTRA_SMALL,
            'gap-5': size === ProductCardSizesEnum.SMALL,
            'gap-6 pt-5': size === ProductCardSizesEnum.LARGE,
          })}>
          <ProductInfoBlock
            category={category}
            title={product.title}
            discount={discount}
            size={
              size !== ProductCardSizesEnum.EXTRA_SMALL
                ? ProductCardSizesEnum.SMALL
                : size
            }
          />
          <Price
            price={price}
            compareAtPrice={compareAtPrice}
            size={priceSize}
            isOutOfStock={!isAvailableForSale}
          />
        </div>
      </div>
      {size === ProductCardSizesEnum.LARGE ||
      size === ProductCardSizesEnum.EXTRA_SMALL ? (
        <div className='flex gap-4 items-center justify-between'>
          {isAvailableForSale ? (
            <Button
              className='w-full'
              icon={<CartPlusIcon />}
              variant={ButtonVariantEnum.SECONDARY}
              onClick={addToCart}>
              {addToCartTitle}
            </Button>
          ) : (
            <Button
              className='w-full'
              icon={<EnvelopeIcon className='w-5 h-5' />}
              variant={ButtonVariantEnum.OUTLINE}
              onClick={addToCart}>
              {notifyMeTitle}
            </Button>
          )}
          <ActionsTile
            direction='horizontal'
            type='minimize'
            countFavorite={countFavouriteUsers()}
            isFavourite={isFavouriteProduct()}
            productFileUrl={productFileUrl}
            productVideoUrl={productVideoUrl}
            handleToggleFavourite={toggleFavourite}
          />
        </div>
      ) : null}
    </Link>
  );
};

export default HorizontalLayout;
