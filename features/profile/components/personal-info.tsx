import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { PersonalInfoForm } from '@/components/form/personal-info-form';
import { Button } from '@/components/ui/button';
import { colors } from '@/constants';
import { Profile } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEditProfile } from '../api/use-editi-profile';
import { profileSchema } from '../schema';
import { ProjectInfoDisplay } from './project-info-display';

type Props = {
  profile: Profile;
};

export const PersonalInfo = ({ profile }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync } = useEditProfile();
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
  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    await mutateAsync(
      {
        json: {
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
        param: { profileId: profile.$id },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };
  return (
    <div className="p-5">
      <div className="  px-8 py-5 mt-4 border border-iconGrey/30  rounded-md">
        <FlexBox
          justifyContent={'space-between'}
          alignItems={'center'}
          className="mb-6"
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
        {isEditing ? (
          <PersonalInfoForm
            isEditing={isEditing}
            onSubmit={onSubmit}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        ) : (
          <ProjectInfoDisplay profile={profile} />
        )}
      </div>
    </div>
  );
};
