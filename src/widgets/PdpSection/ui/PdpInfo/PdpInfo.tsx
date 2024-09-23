import {
  Product,
  ProductVariant,
} from '@shopify/hydrogen-react/storefront-api-types';
import React, {FC, useEffect, useState} from 'react';

import AddToCart from './AddToCart';
import FrequentlyBought from './FrequentlyBougth';
import NotIncludedPanel from './NotIncludedPanel';
import OptionsPanel from './OptionsPanel';
import Promocode from './Promocode';

import {useReviews} from '@base/hooks';
import {useAppSelector, useReviewActions} from '@base/store';

import {PayIconsBlock} from '@features';

import {Rating, StrapiProductType} from '@shared';
import {ArrowDownIcon} from '@shared/assets';
import {
  BackgroundColorEnum,
  DeliveryDatesType,
  NotIncludedDataType,
  ProductCardSizesEnum,
  StrapiSectionProductMainType,
} from '@shared/types';
import {Price} from '@shared/ui';
import {
  calculateDeliveryDates,
  getCountSelectedOptions,
  optionsToCartAttributes,
} from '@shared/utils';

type Props = {
  data: Product;
  strapiProduct?: StrapiProductType;
  section: StrapiSectionProductMainType;
  relatedProducts: Product[] | null;
  notIncludedData: NotIncludedDataType;
};

const PdpInfo: FC<Props> = ({
  data,
  strapiProduct,
  section,
  relatedProducts,
  notIncludedData,
}) => {
  const [currentVariant, setCurrentVariant] = useState<ProductVariant | null>(
    null,
  );
  const {openWriteReview, setCurrentTabIndex} = useReviewActions();
  const {reviewTotal, scrollToReviews} = useReviews();
  const {options} = useAppSelector((state) => state.product);
  const deliveryDates: DeliveryDatesType = calculateDeliveryDates(7, 7);
  const price = currentVariant
    ? currentVariant.price
    : data.priceRange.minVariantPrice;
  const compareAtPrice = currentVariant
    ? currentVariant.compareAtPrice
    : data.compareAtPriceRange.minVariantPrice;

  useEffect(() => {
    setCurrentVariant(data.variantBySelectedOptions || null);
  }, [data]);

  const optionsCount = options.length;
  const selectedOptionsCount = getCountSelectedOptions(options);

  const isDisabledAddToCart = !(
    currentVariant && options.length === getCountSelectedOptions(options)
  );
  const attributes = optionsToCartAttributes(options, currentVariant?.sku);

  const handleOpenReviewDialog = () => {
    openWriteReview();
  };

  const handleReviewsOpen = () => {
    setCurrentTabIndex(1);
    scrollToReviews();
  };

  const handleQuestionsOpen = () => {
    setCurrentTabIndex(2);
    scrollToReviews();
  };

  const goingFastTitle = strapiProduct?.GoingFastText || '';

  const discountPercent =
    compareAtPrice?.amount !== '0.0' && price?.amount !== '0.0'
      ? ((Number(compareAtPrice?.amount) - Number(price?.amount)) /
          Number(compareAtPrice?.amount)) *
        100
      : null;
  const roundedDiscount = discountPercent ? Math.round(discountPercent) : null;

  return (
    <div className='w-full md:w-[43%] bg-gray-100'>
      <div className='px-4 pt-6 pb-3 xm:pt-13 xm:pb-7 xm:px-13 border-b border-tone-100'>
        <div className='flex justify-between mb-3 md:mb-2'>
          <div className='text-xs md:text-s text-gray-600'>
            {data.collections.edges[0]?.node?.title}
          </div>
          {roundedDiscount ? (
            <div
              dir='ltr'
              className='text-xs md:text-s text-gray-100 font-medium px-2 py-1 bg-tone-700 rounded-full'>
              -{roundedDiscount}%
            </div>
          ) : null}
        </div>
        <h1 className='text-3xl md:text-4xl font-medium text-gray-700 mb-6'>
          {data.title}
        </h1>
        <div className='flex gap-3 items-center text-xs'>
          {reviewTotal?.total_review ? (
            <div className='flex gap-3 text-gray-700 items-center'>
              <Rating rating={reviewTotal?.average_score ?? 0} />
              <button
                className='flex items-center gap-1 hover:text-tone-600'
                onClick={handleReviewsOpen}>
                {`${reviewTotal?.total_review} ${section.ReviewsTitle} `}
                <ArrowDownIcon className='w-3 h-3' />
              </button>
            </div>
          ) : null}

          <button
            className='text-xs text-gray-700 underline hover:text-tone-600'
            onClick={handleOpenReviewDialog}>
            {section.WriteReviewTitle}
          </button>
          <button
            className='flex gap-1 text-gray-700 items-center hover:text-tone-600'
            onClick={handleQuestionsOpen}>
            {section.QuestionsTitle}
            <ArrowDownIcon className='w-3 h-3' />
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-10 px-4 pt-3 pb-6 xm:pb-13 xm:pt-7 xm:px-13 border-t border-tone-100'>
        <OptionsPanel
          optionNotSelectedTitle={section.OptionSelectValue}
          optionsCount={optionsCount}
          selectedOptionsCount={selectedOptionsCount}
        />
        <div className='flex justify-between items-center flex-row-reverse md:inline-block'>
          <div className='md:mb-6'>
            <Price
              price={price}
              compareAtPrice={compareAtPrice}
              size={ProductCardSizesEnum.LARGE}
            />
            <div className='hidden md:inline-block text-xs text-gray-400'>
              {section.TaxTitle}
            </div>
          </div>
          <AddToCart
            variant={currentVariant}
            price={price}
            product={data}
            isDisabledAddToCart={isDisabledAddToCart}
            attributes={attributes}
            addToCartTitle={section.AddToCartTitle}
            notifyMeTitle={section.NotifyMeTitle}
          />
        </div>
        {section.DiscountCode ? (
          <Promocode
            extraTitle={section.ExtraTitle}
            goingFastTitle={goingFastTitle}
            useCodeTitle={section.UseCodeTitle}
            discountCodeText={section.DiscountCode}
            promocodeCopyText={section.PromocodeCopyText}
          />
        ) : null}
        <div className='flex flex-col xm:flex-row xm:items-center justify-between'>
          <div className='flex flex-col mb-4 xm:mb-0'>
            <div className='text-xs md:text-s text-gray-400 mb-1 md:mb-0'>
              {section.DeliveryDateTitle}
            </div>
            <div className='text-s md:text-l text-gray-700 font-medium'>{`${deliveryDates.firstDate} - ${deliveryDates.lastDate}`}</div>
          </div>
          <PayIconsBlock bgColor={BackgroundColorEnum.LIGHT} />
        </div>
      </div>

      <div className='relative flex flex-col gap-3 p-4 md:p-13'>
        {notIncludedData.products.length ? (
          <NotIncludedPanel notIncludedData={notIncludedData} />
        ) : null}
        {relatedProducts?.length ? (
          <FrequentlyBought
            title={section.FrequentlyBoughtTitle}
            buttonTitle={section.FrequentlyBoughtButtonTitle}
            relatedProducts={relatedProducts}
            selectProductTitle={section.SelectProductTitle}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PdpInfo;
