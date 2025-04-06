import { FlexBox } from '@/components/custom/flex-box';
import { UserAvatarAction } from '@/components/navigation/user-avatar-action';
import { Logo } from '@/components/ui/logo';
import { colors } from '@/constants';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const StandaloneLayout = ({ children }: Props) => {
  return (
    <FlexBox bg={colors.white} flexDir={'column'}>
      <FlexBox
        className="max-w-screen-2xl w-full"
        justifyContent={'space-between'}
        mx="auto"
        p={4}
      >
        <Logo isPurple />
        <UserAvatarAction />
      </FlexBox>
      <FlexBox
        flexDir={'column'}
        minH={'100Vh'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {children}
      </FlexBox>
    </FlexBox>
  );
};

export default StandaloneLayout;
