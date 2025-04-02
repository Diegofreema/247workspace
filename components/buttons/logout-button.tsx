'use client';

import { Button } from '@chakra-ui/react';
import { IconLogout2 } from '@tabler/icons-react';
import { useLogout } from '../../features/auth/api/use-logout';

type Props = {
  className?: string;
};

export const LogoutBtn = ({ className }: Props) => {
  const { mutateAsync, isPending } = useLogout();
  return (
    <Button
      className={className}
      color={'red'}
      fontWeight={'bold'}
      _hover={{
        bg: 'red.100',
      }}
      p={3}
      width={'100%'}
      onClick={() => mutateAsync({})}
      disabled={isPending}
    >
      <IconLogout2 color={'red'} size={30} /> Logout
    </Button>
  );
};
