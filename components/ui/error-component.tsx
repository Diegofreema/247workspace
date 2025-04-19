'use client';
import { colors } from '@/constants';
import { Image, Stack } from '@chakra-ui/react';
import { Button } from '../custom/custom-button';
import { CustomText, Title } from '../custom/title';

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
      <Image
        src="/warning.png"
        alt="Error image"
        width={'auto'}
        height={'auto'}
        objectFit="cover"
      />
      <Title color={colors.black}>Something went wrong!</Title>
      <CustomText color={colors.grey}>{message}</CustomText>
      <Button onClick={reset} px={2} bg={colors.purple} width={'fit'}>
        Try again
      </Button>
    </Stack>
  );
};
