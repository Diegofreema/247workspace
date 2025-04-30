'use client';
import React from 'react';
import { FlexBox } from '../custom/flex-box';
import { IconSearch } from '@tabler/icons-react';
import { IconButton, Input } from '@chakra-ui/react';
import { colors } from '@/constants';
import { X } from 'lucide-react';

type Props = {
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  clearValue: () => void;
};

export const SearchInput = ({
  placeholder = 'Search...',
  clearValue,
  setValue,
  value,
}: Props) => {
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
        placeholder={placeholder}
        color={colors.black}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <IconButton onClick={clearValue}>
          <X color={colors.black} />
        </IconButton>
      )}
    </FlexBox>
  );
};
