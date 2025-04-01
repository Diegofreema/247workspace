import { routes } from '@/utils/routes';
import { For, Stack } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { ReusableSkeleton } from '../skeletons/link-skeleton';
import { NavLinkButtons } from './nav-link-buttons';

export const MobileSidebarContent = () => {
  return (
    <Stack gap={5} width={'100%'}>
      <For each={routes}>
        {(item) => (
          <Suspense key={item.label} fallback={<ReusableSkeleton />}>
            <NavLinkButtons key={item.label} item={item} />
          </Suspense>
        )}
      </For>
    </Stack>
  );
};
