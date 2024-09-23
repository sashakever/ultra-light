import {
  AttributeInput,
  Maybe,
  Metafield,
  Product,
  ProductVariant,
} from '@shopify/hydrogen-react/storefront-api-types';
import {z} from 'zod';

import {normalizeString} from './common';

import {PRODUCT_METAFIELDS_KEY} from '@shared/constants';
import {productPDPScheme} from '@shared/schemes';
import {DeliveryDatesType, ProductOptionType} from '@shared/types';

export /**
 * The getProduct function takes a response from the Shopify API and returns
 * a Product object. If the response is not valid, it will return null.
 *
 * @param response unknown Tell the compiler that we don't know what type of response will be passed to this function
 * @return A product | null
 */
const getProduct = (response: unknown): Product | null => {
  const productResponseScheme = z.object({
    data: z.object({
      product: productPDPScheme,
    }),
  });
  const parsed = productResponseScheme.safeParse(response);
  if (parsed.success) {
    return parsed.data.data.product as Product;
  }
  console.log(parsed.error);

  return null;
};
export /**
 * The getProducts function takes in a response from the Shopify API and returns an array of products.
 *
 * @param res unknown Tell the compiler that we don't know what type of data is coming back from the api
 * @return An array of product objects
 */
const getProducts = (res: unknown): Product[] => {
  const productResponseScheme = z.object({
    data: z.object({
      products: z.object({
        nodes: z.array(productPDPScheme),
      }),
    }),
  });
  const parsed = productResponseScheme.safeParse(res);
  if (parsed.success) {
    return parsed.data.data.products.nodes as Product[];
  }
  console.log(parsed.error);

  return [];
};

export /**
 * The getRandomProducts function takes a product and returns an array of 10 products with the same properties
 * as the original product, but with different ids.
 *
 * @param product Product | null Define the type of the product parameter
 * @return An array of products
 */
const getRandomProducts = (product: Product | null): Product[] => {
  if (!product) return [];

  let products: Product[] = Array(10).fill(product);
  products = products.map((p, i) => ({
    ...p,
    id: p.id + i,
  }));
  return products;
};

export /**
 * The getProductMetafield function takes a key and a product as arguments.
 * It returns the metafield with that key from the product's metafields array, or null if it doesn't exist.
 *
 * @param key string Find the metafield with that key
 * @param product Product | null Pass the product data into
 * @return A metafield value or null;
 */
const getProductMetafield = (
  key: string,
  product: Product | null,
): Maybe<Metafield> =>
  product?.metafields.find((item) => item?.key === key) || null;

export /**
 * The calculateDeliveryDates function takes two arguments and
 * calculate the first date of delivery
 *
 * @param daysFromToday number Calculate the first date of delivery
 * @param periodInDays number Set the number of days in the period
 *
 * @return An object with two properties:
 */
const calculateDeliveryDates = (
  daysFromToday: number,
  periodInDays: number,
): DeliveryDatesType => {
  const currentDate = new Date();
  const firstDate = new Date(currentDate);
  firstDate.setDate(currentDate.getDate() + daysFromToday);
  const lastDate = new Date(firstDate);
  lastDate.setDate(firstDate.getDate() + periodInDays - 1);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  };

  const formatDateString = (date: Date): string => {
    const formattedDate = date
      .toLocaleDateString('en-US', options)
      .replace(',', '');
    const [weekday, month, day] = formattedDate.split(' ');

    return `${weekday} ${day} ${month}`;
  };

  const firstDateString = formatDateString(firstDate);
  const lastDateString = formatDateString(lastDate);

  return {firstDate: firstDateString, lastDate: lastDateString};
};

export /**
 * The optionsToCartAttributes function takes an array of ProductOptionType objects and
 * returns an array of AttributeInput objects.
 *
 * @param variant product variant
 * @return An array of attributes
 */
const variantSelectedOptionsToCartAttributes = (
  variant?: ProductVariant,
): AttributeInput[] => {
  // Create an empty array to store the AttributeInput objects
  const attributes: AttributeInput[] = [];
  // Iterate over each option in the input array
  variant?.selectedOptions.forEach((option) => {
    attributes.push({
      key: option.name,
      value: option.value,
    });
  });
  if (variant?.sku) {
    attributes.push({key: 'SKU', value: variant.sku});
  }
  // Return the array of AttributeInput objects
  return attributes;
};

export /**
 * The optionsToCartAttributes function takes an array of ProductOptionType objects and
 * returns an array of AttributeInput objects.
 *
 * @param options ProductOptionType[] Get the options
 * @param sku - SKU code
 * @return An array of attributes
 */
const optionsToCartAttributes = (
  options: ProductOptionType[],
  sku?: string | null,
): AttributeInput[] => {
  // Create an empty array to store the AttributeInput objects
  const attributes: AttributeInput[] = [];
  // Iterate over each option in the input array
  options.forEach((option) => {
    // Find the selected value for the current option
    const selectedValue = option.values.find((item) => item.isSelected);
    // If a selected value exists, create a new AttributeInput object and push it to the attributes array
    if (selectedValue)
      attributes.push({
        key: option.name,
        value: selectedValue.value,
      });
  });
  if (sku) {
    attributes.push({key: 'SKU', value: sku});
  }
  // Return the array of AttributeInput objects
  return attributes;
};

export /**
 * The setDisabledValueInOptions function takes a product and an array of options,
 * then returns the same array of options with disabled values.
 *
 * @param product Product | null Get the product object from the parent component
 * @param options ProductOptionType[] Store the selected option values
 *
 * @return An array of options with disabled values
 *
 */
const setDisabledValueInOptions = (
  product: Product | null,
  options: ProductOptionType[],
) => {
  if (!product) return options;

  // Filter the variants array to only include variants that are available for sale
  const variants = product.variants.nodes;

  // Create a clone of the options array with all isDisabled values set to false
  let optionsClone = [
    ...options.map((option) => ({
      ...option,
      values: option.values.map((value) => ({
        ...value,
        isDisabled: false,
      })),
    })),
  ];
  // Iterate over each option in the options array
  options.forEach((option) => {
    // Find the selected value for the current option
    const selectedValue = option?.values.find((item) => item.isSelected);

    // If a selected value exists, filter the variants array to only include variants
    // that have the same selectedOption as the selectedValue
    if (selectedValue) {
      const variantsByOption = variants.filter((variant) =>
        variant.selectedOptions.find(
          (selectedOption) =>
            normalizeString(selectedOption.name) === option.name &&
            selectedValue.value === selectedOption.value,
        ),
      );

      // Map over the optionsClone array and set the isDisabled value for each value in the values array to true
      // if the value is not in the variantsByOption array
      optionsClone = optionsClone.map((currentOption) => ({
        ...currentOption,
        values:
          currentOption.type === 'variant' &&
          option.type === 'variant' &&
          currentOption.name !== option.name
            ? currentOption.values.map((value) => {
                const isExist = !variantsByOption.find((variant) =>
                  variant.selectedOptions.find(
                    (item) => item.value === value.value,
                  ),
                );
                return {
                  ...value,
                  isDisabled: !value.isDisabled ? isExist : value.isDisabled,
                };
              })
            : currentOption.values,
      }));
    }
  });

  // Return the optionsClone array
  return optionsClone;
};

export /**
 * The getAllOptionsFromProduct function takes a product and an array of applied options,
 * and returns an array of ProductOptionType objects.
 *
 * @param product Product | null Get the product object
 * @param appliedOptions Record<'key' | 'value', string>[] Get the default selected option
 * @return An array of ProductOptionType
 */
const getAllOptionsFromProduct = (
  product: Product | null,
  appliedOptions: Record<'key' | 'value', string>[],
) => {
  let optionsArray: ProductOptionType[] = [];
  if (!product) return [];

  // Iterate over each option in the product options array and create a new ProductOptionType object
  // with the id, name, type, and values properties set (get options from product variants)
  product?.options.forEach((option) => {
    optionsArray.push({
      id: option.id,
      name: normalizeString(option.name),
      optionRawName: option.name,
      type: 'variant',
      values: option.values.map((value, index) => ({
        id: index.toString(),
        isSelected: false,
        isDisabled: false,
        value,
      })),
    });
  });

  // Iterate over each metafield in the PRODUCT_METAFIELDS_KEY array and get the metafield value for that key from the product
  // get options from product metafields
  PRODUCT_METAFIELDS_KEY.forEach((mf) => {
    const metafield = getProductMetafield(mf.key, product);
    // If the metafield value exists and the product does not have an option with the same name as the metafield name,
    // create a new ProductOptionType object with the id, name, type, and values properties set
    if (
      metafield?.value &&
      !product?.options.find(
        (option1) => option1.name.toLowerCase() === mf.name.toLowerCase(),
      ) &&
      typeof metafield.value === 'string'
    ) {
      const values = metafield.value.split(',').map((value, index) => ({
        id: index.toString(),
        isSelected: false,
        isDisabled: false,
        value,
      }));
      optionsArray.push({
        id: metafield.id,
        name: mf.name,
        optionRawName: mf.name,
        type: 'metafield',
        values,
      });
    }
  });

  // Set the isSelected property for each value in the optionsArray array that corresponds to an applied option
  // (applied default isSelected)
  appliedOptions.forEach((appliedOption) => {
    optionsArray = optionsArray.map((option) => ({
      ...option,
      values:
        appliedOption.key.toLowerCase() === option.optionRawName.toLowerCase()
          ? option.values.map((item) => ({
              ...item,
              isSelected: item.value === appliedOption.value,
            }))
          : option.values,
    }));
  });

  // applied default isDisabled
  optionsArray = setDisabledValueInOptions(product, optionsArray);

  return optionsArray;
};

export /**
 * The getCountSelectedOptions function takes an array of ProductOptionType objects and returns
 * the number of options that have at least one selected value.
 *
 * @param options ProductOptionType[] Get the array of the options
 * @return The number of selected options
 */
const getCountSelectedOptions = (options: ProductOptionType[]) =>
  options.filter((option) => option.values.some((item) => item.isSelected))
    .length;
