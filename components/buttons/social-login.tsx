import { signUpWithGithub, signUpWithGoogle } from '@/lib/oauth';
import { Button, Image, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { toaster } from '../ui/toaster';

export const SocialLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onGitLogin = async () => {
    setIsSubmitting(true);
    try {
      await signUpWithGithub();
    } catch (error) {
      console.log(error);
      toaster.create({
        title: 'Error',
        description: 'Failed to login, please try again',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const onGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await signUpWithGoogle();
    } catch (error) {
      console.log(error);
      toaster.create({
        title: 'Error',
        description: 'Failed to login, please try again',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Stack gap={4} width={'100%'}>
      <Button
        variant={'outline'}
        border={'1px solid #ccc'}
        disabled={isSubmitting}
        color="black"
        onClick={onGoogleLogin}
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
        type="submit"
        onClick={onGitLogin}
        disabled={isSubmitting}
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
