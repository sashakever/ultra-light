'use client';

import {Dialog, Transition} from '@headlessui/react';
import {CartLine} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import {usePathname, useRouter} from 'next/navigation';
import React, {FC, Fragment, useEffect} from 'react';

import {CartItem} from './CartItem';
import {MaybeInterested} from './MaybeInterested';

import {useGetProductRecommendationsQuery} from '@base/api';
import {useAppSelector, useCartActions} from '@base/store';

import {DEFAULT_LOCALE} from '@shared';
import {ThinCloseIcon} from '@shared/assets';
import {useCustomCart} from '@shared/hooks';
import {StrapiCartModalType} from '@shared/types';
import {Button, ButtonVariantEnum} from '@shared/ui';

type Props = {
  cartModalData?: StrapiCartModalType;
};

const CartWidget: FC<Props> = ({cartModalData}) => {
  const {isCartOpen} = useAppSelector((state) => state.cart);
  const {lang} = useAppSelector((state) => state.header);
  const {closeCart} = useCartActions();
  const {lines, checkoutUrl, cost} = useCustomCart();
  const router = useRouter();
  const pathname = usePathname();

  const productId = lines ? lines[0]?.merchandise?.product?.id : '';
  const {data: products} = useGetProductRecommendationsQuery({
    lang: lang?.locale || DEFAULT_LOCALE,
    id: productId || '',
  });

  const productsInCartIds = lines
    ? lines.map((line) => line?.merchandise?.product?.id).filter(Boolean)
    : [];
  const filteredByCartProducts = products?.filter(
    (product) => !productsInCartIds.includes(product.id),
  );

  const totalAmount = Number(cost?.subtotalAmount?.amount) || 0;

  const currencyCode = lines?.[0]?.merchandise?.price?.currencyCode ?? '';

  const handleCheckout = () => {
    if (checkoutUrl) {
      router.push(checkoutUrl);
    }
  };

  useEffect(() => {
    closeCart();
  }, [pathname]);

  return (
    <Transition appear show={!!isCartOpen} as={Fragment}>
      <Dialog as='div' className='relative z-[150]' onClose={() => closeCart()}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto overflow-x-hidden md:overflow-x-visible'>
          <div className='flex min-h-full justify-center rem:pt-[156px] md:rem:pt-[75px] md:rem:pb-[150px] text-center max-h-[90%]'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel
                className={clsx(
                  'relative w-full h-full md:h-auto rem:max-w-[924px] md:max-h-[75%] md:rem:min-h-[680px]',
                  'bg-white text-left shadow-xl rounded-t-xl md:rounded-none',
                )}>
                <div
                  className={clsx(
                    'w-fit absolute h-10 flex md:bg-tone-300',
                    'z-10  top-3  md:top-0',
                    'ltr:right-4 ltr:md:right-0 rtl:left-4 rtl:md:left-0',
                  )}>
                  <Button
                    variant={ButtonVariantEnum.INVISIBLE}
                    onClick={() => closeCart()}
                    className={clsx(
                      'w-10 h-full flex items-center justify-center',
                      'transition-all duration-300 hover:bg-tone-400 outline-none shadow-none',
                    )}>
                    <ThinCloseIcon className='text-gray-700 w-5 h-5' />
                  </Button>
                </div>
                <div className='min-h-[calc(100vh-4.125rem)] md:min-h-0 flex flex-col md:flex-row items-stretch h-full md:gap-2'>
                  <h2 className='rtl:text-right text-s font-medium block md:hidden pt-5 px-6 pb-4 border-b'>
                    {cartModalData?.data?.attributes?.Title}
                  </h2>
                  <div className='flex-1 md:flex-initial pt-2 pb-4 md:pb-0 px-6 md:pr-0 md:rem:w-[616px] md:pl-6 md:rem:pt-[30px] flex flex-col'>
                    <div className='hidden md:flex justify-between items-end md:pl-4 md:pr-6.5'>
                      <h2 className='md:max-w-[260px] w-full text-s md:text-3xl !leading-10 font-medium rtl:text-right'>
                        {cartModalData?.data?.attributes?.Title}
                      </h2>
                      <span
                        className='mb-3 text-xs text-gray-400 hidden md:block'
                        dir='ltr'>
                        {lines?.length ?? 0}
                        {lines?.length === 1
                          ? ` ${cartModalData?.data?.attributes?.ProductCountSingularText}`
                          : ` ${cartModalData?.data?.attributes?.ProductCountPluralText}`}
                      </span>
                    </div>
                    <ul
                      className={clsx(
                        'flex flex-col md:mt-8 md:rem:pr-[26px]',
                        'md:flex-1 md:overflow-auto',
                      )}>
                      {lines?.map((line) => (
                        <CartItem itemData={line as CartLine} key={line?.id} />
                      ))}
                    </ul>
                    <MaybeInterested
                      className='md:h-64 md:pb-20 md:rem:pr-[26px] mt-auto'
                      title={
                        cartModalData?.data?.attributes?.MightInterestedText ||
                        ''
                      }
                      products={filteredByCartProducts}
                    />
                  </div>
                  <div
                    className={clsx(
                      'md:flex-1 flex flex-col bg-tone-100 py-4 pb-20 px-6',
                      'md:rem:p-[17px] md:rem:pt-[76px] md:pb-5',
                    )}>
                    <div className='text-l font-medium rtl:text-right'>
                      {cartModalData?.data?.attributes?.OrderSummaryText}
                    </div>
                    <div
                      className={clsx(
                        'flex text-xs items-center justify-between pb-6 border-b border-gray-200',
                        'rem:mt-[30px] rem:md:mr-[7px]',
                      )}>
                      <div className='text-gray-400' dir='ltr'>
                        {cartModalData?.data?.attributes?.OrderAmountText}
                      </div>
                      <div>
                        {currencyCode}
                        {totalAmount.toFixed(2)}
                      </div>
                    </div>
                    <div className='flex text-s font-medium items-center justify-between rem:mt-[22px] mb-6 md:mb-0 rem:md:pr-[7px]'>
                      <div dir='ltr'>
                        {cartModalData?.data?.attributes?.TotalAmountText}
                      </div>
                      <div className='text-xl'>
                        {currencyCode}
                        {totalAmount.toFixed(2)}
                      </div>
                    </div>
                    <Button
                      variant={ButtonVariantEnum.SECONDARY}
                      className='block mt-auto w-full h-13'
                      onClick={handleCheckout}>
                      <div className='flex flex-row gap-2.5'>
                        {cartModalData?.data?.attributes?.ContinueCheckoutText}
                        <div>
                          {currencyCode}
                          {totalAmount.toFixed(2)}
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CartWidget;
