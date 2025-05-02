'use client';
import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { ProfileAvatar } from '@/components/ui/profile-avatar';
import { colors } from '@/constants';
import { Profile } from '@/types';
import {
  Button,
  FileUpload,
  Float,
  IconButton,
  useFileUploadContext,
} from '@chakra-ui/react';
import React from 'react';
import { LuX } from 'react-icons/lu';
import { useEditProfile } from '../api/use-editi-profile';
import { useProfileId } from '@/hooks/use-profile-id';
import { IconArrowBack, IconArrowLeft } from '@tabler/icons-react';
import { useTransitionRouter } from 'next-view-transitions';

type Props = {
  profile: Profile;
};

export const ProfileAvatarPreview = ({ profile }: Props) => {
  const router = useTransitionRouter();
  const onBack = () => {
    router.back();
  };
  return (
    <>
      <div className="px-8">
        <IconButton onClick={onBack}>
          <IconArrowLeft color={'black'} size={30} />
        </IconButton>
      </div>
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
                Choose new photo
              </Button>
            </FileUpload.Trigger>
            <FileUploadList />
          </FileUpload.Root>
          <CustomText color="black">
            Jpg, Jpeg or PNG is allowed, up to 5mb
          </CustomText>
        </div>
      </FlexBox>
    </>
  );
};

const FileUploadList = () => {
  const fileUpload = useFileUploadContext();
  const profileId = useProfileId();

  const { mutateAsync, isPending } = useEditProfile();
  const files = fileUpload.acceptedFiles;
  console.log(files[0]);

  if (files.length === 0) return null;
  const onUpdate = async () => {
    await mutateAsync(
      {
        param: { profileId },
        form: { image: files[0] },
      },
      {
        onSuccess: () => {
          fileUpload.clearFiles();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
  return (
    <FileUpload.ItemGroup>
      {files.map((file) => (
        <FileUpload.Item
          w="auto"
          boxSize="20"
          p="2"
          file={file}
          key={file.name}
        >
          <FileUpload.ItemPreviewImage />
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
      {files.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          color={colors.black}
          border="1px solid black"
          p={2}
          width={'fit'}
          disabled={isPending}
          onClick={onUpdate}
          loading={isPending}
          loadingText="Updating..."
        >
          Update
        </Button>
      )}
    </FileUpload.ItemGroup>
  );
};
