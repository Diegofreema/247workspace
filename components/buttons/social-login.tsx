import { signUpWithGithub, signUpWithGoogle } from '@/lib/oauth';
import { Button, Image, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { toaster } from '../ui/toaster';

export const SocialLogin = () => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (provider: 'google' | 'github') => {
    setLoading(true);
    try {
      if (provider === 'google') {
        await signUpWithGoogle();
      } else {
        await signUpWithGithub();
      }
    } catch (error: any) {
      toaster.create({
        title: 'Error',
        description: error.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap={4} width={'100%'}>
      <Button
        variant={'outline'}
        border={'1px solid #ccc'}
        disabled={loading}
        color="black"
        onClick={() => handleSignUp('google')}
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
        onClick={() => handleSignUp('github')}
        disabled={loading}
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
