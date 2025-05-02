'use client';

import { Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../custom/custom-button';
import { FormInput } from './form-input';

import { colors } from '@/constants';
import { onboardSchema } from '@/utils/validators';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useOnboard } from '@/features/auth/api/use-login';
import { toaster } from '../ui/toaster';

type Props = {
  initialValue: {
    email: string;
    name: string;
  };
};

const bio_length = 200;
export const OnboardForm = ({ initialValue }: Props) => {
  const { mutateAsync } = useOnboard();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
    reset,
    watch,
  } = useForm<z.infer<typeof onboardSchema>>({
    resolver: zodResolver(onboardSchema),
    defaultValues: {
      email: initialValue.email,
      bio: '',
      fullName: initialValue.name,
      role: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof onboardSchema>) => {
    await mutateAsync(
      { json: values },
      {
        onSuccess: ({ data }) => {
          toaster.create({
            title: 'Success',
            description: 'You have successfully onboarded',
            type: 'success',
          });
          reset();
          if (typeof window !== undefined) {
            const redirectUrl = localStorage.getItem('redirectUrl');
            if (redirectUrl) {
              router.push(redirectUrl);
            } else {
              router.push('/workspace/create-workspace');
            }
          }

          router.refresh();
          queryClient.invalidateQueries({ queryKey: ['current'] });
          queryClient.invalidateQueries({ queryKey: ['projects'] });
          queryClient.invalidateQueries({
            queryKey: ['profile', data.profileId],
          });
        },
        onError: () => {
          toaster.create({
            title: 'Error',
            description: 'Something went wrong, please try again',
            type: 'error',
          });
        },
      }
    );
  };
  const { bio } = watch();

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="4" align="flex-start" minW="100%">
        <FormInput
          label="Full name"
          placeholder="John Doe"
          register={register}
          errors={errors}
          name="fullName"
          required
        />
        <FormInput
          label="Email"
          placeholder="john@gmail.com"
          register={register}
          errors={errors}
          name="email"
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
          variant="select"
          data={data}
          required
        />
        <>
          <FormInput
            label="Bio (optional)"
            placeholder="Tell us about yourself..."
            register={register}
            errors={errors}
            name="bio"
            disabled={isSubmitting || (bio?.length || 0) >= bio_length}
            variant="textarea"
          />
          <p className="text-sm text-gray-500">
            {bio?.length}/{bio_length}
          </p>
        </>
        <Button
          bg={colors.purple}
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          width="100%"
          color="white"
        >
          Continue
        </Button>
      </Stack>
    </form>
  );
};

const data = [
  { label: 'CTO', value: 'CTO' },
  { label: 'Project manager', value: 'Project manager' },
  { label: 'Senior Developer', value: 'Senior Developer' },
  { label: 'Frontend Developer', value: 'Frontend Developer' },
  { label: 'Backend Developer', value: 'Backend Developer' },
  { label: 'Fullstack Developer', value: 'Fullstack Developer' },
  { label: 'Junior Developer', value: 'Junior Developer' },
  { label: 'Intern', value: 'Intern' },
  { label: 'UI/UX Designer', value: 'UI/UX Designer' },
  { label: 'Customer Support', value: 'Customer support' },
  { label: 'Others', value: 'others' },
];
