'use client';
import { createListCollection, Stack } from '@chakra-ui/react';
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
import { SignUpValidator } from '@/utils/validators';
import { SocialLogin } from '../buttons/social-login';

export const SignUpForm = () => {
  const [type, setType] = useState<'password' | 'text'>('password');
  const [type2, setType2] = useState<'password' | 'text'>('password');
  const togglePassword = () =>
    setType((prev) => (prev === 'password' ? 'text' : 'password'));
  const togglePassword2 = () =>
    setType2((prev) => (prev === 'password' ? 'text' : 'password'));
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
    watch,
  } = useForm<z.infer<typeof SignUpValidator>>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      role: '',
    },
  });
  const { role } = watch();
  console.log(role);

  const onSubmit = async (values: z.infer<typeof SignUpValidator>) => {
    console.log(values);
  };
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="4" align="flex-start" minW="100%">
        <FormInput
          label="Full name"
          placeholder="John Doe"
          register={register}
          errors={errors}
          name="fullName"
          disabled={isSubmitting}
          required
        />
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
          label="Role"
          placeholder="Select a role"
          register={register}
          errors={errors}
          name="role"
          disabled={isSubmitting}
          select
          data={data}
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
        <FormInput
          label="Confirm password"
          placeholder="********"
          register={register}
          errors={errors}
          name="confirmPassword"
          password
          type={type2}
          togglePassword={togglePassword2}
          disabled={isSubmitting}
          required
        />

        <Button bg={colors.purple} type="submit" disabled={isSubmitting}>
          Sign Up
        </Button>
        <FormSeparator />
        <SocialLogin isSubmitting={isSubmitting} />
        <FlexBox justifyContent={'center'} width="100%" gap={1} mt={10}>
          <CustomText className="text-black">
            Already have an Account?
          </CustomText>
          <Link href="/sign-in" className="font-medium text-purple self-end">
            Sign in
          </Link>
        </FlexBox>
      </Stack>
    </form>
  );
};

const data = createListCollection({
  items: [
    { label: 'Project manager', value: 'project manager' },
    { label: 'Developer', value: 'developer' },
    { label: 'UI/UX Designer', value: 'ui/ux designer' },
    { label: 'Customer Support', value: 'customer support' },
    { label: 'UI/UX Designer', value: 'ui/ux designer' },
    { label: 'Others', value: 'others' },
  ],
});
