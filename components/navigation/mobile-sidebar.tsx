'use client';

import { colors } from '@/constants';
import { drawerStore$ } from '@/lib/legend/drawer-store';
import { CloseButton, Drawer, DrawerFooter, Portal } from '@chakra-ui/react';
import { use$ } from '@legendapp/state/react';
import { DashboardSidebar } from './dashboard-sidebar';
import { MobileSidebarContent } from './mobile-sidebae-content';
import { Logo } from '../ui/logo';
import { LogoutBtn } from '../buttons/logout-button';
export const MobileSidebar = () => {
  const isOpen = use$(drawerStore$.isOpen);
  return (
    <Drawer.Root
      placement={'start'}
      open={isOpen}
      onOpenChange={(e) => drawerStore$.setOpen(e.open)}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg={colors.white}>
            <Drawer.Header>
              <Logo isPurple />
            </Drawer.Header>
            <Drawer.Body>
              <MobileSidebarContent />
            </Drawer.Body>

            <Drawer.CloseTrigger asChild>
              <CloseButton size="md" color={colors.black} />
            </Drawer.CloseTrigger>
            <DrawerFooter>
              <LogoutBtn />
            </DrawerFooter>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
