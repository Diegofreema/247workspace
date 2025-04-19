import { signUpWithGithub, signUpWithGoogle } from '@/lib/oauth';
import { useMutation } from '@tanstack/react-query';

export const useAuthLogin = () => {
  return useMutation({
    mutationFn: async (provider: 'Google' | 'Github') => {
      if (provider === 'Github') {
        await signUpWithGithub();
      } else {
        await signUpWithGoogle();
      }
    },
  });
};
