import clsx from 'clsx';
import Link from 'next/link';
import React, {FC, useState} from 'react';

import {VideoPopup} from '@features/VideoPopup';

import {FavoriteIcon, NoteBlankIcon, PlayIcon} from '@shared/assets';

type Props = {
  className?: string;
  type?: 'minimize' | 'full';
  position?: 'left' | 'right' | 'bottom';
  direction?: 'horizontal' | 'vertical';
  reversed?: boolean;
  countFavorite?: number;
  isFavourite?: boolean;
  handleToggleFavourite?: () => void;
  productVideoUrl?: string | null;
  productFileUrl?: string | null;
};

type VideoPopupType = {
  isOpen: boolean;
  url: string | null;
};

const ActionsTile: FC<Props> = ({
  className = '',
  position = 'right',
  type = 'full',
  direction = 'vertical',
  reversed = false,
  countFavorite,
  isFavourite,
  handleToggleFavourite,
  productVideoUrl = null,
  productFileUrl = null,
}) => {
  const [videoPopupInfo, setVideoPopupInfo] = useState<VideoPopupType>({
    isOpen: false,
    url: null,
  });

  const handleCloseVideo = () => {
    setVideoPopupInfo({isOpen: false, url: null});
  };

  const handlePlayVideo = (url?: string) => () => {
    if (url) setVideoPopupInfo({isOpen: true, url});
  };

  return (
    <>
      <div
        className={clsx(
          'flex',
          {
            'flex-col': direction === 'vertical',
            'flex-col-reverse items-end': reversed || direction === 'vertical',
          },
          className,
        )}>
        {type === 'full' || direction === 'vertical' ? (
          <>
            {productVideoUrl ? (
              <button
                onClick={handlePlayVideo(productVideoUrl)}
                type='button'
                aria-label='button'
                className={clsx('flex items-center justify-center', {
                  'w-10 h-10': direction === 'vertical',
                  'w-9 h-9': direction === 'horizontal',
                })}>
                <PlayIcon />
              </button>
            ) : null}
            {productFileUrl ? (
              <Link
                href={productFileUrl}
                target='_blank'
                className={clsx('flex items-center justify-center', {
                  'w-10 h-10': direction === 'vertical',
                  'w-9 h-9': direction === 'horizontal',
                })}>
                <NoteBlankIcon />
              </Link>
            ) : null}
          </>
        ) : null}
        <button
          onClick={handleToggleFavourite}
          type='button'
          className={clsx('flex items-center justify-center', {
            'gap-1': position === 'left',
            'flex-row-reverse gap-2': position === 'right',
            'p-2.5': type === 'minimize',
            'w-10 h-10': direction === 'vertical' && type !== 'minimize',
            'w-9 h-9': direction === 'horizontal' && type !== 'minimize',
          })}>
          <FavoriteIcon className={clsx({'fill-gray-700': isFavourite})} />
          {countFavorite && type === 'minimize' ? (
            <span className='text-xs'>{countFavorite}</span>
          ) : null}
        </button>
      </div>
      {productVideoUrl ? (
        <VideoPopup
          videoPopupInfo={videoPopupInfo}
          handleCloseVideo={handleCloseVideo}
        />
      ) : null}
    </>
  );
};

export default ActionsTile;
