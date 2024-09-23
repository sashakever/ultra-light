/* eslint-disable @typescript-eslint/naming-convention */
import {
  Maybe,
  MediaImage,
  Metafield,
  Product,
  ProductOption,
  ProductVariant,
  SelectedOption,
  Video,
} from '@shopify/hydrogen-react/storefront-api-types';
import {Metadata} from 'next';
import {SwiperClass} from 'swiper/react';
import {z} from 'zod';

import {
  COLORS,
  DEFAULT_METADATA,
  PRODUCT_COLOR_OPTION_NAME,
} from '@shared/constants';
import {
  ColorType,
  ImageType,
  MetafieldKeysEnum,
  ProductType,
  ShopifyErrorType,
} from '@shared/types';

export const mapErrors = (errors: ShopifyErrorType[]) =>
  errors?.map((error) => error.message) || [];

export const getYear = () => new Date().getFullYear();

export /**
 * The deleteInertAttributeFromBodyChildrenElement function is a workaround for the inert attribute polyfill.
 * The inert attribute polyfill adds an 'inert' attribute to all elements in the DOM, which causes issues with
 * some of our components (e.g., dropdowns). This function removes that 'inert' attribute from all elements in the DOM.
 */
const deleteInertAttributeFromBodyChildrenElement = () =>
  setTimeout(() => {
    const bodyChildren: HTMLCollection = document.body.children;
    const bodyChildrenArray = Array.from(bodyChildren);
    bodyChildrenArray.forEach((child) => {
      if (child.hasAttribute('inert')) child.removeAttribute('inert');
    });
  }, 50);

export /**
 * The goNext function is a callback function that takes in the swiper object
 * and returns another function. The returned function will call the slideNext
 * method on the swiper object if it exists. This allows us to pass in a reference
 * to our Swiper instance as an argument, but not actually call any of its methods until later.
 *
 * @param swiper SwiperClass | null Type the swiper variable
 * @return A function that calls the slideNext method on swiper
 */
const goNext = (swiper: SwiperClass | null) => () => {
  if (swiper !== null) {
    swiper.slideNext();
  }
};

export /**
 * The goPrev function is a callback function that will be passed to the
 * Swiper component. It will be called when the user clicks on the &quot;prev&quot; button
 * in order to navigate back one slide. The goPrev function takes in a swiper
 * object as an argument and calls its slidePrev method, which navigates back one
 * slide. If no swiper object is provided, then nothing happens (this should never happen).
 *
 * @param swiper SwiperClass | null Tell typescript that the swiper variable can be null
 * @return A function that calls the slidePrev method on swiper
 */
const goPrev = (swiper: SwiperClass | null) => () => {
  if (swiper !== null) {
    swiper.slidePrev();
  }
};

export /**
 * The getDataFromVariant function takes a ProductVariant object and returns an object with the following properties:
 * - discount: The difference between the price and compareAtPrice, if there is one. Otherwise, 0.
 * - price: The product's current price as a MoneyV2 object.
 * - compareAtPrice: The product's original (compare at) price as a MoneyV2 object, if it exists. Otherwise null or undefined.
 *
 * @param variant ProductVariant Access the product variant data
 * @return An object with price properties
 */
const getDataFromVariant = (variant: ProductVariant) => {
  const discount =
    variant && variant.compareAtPriceV2?.amount
      ? Math.abs(
          parseFloat(variant.priceV2.amount) -
            parseFloat(variant.compareAtPriceV2?.amount),
        )
      : 0;
  const price = variant.priceV2;
  const compareAtPrice = variant.compareAtPriceV2;

  return {discount, price, compareAtPrice};
};

export /**
 * The getDataFromProduct function takes a product and returns an object with the following properties:
 * - discount: The difference between the compareAtPrice and price. If there is no compareAtPrice, this value will be 0.
 * - price: The minVariantPrice of the product's priceRange property.
 * - compareAtPrice: The minVariantPrice of the product's compareAtPricerange property.
 * If there is no such property, this value will be undefined.
 *
 * @param product Product Access the product object
 * @return The discount, price and compareatprice
 */
const getDataFromProduct = (product: Product) => {
  const compareAtAmount = parseFloat(
    product.compareAtPriceRange?.minVariantPrice.amount,
  );
  const discount = compareAtAmount
    ? Math.abs(
        compareAtAmount -
          parseFloat(product.priceRange?.minVariantPrice.amount),
      )
    : 0;
  const price = product.priceRange?.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;

  return {discount, price, compareAtPrice};
};

export /**
 * The getMetafieldFromProduct function takes a product and a metafield key,
 * and returns the value of that metafield if it exists.
 *
 * @param product Product Specify the type of the product parameter
 * @param metafieldKey MetafieldKeysEnum Specify which metafield we want to get from the product
 * @return A string or null
 */
const getMetafieldFromProduct = (
  product: Product,
  metafieldKey: MetafieldKeysEnum,
): string | null =>
  product.metafields.find((field) => field?.key === metafieldKey)?.value ??
  null;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getMetafield = <T extends {metafields: Array<Maybe<Metafield>>}>(
  item: T,
  metafieldKey: MetafieldKeysEnum,
): string | null =>
  item.metafields?.find((field) => field?.key === metafieldKey)?.value ?? null;

export /**
 * The getColorsFromProductOptions function takes in an array of ProductOption objects
 * and returns a new array containing only the color values.
 *
 * @param options ProductOption[] Tell typescript that the options parameter is optional
 * @return An array of colors
 */
const getColorsFromProductOptions = (options?: ProductOption[]) =>
  options?.filter(
    (option) => option?.name?.toLocaleLowerCase() === 'color',
  )?.[0]?.values ?? [];

export const getColorsFromSelectedOptions = (options?: SelectedOption[]) =>
  options?.filter(
    (option) => option?.name?.toLocaleLowerCase() === 'color',
  )?.[0]?.value ?? [];

export const getShopifyId = (id: string, type: 'Product' | 'Collection') =>
  `gid://shopify/${type}/${id}`;

export const getCategoriesFromProduct = (product: Product): string[] =>
  product?.metafields
    ?.find((metafield) => metafield?.key === 'categories')
    ?.value?.split(',') || [];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const splitBy = <T>(size: number, list: T[]) => {
  const arr: T[][] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < size; i++) {
    arr[i] = [];
  }
  list.forEach((item, index) => {
    arr[index % size].push(item);
  });
  return arr;
};

export const setArgsToString = (currentStr: string | null, args: string[]) => {
  if (!currentStr) return null;

  let str = currentStr;
  args.forEach((arg, index) => {
    str = str.replace(`{${index}}`, arg);
  });
  return str;
};

export const parseMetafieldWithIds = (value?: string | null): string[] => {
  if (!value) return [];

  const idsScheme = z.array(z.string());
  const parsed = idsScheme.safeParse(JSON.parse(value));
  if (parsed.success) {
    return parsed.data;
  }
  console.log(parsed.error);
  return [];
};

export async function copyTextToClipboard(text: string) {
  try {
    return await navigator.clipboard.writeText(text);
  } catch (e) {
    console.log('An error happend while copieng into clipboard:', e);
    return null;
  }
}

export const getVariantOptionValue = (
  variant: ProductVariant,
  optionKey: string = 'Product Color',
) =>
  variant.selectedOptions.filter(
    (option) =>
      option.name.toLocaleLowerCase() === optionKey.toLocaleLowerCase(),
  )?.[0]?.value || '';

export const getFirstVariantBySelectedOption = (
  variants: ProductVariant[],
  selectedOptions: Record<string, string>[],
  optionKey = 'Product Color',
) => {
  const selectedOption = selectedOptions.find(
    (option) =>
      option.key.toLocaleLowerCase() === optionKey.toLocaleLowerCase(),
  );
  if (!selectedOption) {
    return null;
  }

  return (
    variants.find(
      (variant) =>
        getVariantOptionValue(variant, optionKey) === selectedOption.value,
    ) || null
  );
};

export const getMetadata = ({
  title,
  description,
  metadata,
}: {
  title?: string;
  description?: string;
  metadata?: Metadata | null;
}) => {
  const metadataObj: Metadata = metadata || DEFAULT_METADATA;
  if (title) {
    metadataObj.title = title;
  }
  if (description) {
    metadataObj.description = description;
  }

  return metadataObj;
};

/**
 * Normalizes the input string by capitalizing the first character and converting the rest to lowercase.
 *
 * @param {string} input - The input string.
 * @returns {string} - The normalized string.
 */

export const normalizeString = (input: string) =>
  input.length
    ? (input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()).trim()
    : '';

/**
 * Filters out null or undefined elements from an array of products.
 *
 * @param {Product[]} products - The array of products.
 * @returns {Product[]} - The filtered array of products.
 */

export const filterNullProducts = (products?: Product[]): Product[] =>
  products?.filter(Boolean) || [];

/**
 * Removes duplicate elements from an array based on a specified key.
 *
 * @param {T[]} arr - The input array.
 * @param {keyof T} key - The key to determine uniqueness.
 * @returns {T[]} - The array with duplicate elements removed.
 */

export const removeDuplicatesByKey = <T extends {id: string}>(
  arr: T[],
  key: keyof T,
): T[] => {
  const uniqueMap: {[key: string]: boolean} = {};
  return arr.reduce((uniqueArray: T[], obj) => {
    const keyValue = obj[key] as string;
    if (!uniqueMap[keyValue]) {
      uniqueMap[keyValue] = true;
      uniqueArray.push(obj);
    }
    return uniqueArray;
  }, []);
};

export const getVideoUrlFromProduct = (product: Product): string | null => {
  const productVideoNode = product.media.nodes.find(
    (item) => item.mediaContentType === 'VIDEO',
  );
  return productVideoNode ? (productVideoNode as Video).sources[0]?.url : null;
};

export const getImages = (
  product: ProductType,
  variant: ProductVariant | null,
  color: ColorType | null,
): ImageType[] =>
  color && variant
    ? [variant.image]
        .filter((img) => img)
        .map((img, index) => ({
          id: index.toString(),
          url: img?.url || '',
          width: img?.width || 110,
          height: img?.height || 110,
        }))
    : (
        product?.media?.nodes
          ?.filter((media) => media && media?.mediaContentType === 'IMAGE')
          .slice(0, 2) as MediaImage[]
      ).map((img) => ({
        id: img.id,
        url: img?.image?.url || '',
        width: img?.image?.width || 110,
        height: img?.image?.height || 110,
      }));

export const getColorsFromProduct = (product: Product): ColorType[] =>
  (
    product.options.find(
      (option) =>
        option.name.trim().toLowerCase() === PRODUCT_COLOR_OPTION_NAME,
    )?.values || []
  )
    .map((color) =>
      COLORS.find((item) => item.type === color.trim().toLowerCase()),
    )
    // @typescript-eslint/no-unnecessary-type-assertion
    .filter(Boolean) as ColorType[];

export const isDefaultAddress = (defaultId?: string, id?: string) => {
  if (!id || !defaultId) {
    return false;
  }
  const originalId = id.split('?')[0];
  const originalDefaultId = defaultId ? defaultId?.split('?')[0] : '';

  return originalId === originalDefaultId;
};
