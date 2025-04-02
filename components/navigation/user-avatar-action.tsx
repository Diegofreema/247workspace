import { Suspense } from 'react';
import { getLoggedInUser } from '../../features/auth/actions';
import { AvatarMenu } from './avatar-menu';
import { SkeletonCircle } from '@chakra-ui/react';

export const UserAvatarAction = async () => {
  const user = await getLoggedInUser();
  if (!user) return <SkeletonCircle size="12" />;
  return (
    <Suspense fallback={<SkeletonCircle size="12" />}>
      <AvatarMenu name={user.name} email={user.email} />
    </Suspense>
  );
};
