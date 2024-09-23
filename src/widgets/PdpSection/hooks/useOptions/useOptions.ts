import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import {useEffect} from 'react';

import {useProductActions} from '@base/store';

import {ProductOptionValueType} from '@shared/types';

const useOptions = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const {setSelectedValue, setIsLoading} = useProductActions();

  const getAppliedOptions = () => {
    const searchParamsClone = new URLSearchParams(searchParams);
    const entries = Array.from(searchParamsClone.entries());
    const result: Record<string, string>[] = [];
    entries.forEach((entry) => {
      const [key, value] = entry;
      result.push({key, value});
    });
    return result;
  };

  const applyOption = (key: string, value: ProductOptionValueType) => {
    setSelectedValue({key, value});
    setIsLoading(true);

    const searchParamsClone = new URLSearchParams(searchParams);
    if (searchParamsClone.get(key) === value.value) {
      searchParamsClone.delete(key);
    } else {
      searchParamsClone.set(key, value.value);
    }
    router.push(`${pathname}?${searchParamsClone.toString()}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  return {applyOption, getAppliedOptions};
};

export default useOptions;
