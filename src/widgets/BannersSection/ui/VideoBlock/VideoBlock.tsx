import clsx from 'clsx';
import React, {FC} from 'react';

import {StrapiProductVideoType} from '@shared/types';

type Props = {
  className?: string;
  video: StrapiProductVideoType;
};

const VideoBlock: FC<Props> = ({className = '', video}) => (
  <div
    className={clsx(
      'relative w-full p-4 md:p-9 aspect-[2.68] md:aspect-[2.84]',
      className,
    )}>
    {video.VideoMobile.data ? (
      <video
        src={video.VideoMobile.data.attributes.url}
        poster={video.PosterMobile.data?.attributes.url}
        controls={false}
        autoPlay
        playsInline
        loop
        muted
        className='md:hidden absolute w-full h-full top-0 left-0 object-cover z-0'
      />
    ) : null}
    {video.VideoDesktop.data ? (
      <video
        src={video.VideoDesktop.data.attributes.url}
        poster={video.PosterMobile.data?.attributes.url}
        controls={false}
        autoPlay
        playsInline
        loop
        muted
        className='hidden md:block absolute w-full h-full top-0 left-0 object-cover z-0'
      />
    ) : null}
  </div>
);

export default VideoBlock;
