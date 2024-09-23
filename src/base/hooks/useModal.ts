'use client';

import {ModalParamsValueEnum, SearchParamsEnum} from '@/shared/types';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';

const useModal = (modalType: ModalParamsValueEnum) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams: Record<string, string> = Object.fromEntries(
    searchParams.entries(),
  );

  const closeModal = ({
    modalTypeValue,
    paramsToClear,
    paramsToAdd,
  }: {
    modalTypeValue?: ModalParamsValueEnum | string;
    paramsToClear?: string[];
    paramsToAdd?: Record<string, string>;
  } = {}) => {
    setIsOpen(false);
    const searchParamsClone = new URLSearchParams(searchParams);
    if (modalTypeValue) {
      searchParamsClone.set(SearchParamsEnum.MODAL_TYPE, modalTypeValue);
    } else {
      searchParamsClone.delete(SearchParamsEnum.MODAL_TYPE);
    }
    if (paramsToClear) {
      paramsToClear.forEach((param) => searchParamsClone.delete(param));
    }
    if (paramsToAdd) {
      Object.entries(paramsToAdd).forEach(([key, value]) => {
        searchParamsClone.set(key, value);
      });
    }

    router.push(`${pathname}?${searchParamsClone.toString()}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    const modalTypeFromUrl = searchParams.get(SearchParamsEnum.MODAL_TYPE);
    if (modalTypeFromUrl === modalType) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchParams]);

  return {isOpen, pathname, currentParams, router, closeModal};
};

export default useModal;
