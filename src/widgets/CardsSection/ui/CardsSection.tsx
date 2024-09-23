'use client';

import {OverlayView} from '@react-google-maps/api';
import clsx from 'clsx';
import Image from 'next/image';
import React, {FC, useState} from 'react';
import ReactCompareImage from 'react-compare-image';
import {useWindowSize} from 'usehooks-ts';

import Marker from './Marker';

import {useAppSelector, usePreloaderActions} from '@base/store';

import {GoogleMapWrapper} from '@features';
import {customMapStylesGrey} from '@features/GoogleMapWrapper/constants';
import {MapControlPositionEnum} from '@features/GoogleMapWrapper/types';

import {ArrowsHorizontalIcon, MapPinIcon, PathIcon} from '@shared/assets';
import {BREAKPOINT_MEDIUM, DEFAULT_LOCALE} from '@shared/constants';
import {StrapiSectionCardsType, StrapiStoreType} from '@shared/types';
import {Button, ButtonVariantEnum, Link} from '@shared/ui';

const handleOpacity = (position: number) => {
  const leftImage = document.querySelector(
    '[data-testid="left-image"]',
  ) as HTMLElement;
  const rightImage = document.querySelector(
    '[data-testid="right-image"]',
  ) as HTMLElement;

  if (leftImage && rightImage) {
    if (position > 0.5) {
      const opacity = 1 - (position - 0.5) * 3;
      rightImage.style.opacity = String(opacity);
      leftImage.style.opacity = '1';
    } else {
      const opacity = position * 2;
      rightImage.style.opacity = '1';
      leftImage.style.opacity = String(opacity);
    }
  }
};

type Props = {
  section: StrapiSectionCardsType;
};

const CardsSection: FC<Props> = ({section}) => {
  const {openPreloader} = usePreloaderActions();
  const {width} = useWindowSize();
  const [overlayPosition, setOverlayPosition] = useState({lat: 0, lng: 0});
  const [currentStore, setCurrentStore] = useState<StrapiStoreType | null>(
    null,
  );

  const {lang} = useAppSelector((state) => state.header);

  const handleOpen3DRoom = () => {
    openPreloader();
  };
  const beforeUrl =
    width < BREAKPOINT_MEDIUM
      ? section.BeforeImg.data?.attributes.formats?.small.url
      : section.BeforeImg.data?.attributes.url;
  const afterUrl =
    width < BREAKPOINT_MEDIUM
      ? section.AfterImg.data?.attributes.formats?.small.url
      : section.AfterImg.data?.attributes.url;

  const defaultMapCenter = {
    lat: 26.1308757,
    lng: 43.9933927,
  };

  const stores = section.Stores?.data ?? [];

  const handleMarkerClick = (id: number, lat: number, long: number) => {
    setOverlayPosition({lat, lng: long});
    setCurrentStore(stores.find((item) => item.id === id) ?? null);
  };

  const currentStoreCoordinates = currentStore
    ? {
        lat: currentStore.attributes.Lat
          ? parseFloat(currentStore.attributes.Lat)
          : 0,
        lng: currentStore.attributes.Long
          ? parseFloat(currentStore.attributes.Long)
          : 0,
      }
    : null;

  console.log(lang?.locale);

  return (
    <section className='flex flex-col px-2 md:px-15 mb-3 md:mb-10 bg-tone-100'>
      <div
        className={clsx(
          'w-full flex flex-col mb-3',
          'md:grid md:grid-cols-2 md:grid-rows-2',
        )}>
        <div className='pt-10 md:pt-30 px-6 md:px-24 mb-2 md:rem:mb-[75px]'>
          <h3 className='text-xl md:text-3xl font-medium text-gray-700 text-center mb-3 md:mb-6 rem:max-w-[300px] mx-auto'>
            {section.Title}
          </h3>
          <div className='text-s font-normal text-gray-700/50 text-center rem:max-w-[380px] mx-auto'>
            {section.Subtitle}
          </div>
        </div>

        <div className='mb-2 md:mb-0 row-span-2 col-span-1 flex items-center justify-center'>
          {beforeUrl && afterUrl ? (
            <div className='w-full h-auto overflow-hidden rem:rounded-[20px]'>
              <ReactCompareImage
                handle={<ArrowsHorizontalIcon />}
                leftImage={beforeUrl}
                rightImage={afterUrl}
                onSliderPositionChange={(position) => handleOpacity(position)}
              />
            </div>
          ) : null}
        </div>

        <ul className='w-full grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 px-3 md:px-0 md:rem:pr-[75px] pb-3'>
          {section.InfoBlocks.map((item) => (
            <li
              key={item.id}
              className='w-full h-full bg-gray-100 flex flex-col items-center justify-center py-12 rounded-2xl'>
              <div className='relative flex items-center justify-center h-8 w-8 md:h-10 md:w-10 mb-4'>
                {item.Icon.data ? (
                  <Image
                    className='w-10 h-10 object-contain'
                    width={item.Icon.data.attributes.width}
                    height={item.Icon.data.attributes.height}
                    src={item.Icon.data.attributes.url}
                    alt=''
                  />
                ) : null}
              </div>
              <h4 className='text-s md:text-l font-medium text-gray-700 mb-1'>
                {item.Title}
              </h4>
              <div className='text-xs md:text-s font-normal text-gray-700/50'>
                {item.Subtitle}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col md:flex-row gap-3'>
        {section.SubBlock ? (
          <div className='relative h-full bg-tone-100 w-full md:w-1/2 pt-10 rem:min-h-[400px] md:rem:pt-[110px] md:rem:h-[700px] overflow-hidden rem:rounded-[20px]'>
            {section.SubBlock.ImageDesktop.data ? (
              <Image
                width={section.SubBlock.ImageDesktop.data.attributes.width}
                height={section.SubBlock.ImageDesktop.data.attributes.height}
                className='absolute w-full h-full top-0 left-0 object-cover hidden md:block'
                src={section.SubBlock.ImageDesktop.data.attributes.url}
                alt=''
              />
            ) : null}
            {section.SubBlock.ImageMobile.data ? (
              <Image
                width={section.SubBlock.ImageMobile.data.attributes.width}
                height={section.SubBlock.ImageMobile.data.attributes.height}
                className='absolute w-full h-full top-0 left-0 object-cover md:hidden'
                src={section.SubBlock.ImageMobile.data.attributes.url}
                alt=''
              />
            ) : null}
            <div className='relative flex flex-col items-center'>
              <h3 className='text-xl md:text-3xl font-medium text-gray-700 text-center mb-3'>
                {section.SubBlock.Title}
              </h3>
              <div className='text-s font-normal text-gray-700/50 text-center mb-6 md:mb-10'>
                {section.SubBlock.Subtitle}
              </div>

              {section.SubBlock.ButtonLink && section.SubBlock.ButtonTitle ? (
                <Button
                  className='flex items-center justify-center h-12 rem:w-[145px] md:rem:w-[178px] md:h-13 rounded-5xl'
                  onClick={
                    section.SubBlock.ButtonLink === '/3d-room'
                      ? handleOpen3DRoom
                      : undefined
                  }
                  href={
                    section.SubBlock.ButtonLink !== '/3d-room'
                      ? section.SubBlock.ButtonLink
                      : undefined
                  }
                  variant={
                    section.SubBlock.ButtonColor === 'Black'
                      ? ButtonVariantEnum.SECONDARY
                      : ButtonVariantEnum.WHITE
                  }>
                  {section.SubBlock.ButtonTitle}
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}
        {lang?.locale ? (
          <div
            key={`map-${lang?.locale || DEFAULT_LOCALE}`}
            className='relative h-full bg-tone-100 w-full md:w-1/2 rem:min-h-[400px] md:rem:h-[700px] overflow-hidden rem:rounded-[20px]'>
            <GoogleMapWrapper
              className='aspect-[0.9328] md:aspect-[2.4375]'
              styles={customMapStylesGrey}
              zoomControlPositionVariant={MapControlPositionEnum.CONTACT_US}
              center={currentStoreCoordinates ?? defaultMapCenter}
              zoom={width < BREAKPOINT_MEDIUM ? 4 : 5}>
              {stores.map((store) => {
                const lat = store.attributes.Lat
                  ? parseFloat(store.attributes.Lat)
                  : 0;
                const long = store.attributes.Long
                  ? parseFloat(store.attributes.Long)
                  : 0;
                return lat && long ? (
                  <Marker
                    key={store.id}
                    id={store.id}
                    lat={lat}
                    lng={long}
                    onClick={() => handleMarkerClick(store.id, lat, long)}
                  />
                ) : null;
              })}
              {overlayPosition.lat && overlayPosition.lng && currentStore ? (
                <OverlayView
                  position={overlayPosition}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                  <>
                    <button
                      onClick={() => setCurrentStore(null)}
                      className='-top-[100vh] -left-[100vw] w-[200vw] h-[200vh] absolute z-0 bg-gray-700 opacity-20 cursor-pointer'
                    />

                    <div
                      className={clsx(
                        'relative z-[1] ltr:-translate-x-1/2 rtl:translate-x-1/2 md:translate-x-0',
                        'ltr:md:-translate-x-[95%] rtl:md:md:translate-x-[105%] translate-y-2 rem:w-[300px] rem:h-[148px] px-5 pt-5 pb-3 bg-white',
                      )}>
                      <div className='flex items-start h-full'>
                        <MapPinIcon className='min-w-6' />
                        <div className='flex flex-col h-full ltr:rem:pl-[14px] rtl:rem:pr-[14px]'>
                          <h3 className='text-s font-medium'>
                            {currentStore.attributes.StoreName}
                          </h3>
                          <p className='pt-1 text-xs text-gray-400'>
                            {currentStore.attributes.Address}
                          </p>
                          <div className='mt-auto flex rem:gap-[4.5px]'>
                            <Link
                              className='flex items-center gap-2 rem:w-[104px] h-8 text-xs font-medium no-underline'
                              href='/contact-us'>
                              <PathIcon className='min-w-4 w-4 h-4' />
                              <span>{section.ContactUsText}</span>
                            </Link>
                            <Link
                              target='_blank'
                              className='flex items-center gap-2 rem:w-[104px] h-8 text-xs font-medium no-underline'
                              href={`https://www.google.com/maps/search/?api=1&query=${currentStore.attributes.Address?.replaceAll(' ', '+').toLowerCase()}`}>
                              <PathIcon className='min-w-4 w-4 h-4' />
                              <span>{section.DirectionsText}</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </OverlayView>
              ) : null}
            </GoogleMapWrapper>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CardsSection;
