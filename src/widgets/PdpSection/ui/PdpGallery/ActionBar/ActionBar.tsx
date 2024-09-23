import clsx from 'clsx';
import Link from 'next/link';
import React, {FC} from 'react';

import {HeartIcon} from '@widgets/PdpSection/assets';

import {NoteBlankIcon, PlayIcon} from '@shared';

type Props = {
  className?: string;
  isVertical?: boolean;
  isFavourite?: boolean;
  productVideoUrl: string | null;
  productFileUrl: string | null;
  handleToggleFavourite: () => void;
  handlePlayVideo: () => void;
};

const ActionBar: FC<Props> = ({
  handleToggleFavourite,
  handlePlayVideo,
  isFavourite,
  productFileUrl,
  productVideoUrl,
  className,
  isVertical,
}) => {
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    action: () => void,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      action();
    }
  };

  const isShowVideoButton = !!productVideoUrl;
  const isShowFileButton = !!productFileUrl;

  return (
    <div className={clsx('flex gap-1', {'flex-col': isVertical}, className)}>
      <button
        className={clsx('h-10 w-10 flex items-center justify-center')}
        aria-label='Action buttons'
        onKeyDown={(event) => handleKeyPress(event, handleToggleFavourite)}
        tabIndex={0}
        onClick={handleToggleFavourite}>
        <HeartIcon
          className={clsx(
            'text-gray-700 w-5 h-5 flex items-center justify-center',
            {
              'fill-gray-700': isFavourite,
            },
          )}
        />
      </button>
      {isShowVideoButton ? (
        <button
          tabIndex={0}
          className={clsx('h-10 w-10 flex items-center justify-center')}
          onKeyDown={(event) => handleKeyPress(event, handlePlayVideo)}
          aria-label='Action buttons'
          onClick={handlePlayVideo}>
          <PlayIcon
            className={clsx(
              'text-gray-700 w-5 h-5 flex items-center justify-center',
              '!w-3 !h-4',
            )}
          />
        </button>
      ) : null}
      {isShowFileButton ? (
        <Link
          tabIndex={0}
          className={clsx('h-10 w-10 flex items-center justify-center')}
          target='_blank'
          aria-label='Action buttons'
          href={productFileUrl || '/'}>
          <NoteBlankIcon
            className={clsx(
              'text-gray-700 w-5 h-5 flex items-center justify-center',
            )}
          />
        </Link>
      ) : null}
    </div>
  );
};

export default ActionBar;
