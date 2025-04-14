'use client';
import { Stack } from '@chakra-ui/react';
import React from 'react';
import { CustomText, Title } from '../custom/title';
import { colors } from '@/constants';
import { Button } from '../custom/custom-button';
import { IconExclamationCircle } from '@tabler/icons-react';

type Props = {
  message: string;
  reset: () => void;
};

export const ErrorComponent = ({ message, reset }: Props) => {
  return (
    <Stack
      gap={4}
      align="center"
      justify="center"
      display={'flex'}
      flexDir={'column'}
    >
      <IconExclamationCircle size={50} color={colors.purple} />
      <Title color={colors.black}>Something went wrong!</Title>
      <CustomText color={colors.grey}>{message}</CustomText>
      <Button onClick={reset} px={2} bg={colors.purple} width={'fit'}>
        Try again
      </Button>
    </Stack>
  );
};
