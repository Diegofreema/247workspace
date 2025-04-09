'use client';
import { Button, createListCollection, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'next-view-transitions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FlexBox } from '../custom/flex-box';
import { CustomText } from '../custom/title';
import { FormInput } from './form-input';
import { FormSeparator } from './form-separator';

import { colors } from '@/constants';
import { SignUpValidator } from '@/utils/validators';
import { useRouter } from 'next/navigation';
import { useRegister } from '../../features/auth/api/use-register';
import { toaster } from '../ui/toaster';

export const SignUpForm = () => {
  const { mutateAsync } = useRegister();
  const [type, setType] = useState<'password' | 'text'>('password');
  const router = useRouter();
  const togglePassword = () =>
    setType((prev) => (prev === 'password' ? 'text' : 'password'));

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
    reset,
  } = useForm<z.infer<typeof SignUpValidator>>({
    defaultValues: {
      email: '',
      password: '',

      fullName: '',
    },
    resolver: zodResolver(SignUpValidator),
  });

  const onSubmit = async (values: z.infer<typeof SignUpValidator>) => {
    const response = await mutateAsync({ json: values });
    if (!response.success) {
      toaster.create({
        title: 'Error',
        description: response.errorMessage,
        type: 'error',
      });
      return;
    }
    router.push('/');
    reset();
    toaster.create({
      title: 'Success',
      description: 'Account created successfully',
      type: 'success',
    });
  };
  return (
    <div className="w-full">
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

        <Button
          bg={colors.purple}
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          width="100%"
          color="white"
        >
          Sign Up
        </Button>
        <FormSeparator />
        {/* <SocialLogin isSubmitting={isSubmitting} /> */}
        <FlexBox justifyContent={'center'} width="100%" gap={1} mt={10}>
          <CustomText className="text-black">
            Already have an Account?
          </CustomText>
          <Link
            href="/sign-in"
            className="font-medium text-purple self-end text-[14px] sm:text-[16px]"
          >
            Sign in
          </Link>
        </FlexBox>
      </Stack>
    </div>
  );
};

const data = createListCollection({
  items: [
    { label: 'CTO', value: 'CTO' },
    { label: 'Project manager', value: 'Project manager' },
    { label: 'Developer', value: 'Developer' },
    { label: 'UI/UX Designer', value: 'UI/UX Designer' },
    { label: 'Customer Support', value: 'Customer support' },
    { label: 'Others', value: 'others' },
  ],
});
