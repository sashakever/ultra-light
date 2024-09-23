'use client';

import {Dialog, Transition} from '@headlessui/react';
import clsx from 'clsx';
import React, {FC, Fragment, PropsWithChildren, useEffect} from 'react';

import {deleteInertAttributeFromBodyChildrenElement} from '@shared/utils';

type Props = {
  className?: string;
  isOpen: boolean;
  isCloseButton?: boolean;
  onClose: () => void;
  openFrom?: 'right' | 'left';
  isFreeMenu?: boolean;
};
const Drawer: FC<Props & PropsWithChildren> = ({
  className = '',
  isOpen,
  onClose,
  isCloseButton = true,
  openFrom = 'left',
  children,
  isFreeMenu = false,
}) => {
  useEffect(() => {
    if (isFreeMenu && isOpen) {
      // Dialog component add attribute 'inert' for body's children elements and header becomes non-clickable
      // this function delete those attributes
      deleteInertAttributeFromBodyChildrenElement();
    }
  }, [isFreeMenu, isOpen]);

  const offScreen = {
    right: 'translate-x-full',
    left: '-translate-x-full',
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className={clsx('', {
          'top-24 z-[45] h-[calc(100%-6rem)] md:h-[calc(100vh-7.5rem)]':
            isFreeMenu,
          'top-0 z-[160]': !isFreeMenu,
        })}
        onClose={() => undefined}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-200'
          enterFrom='opacity-0 left-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <button
            type='button'
            aria-label='overlay'
            className={clsx(
              'fixed inset-0 block bg-white bg-opacity-80 [backdrop-filter:blur(37px)]',
              {
                'rem:top-[165px] md:top-20 z-[45] h-[calc(100vh-9.5rem)] md:h-[calc(100vh-5rem)] md:hidden':
                  isFreeMenu,
                'top-0 z-[160] h-full': !isFreeMenu,
              },
            )}
            onClick={onClose}
          />
        </Transition.Child>

        <div
          className={clsx(
            'fixed flex max-w-full',
            {
              'right-0': openFrom === 'right',
              'left-0': openFrom === 'left',
              'rem:top-[165px] md:top-20 z-[45] h-[calc(100vh-10rem)] md:h-[calc(100vh-5rem)] md:hidden':
                isFreeMenu,
              'top-0 z-[160] h-full': !isFreeMenu,
            },
            className,
          )}>
          <Transition.Child
            as={Fragment}
            enter='transform transition ease-in-out duration-200'
            enterFrom={offScreen[openFrom]}
            enterTo='translate-x-0'
            leave='transform transition ease-in-out duration-200'
            leaveFrom='translate-x-0'
            leaveTo={offScreen[openFrom]}>
            <Dialog.Panel
              className={clsx(
                'relative h-full w-full bg-white text-left align-middle',
                'bg-contrast transform shadow-xl transition-all',
              )}>
              {children}
              {isCloseButton ? (
                <button
                  type='button'
                  className='absolute right-4 top-4'
                  onClick={onClose}>
                  Close
                </button>
              ) : null}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Drawer;
