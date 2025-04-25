'use client';

import { useCurrentUser } from '@/features/auth/api/use-current-user';
import { SkeletonCircle } from '@chakra-ui/react';
import { AvatarMenu } from './avatar-menu';

export const UserAvatarAction = () => {
  const { data, isPending, isError } = useCurrentUser();

  if (isError) {
    throw new Error('Error fetching user');
  }

  if (isPending) {
    return <SkeletonCircle size="12" />;
  }
  const { profile } = data;
  return (
    <AvatarMenu
      name={profile?.name || ''}
      email={profile?.email || ''}
      imageUrl={profile?.avatarUrl}
      profileId={profile?.$id || ''}
    />
  );
};
