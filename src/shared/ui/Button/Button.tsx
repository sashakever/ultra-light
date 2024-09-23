'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ElementType,
  FC,
  PropsWithChildren,
  ReactElement,
} from 'react';

import {ButtonVariantEnum} from './types';

type Props = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
> & {
  className?: string;
  componentType?: ElementType;
  href?: string;
  openInAnotherTab?: boolean;
  variant?: ButtonVariantEnum;
  icon?: ReactElement;
  hasCustomIconHeight?: boolean;
};

const Button: FC<Props & PropsWithChildren> = ({
  className,
  componentType = 'button',
  href = '',
  openInAnotherTab = false,
  variant = ButtonVariantEnum.PRIMARY,
  icon = null,
  children,
  hasCustomIconHeight = false,
  ...props
}) => {
  const Component = href ? Link : componentType;

  const VARIANT_MAPS: Record<ButtonVariantEnum, string> = {
    [ButtonVariantEnum.PRIMARY]: clsx(
      'bg-tone-700 enabled:hover:bg-tone-600 px-3',
    ),
    [ButtonVariantEnum.SECONDARY]: clsx(
      'bg-gray-700 enabled:hover:bg-gray-500 px-3 md:px-4 disabled:bg-gray-300',
    ),
    [ButtonVariantEnum.WHITE]: clsx(
      'bg-white enabled:hover:bg-gray-200 px-3 md:px-4',
    ),
    [ButtonVariantEnum.OUTLINE]: clsx(
      'bg-white enabled:hover:bg-gray-200 border border-gray-700 px-3 md:px-4',
    ),
    [ButtonVariantEnum.GRAY]: clsx(
      'bg-gray-500 enabled:hover:bg-gray-700 px-3 md:px-4',
    ),
    [ButtonVariantEnum.TONE]: clsx(
      'bg-gray-800 enabled:hover:bg-tone-300 px-3 md:px-4',
    ),
    [ButtonVariantEnum.INVISIBLE]: '',
  };

  const VARIANT_TITLE_MAPS: Record<ButtonVariantEnum, string> = {
    [ButtonVariantEnum.PRIMARY]: clsx('text-white'),
    [ButtonVariantEnum.SECONDARY]: clsx('text-white'),
    [ButtonVariantEnum.WHITE]: '',
    [ButtonVariantEnum.TONE]: '',
    [ButtonVariantEnum.OUTLINE]: '',
    [ButtonVariantEnum.GRAY]: clsx('text-white'),
    [ButtonVariantEnum.INVISIBLE]: clsx(
      'text-tone-700 enabled:hover:text-gray-700',
    ),
  };

  return (
    <Component
      className={clsx(
        'flex rem:min-h-[32px] md:rem:min-h-[40px] gap-3 lg:gap-2 items-center justify-center',
        'transition-all duration-300',
        '',
        VARIANT_MAPS[variant],
        className,
      )}
      {...props}
      href={href}
      target={openInAnotherTab ? '_blank' : '_self'}>
      {icon ? (
        <div
          className={clsx('block md:hidden lg:block', {
            'overflow-hidden max-h-5': !hasCustomIconHeight,
          })}>
          {icon}
        </div>
      ) : null}

      {children ? (
        <span
          className={clsx(
            'text-xs md:text-s font-medium shrink-0',
            VARIANT_TITLE_MAPS[variant],
          )}>
          {children}
        </span>
      ) : null}
    </Component>
  );
};

export default Button;
