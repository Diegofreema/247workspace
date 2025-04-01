'use client';
import React from 'react';
import { FlexBox } from '../custom/flex-box';
import { IconSearch } from '@tabler/icons-react';
import { Input } from '@chakra-ui/react';
import { colors } from '@/constants';

export const SearchInput = () => {
  return (
    <FlexBox
      alignItems={'center'}
      width="80%"
      border="1px solid #ccc"
      px={2}
      gap={3}
      borderRadius={8}
      hideBelow={'lg'}
      maxW={'md'}
    >
      <IconSearch size={25} color={colors.black} />
      <Input
        flex={1}
        borderColor={'transparent'}
        focusRingColor={'transparent'}
        placeholder="Search..."
        color={colors.black}
      />
    </FlexBox>
  );
};
