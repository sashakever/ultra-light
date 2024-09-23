import {useEffect, useState} from 'react';

import {useGetProductsByIdsQuery} from '@base/api';
import {useAppSelector} from '@base/store';

import {DEFAULT_LOCALE} from '@shared/constants';
import {StrapiPointType, StrapiSlideType} from '@shared/types';
import {filterNullProducts, getShopifyId} from '@shared/utils';

const useStrapiSlides = (
  slidesArray: (StrapiSlideType | StrapiPointType)[],
) => {
  const {lang} = useAppSelector((state) => state.header);
  const [slides, setSlides] =
    useState<(StrapiSlideType | StrapiPointType)[]>(slidesArray);
  const ids: string[] = slidesArray
    .map((slide) => slide.ProductId)
    .filter((id) => id)
    .map((id) =>
      id && !Number.isNaN(parseInt(id, 10)) ? getShopifyId(id, 'Product') : '',
    );
  const {data} = useGetProductsByIdsQuery({
    lang: lang?.locale || DEFAULT_LOCALE,
    ids,
  });

  useEffect(() => {
    if (data) {
      setSlides((prevState) =>
        prevState.map((slide) => {
          const product =
            filterNullProducts(data).find(
              (p) => slide.ProductId && p.id.includes(slide.ProductId),
            ) || null;
          return {
            ...slide,
            Product: product,
          };
        }),
      );
    }
  }, [data]);

  return {slides};
};

export default useStrapiSlides;
