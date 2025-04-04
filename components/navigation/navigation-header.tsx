import { Suspense } from 'react';

import { CreateButton } from '../buttons/create-button';
import { FlexBox } from '../custom/flex-box';
import { ReusableSkeleton } from '../skeletons/link-skeleton';
import { SearchInput } from './search-input';
import { SidebarBtn } from './sidebar-btn';
import { UserAvatarAction } from './user-avatar-action';

export const NavigationHeader = () => {
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
          <CreateButton width="fit-content" text="Create a project" />
        </FlexBox>
      </Suspense>
      <UserAvatarAction />
    </FlexBox>
  );
};
