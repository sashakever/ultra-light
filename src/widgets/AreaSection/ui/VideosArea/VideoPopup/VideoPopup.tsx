import {Dialog, Transition} from '@headlessui/react';
import clsx from 'clsx';
import React, {FC, Fragment, useEffect, useRef, useState} from 'react';

import {CloseIcon} from '@widgets/AreaSection/assets';

type RootState = {
  videoPopupInfo: {
    isOpen: boolean;
    url: null | string;
  };
  handleCloseVideo: () => void;
};

const VideoPopup: FC<RootState> = ({videoPopupInfo, handleCloseVideo}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (videoPopupInfo.isOpen && isLoaded) {
      setIsShow(true);
    }
    if (!videoPopupInfo.isOpen) {
      setIsShow(false);
      setIsLoaded(false);
    }
  }, [videoPopupInfo, isLoaded]);

  const aspectRatio = videoRef.current
    ? videoRef.current.videoWidth / videoRef.current.videoHeight
    : 'auto';

  const onClose = () => {
    setIsShow(false);
    handleCloseVideo();
  };

  return (
    <Transition appear show={videoPopupInfo.isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-[200]' onClose={onClose}>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center cursor-pointer'>
            <Dialog.Panel
              className={clsx(
                'relative w-auto h-auto rem:min-w-[200px] rem:min-h-[200px] transform overflow-hidden',
                'text-left align-middle shadow-xl',
              )}>
              {videoPopupInfo.url ? (
                <video
                  ref={videoRef}
                  loop
                  autoPlay
                  playsInline
                  preload='auto'
                  controls={false}
                  muted
                  className={clsx('relative object-cover z-20 md:rounded-md', {
                    'block w-[90vw] md:w-auto md:h-[80vh]': isShow,
                    'hidden rem:w-[200px] rem:h-[200px]': !isShow,
                  })}
                  src={videoPopupInfo.url}
                  onLoadedData={() => setIsLoaded(true)}
                  style={{aspectRatio}}
                />
              ) : null}
              {isShow ? (
                <button
                  tabIndex={-1}
                  aria-label='close Videopopup'
                  onClick={handleCloseVideo}
                  className={clsx(
                    'absolute cursor-pointer top-0 right-0 w-10 h-10 md:w-8 md:h-8 bg-white bg-opacity-40',
                    'flex items-center justify-center z-40',
                  )}>
                  <CloseIcon className='w-8 h-8 text-gray-900' />
                </button>
              ) : null}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default VideoPopup;
