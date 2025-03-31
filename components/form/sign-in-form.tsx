'use client';

import { Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'next-view-transitions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@chakra-ui/react';
import {} from '../custom/custom-button';
import { FlexBox } from '../custom/flex-box';
import { CustomText } from '../custom/title';
import { FormInput } from './form-input';
import { FormSeparator } from './form-separator';

import { colors } from '@/constants';
import { SignInValidator } from '@/utils/validators';
import { SocialLogin } from '../buttons/social-login';
import { useLogin } from '../features/auth/api/use-login';
import { toaster } from '../ui/toaster';

export const SignInForm = () => {
  const { mutateAsync } = useLogin();
  const [type, setType] = useState<'password' | 'text'>('password');
  const togglePassword = () =>
    setType((prev) => (prev === 'password' ? 'text' : 'password'));
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
    reset,
  } = useForm<z.infer<typeof SignInValidator>>({
    resolver: zodResolver(SignInValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof SignInValidator>) => {
    const response = await mutateAsync({ json: values });
    if (!response.success) {
      toaster.create({
        title: 'Error',
        description: response.errorMessage,
        type: 'error',
      });
      return;
    }
    reset();

    toaster.create({
      title: 'Success',
      description: 'Welcome back',
      type: 'success',
    });
  };
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="4" align="flex-start" minW="100%">
        <FormInput
          label="Email"
          placeholder="Enter your email"
          register={register}
          errors={errors}
          name="email"
          disabled={isSubmitting}
          required
        />
        <FormInput
          label="Password"
          placeholder="********"
          register={register}
          errors={errors}
          name="password"
          password
          type={type}
          togglePassword={togglePassword}
          disabled={isSubmitting}
          required
        />
        <Link
          href="/forgot-password"
          className="font-bold text-purple self-end text-[14px] sm:text-[16px]"
        >
          Forgot password
        </Link>
        <Button
          bg={colors.purple}
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          width="100%"
        >
          Sign in
        </Button>
        <FormSeparator />
        <SocialLogin isSubmitting={isSubmitting} />
        <FlexBox justifyContent={'center'} width="100%" gap={1} mt={10}>
          <CustomText className="text-black">
            Don&apos;t have an Account?
          </CustomText>
          <Link
            href="/sign-up"
            className="font-medium text-purple self-end text-[14px] sm:text-[16px]"
          >
            Sign up
          </Link>
        </FlexBox>
      </Stack>
    </form>
  );
};
