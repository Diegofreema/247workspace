'use client';
import { Suspense } from 'react';

import { CreateButton } from '../buttons/create-button';
import { FlexBox } from '../custom/flex-box';
import { ReusableSkeleton } from '../skeletons/link-skeleton';
import { SearchInput } from './search-input';
import { SidebarBtn } from './sidebar-btn';
import { UserAvatarAction } from './user-avatar-action';
import { SkeletonCircle } from '@chakra-ui/react';
import { useCreateProjectModalController } from '@/lib/nuqs/use-create-project';

export const NavigationHeader = () => {
  const { open } = useCreateProjectModalController();
  return (
    <FlexBox
      bg="white"
      width={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
      py={4}
      px={5}
    >
      <Suspense fallback={<ReusableSkeleton width="100%" height="15" />}>
        <SidebarBtn />
        <FlexBox alignItems={'center'} gap={4} flex={1}>
          <SearchInput />
          <CreateButton
            width="fit-content"
            text="Create a project"
            color="white"
            onClick={open}
          />
        </FlexBox>
      </Suspense>
      <Suspense fallback={<SkeletonCircle />}>
        <UserAvatarAction />
      </Suspense>
    </FlexBox>
  );
};
