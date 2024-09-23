import {
  AttributeInput,
  MoneyV2,
  Product,
  ProductVariant,
} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import React, {FC, useEffect, useState} from 'react';

import {useSubscriptionsActions} from '@base/store';

import {CartIcon, MinusIcon, PlusIcon} from '@widgets/PdpSection/assets';

import {CartPlusIcon, EnvelopeIcon} from '@shared/assets';
import {useCustomCart} from '@shared/hooks';
import {Button, ButtonVariantEnum, NumericInput} from '@shared/ui';

type Props = {
  product: Product;
  price: MoneyV2;
  variant: ProductVariant | null;
  attributes?: AttributeInput[];
  type?: 'normal' | 'minimal';
  isDisabledAddToCart?: boolean;
  addToCartTitle?: string | null;
  notifyMeTitle?: string | null;
};

const AddToCart: FC<Props> = ({
  product,
  variant,
  price,
  attributes,
  type = 'normal',
  isDisabledAddToCart = false,
  addToCartTitle,
  notifyMeTitle,
}) => {
  const {openSubscriptionWidget, setProduct, setProductVariant} =
    useSubscriptionsActions();
  const {addCartLine} = useCustomCart();
  const [count, setCount] = useState<number>(1);
  const handleCountChange = (newValue: number) => {
    setCount(newValue);
  };

  const handleMinimalValue = () => {
    setCount((state) => Math.max(1, state - 1));
  };

  const handleMaxValue = () => {
    setCount((state) => Math.min(1000, state + 1));
  };

  const handleAddToCart = () => {
    if (variant)
      addCartLine(product, {
        merchandiseId: variant.id,
        quantity: count,
        attributes,
      });
  };

  useEffect(() => {
    setProduct(product);
    if (variant) {
      setProductVariant(variant);
    }
  }, [product, variant]);

  const buttonTitle =
    type === 'normal' ? `${addToCartTitle || 'Add to cart'}   ` : '';

  return (
    <div
      className={clsx('md:w-full flex items-center justify-center', {
        'gap-4 w-[45%]': type === 'normal',
        'flex-col sm:flex-row gap-2': type === 'minimal',
      })}>
      <div
        className={clsx(
          'flex items-center justify-between w-full h-10 px-3 border border-tone-100',
          'md:h-13',
          {'md:w-2/5': type === 'normal'},
        )}>
        <Button
          variant={ButtonVariantEnum.WHITE}
          className='relative !p-0 !w-8 !h-8 !gap-0 rem:min-h-[32px]'
          hasCustomIconHeight
          onClick={handleMinimalValue}
          icon={
            <MinusIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-gray-700' />
          }
        />
        <NumericInput
          className='text-xs md:text-s font-medium text-gray-700 outline-none border-0 w-13 text-center'
          value={count}
          onChange={handleCountChange}
          minValue={0}
          maxValue={1000}
        />
        <Button
          variant={ButtonVariantEnum.WHITE}
          className='relative !p-0 !w-8 !h-8 !gap-0 rem:min-h-[32px]'
          hasCustomIconHeight
          onClick={handleMaxValue}
          icon={
            <PlusIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-gray-700' />
          }
        />
      </div>
      <div
        className={clsx('justify-center md:static bottom-5 md:translate-x-0', {
          'w-[calc(100%-3rem)] sm:w-3/5 left-1/2 fixed h-13 -translate-x-1/2 z-30':
            type === 'normal',
          'h-10 md:h-13 w-full md:w-fit': type === 'minimal',
        })}>
        {variant && !variant.availableForSale ? (
          <button
            className='w-full h-full flex items-center justify-center bg-tone-100 gap-2.5'
            onClick={() => openSubscriptionWidget()}>
            <EnvelopeIcon className='w-5 h-5' />
            <span className='text-s'>{notifyMeTitle}</span>
          </button>
        ) : (
          <Button
            variant={ButtonVariantEnum.SECONDARY}
            className='w-full h-full'
            hasCustomIconHeight
            disabled={isDisabledAddToCart}
            icon={
              <>
                <CartIcon className='w-5 h-5 text-gray-100 hidden md:block' />
                <CartPlusIcon className='w-5 h-5 text-gray-100 block md:hidden fill-white' />
              </>
            }
            onClick={handleAddToCart}>
            {type === 'normal' ? (
              <div className='flex gap-0.5'>
                {buttonTitle}
                {price && type === 'normal' ? (
                  <div className='flex md:hidden'>
                    +{price.currencyCode}
                    {price.amount}
                  </div>
                ) : null}
              </div>
            ) : null}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
