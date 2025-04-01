'use client';

import { colors } from '@/constants';
import { drawerStore$ } from '@/lib/legend/drawer-store';
import { Button } from '@chakra-ui/react';
import { IconMenu2 } from '@tabler/icons-react';

export const SidebarBtn = () => {
  return (
    <Button
      variant="outline"
      size="lg"
      hideFrom={'md'}
      onClick={() => drawerStore$.setOpen(true)}
    >
      <IconMenu2 color={colors.black} />
    </Button>
  );
};
