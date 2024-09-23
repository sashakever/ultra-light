'use client';

import clsx from 'clsx';
import React, {FC, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {useRegisterMutation} from '@base/api';
import {useAppSelector} from '@base/store';

import {EMAIL_PATTERN} from '@shared/constants';
import {
  AccountCheckbox,
  AccountInput,
  Button,
  ButtonVariantEnum,
  RenderErrors,
} from '@shared/ui';
import {mapErrors} from '@shared/utils';

type Props = {
  className?: string;
  handleSuccessful: (email: string) => void;
};

type FormValuesType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  privacyPolicy: boolean;
};

const SignUpForm: FC<Props> = ({className = '', handleSuccessful}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorsResult, setErrorsResult] = useState<string[]>([]);
  const {systemDataset} = useAppSelector((state) => state.layout);

  const [register] = useRegisterMutation();

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<FormValuesType>();

  const onSubmit = (data: FormValuesType) => {
    register({...data})
      .unwrap()
      .then(() => {
        handleSuccessful(data.email);
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
        setErrorsResult(mapErrors(error?.data?.errors));
      });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={clsx(className)} onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-4'>
        <Controller
          render={({field}) => (
            <AccountInput
              inputRef={field.ref}
              className='mb-2'
              label={
                systemDataset?.RegisterDataset?.FirstNameInput?.Label || ''
              }
              placeholder={
                systemDataset?.RegisterDataset?.FirstNameInput?.Placeholder ||
                ''
              }
              inputValue={field.value}
              onChangeValue={field.onChange}
              error={errors.firstName}
            />
          )}
          name='firstName'
          control={control}
          rules={{
            required: {
              value: true,
              message: systemDataset?.FormErrors?.Required || '',
            },
          }}
        />
        <Controller
          render={({field}) => (
            <AccountInput
              inputRef={field.ref}
              className='mb-2'
              label={systemDataset?.RegisterDataset?.LastNameInput?.Label || ''}
              placeholder={
                systemDataset?.RegisterDataset?.LastNameInput?.Placeholder || ''
              }
              inputValue={field.value}
              onChangeValue={field.onChange}
              error={errors.lastName}
            />
          )}
          rules={{
            required: {
              value: false,
              message: systemDataset?.FormErrors?.Required || '',
            },
          }}
          name='lastName'
          control={control}
        />
      </div>
      <Controller
        render={({field}) => (
          <AccountInput
            inputRef={field.ref}
            className='mb-2'
            label={systemDataset?.RegisterDataset?.EmailInput?.Label || ''}
            placeholder={
              systemDataset?.RegisterDataset?.EmailInput?.Placeholder || ''
            }
            inputValue={field.value}
            onChangeValue={field.onChange}
            error={errors.email}
          />
        )}
        name='email'
        control={control}
        rules={{
          required: {
            value: true,
            message: systemDataset?.FormErrors?.Required || '',
          },
          pattern: {
            value: EMAIL_PATTERN,
            message: systemDataset?.FormErrors?.Email || '',
          },
        }}
      />
      <Controller
        render={({field}) => (
          <AccountInput
            inputRef={field.ref}
            type='password'
            className='mb-4'
            label={systemDataset?.RegisterDataset?.PasswordInput?.Label || ''}
            placeholder={
              systemDataset?.RegisterDataset?.PasswordInput?.Placeholder || ''
            }
            inputValue={field.value}
            onChangeValue={field.onChange}
            error={errors.password}
          />
        )}
        name='password'
        control={control}
        rules={{
          required: {
            value: true,
            message: systemDataset?.FormErrors?.Required || '',
          },
        }}
      />

      <Button
        className='w-full mb-4 rounded-full'
        variant={ButtonVariantEnum.PRIMARY}
        type='submit'>
        {systemDataset?.RegisterDataset?.SignUpButtonTitle}
      </Button>

      <Controller
        render={({field}) => (
          <AccountCheckbox
            className='mb-2'
            inputRef={field.ref}
            onChange={field.onChange}
            label={
              systemDataset?.RegisterDataset?.AcceptPolicyText || 'I accept the'
            }
            link={
              systemDataset?.RegisterDataset?.PrivacyPolicyLink?.Link || '/'
            }
            linkLabel={
              systemDataset?.RegisterDataset?.PrivacyPolicyLink?.Title ||
              'Privacy Policy'
            }
            isSelected={field.value}
            error={errors.privacyPolicy}
          />
        )}
        name='privacyPolicy'
        control={control}
        rules={{
          required: {
            value: true,
            message: systemDataset?.FormErrors?.Required || '',
          },
        }}
      />

      <RenderErrors errorsResult={errorsResult} />
    </form>
  );
};

export default SignUpForm;
