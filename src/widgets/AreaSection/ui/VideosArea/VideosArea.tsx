'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React, {FC, useState} from 'react';
import 'swiper/css';
import {useWindowSize} from 'usehooks-ts';

import VideoPopup from './VideoPopup';

import {PlayIcon} from '@widgets/AreaSection/assets';
import {
  TEMPLATE_TILES_DESKTOP,
  TEMPLATE_TILES_MOBILE,
} from '@widgets/AreaSection/constants';

import {BREAKPOINT_MEDIUM} from '@shared/constants';
import {StrapiInstaReelsItemType} from '@shared/types';
import {splitBy} from '@shared/utils';

type VideoPopupType = {
  isOpen: boolean;
  url: string | null;
};

type Props = {
  title: string;
  subtitle: string;
  slides: StrapiInstaReelsItemType[];
};

const VideosArea: FC<Props> = ({subtitle, title, slides}) => {
  const [videoPopupInfo, setVideoPopupInfo] = useState<VideoPopupType>({
    isOpen: false,
    url: null,
  });
  const {width} = useWindowSize();

  const handleCloseVideo = () => {
    setVideoPopupInfo({isOpen: false, url: null});
  };

  const handlePlayVideo = (url?: string) => () => {
    if (url) setVideoPopupInfo({isOpen: true, url});
  };
  const groups =
    width < BREAKPOINT_MEDIUM ? splitBy(2, slides) : splitBy(3, slides);
  const templateTiles =
    width < BREAKPOINT_MEDIUM ? TEMPLATE_TILES_MOBILE : TEMPLATE_TILES_DESKTOP;

  return (
    <>
      <div className='relative flex flex-col justify-between pb-3 md:pb-0 md:rem:min-h-[764px] md:rem:rounded-[20px] bg-gray-500'>
        <div
          className={clsx(
            'flex flex-col gap-2 md:gap-3 items-center justify-center pt-15 pb-13 border-b border-gray-500 px-2 md:px-0',
            'md:pt-10 rem:md:pb-[103px]',
          )}>
          <h4 className='text-xl md:text-3xl font-medium text-gray-100'>
            {title}
          </h4>
          <div className='text-s md:text-xs text-gray-100/50 md:text-gray-100'>
            {subtitle}
          </div>
        </div>
        <div className='relative w-full md:h-full aspect-[0.5] md:aspect-auto'>
          <div className='absolute top-0 left-0 w-full h-full overflow-y-auto px-3'>
            <div className='w-full h-fit flex gap-3'>
              {groups.map((group, indexCol) => (
                <div key={indexCol} className='w-full flex flex-col gap-3'>
                  {group.map((item, indexRow) => (
                    <button
                      key={item.id}
                      className={clsx('relative cursor-pointer md:rounded-md', {
                        'aspect-[1.025]':
                          templateTiles[indexCol][
                            indexRow % templateTiles[0].length
                          ] === 'small',
                        'aspect-[0.5]':
                          templateTiles[indexCol][
                            indexRow % templateTiles[0].length
                          ] === 'big',
                      })}
                      onClick={handlePlayVideo(
                        item.Video.data?.attributes.url,
                      )}>
                      {item.Poster.data ? (
                        <Image
                          className='absolute top-0 left-0 w-full h-full object-cover md:rounded-md'
                          width={item.Poster.data.attributes.width}
                          height={item.Poster.data.attributes.height}
                          src={item.Poster.data.attributes.url}
                          alt=''
                        />
                      ) : null}
                      <Image
                        className='absolute top-1/2 left-1/2 w-14 h-14 md:h-20 md:w-20 -translate-y-1/2 -translate-x-1/2 rounded-md'
                        width={0}
                        height={0}
                        src={PlayIcon}
                        alt=''
                      />
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <VideoPopup
        videoPopupInfo={videoPopupInfo}
        handleCloseVideo={handleCloseVideo}
      />
    </>
  );
};

export default VideosArea;
