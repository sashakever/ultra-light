import {Product} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import Image from 'next/image';
import React, {FC, Fragment, useState} from 'react';
import {match} from 'ts-pattern';

import Checkbox from './Checkbox';

import {PlusIcon} from '@widgets/PdpSection/assets';

import {NoImage} from '@shared/assets';
import {useCustomCart} from '@shared/hooks';
import {Button, ButtonVariantEnum} from '@shared/ui';
import {
  setArgsToString,
  variantSelectedOptionsToCartAttributes,
} from '@shared/utils';

type Props = {
  relatedProducts: Product[];
  buttonTitle: string | null;
  title: string | null;
  selectProductTitle: string | null;
};

const getProdPrice = (product: Product) => product.variants.nodes[0].price;

const FrequentlyBought: FC<Props> = ({
  relatedProducts,
  title,
  buttonTitle,
  selectProductTitle,
}) => {
  const {addCartLines} = useCustomCart();
  const currencyCode =
    relatedProducts[0].variants.nodes[0]?.price.currencyCode || '$';
  const [selectedProducts, setSelectedProducts] = useState<Product[] | null>();

  const handleChange = (product: Product) => {
    setSelectedProducts((state) =>
      state?.some((item) => item.id === product.id)
        ? state.filter((item) => item.id !== product.id)
        : [...(state || []), product],
    );
  };

  const handleAddToCart = () => {
    if (!selectedProducts) return;

    addCartLines(
      selectedProducts,
      selectedProducts?.map((product) => ({
        merchandiseId: product.variants.nodes[0].id,
        attributes: variantSelectedOptionsToCartAttributes(
          product.variants.nodes[0],
        ),
      })),
    );
  };

  const buttonFullTitle = !selectedProducts?.length
    ? selectProductTitle
    : setArgsToString(buttonTitle, [
        `${selectedProducts?.length || 0}`,
        `${currencyCode}${(
          selectedProducts?.reduce(
            (total, product) =>
              total + parseFloat(getProdPrice(product).amount),
            0,
          ) || 0
        ).toFixed(2)}`,
      ]);

  return (
    <div className=''>
      <div className='bg-tone-100 px-4 py-6 pb-3 md:p-6'>
        <div className='text-sx md:text-s font-medium text-gray-700 mb-6'>
          {title}
        </div>
        <div className='scrollable-container flex gap-2 bg-gray-100 overflow-x-scroll w-full flex-nowrap mb-3'>
          {relatedProducts.map((product, index) => {
            const parsedPrice = getProdPrice(product);
            return (
              <Fragment key={product.id}>
                <Checkbox
                  checkboxPosition='top-2 left-2'
                  className={clsx(
                    'flex flex-col items-center p-3 pt-8 inline-block w-[45%] min-w-30 shrink-0',
                    'md:w-[35%] md:rem:min-w-[140px]',
                  )}
                  htmlFor={`checkbox-${product.id}`}
                  onChange={() => handleChange(product)}>
                  <div className='w-22 h-22 mb-4'>
                    <Image
                      width={0}
                      height={0}
                      sizes='100vh'
                      style={{width: '100%', height: '100%'}}
                      src={
                        product?.media?.nodes[0]?.previewImage?.url ||
                        NoImage.src
                      }
                      alt=''
                    />
                  </div>
                  <div className='text-xs md:text-s font-medium mb-3'>{`${
                    parsedPrice.currencyCode
                  }${parseFloat(parsedPrice.amount).toFixed(2)}`}</div>
                  <div className='text-xs text-center'>{product.title}</div>
                  {match(index < relatedProducts.length - 1)
                    .with(true, () => (
                      <PlusIcon className='absolute top-1/2 right-0 w-4 h-4 translate-x-1/2' />
                    ))
                    .otherwise(() => null)}
                </Checkbox>
              </Fragment>
            );
          })}
        </div>
        <Button
          disabled={!selectedProducts || !selectedProducts?.length}
          onClick={handleAddToCart}
          className='w-full border-tone-700 border-1.5 text-tone-700 text-xs md:text-s h-10 md:h-11'
          variant={ButtonVariantEnum.OUTLINE}>
          {buttonFullTitle}
        </Button>
      </div>
    </div>
  );
};

export default FrequentlyBought;
