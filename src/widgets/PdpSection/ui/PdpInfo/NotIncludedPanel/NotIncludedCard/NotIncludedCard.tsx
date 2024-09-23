import {
  AttributeInput,
  MediaImage,
} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {FC} from 'react';

import AddToCart from '@widgets/PdpSection/ui/PdpInfo/AddToCart';

import {NoImage} from '@shared/assets';
import {ProductType} from '@shared/types';
import {Price} from '@shared/ui';
import {getProductMetafield} from '@shared/utils';

type Props = {
  className?: string;
  product: ProductType;
};

const getCharacteristicsFromProduct = (product: ProductType) => {
  const characteristics: {name: string; value: string}[] = [];

  characteristics.push({name: 'Brand', value: product.vendor});

  const variant = product.variants.nodes[0];
  if (variant) {
    const {selectedOptions} = variant;
    const wattage = selectedOptions.find((option) => option.name === 'Wattage');
    if (wattage) {
      characteristics.push({name: 'Wattage', value: wattage.value});
    }

    const lightColor = selectedOptions.find(
      (option) => option.name === 'Light Color',
    );
    if (lightColor) {
      characteristics.push({name: 'Light Color', value: lightColor.value});
    }

    const productColor = selectedOptions.find(
      (option) => option.name === 'Product color',
    );
    if (productColor) {
      characteristics.push({name: 'Product color', value: productColor.value});
    }

    const bulbMetafield = getProductMetafield('bulb_base', product);
    const bulbValue = bulbMetafield ? bulbMetafield.value : '';
    if (bulbValue) {
      characteristics.push({name: 'Bulb shape size', value: bulbValue});
    }
  }

  return characteristics;
};

const NotIncludedCard: FC<Props> = ({className = '', product}) => {
  const firstMedia = product.media.nodes.find(
    (media) => media.mediaContentType === 'IMAGE',
  ) as MediaImage | undefined;

  const imgWidth = firstMedia?.image?.width || 110;
  const imgHeight = firstMedia?.image?.height || 110;

  const currentVariant = product.variants.nodes[0];
  const characteristics = getCharacteristicsFromProduct(product);

  const attributes: AttributeInput[] = currentVariant.selectedOptions.map(
    (option) => ({key: option.name, value: option.value}),
  );

  return (
    <div
      key={product.id}
      className={clsx('flex flex-col gap-3 justify-between', className)}>
      <Link href={product.handle}>
        <div className='relative w-full aspect-[1.3]'>
          <Image
            className='absolute top-0 left-0 w-full h-full object-contain'
            src={firstMedia?.image?.url || NoImage.src}
            alt={product.title}
            width={imgWidth}
            height={imgHeight}
          />
        </div>
        <p className='pt-3 text-2xs sm:text-xs line-clamp-3'>{product.title}</p>
      </Link>
      <div className='flex flex-col'>
        <Price
          price={product.priceRange.minVariantPrice}
          compareAtPrice={product.compareAtPriceRange.minVariantPrice}
        />
        <span className='text-2xs sm:text-xs text-gray-400'>
          Price incl. tax
        </span>
      </div>
      <AddToCart
        variant={currentVariant}
        price={product.priceRange.minVariantPrice}
        product={product}
        type='minimal'
        attributes={attributes}
      />
      <div className='w-full flex flex-col gap-1'>
        {characteristics.map((item, index) =>
          item.value ? (
            <div
              key={index}
              className={clsx(
                'flex justify-between w-full h-5 sm:h-6 sm:pb-2 border-b border-dashed border-gray-700',
                'text-2xs sm:text-xs font-normal',
              )}>
              <span>{item.name}</span>
              <span>{item.value}</span>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default NotIncludedCard;
