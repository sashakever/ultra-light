'use client';

import clsx from 'clsx';
import React, {FC, useMemo} from 'react';
import 'swiper/css';

import BlogAccordion from './BlogAccordion';

import {RelatedArticleType} from '@shared/types';

type Props = {
  title: string;
  buttonTitle: string;
  subtitle: string;
  articles: RelatedArticleType[];
};

const BlogArea: FC<Props> = ({title, buttonTitle, subtitle, articles}) => {
  const ref = useMemo(
    () => articles.map(() => React.createRef<HTMLButtonElement>()) ?? [],
    [articles],
  );

  return (
    <div className='relative bg-gray-700 md:h-full px-2 md:px-3 pb-4 md:pb-0 md:flex md:flex-col md:justify-between'>
      <div
        className={clsx(
          'flex flex-col gap-2 md:gap-3 items-center justify-center',
          'pt-15 md:pt-10 pb-13 rem:md:pb-[73px]',
        )}>
        <h4 className='text-xl md:text-3xl font-medium text-gray-100'>
          {title}
        </h4>
        <div className='text-s md:text-xs text-gray-100/50 md:text-gray-100'>
          {subtitle}
        </div>
      </div>

      <div className='flex flex-col gap-3 h-full'>
        {articles.map((article, index: number) => (
          <div className='grow' key={article.slug}>
            <BlogAccordion
              article={article}
              idx={index}
              propRef={ref}
              buttonTitle={buttonTitle}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogArea;
