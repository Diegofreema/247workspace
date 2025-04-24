import { signUpWithGithub, signUpWithGoogle } from '@/lib/oauth';
import { Button, Image, Stack } from '@chakra-ui/react';

export const SocialLogin = () => {
  return (
    <Stack gap={4} width={'100%'}>
      <form action={signUpWithGoogle} className="w-full">
        <Button
          variant={'outline'}
          width={'100%'}
          border={'1px solid #ccc'}
          color="black"
          type="submit"
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
      </form>
      <form action={signUpWithGithub} className="w-full">
        <Button
          variant={'outline'}
          width={'100%'}
          color="black"
          border={'1px solid #ccc'}
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
      </form>
    </Stack>
  );
};
