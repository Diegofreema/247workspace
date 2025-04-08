'use client';
import { Box } from '@chakra-ui/react';
import React from 'react';

import { colors } from '@/constants';

import { Member } from './member';

export const MemberList = () => {
  return (
    <Box bg={colors.white} p={4} flex={1} minHeight={'85vh'}>
      <Member />
    </Box>
  );
};
