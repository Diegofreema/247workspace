import { signUpWithGithub, signUpWithGoogle } from '@/lib/oauth';
import { Button, Image, Stack } from '@chakra-ui/react';
import { SubmitButton } from './submit-button';

export const SocialLogin = () => {
  return (
    <Stack gap={4} width={'100%'}>
      <form action={signUpWithGoogle} className="w-full">
        <SubmitButton text="Google" url="/google.png" />
      </form>
      <form action={signUpWithGithub} className="w-full">
        <SubmitButton text="Github" url="/github.png" />
      </form>
    </Stack>
  );
};
