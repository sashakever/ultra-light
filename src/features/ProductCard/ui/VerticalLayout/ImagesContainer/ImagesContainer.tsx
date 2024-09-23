import {Collection} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {FC} from 'react';

import {NoImage} from '@shared/assets';
import {ImageType} from '@shared/types';

type Props = {
  className?: string;
  handle: string;
  collection?: Collection;
  images: ImageType[];
  priorityLoading?: boolean;
};

const ImagesContainer: FC<Props> = ({
  className = '',
  handle,
  collection,
  images,
  priorityLoading = false,
}) => {
  const productLink = collection
    ? {
        pathname: `/products/${handle}`,
        query: {
          'from-collection': `${collection?.handle}:::${collection.title}`,
        },
      }
    : `/products/${handle}`;

  return (
    <Link
      className={clsx('relative w-full aspect-square', className)}
      href={productLink}>
      {images.length ? (
        images.map((img) => (
          <Image
            key={img?.id || collection?.handle}
            className={clsx(
              'absolute top-0 left-0 w-full h-full object-cover transition-all duration-300',
              {
                'first:group-hover:opacity-0 last:group-hover:opacity-100 last:opacity-0':
                  images.length > 1,
              },
            )}
            src={img?.url || NoImage.src}
            width={img?.width || NoImage.width}
            height={img?.height || NoImage.height}
            alt={handle}
            priority={priorityLoading}
          />
        ))
      ) : (
        <Image
          className={clsx(
            'absolute top-0 left-0 w-full h-full object-cover transition-all duration-300',
            {
              'first:group-hover:opacity-0 last:group-hover:opacity-100 last:opacity-0':
                images.length > 1,
            },
          )}
          src={NoImage.src}
          width={NoImage.width}
          height={NoImage.height}
          alt={handle}
        />
      )}
    </Link>
  );
};

export default ImagesContainer;
