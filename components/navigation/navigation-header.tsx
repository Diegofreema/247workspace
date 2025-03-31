import { Suspense } from 'react';
import { CreateProject } from '../buttons/create-project';
import { FlexBox } from '../custom/flex-box';
import { ReusableSkeleton } from '../skeletons/link-skeleton';
import { SearchInput } from './search-input';
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
        <FlexBox alignItems={'center'} gap={4}>
          <SearchInput />
          <CreateProject />
        </FlexBox>
      </Suspense>
      <UserAvatarAction />
    </FlexBox>
  );
};
