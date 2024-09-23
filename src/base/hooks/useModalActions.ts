import {usePathname, useRouter, useSearchParams} from 'next/navigation';

import {ModalParamsValueEnum, SearchParamsEnum} from '@shared';

const useModalActions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openModal = (ModalParamsValueType: ModalParamsValueEnum) => {
    const cloneSearchParams = new URLSearchParams(searchParams);
    cloneSearchParams.set(SearchParamsEnum.MODAL_TYPE, ModalParamsValueType);

    router.push(`${pathname}?${cloneSearchParams.toString()}`);
  };

  const toggleModal = (ModalParamsValueType: ModalParamsValueEnum) => {
    const cloneSearchParams = new URLSearchParams(searchParams);
    if (
      cloneSearchParams.has(SearchParamsEnum.MODAL_TYPE) &&
      cloneSearchParams.get(SearchParamsEnum.MODAL_TYPE) ===
        ModalParamsValueEnum.SIGN_IN.valueOf()
    ) {
      cloneSearchParams.delete(SearchParamsEnum.MODAL_TYPE);
    } else {
      cloneSearchParams.set(SearchParamsEnum.MODAL_TYPE, ModalParamsValueType);
    }
    router.push(`${pathname}?${cloneSearchParams.toString()}`);
  };

  const closeModal = () => {
    const cloneSearchParams = new URLSearchParams(searchParams);
    cloneSearchParams.delete(SearchParamsEnum.MODAL_TYPE);
    router.push(`${pathname}?${cloneSearchParams.toString()}`);
  };

  return {
    router,
    openModal,
    toggleModal,
    closeModal,
  };
};

export default useModalActions;
