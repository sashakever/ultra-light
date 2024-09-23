'use client';

import {Disclosure} from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';
import React, {FC} from 'react';

import {RelatedArticleType} from '@shared/types';
import {Button, ButtonVariantEnum} from '@shared/ui';
import {DateFormatEnum, formatDate} from '@shared/utils';

type Props = {
  article: RelatedArticleType;
  idx: number;
  propRef: React.RefObject<HTMLButtonElement>[];
  buttonTitle: string;
};

const handleAccordionClose = (
  id: string,
  propRef: React.RefObject<HTMLButtonElement>[],
) => {
  const otherRefs = propRef.filter(
    (item) => item.current?.getAttribute('data-id') !== id,
  );

  otherRefs.forEach((item) => {
    const isOpen = item.current?.getAttribute('data-open') === 'true';

    if (isOpen) {
      item.current?.click();
    }
  });
};

const BlogAccordion: FC<Props> = ({article, buttonTitle, idx, propRef}) => (
  <Disclosure defaultOpen={idx === 0}>
    {({open}) => (
      <div
        className={clsx(
          'relative bg-gray-600 px-4 md:px-11 overflow-hidden cursor-pointer rem:rounded-[20px]',
          'h-full flex flex-col justify-center',
        )}>
        <Disclosure.Button
          className='w-full'
          ref={propRef[idx]}
          data-id={article.slug}
          data-open={open}
          onClick={() => handleAccordionClose(`${article.slug}`, propRef)}>
          <div
            className={clsx(
              'w-full flex items-center justify-between h-22 md:rem:h-[146px]',
              {
                'absolute top-0 left-0 px-4 md:px-11':
                  !article.authorAvatar?.data && open,
              },
            )}>
            <div className='relative h-14 md:h-17 w-2/3'>
              {article.authorAvatar?.data ? (
                <Image
                  className={clsx('h-14 w-14 md:h-17 md:w-17 ease-in-out ', {
                    hidden: !open,
                    'block opacity-100': open,
                  })}
                  width={article.authorAvatar.data.attributes.width}
                  height={article.authorAvatar.data.attributes.height}
                  src={article.authorAvatar.data.attributes.url}
                  alt=''
                />
              ) : null}
              <h4
                className={clsx(
                  // 'absolute top-1/2 ltr:left-0 rtl:right-0 -translate-y-1/2',
                  'opacity-100 ease-in-out',
                  'text-start text-s md:text-l font-semibold text-gray-100 ',
                  {
                    '!opacity-0': open,
                  },
                )}>
                {article.title}
              </h4>
            </div>
            <div className='flex flex-col items-end text-xs md:text-s leading-4 text-gray-400'>
              <span className='ltr:hidden rtl:block'>
                {formatDate(article.createdDate, DateFormatEnum.ARABIC)}
              </span>
              <span className='ltr:block rtl:hidden'>
                {formatDate(article.createdDate, DateFormatEnum.LONG)}
              </span>
              <span>{article.timeToRead}</span>
              <span>{article.titleCategory}</span>
            </div>
          </div>
        </Disclosure.Button>
        <Disclosure.Panel>
          <div
            className={clsx('md:max-w-[60%]', {
              'pt-10': !article.authorAvatar?.data && open,
            })}>
            <h4 className='pt-6 text-xl md:text-3xl font-medium text-gray-100 mb-7 md:pt-0 w-2/3 md:w-full'>
              {article.title}
            </h4>
            <div className='text-s text-gray-400 mb-8 w-[90%] md:w-full'>
              {article.description}
            </div>
            <Button
              variant={ButtonVariantEnum.GRAY}
              className='!px-8 !h-13 w-fit mb-6 md:mb-10 rounded-5xl hover:opacity-80'
              openInAnotherTab
              href={`/blogs/${article.slug}`}>
              {buttonTitle}
            </Button>
          </div>
        </Disclosure.Panel>
      </div>
    )}
  </Disclosure>
);

export default BlogAccordion;
