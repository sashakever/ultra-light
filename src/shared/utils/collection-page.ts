import {ProductCollectionSortKeys} from '@shopify/hydrogen-react/storefront-api-types';
import {z} from 'zod';

import {COLORS, MATCH_VARIANTS_TO_METAFIELDS_ARRAY} from '@shared/constants';
import {
  collectionMinimalProductsScheme,
  collectionScheme,
} from '@shared/schemes/collection-schemes';
import {
  CollectionMinimalProductsType,
  CollectionType,
  CollectionsSearchParamsType,
  CustomFilterType,
  CustomFilterValueType,
  FilterMapType,
  FilterType,
  FiltersQueryParamsType,
  ProductMetafieldFiltersQueryParamType,
  SortParamType,
  VariantOptionFiltersQueryParamType,
} from '@shared/types';

export /**
 * The getCollection function takes a response object and returns the collection
 * property of the data property of that object, if it exists. Otherwise, it
 * returns null. This function is used to extract a Collection from an API response.
 *
 * @param response unknown Indicate that the response can be anything
 * @param fullProducts is get full products or only its id
 * @return A collection, or null
 */
const getCollection = (
  response: unknown,
  fullProducts?: boolean,
): CollectionType | CollectionMinimalProductsType | null => {
  const collectionResponseScheme = z.object({
    data: z.object({
      collection: fullProducts
        ? collectionScheme
        : collectionMinimalProductsScheme,
    }),
  });
  const parsed = collectionResponseScheme.safeParse(response);
  if (parsed.success) {
    return parsed.data.data.collection;
  }
  console.log('Zod errors -> ', JSON.stringify(parsed.error));

  return null;
};

export /**
 * The getValuesArrayByKey function takes a key and searchParams object as arguments.
 * It returns an array of strings that are the values for the given key in the searchParams object.
 * If there is no value for that key, it returns an empty array.
 *
 * @param key keyof CollectionsSearchParamsType Ensure that the key passed in is a valid key
 * @param  searchParams the value of a key in the searchParams object
 * @return An array of strings
 */
const getValuesArrayByKey = (
  key: keyof CollectionsSearchParamsType,
  searchParams?: CollectionsSearchParamsType,
) => {
  let valuesArray: string[] = [];
  if (searchParams?.[key] !== undefined) {
    if (typeof searchParams[key] === 'string') {
      valuesArray.push(searchParams[key]);
    } else if (Array.isArray(searchParams[key])) {
      valuesArray = searchParams[key];
    }
  }
  return valuesArray;
};

export /**
 * The getFilterInputFromVariant function takes in a string or object and returns an object
 * with the name and value of the variant option.
 *
 * @param input unknown Tell typescript that the function can accept any type of input
 * @return An object with a name and value property
 */
const getFilterInputFromVariant = (input: unknown) => {
  const returnedValue = {name: '', value: ''};
  const scheme = z.object({
    variantOption: z.object({value: z.string(), name: z.string()}),
  });
  const inputParsed: unknown =
    typeof input === 'string' ? JSON.parse(input) : input;
  const parsed = scheme.safeParse(inputParsed);

  if (parsed.success) {
    return {
      name: parsed.data.variantOption.name,
      value: parsed.data.variantOption.value,
    };
  }
  return returnedValue;
};
export /**
 * The getFilterInputFromMetafield function takes in a value of unknown type and returns an object with two properties:
 * key, which is a string, and value, which is also a string.
 * The function first checks if the input parameter has the shape of ProductMetafieldInput.
 * If it does not have that shape, then it returns an empty object.
 * If it does have that shape (and therefore must be either JSON or already parsed),
 * then we check if its productMetafield property has the correct structure to be considered valid input
 * for our filter function.
 *
 * @param input unknown Make sure that the function can be used with any type of input
 * @return A string
 */
const getFilterInputFromMetafield = (input: unknown) => {
  const returnedValue = {key: '', value: ''};
  const scheme = z.object({
    productMetafield: z.object({value: z.string(), key: z.string()}),
  });
  const inputParsed: unknown =
    typeof input === 'string' ? JSON.parse(input) : input;
  const parsed = scheme.safeParse(inputParsed);

  if (parsed.success) {
    return {
      key: parsed.data.productMetafield.key,
      value: parsed.data.productMetafield.value,
    };
  }
  return returnedValue;
};

export /**
 * The getFilterInputFromProductType function takes in an unknown input and returns a key/value pair.
 * The returned value is used to filter the product type list.
 *
 * @param input unknown Make sure that the function can handle any type of input
 * @return An object with key and value
 */
const getFilterInputFromProductType = (input: unknown) => {
  const returnedValue = {key: '', value: ''};
  const scheme = z.object({productType: z.string()});
  const inputParsed: unknown =
    typeof input === 'string' ? JSON.parse(input) : input;
  const parsed = scheme.safeParse(inputParsed);

  if (parsed.success) {
    return {
      key: parsed.data.productType,
      value: parsed.data.productType,
    };
  }
  return returnedValue;
};

export /**
 * The getFilterInputFromProductPrice function takes in an unknown input and returns a FilterInputFromProductPrice object.
 * The function first checks if the input is a string, and if so, parses it into an object.
 * Then it checks that the parsed value is not null, is of type 'object', and has a property called 'price'.
 * If all these conditions are met then it continues to check that the price property's value:
 * - Is not null;
 * - Is of type 'object';
 * - Has properties called min &amp; max; AND that both min &amp; max:  (continued) ...are numbers
 *
 * @param input unknown Allow any type of input to be passed into the function
 * @return An object with min and max values
 */
const getFilterInputFromProductPrice = (input: unknown) => {
  const returnedValue = {min: 0, max: 0};
  const scheme = z.object({
    price: z.object({min: z.number(), max: z.number()}),
  });
  const inputParsed: unknown =
    typeof input === 'string' ? JSON.parse(input) : input;
  const parsed = scheme.safeParse(inputParsed);

  if (parsed.success) {
    return {
      min: parsed.data.price.min,
      max: parsed.data.price.max,
    };
  }
  return returnedValue;
};

export /**
 * The getProductOptionFilter function takes in a FilterMapType, an index number,
 * the collectionFilters array and the productOptions array. It returns a CustomFilterType object
 * or null if no filter is found. The function first checks to see if there is a variantFilter or mfFilter
 * that matches the item's variantId or metafieldId property respectively. If so it creates an empty values array
 * and then loops through each value of either the variantFilter's values property (if it exists)
 * OR mfFilter's values property (if it exists).
 *
 * @param item FilterMapType Determine the type of filter
 * @param index number Create a unique id for each filter value
 * @param collectionFilters Filter[] Get the filter values
 * @param productOptions string[] Determine which filters are selected
 * @return A custom filter
 */
const getProductOptionFilter = (
  item: FilterMapType,
  index: number,
  collectionFilters: FilterType[],
  productOptions: string[],
): CustomFilterType | null => {
  const variantFilter = collectionFilters.find(
    (filter) => filter.id === item.variantId,
  );
  const mfFilter = collectionFilters.find(
    (filter) => filter.id === item.metafieldId,
  );

  if (variantFilter || mfFilter) {
    const values: CustomFilterValueType[] = [];

    if (variantFilter && variantFilter.type === 'LIST') {
      variantFilter.values.forEach((value) => {
        const input = getFilterInputFromVariant(value.input);
        const colorItem =
          item.type === 'productColor'
            ? COLORS.find((color) => color.type === input.value.toLowerCase())
            : undefined;

        if (!values.find((v) => v.value === input.value)) {
          values.push({
            id: value.id,
            isSelected: productOptions.includes(`${item.type}:${input.value}`),
            name: item.type,
            value: input.value,
            colorHex: colorItem?.colorHex,
            colorUrl: colorItem?.imgUrl,
          });
        }
      });
    }
    if (mfFilter && mfFilter.type === 'LIST') {
      mfFilter.values.forEach((value) => {
        const input = getFilterInputFromMetafield(value.input);

        const allValues = input.value.split(',');
        allValues.forEach((splitValue, index1) => {
          if (!values.find((v) => v.value === splitValue)) {
            const colorItem =
              item.type === 'productColor'
                ? COLORS.find(
                    (color) => color.type === splitValue.toLowerCase(),
                  )
                : undefined;

            values.push({
              id: `${value.id}${index1 + 1}`,
              isSelected: productOptions.includes(
                `${item.type}:${input.value}`,
              ),
              name: item.type,
              value: splitValue,
              colorHex: colorItem?.colorHex,
              colorUrl: colorItem?.imgUrl,
            });
          }
        });
      });
    } else if (mfFilter && mfFilter.type === 'BOOLEAN') {
      let isSelected;
      if (productOptions.includes(`${item.type}:true`)) isSelected = true;
      if (productOptions.includes(`${item.type}:false`)) isSelected = false;

      values.push({
        id: `${index + 1}`,
        isSelected,
        name: item.type,
        value: '',
      });
    }

    return {
      id: variantFilter ? variantFilter.id : mfFilter?.id || String(index + 1),
      key: 'productOption',
      type: item.type,
      label:
        item.title ||
        (variantFilter ? variantFilter.label : mfFilter?.label) ||
        '',
      values,
    };
  }
  return null;
};
export /**
 * The getProductTypeFilter function takes in a FilterMapType, an index number,
 * the collectionFilters array and the productOptions array. It returns a CustomFilterType object
 * with id, key, type (from FilterMapType), label (from collectionFilters or from FilterMapType) and values.
 * The values are created by iterating through each value of the product type filter found in collectionFilters.
 *
 * @param item FilterMapType Get the type of filter
 * @param index number Generate a unique id for the filter
 * @param collectionFilters Filter[] Get the label for the filter
 * @param productOptions string[] Determine if the filter is selected or not
 * @return A filter for each product type
 */
const getProductTypeFilter = (
  item: FilterMapType,
  index: number,
  collectionFilters: FilterType[],
  productOptions: string[],
): CustomFilterType | null => {
  const productTypeFilter = collectionFilters.find(
    (filter) => filter.id === item.id,
  );
  const values: CustomFilterValueType[] = [];

  if (productTypeFilter) {
    productTypeFilter.values.forEach((value) => {
      const input = getFilterInputFromProductType(value.input);
      if (!values.find((v) => v.value === input.value)) {
        values.push({
          id: value.id,
          isSelected: productOptions.includes(`${item.type}:${input.value}`),
          name: item.type,
          value: input.value,
        });
      }
    });
  }

  return {
    id: productTypeFilter ? productTypeFilter.id : String(index + 1),
    key: 'productType',
    type: item.type,
    label: item.title || productTypeFilter?.label || '',
    values,
  };
};

export /**
 * The getProductPriceFilter function takes in a FilterMapType, an index number,
 * and a collectionFilters array. It returns either null or a CustomFilterType object.
 * The function first finds the productPriceFilter from the collectionFilters array by id.
 * If it exists, then it creates an empty values array and loops through each value of that filter's values property.
 * For each value in that loop, we call getFilterInputFromProductPrice to parse out min and max price numbers
 * from the input string. We then push those min/max prices into our new values array
 *
 * @param item FilterMapType Get the filter type from the filters map
 * @param index number Create a unique id for the filter
 * @param collectionFilters Filter[] Get the label for the filter
 * @param searchParams CollectionsSearchParamsType Get the applied filters
 * @return A filter object with the following structure:
 */
const getProductPriceFilter = (
  item: FilterMapType,
  index: number,
  collectionFilters: FilterType[],
  searchParams?: CollectionsSearchParamsType,
): CustomFilterType | null => {
  const productPriceFilter = collectionFilters.find(
    (filter) => filter.id === item.id,
  );
  const values: CustomFilterValueType[] = [];

  if (productPriceFilter) {
    productPriceFilter.values.forEach((value) => {
      const input = getFilterInputFromProductPrice(value.input);

      values.push({
        id: value.id,
        name: item.type,
        value: '',
        minPrice: input.min,
        maxPrice: input.max,
        minAppliedPrice: parseInt(searchParams?.minPrice || '0', 10) || 0,
        maxAppliedPrice: parseInt(searchParams?.maxPrice || '0', 10) || 0,
      });
    });
  }

  return {
    id: productPriceFilter ? productPriceFilter.id : String(index + 1),
    key: 'price',
    type: item.type,
    label: item.title || productPriceFilter?.label || '',
    values,
  };
};

export /**
 * The getMergedFilters function takes in a collection and searchParams object,
 * and returns an array of CustomFilterType objects.
 * The function iterates through the MATCH_VARIANTS_TO_METAFIELDS_ARRAY constant,
 * which is an array of objects that contain information about how to match up variant IDs with metafield IDs.
 * For each item in the MATCH_VARIANTS_TO_METAFIELDS constant, it checks if there is a matching
 * filter on the collection object. If so it creates a new CustomFilterType object
 *
 * @param collectionRaw Collection | null Get the collection filters
 * @param searchParams CollectionsSearchParamsType Get the searchParams from URL
 * @return An array of filters,
 */
const getMergedFilters = (
  collectionRaw: CollectionType | CollectionMinimalProductsType | null,
  searchParams?: CollectionsSearchParamsType,
) => {
  const filters: CustomFilterType[] = [];
  const collectionFilters = collectionRaw?.products.filters;
  const productOptions = getValuesArrayByKey('productOption', searchParams);
  const productTypes = getValuesArrayByKey('productType', searchParams);

  if (!collectionFilters) return filters;

  MATCH_VARIANTS_TO_METAFIELDS_ARRAY.forEach((item, index) => {
    let filter: CustomFilterType | null = null;
    if (item.variantId || item.metafieldId) {
      filter = getProductOptionFilter(
        item,
        index,
        collectionFilters,
        productOptions,
      );
    } else if (item.id === 'filter.p.product_type') {
      filter = getProductTypeFilter(
        item,
        index,
        collectionFilters,
        productTypes,
      );
    } else if (item.id === 'filter.v.price') {
      filter = getProductPriceFilter(
        item,
        index,
        collectionFilters,
        searchParams,
      );
    }

    if (filter) filters.push(filter);
  });

  return filters;
};

export /**
 * The getFiltersToShopify function takes in the filtersRawGlobal and searchParams arguments,
 * and returns a FiltersQueryParamsType array.
 * The function first creates an empty FiltersQueryParamsType array called filters.
 * It then iterates over each product type in the productTypes array, pushing a new object with key
 * to the filters array for each item.
 * If there are any items in the productOptions array, it iterates over them as well: for each item it splits on ':'
 * to get its key and valueOption; finds a matching MATCH_VARIANTS_TO_METAFIELDS_ARRAY
 *
 * @param filtersRawGlobal Filter[] Get the filters from the global state
 * @param searchParams CollectionsSearchParamsType Get the searchparams from the url
 * @return The following:
 */
const getFiltersToShopify = (
  filtersRawGlobal: FilterType[],
  searchParams?: CollectionsSearchParamsType,
) => {
  const productTypes = getValuesArrayByKey('productType', searchParams);
  const productOptions = getValuesArrayByKey('productOption', searchParams);

  const filters: FiltersQueryParamsType = [];

  productTypes.forEach((item) => {
    filters.push({productType: item});
  });

  if (productOptions?.length) {
    productOptions.forEach((item) => {
      const [key, valueOption] = item.split(':');
      const filterMapItem = MATCH_VARIANTS_TO_METAFIELDS_ARRAY.find(
        (matchItem) => matchItem.type === key,
      );

      if (filterMapItem) {
        const filterVariant = filtersRawGlobal.find(
          (filter) => filter.id === filterMapItem.variantId,
        );
        if (filterVariant) {
          filterVariant.values.forEach((valueItem) => {
            const input = getFilterInputFromVariant(valueItem.input);

            if (
              input.value === valueOption &&
              !filters.find((currentFilter) => {
                const filterItem =
                  currentFilter as VariantOptionFiltersQueryParamType;

                return (
                  filterItem.variantOption?.name === input.name &&
                  filterItem.variantOption?.value === input.value
                );
              })
            ) {
              filters.push({
                variantOption: {
                  name: input.name,
                  value: input.value,
                },
              });
            }
          });
        }

        const filterMf = filtersRawGlobal.find(
          (filter) => filter.id === filterMapItem.metafieldId,
        );
        if (filterMf) {
          filterMf.values.forEach((valueItem) => {
            const input = getFilterInputFromMetafield(valueItem.input);
            const allValues = input.value.split(',');

            if (
              allValues.includes(valueOption) &&
              !filters.find((currentFilter) => {
                const filterItem =
                  currentFilter as ProductMetafieldFiltersQueryParamType;

                return (
                  filterItem.productMetafield?.key === input.key &&
                  filterItem.productMetafield?.value === input.value
                );
              })
            ) {
              filters.push({
                productMetafield: {
                  namespace: 'custom',
                  key: input.key,
                  value: input.value,
                },
              });
            }
          });
        }
      }
    });
  }

  if (
    searchParams?.minPrice !== undefined ||
    searchParams?.maxPrice !== undefined
  ) {
    const price: {min?: number; max?: number} = {};
    if (searchParams?.minPrice !== undefined) {
      price.min = Number(searchParams.minPrice) || 0;
    }
    if (searchParams?.maxPrice !== undefined) {
      price.max = Number(searchParams.maxPrice) || 0;
    }
    filters.push({
      price,
    });
  }

  return filters;
};

export /**
 * The getSortValuesFromParam function takes a sortParam and returns an object with two properties:
 * - sortKey, which is the key that will be used to determine how products are sorted in the collection.
 * - shouldReverse, which is a boolean indicating whether or not we should reverse the order of products.
 *
 * @param sortParam SortParamType | undefined Determine the sort order of the products
 * @return An object with sort parameters
 */
const getSortValuesFromParam = (
  sortParam: SortParamType | undefined,
): {
  sortKey: ProductCollectionSortKeys;
  shouldReverse: boolean;
} => {
  switch (sortParam) {
    case 'price-high-low':
      return {
        sortKey: 'PRICE',
        shouldReverse: true,
      };
    case 'price-low-high':
      return {
        sortKey: 'PRICE',
        shouldReverse: false,
      };
    case 'best-selling':
      return {
        sortKey: 'BEST_SELLING',
        shouldReverse: false,
      };
    case 'newest':
      return {
        sortKey: 'CREATED',
        shouldReverse: true,
      };
    case 'featured':
      return {
        sortKey: 'MANUAL',
        shouldReverse: false,
      };
    default:
      return {
        sortKey: 'BEST_SELLING',
        shouldReverse: false,
      };
  }
};
