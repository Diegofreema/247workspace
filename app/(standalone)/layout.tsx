import { FlexBox } from '@/components/custom/flex-box';
import { colors } from '@/constants';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const StandaloneLayout = ({ children }: Props) => {
  return (
    <FlexBox
      flexDir={'column'}
      minH={'100Vh'}
      justifyContent={'center'}
      alignItems={'center'}
      bg={colors.white}
    >
      {children}
    </FlexBox>
  );
};

export default StandaloneLayout;
