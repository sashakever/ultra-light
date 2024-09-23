'use client';

import React, {FC} from 'react';
import 'swiper/css';
import 'swiper/css/pagination';

import BlogArea from './BlogArea';
import VideosArea from './VideosArea';

import {RelatedArticleType, StrapiSectionAreaType} from '@shared/types';

type Props = {
  section: StrapiSectionAreaType;
};
const AreaSection: FC<Props> = ({section}) => {
  const articles: RelatedArticleType[] =
    section?.Articles?.data?.map((item) => ({
      slug: item.attributes.Slug,
      title: item.attributes.Title,
      createdDate: item.attributes.publishedAt,
      description: item.attributes.Description,
      timeToRead: item.attributes.TimeToRead,
      titleCategory: item.attributes.TitleCategory,
      authorAvatar: item.attributes.AuthorAvatar,
    })) || [];

  return (
    <section className='bg-gray-700 overflow-hidden'>
      <div className='flex flex-col md:grid md:grid-cols-2 md:px-15 md:pt-6 md:pb-4'>
        <VideosArea
          title={section.VideosAreaTitle || ''}
          subtitle={section.VideosAreaSubtitle || ''}
          slides={section.InstaReels}
        />
        <BlogArea
          title={section.BlogAreaTitle || ''}
          buttonTitle={section.ShowMoreButtonTitle || ''}
          subtitle={section.BlogAreaSubtitle || ''}
          articles={articles}
        />
      </div>
    </section>
  );
};

export default AreaSection;
