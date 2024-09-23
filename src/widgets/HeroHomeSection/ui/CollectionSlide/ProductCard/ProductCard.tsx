import {
  MediaImage,
  Product,
} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {FC} from 'react';
import {useWindowSize} from 'usehooks-ts';

import {AnimatedLogoIcon, BREAKPOINT_MEDIUM, NoImage, Price} from '@shared';
import {ArrowSimpleLeftIcon, RadiusWhiteIcon} from '@shared/assets';
import {ProductCardSizesEnum} from '@shared/types';
import {getCategoriesFromProduct} from '@shared/utils';

type Props = {
  product: Product;
  outletLabel: string;
  priceLabel: string;
};

const ProductCard: FC<Props> = ({product, priceLabel, outletLabel}) => {
  const img = product.media.nodes.find(
    (media) => media.mediaContentType === 'IMAGE',
  ) as MediaImage | undefined;
  const category = getCategoriesFromProduct(product)[0];
  const {width} = useWindowSize();

  const priceFontSize =
    width >= BREAKPOINT_MEDIUM
      ? ProductCardSizesEnum.MEDIUM
      : ProductCardSizesEnum.SMALL;

  return (
    <Link
      href={`/products/${product.handle}`}
      className={clsx(
        'relative bg-gray-800 flex flex-col justify-between md:bg-white',
        'rem:h-[185px] px-4 pt-8 pb-11 md:rem:py-[30px] md:px-6',
        'md:absolute md:bottom-0',
        'ltr:md:right-0 rtl:md:left-0',
        'md:rem:w-[572px] md:rem:h-[262px] md:bg-gray-100/80 md:px-7 md:pt-7 md:pb-6',
        'ltr:md:rem:rounded-tl-[20px] md:rem:border-l-[12px] rtl:md:rem:border-l-[12px] rtl:md:rem:rounded-tr-[20px] rtl:md:rem:border-r-[12px] md:rem:border-r-[12px] md:rem:border-t-[12px] md:border-white',
        'md:after:bg-gray-800 md:after:absolute md:after:top-0 md:after:left-0 md:after:w-full md:after:h-full md:after:z-0 md:rem:after:rounded-[20px] ltr:md:!border-r-0 rtl:md:!border-l-0',
      )}>
      <RadiusWhiteIcon className='hidden md:block absolute -bottom-1 ltr:-left-8 rtl:-right-8 w-6 h-6 rtl:-scale-x-100' />
      <RadiusWhiteIcon className='hidden md:block absolute -top-8 ltr:-right-1 rtl:-left-1 w-6 h-6 rtl:-scale-x-100' />
      <div className='hidden md:block md:overflow-hidden top-0 left-0 w-full h-full absolute'>
        <AnimatedLogoIcon
          className={clsx(
            'md:absolute md:z-[1] md:text-tone-100 md:opacity-40',
            'md:rem:-top-[135px] ltr:md:rem:-right-[50px] rtl:md:rem:-left-[50px]',
          )}
          isHover={false}
        />
      </div>
      <Image
        style={{width: 'auto', height: '90%'}}
        width={300}
        height={300}
        className={clsx(
          'absolute md:z-[2] top-0 h-[90%] md:w-[75%] object-cover',
          'ltr:right-[10%] ltr:md:right-0 rtl:left-[10%] rtl:md:left-0 md:left-0 md:right-0 md:m-auto',
        )}
        sizes='(max-width: 600px) 60vw, 20vw'
        loading='eager'
        src={img?.image?.url || NoImage.src}
        alt=''
      />
      <div
        className={clsx(
          'absolute md:z-[2] top-0',
          'ltr:right-4 rtl:left-4',
          'ltr:md:-translate-x-0 rtl:md:translate-x-0 md:-translate-y-0',
          'ltr:md:rem:right-[90px] rtl:md:rem:left-[90px] md:left-auto rtl:md:right-auto',
          'bg-gray-100 -translate-y-1/2',
          'flex items-center justify-center rounded-full',
          'rem:w-[75px] rem:h-[75px] text-xs font-medium text-gray-700',
          'md:top-auto md:w-25 md:h-11 md:rem:bottom-[34px]',
        )}>
        {outletLabel}
        <div className='hidden md:flex md:items-center md:justify-center md:absolute md:w-11 md:h-11 ltr:md:rem:-right-[54px] rtl:md:rem:-left-[54px] md:bg-white md:rem:rounded-[44px]'>
          <ArrowSimpleLeftIcon className='md:w-5 md:h-5 ltr:md:rotate-180' />
        </div>
      </div>

      <div className='md:relative md:z-[2]'>
        <h3 className='w-1/3 text-s md:text-l font-medium text-gray-700 line-clamp-2'>
          {product.title}
        </h3>
        {category ? (
          <div className='text-xs md:text-s font-normal text-gray-700/50'>
            {category}
          </div>
        ) : null}
      </div>

      <div className='md:relative md:z-[2]'>
        <div className='text-xs md:text-s font-normal text-gray-700/50'>
          {priceLabel}
        </div>
        <Price
          className='md:mt-1'
          price={product.priceRange.minVariantPrice}
          compareAtPrice={product.compareAtPriceRange.minVariantPrice}
          size={priceFontSize}
        />
      </div>
    </Link>
  );
};

export default ProductCard;
