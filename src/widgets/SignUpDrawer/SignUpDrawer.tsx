'use client';

import clsx from 'clsx';
import React, {FC} from 'react';

import {SignUpForm} from './SignUpForm';

import {useModal} from '@base/hooks';
import {useAppSelector} from '@base/store';

import {ModalParamsValueEnum, OpenFromEnum} from '@shared/types';
import {AccountDrawer, Button, ButtonVariantEnum} from '@shared/ui';

const SignUpDrawer: FC = () => {
  const {isOpen, closeModal} = useModal(ModalParamsValueEnum.SIGN_UP);
  const {systemDataset} = useAppSelector((state) => state.layout);

  const handleOpenSignInButtonClick = () => {
    closeModal({modalTypeValue: ModalParamsValueEnum.SIGN_IN});
  };

  const handleSuccsessful = (email: string) => {
    closeModal({
      modalTypeValue: ModalParamsValueEnum.SIGN_IN,
      paramsToAdd: {email},
    });
  };

  return (
    <AccountDrawer
      className='w-full rem:sm:w-[612px]'
      isOpen={isOpen}
      onClose={closeModal}
      closeModalText={systemDataset?.CloseButtonText || ''}
      openFrom={OpenFromEnum.RIGHT}>
      <div className='w-full h-full bg-tone-100 border border-gray-800'>
        <div
          className={clsx(
            'flex flex-col justify-between w-full sm:w-100 sm:mx-auto',
            'pb-24 pt-8 px-4 sm:pt-0 sm:px-0 h-full overflow-y-auto no-scrollbar',
          )}>
          <span className='hidden sm:block' />
          <div>
            <div className='text-2xl font-medium mb-4 sm:mb-8'>
              {systemDataset?.RegisterDataset?.Title}
            </div>
            <SignUpForm className='mb-2' handleSuccessful={handleSuccsessful} />
          </div>
          <div>
            <div className='font-supreme text-xs text-gray-500 font-normal mb-3'>
              {systemDataset?.RegisterDataset?.CustomerExistingTitle}
            </div>
            <Button
              onClick={handleOpenSignInButtonClick}
              className='w-full rounded-full'
              variant={ButtonVariantEnum.OUTLINE}>
              {systemDataset?.RegisterDataset?.SignInButtonTitle}
            </Button>
          </div>
        </div>
      </div>
    </AccountDrawer>
  );
};

export default SignUpDrawer;
