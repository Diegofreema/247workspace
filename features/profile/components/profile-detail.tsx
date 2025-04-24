import { Profile } from '@/types';
import { GridItem } from '@chakra-ui/react';
import { ProfileAvatarPreview } from './profile-avatar-preview';
import { Separator } from '@/components/ui/separator';
import { PersonalInfo } from './personal-info';
import { Bio } from './bio';

type Props = {
  profile: Profile;
};

export const ProfileDetail = ({ profile }: Props) => {
  return (
    <GridItem
      shadow={'sm'}
      colSpan={{ base: 1, md: 3 }}
      gap={4}
      borderRadius={5}
    >
      <ProfileAvatarPreview profile={profile} />
      <Separator className="bg-iconGrey/30" />
      <PersonalInfo profile={profile} />
      <Bio profile={profile} />
    </GridItem>
  );
};
