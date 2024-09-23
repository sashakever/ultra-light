import useModalActions from './useModalActions';

import {
  useAppSelector,
  useCartActions,
  useFavouritesActions,
  useHeaderActions,
} from '@base/store';

import {ModalParamsValueEnum} from '@shared';

const useHeader = () => {
  const {customer} = useAppSelector((state) => state.auth);
  const {isMenuOpen, isAllProductsOpen} = useAppSelector(
    (state) => state.header,
  );
  const {openCart, closeCart} = useCartActions();
  const {openFavourites, closeFavourites} = useFavouritesActions();
  const {
    closeSearch,
    closeAllProducts,
    closeMenu,
    openSearch,
    openMenu,
    openAllProducts,
  } = useHeaderActions();
  const {router, toggleModal, closeModal} = useModalActions();

  const closeAll = () => {
    closeFavourites();
    closeCart();
    closeModal();
    closeMenu();
    closeSearch();
    closeAllProducts();
  };

  const handleAccount = () => {
    closeAll();
    if (customer) {
      router.push('/account');
    } else {
      toggleModal(ModalParamsValueEnum.SIGN_IN);
    }
  };

  const handleOpenCart = () => {
    closeAll();
    openCart();
  };

  const handleOpenFavourites = () => {
    closeAll();
    openFavourites();
  };

  const handleClose = () => {
    closeAll();
    closeSearch();
    closeAllProducts();
  };

  const handleToggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      closeAll();
      openMenu();
    }
  };

  const handleToggleAllProducts = () => {
    if (isAllProductsOpen) {
      closeAllProducts();
    } else {
      closeAll();
      openAllProducts();
    }
  };

  const handleOpenSearch = () => {
    closeAll();
    openSearch();
  };

  return {
    handleClose,
    handleOpenFavourites,
    handleOpenCart,
    handleAccount,
    handleToggleMenu,
    closeAll,
    handleToggleAllProducts,
    handleOpenSearch,
  };
};

export default useHeader;
