import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { Button } from '@/components/ui/button';
import { colors } from '@/constants';
import { Profile } from '@/types';
import { Stack, Textarea } from '@chakra-ui/react';
import { Pencil, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useEditProfile } from '../api/use-editi-profile';

type Props = {
  profile: Profile;
};

export const Bio = ({ profile }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(profile.description);
  const { mutateAsync, isPending } = useEditProfile();
  const handleSave = async () => {
    await mutateAsync(
      { form: { bio: value }, param: { profileId: profile.$id } },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };
  return (
    <div className="p-4">
      <div className="border border-iconGrey/30 rounded-md p-6">
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
            Bio
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
        <Stack>
          {isEditing ? (
            <div className="flex flex-col gap-y-4">
              <Textarea
                placeholder="Update your bio..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={4}
                disabled={isPending}
                className="text-black p-2"
              />
              <Button
                onClick={handleSave}
                size={'sm'}
                disabled={isPending}
                className="w-fit ml-auto"
              >
                {isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          ) : (
            <div className="text-black">
              {profile.bio || <span>No description set</span>}
            </div>
          )}
        </Stack>
      </div>
    </div>
  );
};
