'use client';
import React from 'react';

import { IconSearch } from '@tabler/icons-react';
import { Input } from '@chakra-ui/react';
import { colors } from '@/constants';
import { FlexBox } from '@/components/custom/flex-box';

type Props = {
  placeholder?: string;
};

export const DocumentInput = ({ placeholder = 'Search...' }: Props) => {
  return (
    <FlexBox
      alignItems={'center'}
      width={{ base: '100%', md: '80%' }}
      border="1px solid #ccc"
      px={2}
      gap={3}
      borderRadius={8}
      maxW={'md'}
    >
      <IconSearch size={25} color={colors.black} />
      <Input
        flex={1}
        borderColor={'transparent'}
        focusRingColor={'transparent'}
        placeholder={placeholder}
        color={colors.black}
      />
    </FlexBox>
  );
};
