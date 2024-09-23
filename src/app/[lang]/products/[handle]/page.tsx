import {SelectedOptionInput} from '@shopify/hydrogen-react/storefront-api-types';
import {notFound} from 'next/navigation';
import React, {FC} from 'react';
import {match} from 'ts-pattern';

import {ShopifyService, StrapiService} from '@base/services';

import {
  InstafeedSection,
  MaybeInterestedSection,
  PdpSection,
  PeopleSearchedSection,
  PromotionalCodeSection,
  TabsSection,
} from '@widgets';

import {DEFAULT_METADATA} from '@shared/constants';
import {
  MetafieldKeysEnum,
  NotIncludedDataType,
  PageTypeEnum,
  ProductOptionType,
  StrapiProductType,
  StrapiSectionInstafeedType,
  StrapiSectionMightBeInterestedType,
  StrapiSectionPeopleSearchedType,
  StrapiSectionProductMainType,
  StrapiSectionPromotionalCodeType,
} from '@shared/types';
import {
  getAllOptionsFromProduct,
  getMetadata,
  getMetafield,
  getProductMetafield,
  parseMetafieldWithIds,
} from '@shared/utils';

let optionsGlobal: ProductOptionType[] = [];

async function getData(
  handle: string,
  lang: string,
  params?: Record<string, string | string[] | undefined>,
) {
  const selectedOptions: SelectedOptionInput[] = [];
  if (params && typeof params === 'object') {
    Object.keys(params).forEach((key) => {
      const currentOption = optionsGlobal.find(
        (option) => option.optionRawName === key,
      );
      if (
        currentOption &&
        currentOption?.type === 'variant' &&
        typeof params[key] === 'string'
      ) {
        selectedOptions.push({name: key, value: String(params[key])});
      }
    });
  }

  try {
    const [{sections, metadata}, strapiProduct, product] = await Promise.all([
      await StrapiService.instance.requestSectionsAndMetadata(
        lang,
        PageTypeEnum.PRODUCT_PAGE,
      ),
      await StrapiService.instance.requestCollectionTypeItem<StrapiProductType>(
        lang,
        handle,
        'products',
      ),
      await ShopifyService.instance.requestProduct(
        handle,
        selectedOptions,
        lang,
      ),
    ]);

    const relatedProductsMetafield = getProductMetafield(
      'frequently_bought_together',
      product,
    );
    const relatedProductsJSON: string[] = relatedProductsMetafield?.value
      ? JSON.parse(relatedProductsMetafield.value)
      : [];

    const notIncludedProductsMetafield = getProductMetafield(
      'not_included_products',
      product,
    );
    const notIncludedProductsJSON: string[] =
      notIncludedProductsMetafield?.value
        ? JSON.parse(notIncludedProductsMetafield.value)
        : [];
    const [relatedProducts, notIncludedProducts] = await Promise.all([
      await ShopifyService.instance.getProductsById(relatedProductsJSON),
      await ShopifyService.instance.getProductsById(notIncludedProductsJSON),
    ]);

    const notIncludedData: NotIncludedDataType = {
      title: strapiProduct?.NotIncludedTitle || '',
      text: strapiProduct?.NotIncludedText || '',
      products: notIncludedProducts.products || [],
    };

    const appliedOptions: Record<string, string>[] = [];
    if (params) {
      Object.entries(params).forEach(
        ([key, value]) =>
          typeof value === 'string' && appliedOptions.push({key, value}),
      );
    }
    const options = getAllOptionsFromProduct(product, appliedOptions);
    optionsGlobal = options;

    return {
      sections,
      strapiProduct,
      product,
      options,
      relatedProducts: relatedProducts.products || [],
      notIncludedData,
      metadata: getMetadata({
        title: product?.title,
        description: product?.description,
        metadata,
      }),
    };
  } catch (error) {
    console.log('error -> ', error);
    return {
      status: 500,
      error: 'Error receiving data',
    };
  }
}

type Props = {
  params: {handle: string; lang: string};
  searchParams?: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({
  params: {handle, lang},
  searchParams,
}: Props) {
  const {metadata} = await getData(handle, lang, searchParams);
  return metadata || DEFAULT_METADATA;
}

const Product: FC<Props> = async ({params, searchParams}) => {
  const {
    sections,
    strapiProduct,
    product,
    options,
    relatedProducts,
    notIncludedData,
  } = await getData(String(params?.handle), params.lang, searchParams);

  if (!product) return notFound();

  const maybeInterestedProductsIds = product
    ? parseMetafieldWithIds(
        getMetafield(product, MetafieldKeysEnum.MightBeInterestedProducts),
      )
    : [];
  return (
    <div>
      {sections?.map((section) =>
        // eslint-disable-next-line no-underscore-dangle
        match(section.__component)
          .with('page.main-product-section', () => (
            <>
              <PdpSection
                section={section as StrapiSectionProductMainType}
                product={product}
                strapiProduct={strapiProduct}
                options={options}
                relatedProducts={relatedProducts || []}
                notIncludedData={notIncludedData}
              />
              <TabsSection
                section={section as StrapiSectionProductMainType}
                strapiProduct={strapiProduct}
              />
            </>
          ))
          .with('page.might-be-interested-section', () => (
            <MaybeInterestedSection
              section={section as StrapiSectionMightBeInterestedType}
              ids={maybeInterestedProductsIds}
            />
          ))
          .with('page.promotional-code-section', () => (
            <PromotionalCodeSection
              section={section as StrapiSectionPromotionalCodeType}
            />
          ))
          .with('page.people-searched-section', () => (
            <PeopleSearchedSection
              collections={product.collections.edges}
              section={section as StrapiSectionPeopleSearchedType}
              vendor={product.vendor}
            />
          ))
          .with('page.instafeed', () => (
            <InstafeedSection section={section as StrapiSectionInstafeedType} />
          ))
          .otherwise(() => null),
      )}
    </div>
  );
};

export default Product;
