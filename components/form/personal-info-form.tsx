import { Stack } from '@chakra-ui/react';
import React from 'react';
import { FormInput } from './form-input';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { z } from 'zod';
import { profileSchema } from '@/features/profile/schema';
import { Button } from '../ui/button';

type Props = {
  register: UseFormRegister<z.infer<typeof profileSchema>>;
  errors: FieldErrors<z.infer<typeof profileSchema>>;
  isEditing: boolean;
  isSubmitting: boolean;
  handleSubmit: UseFormHandleSubmit<z.infer<typeof profileSchema>>;
  onSubmit: (data: z.infer<typeof profileSchema>) => void;
};

export const PersonalInfoForm = ({
  register,
  errors,
  isEditing,
  handleSubmit,
  isSubmitting,
  onSubmit,
}: Props) => {
  return (
    <Stack gap={4} mt={5}>
      <FormInput
        label="Name"
        placeholder="Enter your name"
        register={register}
        errors={errors}
        name="name"
        disabled={!isEditing}
        required
      />
      <FormInput
        label="Email"
        placeholder="Enter your email"
        register={register}
        errors={errors}
        name="email"
        disabled={!isEditing}
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
      <FormInput
        label="Phone number"
        placeholder="08161667890"
        register={register}
        errors={errors}
        name="phone"
        disabled={!isEditing}
      />

      {isEditing && (
        <Button
          onClick={handleSubmit(onSubmit)}
          size={'default'}
          className="bg-purple text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save changes'}
        </Button>
      )}
    </Stack>
  );
};

const data = [
  { label: 'CEO', value: 'CEO' },
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
