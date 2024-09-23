'use client';

import {
  MediaImage,
  Product,
} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import {useSearchParams} from 'next/navigation';
import React, {FC, useEffect} from 'react';

import {PdpGallery} from './PdpGallery';
import PdpInfo from './PdpInfo';

import {useFavouritesProducts} from '@base/hooks';
import {useProductActions, useReviewActions} from '@base/store';

import {
  BreadcrumbType,
  NotIncludedDataType,
  ProductOptionType,
  StrapiProductType,
  StrapiSectionProductMainType,
} from '@shared/types';
import {getVideoUrlFromProduct} from '@shared/utils';

type Props = {
  product: Product;
  strapiProduct?: StrapiProductType;
  section: StrapiSectionProductMainType;
  options: ProductOptionType[];
  relatedProducts: Product[] | null;
  notIncludedData: NotIncludedDataType;
};

const PdpSection: FC<Props> = ({
  product,
  strapiProduct,
  section,
  options,
  relatedProducts,
  notIncludedData,
}) => {
  const {isFavouriteProduct, toggleFavourite} = useFavouritesProducts(product);
  const queryParams = useSearchParams();
  const fromCollection = queryParams.get('from-collection')?.split(':::');
  const {setInitData} = useProductActions();
  const {setCurrentProduct} = useReviewActions();

  useEffect(() => {
    setInitData({product, options});

    return () => {
      setInitData({product: null, options: []});
    };
  }, [product]);

  const {nodes: mediaObjects} = product.media;
  const collection = product.collections.edges?.[0]?.node;
  const images = mediaObjects.filter(
    (media) => media.mediaContentType === 'IMAGE',
  ) as MediaImage[];

  const breadCrumbs: BreadcrumbType[] = [
    {
      label: 'Home',
      path: '/',
    },
    fromCollection?.length === 2
      ? {
          label: fromCollection[1],
          path: `/collections/${fromCollection[0]}`,
        }
      : {
          label: collection?.handle ? collection?.title : '',
          path: `/collections/${collection?.handle}`,
        },
    {
      label: product.title,
      path: `/products/${product.handle}`,
    },
  ].filter((crumb) => crumb.label);

  const productVideoUrl = getVideoUrlFromProduct(product);

  const productFileUrl =
    product.metafields.find((item) => item?.key === 'pdf_file_link')?.value ||
    null;

  setCurrentProduct(product);

  return (
    <section
      className={clsx(
        'relative flex flex-col p-2 pt-4 gap-3 bg-tone-100',
        'md:flex-row md:p-3',
      )}>
      <PdpGallery
        productVideoUrl={productVideoUrl}
        productFileUrl={productFileUrl}
        images={images}
        selectedVariant={product.variantBySelectedOptions}
        isFavourite={isFavouriteProduct()}
        handleToggleFavourite={toggleFavourite}
        breadCrumbs={breadCrumbs}
      />
      <PdpInfo
        data={product}
        strapiProduct={strapiProduct}
        section={section}
        relatedProducts={relatedProducts}
        notIncludedData={notIncludedData}
      />
    </section>
  );
};

export default PdpSection;
