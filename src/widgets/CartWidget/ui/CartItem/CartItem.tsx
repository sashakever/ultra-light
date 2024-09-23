import {
  AttributeInput,
  CartLine,
} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import Image from 'next/image';
import React, {FC, useEffect, useState} from 'react';

import {ColorSelect} from '../ColorSelect';

import {Button, ButtonVariantEnum, NumericInput, Price} from '@shared';
import {MinusIcon, NoImage, PlusIcon, TrashSimpleIcon} from '@shared/assets';
import {useCustomCart} from '@shared/hooks';
import {ProductCardSizesEnum} from '@shared/types';
import {
  getCategoriesFromProduct,
  getColorsFromProductOptions,
  variantSelectedOptionsToCartAttributes,
} from '@shared/utils';

type Props = {
  className?: string;
  itemData?: CartLine;
};

const CartItem: FC<Props> = ({itemData, className = ''}) => {
  const {removeCartLine, updateCartLine, getProductById} = useCustomCart();
  const [count, setCount] = useState<number>(itemData?.quantity ?? 1);
  const [limitExceeded, setLimitExceeded] = useState<number>(0);
  const [isLimitExceededOnce, setLimitExceededOnce] = useState<boolean>(false);

  const product = getProductById(itemData?.merchandise.product.id ?? '');
  const image =
    itemData?.merchandise.image ?? product?.media?.nodes?.[0]?.previewImage;
  const categoryName = product ? getCategoriesFromProduct(product)?.[0] : '';
  const allColors = getColorsFromProductOptions(product?.options);

  const handleRemove = () => {
    removeCartLine(itemData?.id ?? '');
  };

  const handleMinimalValue = () => {
    setCount((state) => Math.max(1, state - 1));
  };

  const handleMaxValue = () => {
    setCount((state) => Math.min(1000, state + 1));
  };

  const handleCountChange = (newValue: number) => {
    setCount(newValue);
  };

  const handleColorChange = (color: string) => {
    const searchVariant = product?.variants.nodes.filter(
      (node) =>
        node.selectedOptions.find(
          (option) => option.name.toLocaleLowerCase() === 'color',
        )?.value === color,
    )?.[0];
    updateCartLine({
      id: itemData?.id ?? '',
      merchandiseId: searchVariant?.id ?? '',
      attributes: variantSelectedOptionsToCartAttributes(searchVariant),
    });
  };

  useEffect(() => {
    updateCartLine({
      id: itemData?.id ?? '',
      quantity: count,
      attributes: itemData ? (itemData.attributes as AttributeInput[]) : [],
    });
  }, [count]);

  useEffect(() => {
    if (itemData) {
      setCount(itemData.quantity);
    }
    if (itemData && count > itemData.quantity) {
      if (!isLimitExceededOnce) {
        setLimitExceeded(itemData.quantity);
        setLimitExceededOnce(true);
      }
    }
  }, [itemData?.quantity]);

  return (
    <div
      className={clsx(
        'border-t first:border-t-0 md:first:border-t last:border-b border-gray-200',
        'relative py-4 pr-2.5 flex gap-2.5 md:rem:gap-[7px] items-center',
        className,
      )}>
      <Button
        variant={ButtonVariantEnum.INVISIBLE}
        onClick={handleRemove}
        className={clsx(
          '!min-h-fit absolute p-2 md:p-2.5 top-3',
          'ltr:rem:right-0 rtl:rem:left-0',
          'hover:bg-gray-200',
        )}>
        <TrashSimpleIcon className='w-4 h-4 md:w-5 md:h-5' />
      </Button>
      <Image
        alt={image?.altText ?? NoImage.src}
        src={image?.url ?? ''}
        width={100}
        height={102}
        className='rem:w-[78px] h-20 md:w-25 rem:md:h-[102px]'
      />
      <div className='flex flex-col gap-3 md:gap-4 w-full flex-1 md:flex-auto'>
        <div className='flex flex-col gap-1 w-[calc(100vw-10.5rem)] md:w-10/12'>
          {categoryName ? (
            <span className='text-xs w-full text-gray-400'>{categoryName}</span>
          ) : null}
          <span className='text-s font-medium w-full truncate rtl:text-right'>
            {product?.title}
          </span>
        </div>
        <div
          className={clsx(
            'flex flex-col md:flex-row gap-3 md:gap-2 justify-between items-stretch',
            'w-full relative',
          )}>
          <div className='relative flex gap-4 items-center flex-wrap pb-5'>
            <div
              className={clsx(
                'flex items-center justify-between md:w-full h-10 border border-gray-200',
                'md:rem:w-[136px] rounded-full overflow-hidden',
              )}>
              <Button
                variant={ButtonVariantEnum.WHITE}
                className='relative !p-0 w-10 md:!w-11 h-full !gap-0 rem:min-h-[32px]'
                hasCustomIconHeight
                onClick={handleMinimalValue}
                disabled={count === 1}
                icon={
                  <MinusIcon
                    className={clsx(
                      'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5',
                      {
                        'text-gray-700': count > 1,
                        'text-gray-300': count === 1,
                      },
                    )}
                  />
                }
              />
              <NumericInput
                className={clsx(
                  'text-xs md:text-s font-medium text-gray-700',
                  'outline-none border-0 w-6.5 md:w-13 text-center',
                )}
                value={count}
                onChange={handleCountChange}
                minValue={0}
                maxValue={1000}
              />
              <Button
                variant={ButtonVariantEnum.WHITE}
                className='relative !p-0 w-10 md:!w-11 !h-full !gap-0 rem:min-h-[32px]'
                hasCustomIconHeight
                onClick={handleMaxValue}
                icon={
                  <PlusIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-gray-700' />
                }
              />
            </div>
            {itemData ? (
              <Price
                className='items-center'
                price={itemData.merchandise.price}
                compareAtPrice={itemData.merchandise.compareAtPrice}
                size={ProductCardSizesEnum.SMALL}
              />
            ) : null}
            {isLimitExceededOnce ? (
              <div className='absolute left-0 bottom-0 text-xs text-rose-500'>
                In stock: {limitExceeded}
              </div>
            ) : null}
          </div>
          {allColors.length ? (
            <div className='flex gap-3 items-center text-xs'>
              Colour:
              <ColorSelect
                onChangeColor={handleColorChange}
                allColors={allColors}
                currentColor={
                  itemData?.merchandise.selectedOptions.find(
                    (option) => option.name.toLocaleLowerCase() === 'color',
                  )?.value ?? ''
                }
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
