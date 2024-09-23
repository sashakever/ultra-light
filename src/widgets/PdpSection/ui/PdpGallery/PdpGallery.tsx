import {Dialog, Transition} from '@headlessui/react';
import {
  Maybe,
  MediaImage,
  ProductVariant,
} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import Image from 'next/image';
import React, {FC, Fragment, useEffect, useState} from 'react';
import {useWindowSize} from 'usehooks-ts';

import {ZoomableImage} from '../ZoomableImage';
import ActionBar from './ActionBar';

import {useAppSelector} from '@base/store';

import {CloseIcon} from '@widgets/PdpSection/assets';
import {useOptions} from '@widgets/PdpSection/hooks';

import {VideoPopup} from '@features';

import {BREAKPOINT_MEDIUM, Breadcrumbs} from '@shared';
import {NoImage} from '@shared/assets';
import {ActiveMediaImageType, BreadcrumbType} from '@shared/types';
import {getFirstVariantBySelectedOption} from '@shared/utils';

type Props = {
  handleToggleFavourite: () => void;
  isFavourite?: boolean;
  images: MediaImage[];
  breadCrumbs: BreadcrumbType[];
  productVideoUrl: string | null;
  productFileUrl: string | null;
  selectedVariant?: Maybe<ProductVariant>;
};

type VideoPopupType = {
  isOpen: boolean;
  url: string | null;
};

const PdpGallery: FC<Props> = ({
  isFavourite = false,
  handleToggleFavourite,
  images,
  breadCrumbs,
  productVideoUrl,
  productFileUrl,
  selectedVariant,
}) => {
  const {width} = useWindowSize();
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<ActiveMediaImageType>({
    item: images[0].image,
    index: 0,
  });
  const [isShowMore, setIsShowMore] = useState<boolean>(
    !(width > BREAKPOINT_MEDIUM),
  );
  const {product} = useAppSelector((state) => state.product);
  const {getAppliedOptions} = useOptions();
  const firstVariantByProductColor = getFirstVariantBySelectedOption(
    product?.variants.nodes || [],
    getAppliedOptions(),
  );

  let currentImageIndex = images.findIndex(
    (item) => item.image?.url === firstVariantByProductColor?.image?.url,
  );

  if (currentImageIndex === -1) {
    currentImageIndex = 0;
  }

  useEffect(() => {
    setActiveImage({
      index: currentImageIndex,
      item: images[currentImageIndex].image,
    });
  }, [currentImageIndex]);

  useEffect(() => {
    const selectedVariantUrl = selectedVariant?.image?.url.split('?')[0] || '';
    if (selectedVariantUrl) {
      images.forEach((item, index) => {
        if (item.image?.url.split('?')[0] === selectedVariantUrl) {
          setActiveImage({index, item: item.image});
        }
      });
    }
  }, [selectedVariant]);

  const [videoPopupInfo, setVideoPopupInfo] = useState<VideoPopupType>({
    isOpen: false,
    url: null,
  });

  const handleClose = () => {
    setIsPreviewOpen(false);
  };

  const handleOpen = () => {
    setIsPreviewOpen(true);
  };

  const handleKeyPressClose = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClose();
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    item: MediaImage['image'],
    index: number,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setActiveImage({item, index});
    }
  };

  const handleCloseVideo = () => {
    setVideoPopupInfo({isOpen: false, url: null});
  };

  const handlePlayVideo = () => {
    if (productVideoUrl)
      setVideoPopupInfo({isOpen: true, url: productVideoUrl});
  };

  const visiblePreviews = images.slice(0, !isShowMore ? 5 : undefined);
  const invisiblePreviewsCount = images.length > 5 ? images.length - 5 : 0;

  return (
    <div className='w-full md:w-[57%] bg-gray-100 pb-8 md:px-3 pt-5 md:rem:pt-[18px] md:pb-0'>
      <Breadcrumbs
        className='pl-4 md:pl-7 text-gray-700'
        crumbs={breadCrumbs}
      />
      <div
        className={clsx(
          'sticky top-24 h-[min-content] flex flex-col-reverse items-center gap-3',
          'md:flex-row md:items-start rem:mt-[26px] md:rem:mt-[18px] px-3 md:px-0',
        )}>
        <div className='flex gap-3 md:flex-col md:w-1/5 w-3/4 rem:max-h-[750px] relative'>
          <div className='flex gap-3 md:flex-col w-full overflow-y-auto justify-center md:justify-start'>
            {visiblePreviews.map((item: MediaImage, index: number) => (
              <div
                key={item.id}
                className={clsx(
                  'relative w-10 h-10 border border-gray-100 flex-shrink-0 flex-grow-0',
                  'md:w-30 md:h-30 mb-3',
                  {
                    '!border-gray-200': activeImage.index === index,
                  },
                )}
                aria-label='Turn active image'
                role='button'
                onKeyDown={(event) => handleKeyPress(event, item.image, index)}
                tabIndex={0}
                onClick={() => setActiveImage({item: item.image, index})}>
                <Image
                  fill
                  objectFit='contain'
                  src={item.image?.url || NoImage.src}
                  alt={item.image?.altText || ''}
                />
              </div>
            ))}
          </div>
          {invisiblePreviewsCount > 0 && !isShowMore ? (
            <div
              className={clsx(
                'absolute bottom-4 md:bottom-0',
                'md:py-12 md:bg-white/75 md:w-full md:max-w-30',
                'flex justify-center',
              )}>
              <button
                className='text-tone-700  bg-transparent'
                onClick={() => setIsShowMore(!isShowMore)}>
                {`+ ${invisiblePreviewsCount} More`}
              </button>
            </div>
          ) : null}
        </div>

        <ZoomableImage activeImage={activeImage} onImageClick={handleOpen} />

        <ActionBar
          className={clsx(
            'absolute top-[20%] -translate-y-1/2',
            'ltr:right-0 ltr:md:right-4',
            'rtl:left-0 rtl:md:left-4',
            'md:top-0 md:translate-y-0',
          )}
          handleToggleFavourite={handleToggleFavourite}
          handlePlayVideo={handlePlayVideo}
          isFavourite={isFavourite}
          productFileUrl={productFileUrl}
          productVideoUrl={productVideoUrl}
          isVertical
        />
      </div>

      <Transition appear show={isPreviewOpen} as={Fragment}>
        <Dialog as='div' className='relative z-[101]' onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div
                    className='relative'
                    style={{width: '100%', height: '100%'}}>
                    <Image
                      width={0}
                      height={0}
                      sizes='100vh'
                      style={{
                        width: '100%',
                        height: '100%',
                        transition: 'transform 0.2s ease-in-out',
                      }}
                      src={activeImage.item?.url || NoImage.src}
                      alt={activeImage.item?.altText || ''}
                    />
                    <div
                      role='button'
                      tabIndex={-1}
                      onKeyPress={(event) => handleKeyPressClose(event)}
                      aria-label='close gallery'
                      onClick={handleClose}
                      className={clsx(
                        'absolute cursor-pointer top-0 right-0 -translate-y-1/2 translate-x-1/2',
                      )}>
                      <CloseIcon className='w-8 h-8 md:w-10 md:h-10 text-gray-700' />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {productVideoUrl ? (
        <VideoPopup
          videoPopupInfo={videoPopupInfo}
          handleCloseVideo={handleCloseVideo}
        />
      ) : null}
    </div>
  );
};

export default PdpGallery;
