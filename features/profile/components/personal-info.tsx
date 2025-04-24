import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { Button } from '@/components/ui/button';
import { colors } from '@/constants';
import { Profile } from '@/types';
import { Pencil, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { profileSchema } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@chakra-ui/react';
import { FormInput } from '@/components/form/form-input';

type Props = {
  profile: Profile;
};

export const PersonalInfo = ({ profile }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<z.infer<typeof profileSchema>>({
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    },
    resolver: zodResolver(profileSchema),
  });
  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    console.log(data);
  };
  return (
    <div className="p-5">
      <div className="  px-8 py-5 mt-4 border border-iconGrey/30  rounded-md">
        <FlexBox
          justifyContent={'space-between'}
          alignItems={'center'}
          className=""
        >
          <CustomText
            fontSize={{ base: 16, md: 20 }}
            fontWeight={'bold'}
            color={colors.black}
          >
            Personal information
          </CustomText>
          <Button
            onClick={() => setIsEditing((prev) => !prev)}
            size={'sm'}
            variant={'secondary'}
            className="bg-purple"
          >
            {isEditing ? (
              <XIcon className="size-4 mr-2" />
            ) : (
              <Pencil className="size-4 mr-2" />
            )}
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </FlexBox>
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
          <FormInput
            label="Bio"
            placeholder="Tell us about yourself"
            register={register}
            errors={errors}
            name="bio"
            disabled={!isEditing}
            variant="textarea"
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
      </div>
    </div>
  );
};
