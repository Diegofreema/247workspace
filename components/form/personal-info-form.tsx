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
