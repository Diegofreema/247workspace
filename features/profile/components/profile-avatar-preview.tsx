import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { ProfileAvatar } from '@/components/ui/profile-avatar';
import { colors } from '@/constants';
import { Profile } from '@/types';
import { Button, FileUpload } from '@chakra-ui/react';
import React from 'react';

type Props = {
  profile: Profile;
};

export const ProfileAvatarPreview = ({ profile }: Props) => {
  return (
    <FlexBox px={8} py={5} alignItems={'center'} gap={2}>
      <ProfileAvatar
        name={profile.name}
        imageUrl={profile.avatarUrl}
        className="w-[100px] h-[100px]"
      />
      <div className="gap-x-2">
        <FileUpload.Root
          maxFiles={1}
          maxFileSize={5242880}
          accept={['image/jpeg', 'image/png']}
        >
          <FileUpload.HiddenInput />
          <FileUpload.Trigger asChild>
            <Button
              variant="outline"
              size="sm"
              color={colors.black}
              border="1px solid black"
              p={2}
            >
              Upload new photo
            </Button>
          </FileUpload.Trigger>
          <FileUpload.List />
        </FileUpload.Root>
        <CustomText color="black">
          Jpg, Jpeg or PNG is allowed, up to 5mb
        </CustomText>
      </div>
    </FlexBox>
  );
};
