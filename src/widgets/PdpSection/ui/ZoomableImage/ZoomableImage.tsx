import clsx from 'clsx';
import Image from 'next/image';
import React, {FC, useRef} from 'react';
import {match} from 'ts-pattern';

import {useZoom} from '@widgets/PdpSection/hooks';

import {NoImage} from '@shared/assets';
import {ActiveMediaImageType} from '@shared/types';

type Props = {
  className?: string;
  activeImage: ActiveMediaImageType;
  onImageClick?: () => void;
};

const ZoomableImage: FC<Props> = ({
  activeImage,
  onImageClick,
  className = '',
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const {
    handleMouseMove,
    isZoomed,
    // , unZoom, zoom
  } = useZoom(imageRef);

  return (
    <div
      className={clsx(
        'relative w-4/5 h-[min-content] group overflow-hidden',
        className,
      )}
      onMouseMove={handleMouseMove}
      // onMouseEnter={zoom}
      // onMouseLeave={unZoom}
    >
      {match(activeImage)
        .with({item: null}, () => null)
        .otherwise(() => (
          <Image
            width={0}
            height={0}
            sizes='100vh'
            style={{width: '100%', height: '100%'}}
            src={activeImage.item?.url || NoImage.src}
            alt={activeImage.item?.altText || ''}
            onClick={onImageClick}
            ref={imageRef}
            priority
            className={clsx(
              'transition-transform duration-300',
              'cursor-pointer',
              //  'cursor-magnifying-glass',
              {
                'scale-200': isZoomed,
              },
            )}
          />
        ))}
    </div>
  );
};

export default ZoomableImage;
