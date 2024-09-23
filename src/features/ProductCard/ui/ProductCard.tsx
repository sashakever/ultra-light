import {
  Collection,
  Product,
  ProductVariant,
} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import React, {FC, useState} from 'react';
import {match} from 'ts-pattern';

import HorizontalLayout from './HorizontalLayout';
import VerticalLayout from './VerticalLayout';

import {useSubscriptionsActions} from '@base/store';

import {PRODUCT_COLOR_OPTION_NAME} from '@shared/constants';
import {useCustomCart} from '@shared/hooks';
import {
  ColorType,
  ProductCardAdaptiveEnum,
  ProductCardSizesEnum,
} from '@shared/types';
import {
  getColorsFromProduct,
  getDataFromProduct,
  getVideoUrlFromProduct,
  variantSelectedOptionsToCartAttributes,
} from '@shared/utils';

type Props = {
  className?: string;
  size?: ProductCardSizesEnum;
  type?: ProductCardAdaptiveEnum;
  product: Product;
  collection?: Collection;
  priorityLoading?: boolean;
};

const ProductCard: FC<Props> = ({
  className = '',
  size = ProductCardSizesEnum.MEDIUM,
  type = ProductCardAdaptiveEnum.DESKTOP,
  collection,
  product,
  priorityLoading = false,
}) => {
  const {addCartLine} = useCustomCart();
  const {openSubscriptionWidget, setProduct, setProductVariant} =
    useSubscriptionsActions();
  const [selectedColor, setSelectedColor] = useState<ColorType | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.nodes.filter((variant) => variant.availableForSale)?.[0],
  );
  const {discount, price, compareAtPrice} = getDataFromProduct(product);

  const handleSelectColor = (color: ColorType) => {
    setSelectedColor(color);

    const variantByColor = product.variants.nodes
      .filter((variant) => variant.availableForSale)
      .find((variant) =>
        variant.selectedOptions.find(
          (option) =>
            option.name.trim().toLowerCase() === PRODUCT_COLOR_OPTION_NAME &&
            option.value.trim().toLowerCase() === color.type,
        ),
      );
    setSelectedVariant(variantByColor || product.variants.nodes[0]);
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      addCartLine(product, {
        merchandiseId: selectedVariant.id,
        attributes: variantSelectedOptionsToCartAttributes(selectedVariant),
      });
    } else {
      setProduct(product);
      setProductVariant(product.variants.nodes[0]);
      openSubscriptionWidget();
    }
  };

  const productVideoUrl = getVideoUrlFromProduct(product);

  const productFileUrl =
    product.metafields.find((item) => item?.key === 'pdf_file_link')?.value ||
    null;

  const colors = getColorsFromProduct(product);

  return (
    <div className={clsx('', className)}>
      {match([size, type])
        .with(
          [ProductCardSizesEnum.SMALL, ProductCardAdaptiveEnum.DESKTOP],
          () => (
            <HorizontalLayout
              addToCart={handleAddToCart}
              product={product}
              discount={discount}
              price={price}
              compareAtPrice={compareAtPrice}
              collection={collection}
              productVideoUrl={productVideoUrl}
              productFileUrl={productFileUrl}
              selectedVariant={selectedVariant}
            />
          ),
        )
        .with(
          [ProductCardSizesEnum.SMALL, ProductCardAdaptiveEnum.MOBILE],
          () => (
            <VerticalLayout
              addToCart={handleAddToCart}
              product={product}
              discount={discount}
              price={price}
              colors={colors}
              selectedColor={selectedColor}
              handleSelectColor={handleSelectColor}
              compareAtPrice={compareAtPrice}
              isStaticButton
              size={ProductCardSizesEnum.SMALL}
              collection={collection}
              productVideoUrl={productVideoUrl}
              productFileUrl={productFileUrl}
              selectedVariant={selectedVariant}
              priorityLoading={priorityLoading}
            />
          ),
        )
        .with(
          [ProductCardSizesEnum.MEDIUM, ProductCardAdaptiveEnum.MOBILE],
          () => (
            <VerticalLayout
              addToCart={handleAddToCart}
              product={product}
              discount={discount}
              price={price}
              colors={colors}
              selectedColor={selectedColor}
              handleSelectColor={handleSelectColor}
              compareAtPrice={compareAtPrice}
              isStaticButton
              collection={collection}
              productVideoUrl={productVideoUrl}
              productFileUrl={productFileUrl}
              selectedVariant={selectedVariant}
            />
          ),
        )
        .with(
          [ProductCardSizesEnum.MEDIUM, ProductCardAdaptiveEnum.DESKTOP],
          () => (
            <VerticalLayout
              addToCart={handleAddToCart}
              product={product}
              discount={discount}
              price={price}
              colors={colors}
              selectedColor={selectedColor}
              handleSelectColor={handleSelectColor}
              compareAtPrice={compareAtPrice}
              collection={collection}
              productVideoUrl={productVideoUrl}
              productFileUrl={productFileUrl}
              selectedVariant={selectedVariant}
            />
          ),
        )
        .with(
          [ProductCardSizesEnum.LARGE, ProductCardAdaptiveEnum.MOBILE],
          () => (
            <HorizontalLayout
              addToCart={handleAddToCart}
              product={product}
              discount={discount}
              price={price}
              compareAtPrice={compareAtPrice}
              size={ProductCardSizesEnum.LARGE}
              collection={collection}
              productVideoUrl={productVideoUrl}
              productFileUrl={productFileUrl}
              selectedVariant={selectedVariant}
            />
          ),
        )
        .with(
          [ProductCardSizesEnum.EXTRA_SMALL, ProductCardAdaptiveEnum.MOBILE],
          () => (
            <HorizontalLayout
              addToCart={handleAddToCart}
              product={product}
              discount={discount}
              price={price}
              compareAtPrice={compareAtPrice}
              size={ProductCardSizesEnum.EXTRA_SMALL}
              collection={collection}
              productVideoUrl={productVideoUrl}
              productFileUrl={productFileUrl}
              selectedVariant={selectedVariant}
            />
          ),
        )
        .with(
          [ProductCardSizesEnum.LARGE, ProductCardAdaptiveEnum.DESKTOP],
          () => (
            <VerticalLayout
              addToCart={handleAddToCart}
              product={product}
              discount={discount}
              price={price}
              colors={colors}
              selectedColor={selectedColor}
              handleSelectColor={handleSelectColor}
              compareAtPrice={compareAtPrice}
              size={ProductCardSizesEnum.LARGE}
              collection={collection}
              productVideoUrl={productVideoUrl}
              productFileUrl={productFileUrl}
              selectedVariant={selectedVariant}
            />
          ),
        )
        .otherwise(() => null)}
    </div>
  );
};

export default ProductCard;
