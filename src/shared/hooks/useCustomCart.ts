import {ShopifyAnalyticsProduct, useCart} from '@shopify/hydrogen-react';
import {
  CartLineInput,
  CartLineUpdateInput,
  Product,
} from '@shopify/hydrogen-react/storefront-api-types';
import {useRouter} from 'next/navigation';

import {useShopifyAnalytics} from '@base/hooks';
import {useAppSelector, useCartActions} from '@base/store';

import {multipass} from '@shared/utils';

const useCustomCart = () => {
  const {
    cartCreate,
    linesAdd,
    linesRemove,
    lines,
    linesUpdate,
    id,
    checkoutUrl,
    totalQuantity,
    cost,
  } = useCart();
  const navigate = useRouter();
  const {products} = useAppSelector((state) => state.cart);
  const {lang} = useAppSelector((state) => state.header);
  const {customer} = useAppSelector((state) => state.auth);
  const {removeProductById, addProduct, openCart} = useCartActions();
  const {sendAddToCart} = useShopifyAnalytics(lang?.locale || 'en');

  const sendCartAnalytics = () => {
    const analyticsProduct: ShopifyAnalyticsProduct[] =
      lines?.map((line) => ({
        productGid: line?.merchandise?.product?.id || '',
        name: line?.merchandise?.product?.title || '',
        brand: line?.merchandise?.product?.vendor || '',
        price: line?.merchandise?.price?.amount || '0',
      })) || [];

    if (id) {
      sendAddToCart({
        cartId: id,
        products: analyticsProduct,
      })
        .then(() => console.log('Send cart analytics'))
        .catch((err) => console.log(err));
    }
  };

  const addCartLine = (product: Product, line: CartLineInput) => {
    if (!id) {
      cartCreate({lines: [line]});
    } else {
      linesAdd([line]);
    }
    addProduct(product);
    openCart();
    sendCartAnalytics();
  };

  const addCartLines = (product: Product[], cartLines: CartLineInput[]) => {
    if (!id) {
      cartCreate({lines: cartLines});
    } else {
      linesAdd(cartLines);
    }
    product.forEach((item) => addProduct(item));
    openCart();
    sendCartAnalytics();
  };

  const removeCartLine = (cartLineId: string) => {
    const productId = lines?.find((line) => line?.id === cartLineId)
      ?.merchandise?.product?.id;
    const allLinesOfProducts = lines?.filter(
      (line) => line?.merchandise?.product?.id === productId,
    );
    if (
      !allLinesOfProducts ||
      (allLinesOfProducts && allLinesOfProducts.length <= 1)
    ) {
      removeProductById(productId ?? '');
    }
    linesRemove([cartLineId]);
  };

  const updateCartLine = (updateInput: CartLineUpdateInput) => {
    linesUpdate([updateInput]);
  };

  const getProductById = (productId: string) =>
    products.find((product) => product.id === productId) ?? null;

  const countProducts = () => totalQuantity;

  const proceedToCheckout = () => {
    if (customer) {
      multipass({
        return_to: checkoutUrl || '',
        isRedirect: true,
        shopDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
      })
        .then(() => undefined)
        .catch((error) => console.error('Error multipass -> ', error));
    } else {
      navigate.push(`${checkoutUrl}`);
    }
  };

  return {
    id,
    lines,
    checkoutUrl,
    cost,
    addCartLine,
    addCartLines,
    removeCartLine,
    updateCartLine,
    getProductById,
    countProducts,
    proceedToCheckout,
  };
};

export default useCustomCart;
