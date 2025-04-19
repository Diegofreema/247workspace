import { useAuthLogin } from '@/features/auth/api/use-auth-login';
import { Button, Image, Stack } from '@chakra-ui/react';
import { toaster } from '../ui/toaster';

export const SocialLogin = () => {
  const { mutateAsync, isPending } = useAuthLogin();

  const onLogin = async (provider: 'Google' | 'Github') => {
    await mutateAsync(provider, {
      onError: () => {
        toaster.create({
          title: 'Something went wrong',
          description: 'Failed to sign in, please try again',
          type: 'error',
        });
      },
    });
  };
  return (
    <Stack gap={4} width={'100%'}>
      <Button
        variant={'outline'}
        border={'1px solid #ccc'}
        disabled={isPending}
        color="black"
        onClick={() => onLogin('Google')}
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
        onClick={() => onLogin('Github')}
        disabled={isPending}
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
