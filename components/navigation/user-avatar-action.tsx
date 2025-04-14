import { Suspense } from 'react';
import { getLoggedInUser } from '../../features/auth/queries';
import { AvatarMenu } from './avatar-menu';
import { SkeletonCircle } from '@chakra-ui/react';
import { getProfile } from '@/features/workspaces/queries';

export const UserAvatarAction = async () => {
  const user = await getLoggedInUser();
  const profile = await getProfile(user?.$id!);

  if (!user) return <SkeletonCircle size="12" />;
  return (
    <Suspense fallback={<SkeletonCircle size="12" />}>
      <AvatarMenu
        name={profile?.name!}
        email={profile?.email!}
        imageUrl={profile?.avatarUrl}
      />
    </Suspense>
  );
};
