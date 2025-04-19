import { signUpWithGithub, signUpWithGoogle } from '@/lib/oauth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useAuthLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (provider: 'Google' | 'Github') => {
      if (provider === 'Github') {
        await signUpWithGithub();
      } else {
        await signUpWithGoogle();
      }
    },
    // onSuccess: () => {
    //   const redirectUrl = localStorage.getItem('redirectUrl');
    //   if (redirectUrl) {
    //     router.push(redirectUrl);
    //     localStorage.removeItem('redirectUrl');
    //   } else {
    //     router.push('/');
    //   }
    // },
  });
};
