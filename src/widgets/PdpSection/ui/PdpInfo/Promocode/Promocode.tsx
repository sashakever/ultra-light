import clsx from 'clsx';
import React, {FC, MouseEventHandler, useRef, useState} from 'react';

import {useAppSelector} from '@base/store';

import {ArrowRight, ClockIcon, TicketIcon} from '@widgets/PdpSection/assets';

import {InnerRoundedCorners} from '@shared';
import {RoundedBackgroundEnum, RoundedPositionEnum} from '@shared/types';
import {PromoCodeToast} from '@shared/ui/PromoCodeToast';
import {copyTextToClipboard} from '@shared/utils';

type Props = {
  goingFastTitle: string | null;
  extraTitle: string | null;
  useCodeTitle: string | null;
  discountCodeText: string | null;
  promocodeCopyText: string | null;
};

const Promocode: FC<Props> = ({
  goingFastTitle,
  extraTitle,
  useCodeTitle,
  discountCodeText,
  promocodeCopyText,
}) => {
  const code: string | null = discountCodeText;
  const [isCodeCopied, setIsCodeCopied] = useState<boolean>(false);
  const discountCodeRef = useRef<HTMLButtonElement>(null);
  const lang = useAppSelector((state) => state.header.lang);

  const handleCopyCodeToClipboard = () => {
    const discountCode = discountCodeRef.current?.dataset.discountCode || '';
    copyTextToClipboard(discountCode)
      .then(() => setIsCodeCopied(true))
      .catch(() => {});
  };

  const handleCopyCodeClick: MouseEventHandler<HTMLButtonElement> = () => {
    handleCopyCodeToClipboard();
    setTimeout(() => {
      setIsCodeCopied(false);
    }, 2000);
  };

  return (
    <div className='flex flex-col gap-2 md:gap-4 relative'>
      {goingFastTitle ? (
        <div className='flex gap-2 md:gap-4 justify-center items-center p-2 md:p-4 bg-tone-100 text-tone-700'>
          <ClockIcon className='w-4 h-4 md:w-5 md:h-5' />
          <div className='text-xs md:text-s font-medium'>{goingFastTitle}</div>
        </div>
      ) : null}
      <div className='flex overflow-hidden'>
        <div
          className={clsx(
            'flex gap-2 justify-center items-center px-2 py-5 bg-tone-100 text-tone-700 w-[45%]',
            'md:gap-4 md:justify-start md:px-4 md:py-6 md:w-2/5',
          )}>
          <TicketIcon />
          <div className='text-xs md:text-s font-medium'>{extraTitle}</div>
        </div>
        <InnerRoundedCorners
          roundedPosition={
            lang?.locale === 'en'
              ? RoundedPositionEnum.Left
              : RoundedPositionEnum.Right
          }
          roundedBackground={RoundedBackgroundEnum.White}
          className={clsx(
            'bg-tone-700 text-gray-100 hover:bg-tone-600 group-hover:bg-tone-600',
            'w-[55%] md:w-3/5 cursor-pointer transition-all duration-300',
          )}>
          <button
            ref={discountCodeRef}
            data-discount-code={code}
            onClick={handleCopyCodeClick}
            className={clsx(
              'flex justify-between items-center w-full h-full px-2 pl-4 md:px-5',
            )}>
            <div className='flex flex-col md:flex-row md:items-center justify-between w-3/4'>
              <div className='text-xs md:text-s font-medium'>
                {useCodeTitle}
              </div>
              <div className='text-m md:text-xl font-medium'>{code}</div>
            </div>
            <div className='w-1/4 flex justify-end'>
              <ArrowRight className='rtl:-scale-x-100' />
            </div>
          </button>
        </InnerRoundedCorners>
        {promocodeCopyText ? (
          <PromoCodeToast
            isCodeCopied={isCodeCopied}
            text={promocodeCopyText}
            className={clsx(
              '-top-8 ltr:right-0 rtl:left-0 pointer-events-none',
              'w-full md:w-[calc(60%-8px)]',
            )}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Promocode;
