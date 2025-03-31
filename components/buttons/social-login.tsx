import { Button, Image, Stack } from '@chakra-ui/react';
// import {  } from '../custom/custom-button';

type Props = {
  isSubmitting: boolean;
};

export const SocialLogin = ({ isSubmitting }: Props) => {
  return (
    <Stack gap={4} width={'100%'}>
      <Button
        variant={'outline'}
        border={'1px solid #ccc'}
        color="black"
        disabled={isSubmitting}
      >
        <Image
          alt="google image"
          src="/google.png"
          width={25}
          height={25}
          objectFit={'contain'}
        />
        Google
      </Button>
      <Button
        variant={'outline'}
        color="black"
        border={'1px solid #ccc'}
        disabled={isSubmitting}
        type="submit"
      >
        <Image
          alt="github image"
          src="/github.png"
          width={25}
          height={25}
          objectFit={'contain'}
        />
        Github
      </Button>
    </Stack>
  );
};
