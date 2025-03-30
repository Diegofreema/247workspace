'use client';

import { Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'next-view-transitions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../custom/custom-button';
import { FlexBox } from '../custom/flex-box';
import { CustomText } from '../custom/title';
import { FormInput } from './form-input';
import { FormSeparator } from './form-separator';

import { colors } from '@/constants';
import { SignInValidator } from '@/utils/validators';
import { SocialLogin } from '../buttons/social-login';

export const SignInForm = () => {
  const [type, setType] = useState<'password' | 'text'>('password');
  const togglePassword = () =>
    setType((prev) => (prev === 'password' ? 'text' : 'password'));
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
  } = useForm<z.infer<typeof SignInValidator>>({
    resolver: zodResolver(SignInValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof SignInValidator>) => {
    console.log(values);
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
          className="font-bold text-purple self-end"
        >
          Forgot password
        </Link>
        <Button bg={colors.purple} type="submit">
          Sign in
        </Button>
        <FormSeparator />
        <SocialLogin isSubmitting={isSubmitting} />
        <FlexBox justifyContent={'center'} width="100%" gap={1} mt={10}>
          <CustomText className="text-black">
            Don&apos;t have an Account?
          </CustomText>
          <Link href="/sign-up" className="font-medium text-purple self-end">
            Sign up
          </Link>
        </FlexBox>
      </Stack>
    </form>
  );
};
