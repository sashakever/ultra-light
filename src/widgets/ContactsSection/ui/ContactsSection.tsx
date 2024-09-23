'use client';

import clsx from 'clsx';
import React, {FC} from 'react';

import {SocialsIconsBlock} from '@features';

import {Breadcrumbs} from '@shared';
import {BackgroundColorEnum, StrapiSectionContactUsType} from '@shared/types';

type Props = {
  className?: string;
  section: StrapiSectionContactUsType;
};

const ContactsSection: FC<Props> = ({className = '', section}) => {
  const breadCrumbs = section.Breadcrumbs.map((item) => ({
    label: item.Title || '',
    path: item.Link || '',
  }));

  return (
    <section
      className={clsx(
        'flex flex-col md:flex-row bg-gray-100 mx-2 md:mx-3',
        'px-4 pb-8 pt-5 md:px-0 md:pt-5 md:pb-0 gap-6 md:gap-0',
        className,
      )}>
      <div
        className={clsx(
          'md:max-w-[50%] lg:max-w-[68.7%] w-full ltr:md:border-r rtl:border-l border-gray-200',
          'md:rem:pt-[18px] md:rem:pl-[31px] rtl:rem:pr-[31px]',
          'flex flex-col gap-8 md:gap-11',
        )}>
        {breadCrumbs.length ? (
          <Breadcrumbs className='text-gray-700' crumbs={breadCrumbs} />
        ) : null}
        <div className='flex flex-col gap-3'>
          <h1 className='text-2xl md:text-4xl font-medium'>{section.Title}</h1>
          <h2 className='text-s rem:max-w-[303px] md:rem:max-w-[558px]'>
            {section.Text}
          </h2>
        </div>
      </div>
      <div className='flex-1 md:rem:p-[38px]'>
        <h3 className='text-xs text-gray-400'>
          {section.ContactUsBlock.data?.attributes.Title}
        </h3>
        <div className='grid grid-cols-2 gap-y-6 md:gap-x-6 md:gap-y-8 mt-5'>
          <div className='text-tone-700 text-m md:text-l flex flex-col gap-1 md:gap-2 whitespace-pre-line'>
            {section.ContactUsBlock.data?.attributes.Phones}
          </div>
          <div className='text-xs whitespace-pre-line'>
            {section.ContactUsBlock.data?.attributes.Schedule}
          </div>
          <div className='hidden md:block' />
          <SocialsIconsBlock
            bgColor={BackgroundColorEnum.LIGHT}
            links={section.SocialLinks.data}
            className='!justify-start'
          />
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
