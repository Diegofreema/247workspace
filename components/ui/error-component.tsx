'use client';
import { colors } from '@/constants';
import { Image, Stack } from '@chakra-ui/react';
import { Button } from '../custom/custom-button';
import { CustomText, Title } from '../custom/title';

type Props = {
  message: string;
  reset: () => void;
  className?: string;
};

export const ErrorComponent = ({ message, reset, className }: Props) => {
  return (
    <Stack
      gap={4}
      align="center"
      justify="center"
      display={'flex'}
      flexDir={'column'}
      className={className}
    >
      <Image
        src="/warning.png"
        alt="Error image"
        width={'auto'}
        height={'auto'}
        objectFit="cover"
      />
      <Title color={colors.black}>Something went wrong!</Title>
      <CustomText
        color={colors.grey}
        width={{ base: '90%', md: '70%', lg: '50%' }}
        textAlign={'center'}
      >
        {message}
      </CustomText>
      <Button onClick={reset} px={2} bg={colors.purple} width={'fit'}>
        Try again
      </Button>
    </Stack>
  );
};
