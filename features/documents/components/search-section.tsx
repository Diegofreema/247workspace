import { Button } from '@/components/custom/custom-button';
import { FlexBox } from '@/components/custom/flex-box';
import { SearchInput } from '@/components/navigation/search-input';
import { colors } from '@/constants';
import React from 'react';

export const SearchSection = () => {
  return (
    <FlexBox alignItems={'center'} justifyContent={'space-between'}>
      <SearchInput placeholder="Search by document name" />
      <Button
        px={4}
        py={1}
        bg={colors.purple}
        width={'fit'}
        color={colors.white}
        fontSize={'12px'}
        fontWeight={'bold'}
      >
        Upload document
      </Button>
    </FlexBox>
  );
};
