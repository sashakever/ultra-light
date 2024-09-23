import {useEffect, useState} from 'react';

import {useGetReviewsQuery} from '@base/api';
import {useAppSelector} from '@base/store';

import {ReviewDataType, ReviewTotalType} from '@shared/types';

const useReviews = () => {
  const {currentProduct} = useAppSelector((state) => state.review);
  const [reviewData, setReviewData] = useState<ReviewDataType[]>([]);
  const [reviewTotal, setReviewTotal] = useState<ReviewTotalType>();
  const {data, isLoading} = useGetReviewsQuery({
    product_id: currentProduct?.id?.split('/')?.pop() ?? '',
  });

  useEffect(() => {
    if (data && !isLoading) {
      setReviewData(data.reviews);
      setReviewTotal(data.bottomline);
    }
  }, [data, isLoading]);

  const scrollToReviews = () => {
    const tabsSection = document.querySelector('#tabs-section');
    tabsSection?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  return {
    reviewData,
    reviewTotal,
    scrollToReviews,
  };
};

export default useReviews;
