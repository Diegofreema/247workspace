import { Suspense } from 'react';

import { CreateProject } from '../buttons/create-project';
import { FlexBox } from '../custom/flex-box';
import { ReusableSkeleton } from '../skeletons/link-skeleton';
import { SearchInput } from './search-input';
import { UserAvatarAction } from './user-avatar-action';
import { SidebarBtn } from './sidebar-btn';
import { Box } from '@chakra-ui/react';

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
          <CreateProject width="fit-content" />
        </FlexBox>
      </Suspense>
      <UserAvatarAction />
    </FlexBox>
  );
};
