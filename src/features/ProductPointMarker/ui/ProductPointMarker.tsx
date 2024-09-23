import clsx from 'clsx';
import Link from 'next/link';
import React, {FC} from 'react';

import {BREAKPOINT_MEDIUM} from '@shared';
import {ProductCardSizesEnum, StrapiPointType} from '@shared/types';
import {PointMarker, Price} from '@shared/ui';
import {getCategoriesFromProduct} from '@shared/utils';

type Props = {
  className?: string;
  point: StrapiPointType;
  width: number;
  isAlignTop?: boolean;
};

const ProductPointMarker: FC<Props> = ({
  className = '',
  point,
  width,
  isAlignTop,
}) => {
  const product = point.Product;
  if (!product) return null;

  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product?.compareAtPriceRange?.minVariantPrice;
  const discount = parseFloat(compareAtPrice?.amount)
    ? Math.abs(parseFloat(price.amount) - parseFloat(compareAtPrice?.amount))
    : 0;

  const category = getCategoriesFromProduct(product)[0];
  const discountLabel = discount ? `-${discount.toFixed(0)}%` : 0;

  const pointCoord =
    width > BREAKPOINT_MEDIUM
      ? {
          xPercent: point.XPercentDesktop.toString(),
          yPercent: point.YPercentDesktop.toString(),
        }
      : {
          xPercent: point.XPercentMobile.toString(),
          yPercent: point.YPercentMobile.toString(),
        };

  return (
    <PointMarker pointCoord={pointCoord} isAlignTop={isAlignTop}>
      <Link
        href={`/products/${product.handle}`}
        className={clsx(
          'flex flex-col gap-2 md:gap-3 p-1 md:p-3 rem:min-w-[141px] lg:rem:min-w-[187px]',
          className,
        )}>
        <div className='w-full flex items-start justify-between pt-1 md:pt-0'>
          <div className='flex flex-col md:gap-2'>
            {category ? (
              <p className='text-2xs md:text-xs text-gray-600'>{category}</p>
            ) : null}
            <p className='text-2xs md:text-s font-medium text-gray-700 line-clamp-1'>
              {product.title}
            </p>
          </div>
          {discountLabel ? (
            <p
              dir='ltr'
              className='text-2xs md:text-xs text-tone-700 font-medium'>
              {discountLabel}
            </p>
          ) : null}
        </div>
        <Price
          price={price}
          compareAtPrice={compareAtPrice}
          size={ProductCardSizesEnum.SMALL}
        />
      </Link>
    </PointMarker>
  );
};

export default ProductPointMarker;
